/*
 * MultiTasking Cubes - Games
 * Copyright (C) 2017-2019 - Miguel Reboiro-Jato, Germán Veras Gómez,
 * Andrés Vieira Vázquez, Adolfo Piñón Blanco, Hugo López-Fernández,
 * Rosalía Laza Fidalgo, Reyes Pavón Rial, Francisco Otero Lamas,
 * Adrián Varela Pomar, Carlos Spuch Calvar, and Tania Rivera Baltanás.
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

import Phaser from 'phaser';

import {MtcDiceFace} from '../../../dice';

import {StageRenderer} from '../../stage';

import {
  backgroundTiledImage,
  checkButtonImage,
  cubeSlotImage,
  dockImage,
  endDragFX,
  frameImage,
  resetButtonImage,
  startDragFX
} from '../../../assets';

export class VerbalFluencyMainRenderer extends StageRenderer {

  constructor(configuration, status) {
    // check types
    super(configuration, status);
  }

  preload() {
    this.letterSprites = [];
    this.cubeSlots = [];

    this.diceScaleNormal = this.configuration.diceScales.normal;
    this.diceScaleDocked = this.configuration.diceScales.docked;
    this.diceScaleDragged = this.configuration.diceScales.dragged;

    this.draggingSprite = null;

    // Prevents game from pausing when browser loses focus
    this.game.scene.disableVisibilityChange = true;

    this.preloadImages();

    this.loadImage('background', backgroundTiledImage);
    this.loadImage('cube-slot', cubeSlotImage);
    this.loadImage('dock', dockImage);
    this.loadImage('frame', frameImage);
    this.loadSpriteSheet('reset-button', resetButtonImage, 114, 34);
    this.loadSpriteSheet('check-button', checkButtonImage, 114, 34);
    this.loadAudio('startDragFX', startDragFX);
    this.loadAudio('endDragFX', endDragFX);
  }

  create() {
    const pixelOffsets = this.configuration.pixelOffsets;

    // Add sounds
    this.startDragSound = this.loadAudio('startDragFX', startDragFX);
    this.endDragSound = this.loadAudio('endDragFX', endDragFX);

    // Add background image
    this.add.tileSprite(0, 0, this.worldWidth * 4, this.worldHeight * 4, 'background');

    // Add dock image
    this.dockSprite = this.add.sprite(0, 0, 'dock');
    this.dockSprite.setOrigin(0.5, 0.5);
    this.dockSprite.x = this.worldWidth / 2;
    this.dockSprite.y = this.calculateCenteredY(this.dockSprite.height);

    // Add time frame image
    this.timeFrameSprite = this.add.sprite(0, 0, 'frame');
    this.timeFrameSprite.setOrigin(0, 0.5);
    this.timeFrameSprite.x = pixelOffsets.frameX;
    this.timeFrameSprite.y = this.timeFrameSprite.height / 2 + pixelOffsets.frameY;

    // Add score frame image
    this.scoreFrameSprite = this.add.sprite(0, 0, 'frame');
    this.scoreFrameSprite.setOrigin(1, 0.5);
    this.scoreFrameSprite.x = this.worldWidth - pixelOffsets.frameX;
    this.scoreFrameSprite.y = this.scoreFrameSprite.height / 2 + pixelOffsets.frameY;

    // Add time text
    this.timeText = this.add.text(0, 0,
      this.getStandardGameText('time') + ': ' + this.game.configuration.time,
      this.configuration.textStyles.inGameTime
    );
    this.timeText.setOrigin(0.5, 0.5);
    this.timeText.x = this.timeFrameSprite.x + this.timeFrameSprite.width / 2;
    this.timeText.y = this.timeFrameSprite.y;

    // Add score text
    this.scoreText = this.add.text(0, 0,
      '0 / 0',
      this.configuration.textStyles.score
    );
    this.scoreText.setOrigin(0.5, 0.5);
    this.scoreText.x = this.scoreFrameSprite.x - this.scoreFrameSprite.width / 2;
    this.scoreText.y = this.scoreFrameSprite.y;

    // Add check button
    this.checkButton = this.add.sprite(
      this.dockSprite.x + pixelOffsets.checkButtonHorizontal,
      this.dockSprite.y + pixelOffsets.checkButtonVertical,
      'check-button',
      1
    );
    this.checkButton.setInteractive();
    this.checkButton.setOrigin(0.5, 0.5);
    this.checkButton.on('pointerover', this.over);
    this.checkButton.on('pointerout', this.out);
    this.checkButton.on('pointerdown', this.onWordCheck, this);
    this.checkButton.on('pointerup', this.up);

    // Add reset button
    this.resetButton = this.add.sprite(
      this.dockSprite.x + pixelOffsets.resetButtonHorizontal,
      this.dockSprite.y + pixelOffsets.resetButtonVertical,
      'reset-button',
      1
    );
    this.resetButton.setInteractive();
    this.resetButton.setOrigin(0.5, 0.5);
    this.resetButton.on('pointerover', this.over);
    this.resetButton.on('pointerout', this.out);
    this.resetButton.on('pointerdown', this.onWordReset, this);
    this.resetButton.on('pointerup', this.up);

    //Add cube slots
    for (let i = 0, len = 12; i < len; i++) {
      const leftOffset = this.dockSprite.x - (this.dockSprite.width / 2) + 45;
      const innerSeparation = 3;
      const currentSprite = this.add.sprite(0, 0, 'cube-slot');

      currentSprite.setOrigin(0.5, 0.5);
      currentSprite.x = (currentSprite.width + innerSeparation) * i + leftOffset;
      currentSprite.y = this.dockSprite.y + 10;

      this.cubeSlots.push(currentSprite);
    }

    //Calculate automatic dice scale
    if (this.diceScaleNormal < 0 || this.diceScaleDragged < 0) {
      let calcSprite = this.add.sprite(0, 0, 'letters-' + MtcDiceFace.LETTERS_FACE_VALUES[0].toLowerCase());
      calcSprite.width = Math.min(this.game.configuration.width, this.game.configuration.height) / 7;
      this.diceScaleNormal = calcSprite.scaleX;
      this.diceScaleDragged = calcSprite.scaleX * 1.25;
      calcSprite.width = this.cubeSlots[0].width;
      calcSprite.height = this.cubeSlots[0].height;
      this.diceScaleDocked = calcSprite.scaleX;
      calcSprite.destroy();
    }

    // Add letter sprites to the game
    for (let i = 0, len = MtcDiceFace.LETTERS_FACE_VALUES.length; i < len; i++) {
      let currentSprite = this.add.sprite(0, 0, 'letters-' + MtcDiceFace.LETTERS_FACE_VALUES[i].toLowerCase());
      currentSprite.setScale(this.diceScaleNormal, this.diceScaleNormal);
      currentSprite.setOrigin(0.5, 0.5);
      currentSprite.setInteractive();

      let randomCoords;

      do {
        randomCoords = this.getRandomScrambleCoords();
      } while (this.isLetterColliding(randomCoords[0], randomCoords[1]));
      currentSprite.x = randomCoords[0];
      currentSprite.y = randomCoords[1];

      // Needed to support tween
      currentSprite.finalX = randomCoords[0];
      currentSprite.finalY = randomCoords[1];

      currentSprite.inputEnabled = true;
      currentSprite.addListener(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, this.onSpriteClicked.bind(this, currentSprite));

      this.letterSprites.push(currentSprite);
    }

    if(!this.game.configuration.timerVisible) {
      this.hideSprite(this.timeFrameSprite);
      this.timeText.setVisible(false);
    }

    this.status.start();
  }

  update() {
    this.timeText.setText(
      this.status.isRunning()
        ? this.getStandardGameText('time', text => text + ': ' + Math.ceil(this.status.secondsLeft))
        : this.getStandardGameText('timeIsUp')
    );

    if (this.draggingSprite) {
      this.draggingSprite.x = this.game.input.mouse.manager.mousePointer.position.x;
      this.draggingSprite.y = this.game.input.mouse.manager.mousePointer.position.y;
    }

    if (this.areEmptyAllCubeSlots()) {
      this.checkButton.disableInteractive()
    } else {
      this.checkButton.setInteractive();
    }

    this.updateScore();

    if (!this.status.isRunning()) {
      this.disableGame();
    }
  }

  updateScore() {
    this.scoreText.text = String(this.status.countGuessedWords()) + ' / ' + String(this.status.countRepeatedWords()) + ' / ' + String(this.status.countFailedWords());
    this.scoreText.setColor(this.configuration.colors.scoreSuccess, 0);
    this.scoreText.setColor(this.configuration.colors.scoreSeparator, this.scoreText.text.indexOf('/'));
    this.scoreText.setColor(this.configuration.colors.scoreRepetition, this.scoreText.text.indexOf('/') + 1);
    this.scoreText.setColor(this.configuration.colors.scoreSeparator, this.scoreText.text.lastIndexOf('/'));
    this.scoreText.setColor(this.configuration.colors.scoreIntrusion, this.scoreText.text.lastIndexOf('/') + 1);
    this.scoreText.setColor(this.configuration.colors.scoreSeparator);
  }

  isLetterColliding(x, y) {
    //Spawn a sprite to get pixel size
    const tempSprite = this.add.sprite(0, 0, 'letters-' + MtcDiceFace.LETTERS_FACE_VALUES[0].toLowerCase());
    tempSprite.setScale(this.diceScaleNormal, this.diceScaleNormal);
    const spriteWidth = tempSprite.displayWidth;
    tempSprite.destroy();
    const minimumSeparation = Math.sqrt(Math.pow(spriteWidth, 2) + Math.pow(spriteWidth / 2, 2)) + spriteWidth / 10;

    return this.letterSprites.some(element =>
      this.calculateDistance(x, y, element.finalX, element.finalY) < minimumSeparation
    );
  }

  areEmptyAllCubeSlots() {
    return this.status.currentWord.every(function (letter) {
      return letter === ' ';
    })
  }

  disableGame() {
    //Ensure you cant play
    this.resetButton.inputEnabled = false;
    this.checkButton.inputEnabled = false;
    this.letterSprites.forEach(function (element) {
      element.inputEnabled = false;
    }, this);
  }

  onWordCheck() {
    this.status.checkWord();
    this.shuffleLetters();
  }

  onWordReset() {
    this.status.resetWord();
    this.shuffleLetters();
  }

  shuffleLetters() {
    let randomCoords;

    for (let i = 0, len = MtcDiceFace.LETTERS_FACE_VALUES.length; i < len; i++) {
      do {
        randomCoords = this.getRandomScrambleCoords();
      } while (this.isLetterColliding(randomCoords[0], randomCoords[1]));

      this.letterSprites[i].finalX = randomCoords[0];
      this.letterSprites[i].finalY = randomCoords[1];

      this.tweens.add({
        targets: this.letterSprites[i],
        x: randomCoords[0],
        y: randomCoords[1],
        scaleX: 0.1,
        scaleY: 0.1,
        duration: 100
      });
    }
  }

  onSpriteClicked(sprite, pointer) {
    if (!this.draggingSprite) {
      this.onSpriteDragged(sprite, pointer);
      this.draggingSprite = sprite;
    } else {
      this.onSpriteReleased(sprite, pointer);
      this.draggingSprite = null;
    }
  }

  onSpriteDragged(sprite) {
    // Bring sprite to top
    this.scene.bringToTop(sprite.texture.key);
    this.sound.play('startDragFX', this.startDragSound);

    //Scale the dice so it makes the illusion of lifting it
    let tween = this.tweens.add({
      targets: sprite,
      x: this.diceScaleDragged,
      y: this.diceScaleDragged,
      alpha: 0,
    });

    this.input.on('pointerdown', function () {
      tween.play();
    });
  }

  onSpriteReleased(sprite) {
    this.sound.play('endDragFX', this.endDragSound);

    const currentLetter = sprite.texture.key.substr(sprite.texture.key.length - 1);
    const currentLetterIndex = this.status.currentWord.indexOf(currentLetter);

    let boundToSomething = false;
    let boundIndex = -1;

    //Check if the dropped letter dice is near some socket
    this.cubeSlots.forEach(function (currentItem, index) {
      //Check if the dice is near this cubeSlot and if the word has an empty letter there.
      if (
        this.calculateDistance(currentItem.x, currentItem.y, sprite.x, sprite.y) < 30.0
        && this.status.currentWord[index] === ' '
      ) {
        sprite.x = currentItem.x;
        sprite.y = currentItem.y;
        boundToSomething = true;
        boundIndex = index;
      }
    }, this);

    //Clear the letter from the temporal word
    if (currentLetterIndex >= 0) {
      this.status.clearLetter(currentLetterIndex);
    }

    //If it was bound to something insert the letter into the temporal word
    if (boundToSomething && boundIndex !== -1) {
      this.status.putLetter(boundIndex, currentLetter);
    }

    const finalScale = boundToSomething
      ? {x: this.diceScaleDocked, y: this.diceScaleDocked}
      : {x: this.diceScaleNormal, y: this.diceScaleNormal};

    this.tweens.add({
      targets: sprite,
      scaleX: finalScale.x,
      scaleY: finalScale.y,
      duration: 50
    });
  }

  up() {
    this.setTexture(this.texture.key, 1);
  }

  over() {
    this.setTexture(this.texture.key, 2);
  }

  out() {
    this.setTexture(this.texture.key, 1);
  }
}
