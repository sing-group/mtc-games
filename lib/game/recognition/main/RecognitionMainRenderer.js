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

import Phaser from 'phaser-ce';

import StageRenderer from '../../stage/StageRenderer';
import RecognitionMainStageStatus from './RecognitionMainStageStatus';

import backgroundImage from '../../../assets/image/game/scene/main/background-tiled.jpg';
import frameImage from '../../../assets/image/game/scene/main/frame.png';

import diceSelectFX from '../../../assets/audio/fx/dice/dice_select.wav';

export default class RecognitionGameMainRenderer extends StageRenderer {

  constructor(configuration, status) {
    // check types
    super(configuration, status);
  }

  preload() {
    // Prevents game from pausing when browser loses focus
    this.game.stage.disableVisibilityChange = true;

    this.currentShowSprite = null;
    this.lastShownSprite = null;
    this.shownSprites = Array();
    this.shownSpritesToSelect = Array();

    this.preloadImages();

    this.game.load.image('background', backgroundImage);
    this.game.load.image('frame', frameImage);
    this.game.load.audio('diceSelectFX', diceSelectFX);
  }

  create() {
    // Add sounds
    this.diceSelectSound = this.game.add.audio('diceSelectFX');

    // Add background image
    this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'background');

    // Add time frame image
    this.timeFrameSprite = this.game.add.sprite(0, 0, 'frame');
    this.timeFrameSprite.anchor.setTo(0, 0.5);
    this.timeFrameSprite.x = this.configuration.pixelOffsets.frameX;
    this.timeFrameSprite.y = this.timeFrameSprite.height / 2 + this.configuration.pixelOffsets.frameY;

    // Add score frame image
    this.scoreFrameSprite = this.game.add.sprite(0, 0, 'frame');
    this.scoreFrameSprite.anchor.setTo(1, 0.5);
    this.scoreFrameSprite.x = this.game.world.width - this.configuration.pixelOffsets.frameX;
    this.scoreFrameSprite.y = this.scoreFrameSprite.height / 2 + this.configuration.pixelOffsets.frameY;

    // Add time text
    this.timeText = this.game.add.text(0, 0,
      this.game.i18n.text('game.standard.time') + ': ' + this.game.configuration.time,
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

    //Calculate automatic dice scale
    let calcSprite = this.game.add.sprite(0, 0, this.getRandomStimulusSpriteName());
    calcSprite.width = Math.min(this.game.configuration.width, this.game.configuration.height) / 7;
    if (this.configuration.diceScales.normal < 0) {
      this.diceScale = calcSprite.scale.x;
    } else {
      this.diceScale = this.configuration.diceScales.normal;
    }
    if (this.configuration.diceScales.shown < 0) {
      this.diceScaleShown = calcSprite.scale.x * 3;
    } else {
      this.diceScaleShown = this.configuration.diceScales.shown;
    }
    calcSprite.destroy();

    this.status.start();
  }

  update() {
    // Calculate the remaining time and set the text accordingly
    let remainingTime = this.game.configuration.time;

    if (this.status.phase === RecognitionMainStageStatus.PHASES.DICE_SELECT) {
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
      this.shownSpritesToSelect.forEach(element => {
        element.input.enabled = false;
      });
    } else {
      // Execute the current phase of the game.
      if (this.status.phase === RecognitionMainStageStatus.PHASES.DICE_SHOW && this.status.currentDiceIteration < this.game.configuration.numberOfElements) {
        this.diceShowPhaseUpdate();
      } else if (this.status.phase === RecognitionMainStageStatus.PHASES.DICE_SELECT) {
        this.diceSelectPhaseUpdate();
      }
    }
  }

  diceShowPhaseUpdate() {
    if (!this.status.isShowingDice) {
      let spriteName = this.getRandomStimulusSpriteName();
      this.lastShownSprite = spriteName;

      this.shownSprites.push(spriteName);
      this.currentShowSprite = this.game.add.sprite(this.game.world.width / 2, this.game.world.height / 2, spriteName);
      this.currentShowSprite.scale.setTo(this.diceScaleShown, this.diceScaleShown);
      this.currentShowSprite.anchor.setTo(0.5, 0.5);
      this.currentShowSprite.alpha = 0;
      this.game.add.tween(this.currentShowSprite).to({alpha: 1}, 500, Phaser.Easing.Linear.None, true, 0, 0, false);

      this.dice_show_timestamp = Date.now();
      this.status.isShowingDice = true;
    } else {
      // Check if its moment to hide the dice
      if (Date.now() > this.dice_show_timestamp + (this.game.configuration.timePerElement * 1000)) {

        if (this.currentShowSprite !== null) {
          this.game.add.tween(this.currentShowSprite).to({alpha: 0}, 200, Phaser.Easing.Linear.None, true, 0, 0, false);
        }

        this.status.isShowingDice = false;
        this.status.currentDiceIteration++;

        if (this.status.currentDiceIteration === this.game.configuration.numberOfElements) {
          this.status.phase = RecognitionMainStageStatus.PHASES.DICE_SELECT;
          this.status._startCountdown();
          this.status.timeTakenByShow = this.status.secondsElapsed;
        }
      }
    }
  }

  diceSelectPhaseUpdate() {
    if (!this.status.dicesToSelectShown && this.status.isRunning()) {
      // Add dice sprites
      for (let i = 0, len = this.status.stimulusValues.length; i < len; i++) {
        const currentSprite = this.game.add.button(0, 0, this.status.stimulus + '-' + String(this.status.stimulusValues[i]).toLowerCase(), this.onDiceClick, this);
        currentSprite.scale.setTo(this.diceScale, this.diceScale);
        currentSprite.anchor.setTo(0.5, 0.5);

        let randomCoords;

        do {
          randomCoords = this.getRandomScrambleCoords();
        } while (this.isLetterColliding(randomCoords[0], randomCoords[1]));

        currentSprite.x = randomCoords[0];
        currentSprite.y = randomCoords[1];

        currentSprite.inputEnabled = true;
        this.shownSpritesToSelect.push(currentSprite);
      }
      this.status.dicesToSelectShown = true;
    }
  }

  onDiceClick(clickedSprite) {
    this.diceSelectSound.play();
    if (this.shownSprites.indexOf(clickedSprite.key) !== -1) {
      this.shownSprites.splice(this.shownSprites.indexOf(clickedSprite.key), 1);
      clickedSprite.destroy();
      this.status.increaseGuessed();
    } else {
      clickedSprite.destroy();
      this.status.increaseFailed();
    }
  }

  isLetterColliding(x, y) {
    let tempSprite = this.game.add.sprite(0, 0, this.getRandomStimulusSpriteName());
    tempSprite.scale.setTo(this.diceScale, this.diceScale);
    let spriteWidth = tempSprite.width;
    tempSprite.destroy();

    let minimumSeparation = Math.sqrt(Math.pow(spriteWidth, 2) + Math.pow(spriteWidth / 2, 2)) + spriteWidth / 10;

    return this.shownSpritesToSelect.some(element =>
      this.calculateDistance(x, y, element.x, element.y) < minimumSeparation
    );
  }

  getRandomScrambleCoords() {
    const randX = Math.floor(Math.random() * (this.game.configuration.width - 75 - 75 + 1)) + 75;
    const randY = Math.floor(Math.random() * (this.game.configuration.height - 200 + 1)) + 100;

    return [randX, randY];
  }

  getRandomStimulusSpriteName() {
    let randomName = null;

    do {
      randomName = this.status.stimulus + '-' + this.status.stimulusValues[Math.floor((Math.random() * this.status.stimulusValues.length))];
      randomName = randomName.toLowerCase();
    } while (randomName === this.lastShownSprite);

    return randomName;
  }

  updateScore() {
    this.scoreText.text = String(this.status.guessed) + ' / ' + String(this.status.failed);
    this.scoreText.addColor(this.configuration.colors.scoreGuessed, 0);
    this.scoreText.addColor(this.configuration.colors.scoreSeparator, this.scoreText.text.indexOf('/'));
    this.scoreText.addColor(this.configuration.colors.scoreFailed, this.scoreText.text.indexOf('/') + 1);
  }

}
