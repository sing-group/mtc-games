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

import {StageRenderer} from '../../../game/stage';
import {AssociatedPairsMainStageStatus} from './AssociatedPairsMainStageStatus';
import {backgroundTiledImage, diceSelectFX, dockImage, frameImage, unrecognizedSpriteImage} from '../../../assets';
import {GameScore, GameTime} from '../../../components';

export class AssociatedPairsMainRenderer extends StageRenderer {

  constructor(configuration, status) {
    // check types
    super(configuration, status);
  }

  preload() {
    // Prevents game from pausing when browser loses focus
    this.game.scene.disableVisibilityChange = true;

    this.lastShownPair = null;
    this.pairElementToSelect = null;

    this.shownPairs = Array();
    this.selectedPairs = Array();
    this.currentShowPair = Array();
    this.nextPairToSelect = Array();
    this.currentShowSprites = Array();
    this.shownSpritesToSelect = Array();

    this.preloadImages();

    this.loadImage('dock', dockImage);
    this.loadImage('frame', frameImage);
    this.loadAudio('diceSelectFX', diceSelectFX);
    this.loadImage('background', backgroundTiledImage);
    this.loadImage('unrecognized', unrecognizedSpriteImage);
  }

  create() {
    // Add Stimulus
    this.status.stimulus = this.game.configuration.parameterValues.diceFace;

    // Add sounds
    this.diceSelectSound = this.load.audio('diceSelectFX', diceSelectFX);

    // Add background image
    this.add.tileSprite(0, 0, this.worldWidth * 4, this.worldHeight * 4, 'background');

    this.scorePanel = new GameScore(this.worldWidth - this.configuration.pixelOffsets.frameX, this.configuration.pixelOffsets.frameY,
      'frame', [0, 0], [this.configuration.textStyles.scoreGuessed, this.configuration.textStyles.scoreFailed], this);

    this.timePanel = new GameTime(this.configuration.pixelOffsets.frameX, this.configuration.pixelOffsets.frameY,
      'frame', this.getStandardGameText('time') + ': ' + this.game.configuration.time, this.configuration.textStyles.inGameTime, this);

    //Calculate automatic dice scale
    let calcSprite = this.add.sprite(0, 0, this.getStimulusRandomValue());
    calcSprite.width = Math.min(this.worldWidth, this.worldHeight) / 7;
    if (this.configuration.diceScales.normal < 0) {
      this.diceScale = calcSprite.scaleX;
    } else {
      this.diceScale = this.configuration.diceScales.normal;
    }
    if (this.configuration.diceScales.shown < 0) {
      this.diceScaleShown = calcSprite.scaleX * 3;
    } else {
      this.diceScaleShown = this.configuration.diceScales.shown;
    }
    calcSprite.destroy();

    this.hideGamePanels();
    this.status.start();
  }

  update() {

    this.updateTime();
    this.updateScore();

    if (!this.status.isRunning()) {
      //  Ensure elements are not clickable
      this.shownSpritesToSelect.forEach(element => {
        element.input.enabled = false;
      });
    } else {
      // Execute the current phase of the game.
      if (this.status.phase === AssociatedPairsMainStageStatus.PHASES.PAIR_SHOW && this.status.currentDiceIteration < this.game.configuration.parameterValues.numberOfPairs) {
        this.pairShowPhaseUpdate();
      } else if (this.status.phase === AssociatedPairsMainStageStatus.PHASES.PAIR_SELECT) {
        this.pairSelectPhaseUpdate();
      }
    }
  }

  pairShowPhaseUpdate() {
    if (!this.status.isShowingDice) {
      this.lastShownPair = this.getRandomPairStimulusSpriteNameWithoutDuplicates();
      this.shownPairs.push(this.lastShownPair);

      let firstElement = this.add.sprite(this.worldWidth / 2, this.worldHeight / 2, this.lastShownPair[0]);
      firstElement.setScale(this.diceScaleShown, this.diceScaleShown);
      firstElement.setOrigin(1, 0.5);
      firstElement.alpha = 0;

      let secondElement = this.add.sprite(this.worldWidth / 2, this.worldHeight / 2, this.lastShownPair[1]);
      secondElement.setScale(this.diceScaleShown, this.diceScaleShown);
      secondElement.setOrigin(0, 0.5);
      secondElement.alpha = 0;

      this.currentShowPair.push(firstElement);
      this.currentShowPair.push(secondElement);

      this.tweens.add({
        targets: [this.currentShowPair[0], this.currentShowPair[1]],
        duration: 500,
        alpha: 1
      });

      this.diceShowTimestamp = Date.now();
      this.status.isShowingDice = true;
    } else {
      // Check if its moment to hide the dice
      if (Date.now() > this.diceShowTimestamp + (this.game.configuration.parameterValues.timePerPair * 1000)) {
        if (this.currentShowPair !== null) {
          this.tweens.add({
            targets: [this.currentShowPair[0], this.currentShowPair[1]],
            duration: 200,
            alpha: 0
          });
          this.currentShowPair = Array();
        }

        this.status.isShowingDice = false;
        this.status.currentDiceIteration++;

        if (this.status.currentDiceIteration === this.game.configuration.parameterValues.numberOfPairs) {
          this.status.phase = AssociatedPairsMainStageStatus.PHASES.PAIR_SELECT;
          this.status._startCountdown();
          this.status.timeTakenByShow = this.status.secondsElapsed;
          this.generateRandomPairElementToSelect();
          this.drawResultsDock();
          this.drawPairToSelect();
          this.showGamePanels();
        }
      }
    }
  }

  pairSelectPhaseUpdate() {
    if (!this.status.dicesToSelectShown && this.status.isRunning()) {
      // Add dice sprites
      for (let i = 0, len = this.status.stimulusValues.length; i < len; i++) {
        const currentSprite = this.add.sprite(0, 0, this.status.stimulus + '-' + String(this.status.stimulusValues[i]).toLowerCase());
        currentSprite.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, this.onDiceClick.bind(this, currentSprite)).setInteractive();
        currentSprite.setScale(this.diceScale, this.diceScale);
        currentSprite.setOrigin(0.5, 0.5);
        currentSprite.setAlpha(this.getSpriteAlphaValue(currentSprite));

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
        this.shownSpritesToSelect.push(currentSprite);
      }
      this.status.dicesToSelectShown = true;
    }
  }

  onDiceClick(clickedSprite) {
    this.sound.play('diceSelectFX', this.diceSelectSound);
    if (this.nextPairToSelect[this.pairElementToSelect] === clickedSprite.texture.key) {
      this.selectedPairs.push(this.nextPairToSelect);
      this.currentShowSprites.forEach(function (sprite) {
        sprite.destroy();
      });
      this.status.increaseGuessed();
      if (!this.status.areAllGuessed()) {
        this.generateRandomPairElementToSelect();
        this.drawPairToSelect();
        this.shuffleDices();
      }
    } else {
      this.hideSprite(clickedSprite);
      this.status.increaseFailed();
    }
  }

  isLetterColliding(x, y) {
    let tempSprite = this.add.sprite(0, 0, this.getStimulusRandomValue());
    tempSprite.setScale(this.diceScale, this.diceScale);
    let spriteWidth = tempSprite.displayWidth;
    tempSprite.destroy();

    let minimumSeparation = Math.sqrt(Math.pow(spriteWidth, 2) + Math.pow(spriteWidth / 2, 2)) + spriteWidth / 10;

    return this.shownSpritesToSelect.some(element =>
      this.calculateDistance(x, y, element.finalX, element.finalY) < minimumSeparation
    );
  }

  generateRandomPairElementToSelect() {
    this.pairElementToSelect = (Math.random() > 0.5) ? 1 : 0;
  }

  getRandomPairStimulusSpriteNameWithoutDuplicates() {
    let randomPair = Array();
    do {
      randomPair[0] = this.getStimulusRandomValue();
      do {
        randomPair[1] = this.getStimulusRandomValue();
      } while (randomPair[0] === randomPair[1])
    } while (this.containsPair(randomPair));

    return randomPair;
  }

  getStimulusRandomValue() {
    let stimulus = this.status.stimulus + '-' + this.status.stimulusValues[Math.floor((Math.random() * this.status.stimulusValues.length))];
    return stimulus.toLowerCase();
  }

  containsPair(pair) {
    let contains = false;
    this.shownPairs.forEach(function (element) {
      if (element[0] === pair[0] && element[1] === pair[1] || element[1] === pair[0] && element[0] === pair[1]) {
        contains = true;
      }
    });
    return contains;
  }

  updateScore() {
    this.scorePanel.update([this.status.guessed, this.status.failed]);
  }

  updateTime() {
    // Calculate the remaining time and set the text accordingly
    let remainingTime = this.game.configuration.time;

    if (this.status.phase === AssociatedPairsMainStageStatus.PHASES.PAIR_SELECT) {
      // Don't update if not in select mode. Let the user breath a little.
      remainingTime = remainingTime - this.status.secondsElapsed + this.status.timeTakenByShow;
    }

    this.timePanel.update(
      remainingTime > 0
        ? this.getStandardGameText('time') + ': ' + Math.ceil(remainingTime)
        : this.getStandardGameText('timeIsUp')
    );
  }

  drawResultsDock() {
    this.dockSprite = this.add.sprite(0, 0, 'dock');
    this.dockSprite.setOrigin(0.5, 0.5);
    this.dockSprite.x = this.worldWidth / 2;
    this.dockSprite.y = this.calculateCenteredY(this.dockSprite.height);
  }

  drawPairToSelect() {
    let pair = this.shownPairs[this.selectedPairs.length];
    this.nextPairToSelect = pair;

    let firstElement = this.add.sprite(this.dockSprite.x, this.dockSprite.y + 10, pair[0]);
    firstElement.setScale(this.configuration.diceScales.result);
    firstElement.setOrigin(1, 0.5);
    firstElement.alpha = 0;

    let secondElement = this.add.sprite(this.dockSprite.x, this.dockSprite.y + 10, pair[1]);
    secondElement.setScale(this.configuration.diceScales.result);
    secondElement.setOrigin(0, 0.5);
    secondElement.alpha = 0;

    let cubeSlot = this.add.sprite(this.dockSprite.x, this.dockSprite.y + 10, 'unrecognized');
    cubeSlot.setOrigin(this.pairElementToSelect === 0 ? 1 : 0, 0.5);
    cubeSlot.setScale(this.configuration.diceScales.result);
    cubeSlot.alpha = 0;

    this.currentShowSprites.push(firstElement);
    this.currentShowSprites.push(secondElement);
    this.currentShowSprites.push(cubeSlot);

    let elementToShow = this.pairElementToSelect === 0 ? secondElement : firstElement;

    this.tweens.add({
      targets: [elementToShow, cubeSlot],
      duration: 500,
      alpha: 1
    });
  }

  shuffleDices() {
    let randomCoords;

    for (let i = 0, len = this.shownSpritesToSelect.length; i < len; i++) {
      do {
        randomCoords = this.getRandomScrambleCoords();
      } while (this.isLetterColliding(randomCoords[0], randomCoords[1]));

      this.shownSpritesToSelect[i].finalX = randomCoords[0];
      this.shownSpritesToSelect[i].finalY = randomCoords[1];

      this.tweens.add({
        targets: this.shownSpritesToSelect[i],
        x: randomCoords[0],
        y: randomCoords[1],
        scaleX: this.configuration.diceScales.normal,
        scaleY: this.configuration.diceScales.normal,
        alpha: this.getSpriteAlphaValue(this.shownSpritesToSelect[i]),
        duration: 100
      });
    }
  }

  getSpriteAlphaValue(sprite) {
    let spriteToHide = this.pairElementToSelect === 0 ? 1 : 0;
    let spriteKey = sprite.texture.key;

    return this.nextPairToSelect[spriteToHide] === spriteKey ? 0 : 1;
  }

  hideGamePanels() {
    this.scorePanel.hide();
    this.timePanel.hide();
  }

  showGamePanels() {
    if (this.game.configuration.timerVisible) {
      this.timePanel.show();
    }
    this.scorePanel.show();
  }

}
