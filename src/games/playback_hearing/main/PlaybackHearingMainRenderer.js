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
import {backgroundTiledImage, diceSelectFX, dockImage, frameImage, inputBox, speaker} from '../../../assets';
import {PlaybackHearingGameMetadata} from "../PlaybackHearingGameMetadata";

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
    this.successfulDices = Array();

    this.preloadImages();
    this.preloadAudios();

    this.loadImage('background', backgroundTiledImage);
    this.loadImage('dock', dockImage);
    this.loadImage('frame', frameImage);
    this.loadImage('speaker', speaker);
    this.loadImage('inputBox', inputBox);
    this.loadAudio('diceSelectFX', diceSelectFX);
  }

  create() {
    // Add Stimulus
    this.status.stimulus = this.game.configuration.parameterValues.diceFace;

    // Add sounds
    this.diceSelectSound = this.load.audio('diceSelectFX', diceSelectFX);

    // Add background image
    this.add.tileSprite(0, 0, this.worldWidth * 4, this.worldHeight * 4, 'background');

    // Add time frame image
    this.timeFrameSprite = this.add.sprite(0, 0, 'frame');
    this.timeFrameSprite.setOrigin(0, 0.5);
    this.timeFrameSprite.x = this.configuration.pixelOffsets.frameX;
    this.timeFrameSprite.y = this.timeFrameSprite.height / 2 + this.configuration.pixelOffsets.frameY;

    // Add score frame image
    this.scoreFrameSprite = this.add.sprite(0, 0, 'frame');
    this.scoreFrameSprite.setOrigin(1, 0.5);
    this.scoreFrameSprite.x = this.worldWidth - this.configuration.pixelOffsets.frameX;
    this.scoreFrameSprite.y = this.scoreFrameSprite.height / 2 + this.configuration.pixelOffsets.frameY;

    // Add time text
    this.timeText = this.add.text(0, 0,
      this._i18n.text('game.standard.time') + ': ' + this.game.configuration.time,
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

    //Calculate automatic dice scale
    let calcSprite = this.add.sprite(0, 0, this.getRandomStimulusSpriteName());
    calcSprite.width = Math.min(this.worldWidth, this.worldHeight) / 7;
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
    // Calculate the remaining time and set the text accordingly
    let remainingTime = this.game.configuration.time;

    if (this.status.phase === PlaybackHearingMainStageStatus.PHASES.DICE_WRITING) {
      // Don't update if not in writing mode. Let the user breath a little.
      remainingTime = remainingTime - this.status.secondsElapsed + this.status.timeTakenByShow;
    }

    this.timeText.setText(
      remainingTime > 0
        ? this.getStandardGameText('time') + ': ' + Math.ceil(remainingTime)
        : this.getStandardGameText('timeIsUp')
    );

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
          this.drawResultsDock();
          this.drawResultInput();
          this.showGamePanels();

          // Add keyboard input event
          this.input.keyboard.on('keydown', this.onKeyBoardEvent.bind(this));
        }
      }
    }
  }

  onKeyBoardEvent(event) {
    if (event.keyCode === this.keyCodes.BACKSPACE && this.textEntry.text.length > 0) {
      this.textEntry.text = this.textEntry.text.substr(0, this.textEntry.text.length - 1);
    } else if (event.keyCode >= this.keyCodes.ZERO && event.keyCode <= this.keyCodes.NINE && this.textEntry.text.length < 12) {
      this.textEntry.text += event.key;
    } else if (event.keyCode >= this.keyCodes.A && event.keyCode <= this.keyCodes.Z && this.textEntry.text.length < 12) {
      this.textEntry.text += event.key;
    } else if (event.keyCode >= this.keyCodes.NUMPAD_ZERO && event.keyCode <= this.keyCodes.NUMPAD_NINE && this.textEntry.text.length < 12) {
      this.textEntry.text += event.key;
    } else if (event.keyCode === this.keyCodes.ENTER && this.textEntry.text.length > 0) {
      this.sound.play('diceSelectFX', this.diceSelectSound);
      let next = this.soundsHearing[0];
      if (this.textEntry.text.trim().toUpperCase() === next.split('-').reverse()[0].toUpperCase()) {
        this.soundsHearing.splice(this.soundsHearing.indexOf(next), 1);
        this.successfulDices.push(next);
        this.drawSuccessfulDice(next);
        this.status.increaseGuessed();
      } else {
        this.status.increaseFailed();
      }
      this.textEntry.text = '';
    }
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
    this.scoreText.text = String(this.status.guessed) + ' / ' + String(this.status.failed);
    this.scoreText.setColor(this.configuration.colors.scoreGuessed, 0);
    this.scoreText.setColor(this.configuration.colors.scoreSeparator, this.scoreText.text.indexOf('/'));
    this.scoreText.setColor(this.configuration.colors.scoreFailed, this.scoreText.text.indexOf('/') + 1);
    this.scoreText.setColor(this.configuration.colors.scoreSeparator);
  }

  drawResultInput() {
    // Input introduction
    this.textLabel = this.add.text(this.worldWidth / 2, (this.worldHeight / 2) - 50,
      this.getStandardGameText('response'), this.configuration.textStyles.responseLabel);
    this.textLabel.setOrigin(0.5, 0.5);

    this.textEntrySprite = this.add.sprite(this.textLabel.x, this.textLabel.y + 50, 'inputBox');
    this.textEntrySprite.setScale(0.4, 0.3);
    this.textEntrySprite.setOrigin(0.5, 0.5);

    this.textEntry = this.add.text(this.textLabel.x, this.textLabel.y + 50, '', this.configuration.textStyles.responseInput);
    this.textEntry.setOrigin(0.5, 0.5);
  }

  drawResultsDock() {
    // Add dock sprite
    this.dockSprite = this.add.sprite(0, 0, 'dock');
    this.dockSprite.setOrigin(0.5, 0.5);
    this.dockSprite.x = this.worldWidth / 2;
    this.dockSprite.y = this.calculateCenteredY(this.dockSprite.height);
  }

  drawSuccessfulDice(selectedElement) {
    const leftOffset = this.dockSprite.x - (this.dockSprite.width / 2) + 45;
    const innerSeparation = 5;
    const currentSprite = this.add.sprite(0, 0, selectedElement);

    currentSprite.setOrigin(0.5, 0.5);
    currentSprite.setScale(this.configuration.diceScales.result);
    currentSprite.x = this.textEntrySprite.x;
    currentSprite.y = this.textEntrySprite.y;

    // Needed to support tween
    currentSprite.finalX = currentSprite.x;
    currentSprite.finalY = currentSprite.y;

    this.tweens.add({
      targets: currentSprite,
      x: (currentSprite.displayWidth + innerSeparation) * this.successfulDices.length + leftOffset,
      y: this.dockSprite.y + 10,
      duration: 100
    });
  }

  playAudioDice(diceFace) {
    let selectedSound = diceFace + '-audio';
    this.sound.play(selectedSound, {
      name: selectedSound,
      config: {}
    });
  }

  hideGamePanels() {
    this.timeFrameSprite.setAlpha(0);
    this.timeText.setVisible(false);
    this.scoreFrameSprite.setAlpha(0);
    this.scoreText.setVisible(false);
  }

  showGamePanels() {
    if (this.game.configuration.timerVisible) {
      this.timeFrameSprite.setAlpha(1);
      this.timeText.setVisible(true);
    }
    this.scoreFrameSprite.setAlpha(1);
    this.scoreText.setVisible(true);
  }

}
