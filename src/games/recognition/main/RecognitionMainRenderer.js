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
import {RecognitionMainStageStatus} from './RecognitionMainStageStatus';

import {backgroundTiledImage, diceSelectFX, frameImage} from '../../../assets';
import {GameScore, GameTime} from '../../../components';

export class RecognitionMainRenderer extends StageRenderer {

  constructor(configuration, status) {
    // check types
    super(configuration, status);
  }

  preload() {
    // Prevents game from pausing when browser loses focus
    this.game.scene.disableVisibilityChange = true;

    this.currentShowSprite = null;
    this.lastShownSprite = null;
    this.shownSprites = Array();
    this.shownSpritesToSelect = Array();

    this.preloadImages();

    this.loadImage('background', backgroundTiledImage);
    this.loadImage('frame', frameImage);
    this.loadAudio('diceSelectFX', diceSelectFX);
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
    let calcSprite = this.add.sprite(0, 0, this.getRandomStimulusSpriteName());
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
      if (this.status.phase === RecognitionMainStageStatus.PHASES.DICE_SHOW && this.status.currentDiceIteration < this.game.configuration.parameterValues.numberOfElements) {
        this.diceShowPhaseUpdate();
      } else if (this.status.phase === RecognitionMainStageStatus.PHASES.DICE_SELECT) {
        this.diceSelectPhaseUpdate();
      }
    }
  }

  diceShowPhaseUpdate() {
    if (!this.status.isShowingDice) {
      let spriteName = this.getRandomStimulusSpriteNameWithoutDuplicates();
      this.lastShownSprite = spriteName;

      this.shownSprites.push(spriteName);
      this.currentShowSprite = this.add.sprite(this.worldWidth / 2, this.worldHeight / 2, spriteName);
      this.currentShowSprite.setScale(this.diceScaleShown, this.diceScaleShown);
      this.currentShowSprite.setOrigin(0.5, 0.5);
      this.currentShowSprite.alpha = 0;

      this.tweens.add({
        targets: this.currentShowSprite,
        duration: 500,
        alpha: 1
      });

      this.dice_show_timestamp = Date.now();
      this.status.isShowingDice = true;
    } else {
      // Check if its moment to hide the dice
      if (Date.now() > this.dice_show_timestamp + (this.game.configuration.parameterValues.timePerElement * 1000)) {
        if (this.currentShowSprite !== null) {
          this.tweens.add({
            targets: this.currentShowSprite,
            duration: 200,
            alpha: 0
          });
        }

        this.status.isShowingDice = false;
        this.status.currentDiceIteration++;

        if (this.status.currentDiceIteration === this.game.configuration.parameterValues.numberOfElements) {
          this.status.phase = RecognitionMainStageStatus.PHASES.DICE_SELECT;
          this.status._startCountdown();
          this.status.timeTakenByShow = this.status.secondsElapsed;
          this.showGamePanels();
        }
      }
    }
  }

  diceSelectPhaseUpdate() {
    if (!this.status.dicesToSelectShown && this.status.isRunning()) {
      // Add dice sprites
      for (let i = 0, len = this.status.stimulusValues.length; i < len; i++) {
        const currentSprite = this.add.sprite(0, 0, this.status.stimulus + '-' + String(this.status.stimulusValues[i]).toLowerCase());
        currentSprite.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, this.onDiceClick.bind(this, currentSprite)).setInteractive();
        currentSprite.setScale(this.diceScale, this.diceScale);
        currentSprite.setOrigin(0.5, 0.5);

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
    if (this.shownSprites.indexOf(clickedSprite.texture.key) !== -1) {
      this.shownSprites.splice(this.shownSprites.indexOf(clickedSprite.texture.key), 1);
      clickedSprite.destroy();
      this.status.increaseGuessed();
    } else {
      clickedSprite.destroy();
      this.status.increaseFailed();
    }
  }

  isLetterColliding(x, y) {
    let tempSprite = this.add.sprite(0, 0, this.getRandomStimulusSpriteName());
    tempSprite.setScale(this.diceScale, this.diceScale);
    let spriteWidth = tempSprite.displayWidth;
    tempSprite.destroy();

    let minimumSeparation = Math.sqrt(Math.pow(spriteWidth, 2) + Math.pow(spriteWidth / 2, 2)) + spriteWidth / 10;

    return this.shownSpritesToSelect.some(element =>
      this.calculateDistance(x, y, element.finalX, element.finalY) < minimumSeparation
    );
  }

  getRandomStimulusSpriteName() {
    let randomName = null;

    do {
      randomName = this.status.stimulus + '-' + this.status.stimulusValues[Math.floor((Math.random() * this.status.stimulusValues.length))];
      randomName = randomName.toLowerCase();
    } while (randomName === this.lastShownSprite);

    return randomName;
  }

  getRandomStimulusSpriteNameWithoutDuplicates() {
    let randomName = null;

    do {
      randomName = this.status.stimulus + '-' + this.status.stimulusValues[Math.floor((Math.random() * this.status.stimulusValues.length))];
      randomName = randomName.toLowerCase();
    } while (this.shownSprites.indexOf(randomName) !== -1);

    return randomName;
  }

  updateScore() {
    this.scorePanel.update([this.status.guessed, this.status.failed]);
  }

  updateTime() {
    // Calculate the remaining time and set the text accordingly
    let remainingTime = this.game.configuration.time;

    if (this.status.phase === RecognitionMainStageStatus.PHASES.DICE_SELECT) {
      // Don't update if not in select mode. Let the user breath a little.
      remainingTime = remainingTime - this.status.secondsElapsed + this.status.timeTakenByShow;
    }

    this.timePanel.update(
      remainingTime > 0
        ? this.getStandardGameText('time') + ': ' + Math.ceil(remainingTime)
        : this.getStandardGameText('timeIsUp')
    );
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
