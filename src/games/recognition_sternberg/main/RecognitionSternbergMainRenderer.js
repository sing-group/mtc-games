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
import {RecognitionSternbergMainStageStatus} from './RecognitionSternbergMainStageStatus';

import {
  backgroundTiledImage,
  cancelImage,
  confirmImage,
  cubeSlotImage,
  diceSelectFX,
  dockImage,
  frameImage
} from '../../../assets';
import {Countdown, GameScore, GameTime} from '../../../components';

export class RecognitionSternbergMainRenderer extends StageRenderer {

  constructor(configuration, status) {
    // check types
    super(configuration, status);
  }

  preload() {
    // Prevents game from pausing when browser loses focus
    this.game.scene.disableVisibilityChange = true;

    this.currentShowSprite = null;
    this.currentShowCandidate = null;
    this.lastShownSprite = null;
    this.shownSprites = Array();
    this.shownCandidates = Array();
    this.shownSpritesToSelect = Array();
    this.candidateDices = Array();
    this.selectedSprites = Array();

    this.falsePositive = false;
    this.isValidSelection = false;
    this.clickedSprite = null;
    this.selectionConfirmation = null;

    this.preloadImages();

    this.loadImage('background', backgroundTiledImage);
    this.loadImage('cube-slot', cubeSlotImage);
    this.loadImage('dock', dockImage);
    this.loadImage('frame', frameImage);
    this.loadImage('confirm', confirmImage);
    this.loadImage('cancel', cancelImage);
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
    if (this.configuration.diceScales.shown < 0) {
      this.diceScaleShown = calcSprite.scaleX * 3;
    } else {
      this.diceScaleShown = this.configuration.diceScales.shown;
    }
    calcSprite.destroy();

    this.countdown = new Countdown(this.worldWidth / 2, this.worldHeight / 2, this._i18n.text('game.standard.countdownToStart'),
      3, this.configuration.textStyles.countdownToStartText, this.configuration.textStyles.countdownToStartTime, this.startSelectDicePhase, this);

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
      if (this.status.phase === RecognitionSternbergMainStageStatus.PHASES.DICE_SHOW && this.status.currentDiceIteration < this.game.configuration.parameterValues.numberOfElements) {
        this.diceShowPhaseUpdate();
      } else if (this.status.phase === RecognitionSternbergMainStageStatus.PHASES.DICE_SELECT) {
        this.candidateSelectPhaseUpdate();
      } else if (this.status.phase === RecognitionSternbergMainStageStatus.PHASES.COUNTDOWN_TO_START) {
        this.updateCountdownPhase();
      } else if (this.status.phase === RecognitionSternbergMainStageStatus.PHASES.DICE_RESULT) {
        this.selectionResultDrawPhase()
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
          this.status.phase = RecognitionSternbergMainStageStatus.PHASES.COUNTDOWN_TO_START;
          this.countdown.start();
        }
      }
    }
  }

  candidateSelectPhaseUpdate() {
    if (!this.status.isShowingCandidate) {
      let spriteName = this.getCandidateToShow();
      this.currentShowCandidate = this.add.sprite(this.worldWidth / 2, this.worldHeight / 2, spriteName);
      this.currentShowCandidate.setScale(this.diceScaleShown, this.diceScaleShown);
      this.currentShowCandidate.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, this.onDiceClick.bind(this, this.currentShowCandidate));
      this.currentShowCandidate.setOrigin(0.5, 0.5);
      this.currentShowCandidate.alpha = 0;

      this.checkShowingCandidate(spriteName);

      this.tweens.add({
        targets: this.currentShowCandidate,
        duration: 300,
        alpha: 1,
        onComplete: (event, arraySprites) => {
          arraySprites[0].setInteractive();
        }
      });

      this.candidateShowTimestamp = Date.now();
      this.status.isShowingCandidate = true;
    } else {
      if (Date.now() > this.candidateShowTimestamp + (this.game.configuration.parameterValues.timePerCandidate * 1000)) {
        if (this.currentShowCandidate !== null) {
          this.tweens.add({
            targets: this.currentShowCandidate,
            duration: 200,
            alpha: 0
          });
          if (this.checkFalsePositive(this.currentShowCandidate.texture.key)) {
            this.status.increaseFalsePositives();
            this.falsePositive = false;
          }
        }
        this.status.isShowingCandidate = false;
      }
    }
  }

  updateCountdownPhase() {
    if (this.countdown) {
      this.countdown.update();
    }
  }

  selectionResultDrawPhase() {
    let sprite = this.isValidSelection ? 'confirm' : 'cancel';
    if (!this.status.isShowingValidation) {
      this.status.isShowingValidation = true;
      this.selectionConfirmation = this.add.sprite(this.worldWidth / 2, this.worldHeight / 2, sprite);
      this.selectionConfirmation.setOrigin(0.5, 0.5);
      this.selectionConfirmation.alpha = 0;

      this.tweens.add({
        targets: this.selectionConfirmation,
        duration: 300,
        alpha: 1
      });

      this.validationSimestamp = Date.now();
    } else {
      if (Date.now() > this.validationSimestamp + (1000)) {
        if (this.selectionConfirmation !== null) {
          this.tweens.add({
            targets: this.selectionConfirmation,
            duration: 200,
            alpha: 0
          });
        }
        this.selectionConfirmation.destroy();
        this.updateSelectionResult();
        this.status.phase = RecognitionSternbergMainStageStatus.PHASES.DICE_SELECT;
        this.status.isShowingValidation = false;
      }
    }
  }

  startSelectDicePhase() {
    this.countdown.destroy();
    this.status.phase = RecognitionSternbergMainStageStatus.PHASES.DICE_SELECT;
    this.status.timeTakenByShow = this.status.secondsElapsed;
    this.status._startCountdown();
    this.drawResultsDock();
    this.showGamePanels();
    this.generateCandidateDices();
    this.generateCandidatesOrderToSelect();
  }

  onDiceClick(clickedSprite) {
    this.currentShowCandidate.disableInteractive();
    this.sound.play('diceSelectFX', this.diceSelectSound);
    let key = clickedSprite.texture.key;
    clickedSprite.alpha = 0;
    this.clickedSprite = clickedSprite;
    this.isValidSelection = this.checkSelectedCandidate(key);
    this.status.phase = RecognitionSternbergMainStageStatus.PHASES.DICE_RESULT;
  }

  updateSelectionResult() {
    if (this.isValidSelection) {
      this.candidateDices.splice(this.candidateDices.indexOf(this.clickedSprite.texture.key), 1);
      this.selectedSprites.push(this.clickedSprite.texture.key);
      this.drawSelectedCandidate(this.clickedSprite.texture.key);
      this.status.increaseGuessed();
      this.clickedSprite.destroy();
    } else {
      this.status.increaseFailed();
    }
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

    if (this.status.phase === RecognitionSternbergMainStageStatus.PHASES.DICE_SELECT) {
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
    // Add dock sprite
    this.dockSprite = this.add.sprite(0, 0, 'dock');
    this.dockSprite.setOrigin(0.5, 0.5);
    this.dockSprite.x = this.worldWidth / 2;
    this.dockSprite.y = this.calculateCenteredY(this.dockSprite.height);
  }

  drawSelectedCandidate(selectedCandidate) {
    const leftOffset = this.dockSprite.x - (this.dockSprite.width / 2) + 45;
    const innerSeparation = 5;
    const currentSprite = this.add.sprite(0, 0, selectedCandidate);

    currentSprite.setOrigin(0.5, 0.5);
    currentSprite.setScale(this.configuration.diceScales.result);
    currentSprite.x = this.game.input.mousePointer.position.x;
    currentSprite.y = this.game.input.mousePointer.position.y;

    // Needed to support tween
    currentSprite.finalX = currentSprite.x;
    currentSprite.finalY = currentSprite.y;

    this.tweens.add({
      targets: currentSprite,
      x: (currentSprite.displayWidth + innerSeparation) * this.selectedSprites.length + leftOffset,
      y: this.dockSprite.y + 10,
      duration: 100
    });
  }

  generateCandidateDices() {
    this.candidateDices = this.status.stimulusValues.map(value => {
      return this.status.stimulus + '-' + value;
    });
  }

  generateCandidatesOrderToSelect() {
    const responseIntroductionType = this.game.configuration.parameterValues.responseIntroduction.split('.').reverse()[0];
    this.shownSpritesToSelect = this.shownSprites.map(sprite => {
      return sprite;
    });
    switch (responseIntroductionType) {
      case 'direct':
      case 'random':
        // Do nothing
        break;
      case 'inverse':
        this.shownSpritesToSelect.reverse();
        break;
    }
  }

  getCandidateToShow() {
    let candidate = null;
    let index = null;
    const candidateShownType = this.game.configuration.parameterValues.candidateShown.split('.').reverse()[0];
    switch (candidateShownType) {
      case 'direct':
        candidate = this.candidateDices.shift();
        this.candidateDices.push(candidate);
        break;
      case 'inverse':
        candidate = this.candidateDices.pop();
        this.candidateDices.unshift(candidate);
        break;
      case 'random':
        this.shownCandidates = this.shownCandidates.length === this.candidateDices.length ? Array() : this.shownCandidates;
        do {
          index = Math.floor(Math.random() * this.candidateDices.length);
          candidate = this.candidateDices[index];
        } while (this.shownCandidates.indexOf(candidate) !== -1);
        this.shownCandidates.push(candidate);
        break;
    }

    return candidate;
  }

  checkSelectedCandidate(selectedCandidateSprite) {
    const responseIntroductionType = this.game.configuration.parameterValues.responseIntroduction.split('.').reverse()[0];
    switch (responseIntroductionType) {
      case 'direct':
      case 'inverse':
        return this.shownSpritesToSelect[this.selectedSprites.length] === selectedCandidateSprite;
      case 'random':
        return this.shownSpritesToSelect.indexOf(selectedCandidateSprite) !== -1;
    }
  }

  checkShowingCandidate(showingCandidate) {
    this.falsePositive = this.shownSpritesToSelect.indexOf(showingCandidate) !== -1;
  }

  checkFalsePositive(showingCandidate) {
    let currentStatus = this.falsePositive && this.candidateDices.indexOf(this.currentShowCandidate.texture.key) !== -1;
    return currentStatus && this.checkSelectedCandidate(showingCandidate);
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
