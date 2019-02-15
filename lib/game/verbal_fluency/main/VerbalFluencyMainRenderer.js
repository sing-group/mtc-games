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

import StageRenderer from '../../stage/StageRenderer';

import MtcDiceFace from '../../../dice/MtcDiceFace';
import Phaser from 'phaser-ce';

import backgroundImage from '../../../assets/image/game/scene/main/background-tiled.jpg';
import frameImage from '../../../assets/image/game/scene/main/frame.png';

import cubeSlotImage from '../../../assets/image/game/verbal_fluency/cube-slot.png';
import dockImage from '../../../assets/image/game/verbal_fluency/dock.png';
import resetButtonImage from '../../../assets/image/game/verbal_fluency/reset-button-spritesheet.png';
import checkButtonImage from '../../../assets/image/game/verbal_fluency/check-button-spritesheet.png';
import startDragFX from '../../../assets/audio/fx/dice/start_drag.wav';
import endDragFX from '../../../assets/audio/fx/dice/end_drag.wav';

export default class VerbalFluencyMainRenderer extends StageRenderer {

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
    this.game.stage.disableVisibilityChange = true;

    super.preloadImages();

    this.loadImage('background', backgroundImage);
    this.loadImage('cube-slot', cubeSlotImage);
    this.loadImage('dock', dockImage);
    this.loadImage('frame', frameImage);
    this.loadSpritesheet('reset-button', resetButtonImage, 114, 34);
    this.loadSpritesheet('check-button', checkButtonImage, 114, 34);
    this.loadAudio('startDragFX', startDragFX);
    this.loadAudio('endDragFX', endDragFX);
  }

  create() {
    const pixelOffsets = this.configuration.pixelOffsets;

    // Add sounds
    this.startDragSound = this.game.add.audio('startDragFX');
    this.endDragSound = this.game.add.audio('endDragFX');

    // Add background image
    this.game.add.tileSprite(0, 0, this.worldWidth, this.worldHeight, 'background');

    // Add dock image
    this.dockSprite = this.game.add.sprite(0, 0, 'dock');
    this.dockSprite.anchor.setTo(0.5, 0.5);
    this.dockSprite.x = this.worldWidth / 2;
    this.dockSprite.y = this.calculateCenteredY(this.dockSprite.height);

    // Add time frame image
    this.timeFrameSprite = this.game.add.sprite(0, 0, 'frame');
    this.timeFrameSprite.anchor.setTo(0, 0.5);
    this.timeFrameSprite.x = pixelOffsets.frameX;
    this.timeFrameSprite.y = this.timeFrameSprite.height / 2 + pixelOffsets.frameY;

    // Add score frame image
    this.scoreFrameSprite = this.game.add.sprite(0, 0, 'frame');
    this.scoreFrameSprite.anchor.setTo(1, 0.5);
    this.scoreFrameSprite.x = this.worldWidth - pixelOffsets.frameX;
    this.scoreFrameSprite.y = this.scoreFrameSprite.height / 2 + pixelOffsets.frameY;

    // Add time text
    this.timeText = this.game.add.text(0, 0,
      this.getStandardGameText('time') + ': ' + this.game.configuration.time,
      this.configuration.textStyles.inGameTime
    );
    this.timeText.anchor.setTo(0.5, 0.5);
    this.timeText.x = this.timeFrameSprite.x + this.timeFrameSprite.width / 2;
    this.timeText.y = this.timeFrameSprite.y;

    // Add score text
    this.scoreText = this.game.add.text(0, 0,
      '0 / 0',
      this.configuration.textStyles.score
    );
    this.scoreText.anchor.setTo(0.5, 0.5);
    this.scoreText.x = this.scoreFrameSprite.x - this.scoreFrameSprite.width / 2;
    this.scoreText.y = this.scoreFrameSprite.y;

    // Add check button
    this.checkButton = this.game.add.button(
      this.dockSprite.x + pixelOffsets.checkButtonHorizontal,
      this.dockSprite.y + pixelOffsets.checkButtonVertical,
      'check-button',
      this.onWordCheck,
      this,
      2,
      1,
      0
    );
    this.checkButton.anchor.setTo(0.5, 0.5);

    // Add reset button
    this.resetButton = this.game.add.button(
      this.dockSprite.x + pixelOffsets.resetButtonHorizontal,
      this.dockSprite.y + pixelOffsets.resetButtonVertical,
      'reset-button',
      this.onWordReset,
      this,
      2,
      1,
      0
    );
    this.resetButton.anchor.setTo(0.5, 0.5);

    //Add cube slots
    for (let i = 0, len = 12; i < len; i++) {
      const leftOffset = this.dockSprite.x - (this.dockSprite.width / 2) + 45;
      const innerSeparation = 3;
      const currentSprite = this.game.add.sprite(0, 0, 'cube-slot');

      currentSprite.anchor.setTo(0.5, 0.5);
      currentSprite.scale.setTo(1, 1);
      currentSprite.x = (currentSprite.width + innerSeparation) * i + leftOffset;
      currentSprite.y = this.dockSprite.y + 10;

      this.cubeSlots.push(currentSprite);
    }

    //Calculate automatic dice scale
    if (this.diceScaleNormal < 0 || this.diceScaleDragged < 0) {
      let calcSprite = this.game.add.sprite(0, 0, 'letters-' + MtcDiceFace.LETTERS_FACE_VALUES[0].toLowerCase());
      calcSprite.width = Math.min(this.game.configuration.width, this.game.configuration.height) / 7;
      this.diceScaleNormal = calcSprite.scale.x;
      this.diceScaleDragged = calcSprite.scale.x * 1.25;
      calcSprite.width = this.cubeSlots[0].width;
      calcSprite.height = this.cubeSlots[0].height;
      this.diceScaleDocked = calcSprite.scale.x;
      calcSprite.destroy();
    }

    // Add letter sprites to the game
    for (let i = 0, len = MtcDiceFace.LETTERS_FACE_VALUES.length; i < len; i++) {
      let currentSprite = this.game.add.sprite(0, 0, 'letters-' + MtcDiceFace.LETTERS_FACE_VALUES[i].toLowerCase());
      currentSprite.scale.setTo(this.diceScaleNormal, this.diceScaleNormal);
      currentSprite.anchor.setTo(0.5, 0.5);

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
      if (this.game.configuration.useDrag) {
        currentSprite.input.enableDrag();
        currentSprite.events.onDragStart.add(this.onSpriteDragged, this);
        currentSprite.events.onDragStop.add(this.onSpriteReleased, this);
      } else {
        currentSprite.events.onInputDown.add(this.onSpriteClicked, this);
      }

      this.letterSprites.push(currentSprite);
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
      this.draggingSprite.x = this.game.input.x;
      this.draggingSprite.y = this.game.input.y;
    }

    this.updateScore();

    if (!this.status.isRunning()) {
      this.disableGame();
    }
  }

  updateScore() {
    this.scoreText.text = String(this.status.countGuessedWords()) + ' / ' + String(this.status.countRepeatedWords()) + ' / ' + String(this.status.countFailedWords());
    this.scoreText.addColor(this.configuration.colors.scoreSuccess, 0);
    this.scoreText.addColor(this.configuration.colors.scoreSeparator, this.scoreText.text.indexOf('/'));
    this.scoreText.addColor(this.configuration.colors.scoreRepetition, this.scoreText.text.indexOf('/') + 1);
    this.scoreText.addColor(this.configuration.colors.scoreSeparator, this.scoreText.text.lastIndexOf('/'));
    this.scoreText.addColor(this.configuration.colors.scoreIntrusion, this.scoreText.text.lastIndexOf('/') + 1);
  }

  isLetterColliding(x, y) {
    //Spawn a sprite to get pixel size
    const tempSprite = this.game.add.sprite(0, 0, 'letters-' + MtcDiceFace.LETTERS_FACE_VALUES[0].toLowerCase());
    tempSprite.scale.setTo(this.diceScaleNormal, this.diceScaleNormal);
    const spriteWidth = tempSprite.width;
    tempSprite.destroy();
    const minimumSeparation = Math.sqrt(Math.pow(spriteWidth, 2) + Math.pow(spriteWidth / 2, 2)) + spriteWidth / 10;

    return this.letterSprites.some(element =>
      this.calculateDistance(x, y, element.finalX, element.finalY) < minimumSeparation
    );
  }

  getRandomScrambleCoords() {
    const randX = Math.floor(Math.random() * (this.game.configuration.width - 75 - 75 + 1)) + 75;
    const randY = Math.floor(Math.random() * (this.game.configuration.height - 200 - 100 + 1)) + 100;

    return [randX, randY];
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

      this.letterSprites[i].scale.setTo(this.diceScaleNormal, this.diceScaleNormal);

      this.game.add.tween(this.letterSprites[i]).to(
        {x: randomCoords[0], y: randomCoords[1]},
        100,
        Phaser.Easing.Linear.None,
        true,
        0,
        0,
        false
      );
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
    sprite.bringToTop();
    this.startDragSound.play();

    //Scale the dice so it makes the illusion of lifting it
    this.game.add.tween(sprite.scale).to(
      {x: this.diceScaleDragged, y: this.diceScaleDragged},
      50,
      Phaser.Easing.Linear.None,
      true,
      0,
      0,
      false
    );
  }

  onSpriteReleased(sprite) {
    this.endDragSound.play();

    const currentLetter = sprite.key.substr(sprite.key.length - 1);
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

    this.game.add.tween(sprite.scale).to(
      finalScale,
      50,
      Phaser.Easing.Linear.None,
      true,
      0,
      0,
      false
    );
  }
}
