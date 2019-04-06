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

import {StageRenderer} from '../../stage';
import {PlaybackHearingMainStageStatus} from './PlaybackHearingMainStageStatus';
import {backgroundTiledImage, diceSelectFX, dockImage, frameImage} from '../../../assets';
import {PlaybackHearingGameMetadata} from "../PlaybackHearingGameMetadata";
import {speaker} from "../../../assets/image/game/playback_hearing";

export class PlaybackHearingMainRenderer extends StageRenderer {

  constructor(configuration, status) {
    // check types
    super(configuration, status);
  }

  preload() {
    // Prevents game from pausing when browser loses focus
    this.game.scene.disableVisibilityChange = true;

    this.currentSoundHearing = null;
    this.lastSoundHearing = null;
    this.soundsHearing = Array();
    this.selectedSprites = Array();
    this.soundsHearingToSelect = Array();

    this.preloadImages();
    this.preloadAudios();

    this.loadImage('background', backgroundTiledImage);
    this.loadImage('dock', dockImage);
    this.loadImage('frame', frameImage);
    this.loadImage('speaker', speaker);
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

    if (!this.game.configuration.timerVisible) {
      this.hideSprite(this.timeFrameSprite);
      this.timeText.setVisible(false);
    }

    this.status.start();
  }

  update() {
    // Calculate the remaining time and set the text accordingly
    let remainingTime = this.game.configuration.time;

    if (this.status.phase === PlaybackHearingMainStageStatus.PHASES.DICE_SELECT) {
      // Don't update if not in select mode. Let the user breath a little.
      remainingTime = remainingTime - this.status.secondsElapsed + this.status.timeTakenByShow;
    }

    this.timeText.setText(
      remainingTime > 0
        ? this.getStandardGameText('time') + ': ' + Math.ceil(remainingTime)
        : this.getStandardGameText('timeIsUp')
    );

    this.updateScore();

    if (!this.status.isRunning()) {
      //  Ensure elements are not clickable
      this.soundsHearingToSelect.forEach(element => {
        element.input.enabled = false;
      });
    } else {
      // Execute the current phase of the game.
      if (this.status.phase === PlaybackHearingMainStageStatus.PHASES.DICE_HEARING && this.status.currentDiceIteration < this.game.configuration.parameterValues.numberOfElements) {
        this.diceHearingPhaseUpdate();
      } else if (this.status.phase === PlaybackHearingMainStageStatus.PHASES.DICE_SELECT) {
        this.diceSelectPhaseUpdate();
      }
    }
  }

  diceHearingPhaseUpdate() {
    if (!this.status.isShowingDice) {
      let spriteName = this.getRandomStimulusSpriteNameWithoutDuplicates();
      this.lastSoundHearing = spriteName;

      this.soundsHearing.push(spriteName);
      this.currentSoundHearing = this.add.sprite(this.worldWidth / 2, this.worldHeight / 2, 'speaker');
      this.currentSoundHearing.setScale(this.diceScaleShown, this.diceScaleShown);
      this.currentSoundHearing.setOrigin(0.5, 0.5);
      this.currentSoundHearing.alpha = 0;

      this.playAudioDice(spriteName);

      this.tweens.add({
        targets: this.currentSoundHearing,
        duration: 500,
        alpha: 1
      });

      this.dice_show_timestamp = Date.now();
      this.status.isShowingDice = true;
    } else {
      // Check if its moment to hide the dice
      if (Date.now() > this.dice_show_timestamp + (this.game.configuration.parameterValues.timeBetweenElements * 1000)) {
        if (this.currentSoundHearing !== null) {
          this.tweens.add({
            targets: this.currentSoundHearing,
            duration: 200,
            alpha: 0
          });
        }

        this.status.isShowingDice = false;
        this.status.currentDiceIteration++;

        if (this.status.currentDiceIteration === this.game.configuration.parameterValues.numberOfElements) {
          if (this.game.configuration.responseIntroduction === PlaybackHearingGameMetadata.RESPONSE_TYPES[1]) {
            this.soundsHearing.reverse();
          }
          this.status.phase = PlaybackHearingMainStageStatus.PHASES.DICE_SELECT;
          this.status._startCountdown();
          this.status.timeTakenByShow = this.status.secondsElapsed;
          this.drawResultsDock();
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
        this.soundsHearingToSelect.push(currentSprite);
      }
      this.status.dicesToSelectShown = true;
    }
  }

  onDiceClick(clickedSprite) {
    this.sound.play('diceSelectFX', this.diceSelectSound);
    if (this.soundsHearing[0] === clickedSprite.texture.key) {
      this.soundsHearing.splice(this.soundsHearing.indexOf(clickedSprite.texture.key), 1);
      this.soundsHearingToSelect.splice(this.soundsHearingToSelect.indexOf(clickedSprite), 1);
      this.selectedSprites.push(clickedSprite.texture.key);
      this.drawSelectedDice(clickedSprite.texture.key);
      this.status.increaseGuessed();
      this.shuffleDices();
      clickedSprite.destroy();
    } else {
      this.hideSprite(clickedSprite);
      this.status.increaseFailed();
    }
  }

  isLetterColliding(x, y) {
    let tempSprite = this.add.sprite(0, 0, this.getRandomStimulusSpriteName());
    tempSprite.setScale(this.diceScale, this.diceScale);
    let spriteWidth = tempSprite.displayWidth;
    tempSprite.destroy();

    let minimumSeparation = Math.sqrt(Math.pow(spriteWidth, 2) + Math.pow(spriteWidth / 2, 2)) + spriteWidth / 10;

    return this.soundsHearingToSelect.some(element =>
      this.calculateDistance(x, y, element.finalX, element.finalY) < minimumSeparation
    );
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

  drawResultsDock() {
    // Add dock sprite
    this.dockSprite = this.add.sprite(0, 0, 'dock');
    this.dockSprite.setOrigin(0.5, 0.5);
    this.dockSprite.x = this.worldWidth / 2;
    this.dockSprite.y = this.calculateCenteredY(this.dockSprite.height);
  }

  drawSelectedDice(selectedElement) {
    const leftOffset = this.dockSprite.x - (this.dockSprite.width / 2) + 45;
    const innerSeparation = 5;
    const currentSprite = this.add.sprite(0, 0, selectedElement);

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

  shuffleDices() {
    let randomCoords;

    for (let i = 0, len = this.soundsHearingToSelect.length; i < len; i++) {
      do {
        randomCoords = this.getRandomScrambleCoords();
      } while (this.isLetterColliding(randomCoords[0], randomCoords[1]));

      this.soundsHearingToSelect[i].finalX = randomCoords[0];
      this.soundsHearingToSelect[i].finalY = randomCoords[1];

      this.tweens.add({
        targets: this.soundsHearingToSelect[i],
        x: randomCoords[0],
        y: randomCoords[1],
        scaleX: this.configuration.diceScales.normal,
        scaleY: this.configuration.diceScales.normal,
        alpha: 1,
        duration: 100
      });
    }
  }

  playAudioDice(diceFace) {
    let selectedSound = diceFace + '-audio';
    this.sound.play(selectedSound, {
      name: selectedSound,
      config: {}
    });
  }
}
