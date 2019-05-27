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
import {PlaybackHearingMainStageStatus} from './PlaybackHearingMainStageStatus';
import {backgroundTiledImage, cancelImage, confirmImage, frameImage, speaker, unrecognized} from '../../../assets';
import {PlaybackHearingGameMetadata} from '../PlaybackHearingGameMetadata';
import {GameButton, GameInputGrid, GameScore, GameTime} from '../../../components';

export class PlaybackHearingMainRenderer extends StageRenderer {

  constructor(configuration, status) {
    // check types
    super(configuration, status);
  }

  preload() {
    // Prevents game from pausing when browser loses focus
    this.game.scene.disableVisibilityChange = true;
    this.sound.pauseOnBlur = false;

    this.keyCodes = Phaser.Input.Keyboard.KeyCodes;

    this.speakerSprite = null;
    this.lastSoundHearing = null;
    this.soundsHearing = Array();
    this.changeSpriteEvent = null;

    this.preloadImages();
    this.preloadAudios();

    this.loadImage('background', backgroundTiledImage);
    this.loadImage('frame', frameImage);
    this.loadImage('speaker', speaker);
    this.loadImage('unrecognized', unrecognized);
    this.loadImage('confirm', confirmImage);
    this.loadImage('cancel', cancelImage);
  }

  create() {
    // Add Stimulus
    this.status.stimulus = this.game.configuration.parameterValues.diceFace;

    // Add background image
    this.add.tileSprite(0, 0, this.worldWidth * 4, this.worldHeight * 4, 'background');

    this.scorePanel = new GameScore(this.worldWidth - this.configuration.pixelOffsets.frameX, this.configuration.pixelOffsets.frameY,
      'frame', [0, 0], [this.configuration.textStyles.scoreGuessed, this.configuration.textStyles.scoreFailed], this);

    this.timePanel = new GameTime(this.configuration.pixelOffsets.frameX, this.configuration.pixelOffsets.frameY,
      'frame', this.getStandardGameText('time') + ': ' + this.game.configuration.time, this.configuration.textStyles.inGameTime, this);

    this.inputElements = new GameInputGrid(this.game.configuration.parameterValues.numberOfElements, 175, 30, 'unrecognized', null, null, this);

    this.checkButton = new GameButton(this.worldHorizontalMiddle, this.worldHeight - 40, 200, 40, this.getText('game.playbackHearing.checkBtn'), this.checkResponse, this, null, null);

    this._calculateDiceScale();
    this._hideGamePanels();
    this._startGame();
  }

  update() {

    this.updateTime();
    this.updateScore();

    // Execute the current phase of the game.
    if (this.status.phase === PlaybackHearingMainStageStatus.PHASES.DICE_HEARING && this.status.currentDiceIteration < this.game.configuration.parameterValues.numberOfElements) {
      this.diceHearingPhaseUpdate();
    }
  }

  diceHearingPhaseUpdate() {
    if (!this.status.isHearingDice) {
      let spriteName = this.getRandomStimulusSpriteNameWithoutDuplicates();
      this.lastSoundHearing = spriteName;
      this.soundsHearing.push(spriteName);
      this.speakerSprite = this.add.sprite(this.worldWidth / 2, this.worldHeight / 2, 'speaker');
      this.speakerSprite.setScale(this.diceScaleShown, this.diceScaleShown);
      this.speakerSprite.setOrigin(0.5, 0.5);
      this.speakerSprite.alpha = 0;

      this.playAudioDice(spriteName);

      this.tweens.add({
        targets: this.speakerSprite,
        duration: 500,
        alpha: 1
      });

      this.dice_show_timestamp = Date.now();
      this.status.isHearingDice = true;
    } else {
      if (Date.now() > this.dice_show_timestamp + (this.game.configuration.parameterValues.timeBetweenElements * 1000)) {
        if (this.speakerSprite !== null) {
          this.tweens.add({
            targets: this.speakerSprite,
            duration: 200,
            alpha: 0
          });
        }

        this.status.isHearingDice = false;
        this.status.currentDiceIteration++;

        if (this.status.currentDiceIteration === this.game.configuration.parameterValues.numberOfElements) {
          if (this.game.configuration.responseIntroduction === PlaybackHearingGameMetadata.RESPONSE_TYPES[1]) {
            this.soundsHearing.reverse();
          }
          this.status.phase = PlaybackHearingMainStageStatus.PHASES.DICE_WRITING;
          this.status.timeTakenByShow = this.status.secondsElapsed;
          this.status._startCountdown();
          this._showGamePanels();
          this.inputElements.changeFocus(0);

          // Add keyboard input event
          this.input.keyboard.on('keydown', this.onKeyBoardEvent.bind(this));
        }
      }
    }
  }

  onKeyBoardEvent(event) {
    event.preventDefault();
    event.stopPropagation();

    let currentFocusPosition = this.inputElements.getFocusedElementPosition();

    if (currentFocusPosition !== null) {

      let currentText = this.inputElements.getText() || '';
      let hasText = currentText.length > 0;
      let canWrite = currentText.length <= 8;
      let isBackSpace = event.keyCode === this.keyCodes.BACKSPACE;
      let isTab = event.keyCode === this.keyCodes.TAB;
      let isNumeric = event.keyCode >= this.keyCodes.ZERO && event.keyCode <= this.keyCodes.NINE;
      let isNumpad = event.keyCode >= this.keyCodes.NUMPAD_ZERO && event.keyCode <= this.keyCodes.NUMPAD_NINE;
      let isLetter = event.keyCode >= this.keyCodes.A && event.keyCode <= this.keyCodes.Z;

      if (isBackSpace && hasText) {
        this._changeSprite();
        this.inputElements.setText(currentText.substr(0, currentText.length - 1));
      } else if ((isNumeric || isLetter || isNumpad) && canWrite) {
        this._changeSprite();
        this.inputElements.setText(currentText + event.key.toUpperCase());
      } else if (isTab) {
        let nextFocusPosition = (currentFocusPosition + 1 < this.inputElements.getValues().length) ? currentFocusPosition + 1 : 0;
        this.inputElements.changeFocus(nextFocusPosition);
      }
    }
  }

  _changeSprite() {
    if (this.changeSpriteEvent) {
      this.changeSpriteEvent.remove(false);
    }
    this.changeSpriteEvent = this.time.addEvent({
      delay: 100, callback: this.doChange, callbackScope: this, loop: false
    });
  }

  doChange() {
    let existentDice = false;
    let stimulus = this.status.stimulus + '-' + this.inputElements.getText().toLowerCase();
    this.status.stimulusValues.forEach((value) => {
      let val = (typeof value === 'string') ? value.toLowerCase() : value;
      if (this.status.stimulus + '-' + val === stimulus) {
        existentDice = true;
      }
    });
    let position = this.inputElements.getFocusedElementPosition();
    if (position !== -1) {
      this.inputElements.changeSprite(position, existentDice ? stimulus : 'unrecognized', 0.1);
    }
  }

  checkResponse() {
    this.checkButton.disable();
    this.inputElements.disable();
    let values = this.inputElements.getValues();
    this.soundsHearing.forEach((value, index) => {
      let response = values[index].trim().toUpperCase();
      let input = value.split('-').reverse()[0].toUpperCase();
      if (response === input) {
        this.inputElements.changeSprite(index, 'confirm', 0.3);
        this.status.increaseGuessed();
      } else {
        this.inputElements.changeSprite(index, 'cancel', 0.3);
        this.status.increaseFailed();
      }
    });
    this.time.addEvent({
      delay: 1000, callback: this._endGame, callbackScope: this, loop: false
    });
  }

  getRandomStimulusSpriteNameWithoutDuplicates() {
    let randomName = null;

    do {
      randomName = this.status.stimulus + '-' + this.status.stimulusValues[Math.floor((Math.random() * this.status.stimulusValues.length))];
      randomName = randomName.toLowerCase();
    } while (this.soundsHearing.indexOf(randomName) !== -1);

    return randomName;
  }

  getRandomStimulusSpriteName() {
    let randomName = null;

    do {
      randomName = this.status.stimulus + '-' + this.status.stimulusValues[Math.floor((Math.random() * this.status.stimulusValues.length))];
      randomName = randomName.toLowerCase();
    } while (randomName === this.lastSoundHearing);

    return randomName;
  }

  updateScore() {
    this.scorePanel.update([this.status.guessed, this.status.failed]);
  }

  updateTime() {
    // Calculate the remaining time and set the text accordingly
    let remainingTime = this.game.configuration.time;

    if (this.status.phase === PlaybackHearingMainStageStatus.PHASES.DICE_WRITING) {
      // Don't update if not in writing mode. Let the user breath a little.
      remainingTime = remainingTime - this.status.secondsElapsed + this.status.timeTakenByShow;
    }

    this.timePanel.update(
      remainingTime > 0
        ? this.getStandardGameText('time') + ': ' + Math.ceil(remainingTime)
        : this.getStandardGameText('timeIsUp')
    );
  }

  playAudioDice(diceFace) {
    let selectedSound = diceFace + '-audio';
    this.sound.play(selectedSound, {
      name: selectedSound,
      config: {}
    });
  }

  /**
   * Hide all the game panels
   * @private
   */
  _hideGamePanels() {
    this.scorePanel.hide();
    this.timePanel.hide();
    this.inputElements.hide();
    this.checkButton.hide();
  }

  /**
   * Show all the game panels
   * @private
   */
  _showGamePanels() {
    if (this.game.configuration.timerVisible) {
      this.timePanel.show();
    }
    this.scorePanel.show();
    this.inputElements.show();
    this.checkButton.show();
  }

  /**
   * Calculates the dice scale
   * @private
   */
  _calculateDiceScale() {
    let calcSprite = this.add.sprite(0, 0, this.getRandomStimulusSpriteName());
    calcSprite.width = Math.min(this.worldWidth, this.worldHeight) / 7;
    if (this.configuration.diceScales.shown < 0) {
      this.diceScaleShown = calcSprite.scaleX * 3;
    } else {
      this.diceScaleShown = this.configuration.diceScales.shown;
    }
    calcSprite.destroy();
  }

  _startGame() {
    this.status.start();
  }

  _endGame() {
    this.status.finishGame();
  }
}
