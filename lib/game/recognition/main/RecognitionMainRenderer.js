/*
 * MultiTasking Cubes - Games
 * Copyright (C) 2017-2018 - Miguel Reboiro-Jato, Andrés Vieira Vázquez,
 * Adolfo Piñón Blanco, Hugo López-Fernández, Rosalía Laza Fidalgo,
 * Reyes Pavón Rial, Francisco Otero Lamas, Adrián Varela Pomar,
 * Carlos Spuch Calvar, and Tania Rivera Baltanás
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import StageRenderer from '../../StageRenderer';
import RecognitionMainStageStatus from './RecognitionMainStageStatus';
import Phaser from 'phaser-ce';

import backgroundImage from '../../../assets/image/game/scene/main/background-tiled.jpg';
import timeFrameImage from '../../../assets/image/game/scene/main/time-frame.png';
import scoreFrameImage from '../../../assets/image/game/scene/main/score-frame.png';
import diceSelectFX from '../../../assets/audio/fx/dice/dice_select.wav';
import MtcDiceFace from "../../../dice/MtcDiceFace";

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

        this.game.load.image("background", backgroundImage);
        this.game.load.image("time-frame", timeFrameImage);
        this.game.load.image("score-frame", scoreFrameImage);
        this.game.load.audio("diceSelectFX", diceSelectFX);
    }

    create() {
        // Add sounds
        this.game.diceSelectSound = this.game.add.audio("diceSelectFX");

        // Add background image
        this.game.backgroundSprite = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'background');

        // Add time frame image
        this.game.timeFrameSprite = this.game.add.sprite(0, 0, 'time-frame');
        this.game.timeFrameSprite.anchor.setTo(0, 0.5);
        this.game.timeFrameSprite.x = 0;
        this.game.timeFrameSprite.y = this.game.timeFrameSprite.height / 2;

        // Add score frame image
        this.game.scoreFrameSprite = this.game.add.sprite(0, 0, 'score-frame');
        this.game.scoreFrameSprite.anchor.setTo(1, 0.5);
        this.game.scoreFrameSprite.x = this.game.world.width;
        this.game.scoreFrameSprite.y = this.game.scoreFrameSprite.height / 2;

        // Add time text
        this.game.timeText = this.game.add.text(0, 0,
            this.game.i18n.text("game.standard.time") + ": " + this.game.configuration.time,
            {
                font: "24px Arial",
                fill: "#EEEEEE",
                align: "left"
            }
        );
        this.game.timeText.anchor.setTo(0.5, 0.5);
        this.game.timeText.x = this.game.timeFrameSprite.x + this.game.timeFrameSprite.width / 2;
        this.game.timeText.y = this.game.timeFrameSprite.y;

        // Add score text
        this.game.scoreText = this.game.add.text(0, 0,
            "0 / 0",
            {
                font: "24px Arial",
                fill: "#EEEEEE",
                align: "left"
            }
        );
        this.game.scoreText.anchor.setTo(0.5, 0.5);
        this.game.scoreText.x = this.game.scoreFrameSprite.x - this.game.scoreFrameSprite.width / 2;
        this.game.scoreText.y = this.game.scoreFrameSprite.y;

        //Calculate automatic dice scale
        let calcSprite = this.game.add.sprite(0, 0, this.getRandomStimulusSpriteName());
        calcSprite.width = Math.min(this.game.configuration.width, this.game.configuration.height) / 7;
        if (this.configuration.diceScale < 0) {
            this.diceScale = calcSprite.scale.x;
        } else {
            this.diceScale = this.configuration.diceScale;
        }
        if (this.configuration.diceScaleShown < 0) {
            this.diceScaleShown = calcSprite.scale.x * 3;
        } else {
            this.diceScaleShown = this.configuration.diceScaleShown;
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

        this.game.timeText.setText(
            remainingTime > 0 ? this.game.i18n.text("game.standard.time") + ": " + Math.ceil(remainingTime) : this.game.i18n.text("game.standard.timeIsUp")
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
                    this.status.startCountdown();
                    this.status.timeTakenByShow = this.status.secondsElapsed;
                }
            }
        }
    }

    diceSelectPhaseUpdate() {
        if (!this.status.dicesToSelectShown && this.status.isRunning()) {
            // Add dice sprites
            for (let i = 0, len = this.status.stimulus_values.length; i < len; i++) {
                const currentSprite = this.game.add.button(0, 0, this.status.stimulus + "-" + String(this.status.stimulus_values[i]).toLowerCase(), this.onDiceClick, this);
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
        } else {
            return;
        }

    }

    onDiceClick(clickedSprite) {
        this.game.diceSelectSound.play();
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
            randomName = this.status.stimulus + "-" + this.status.stimulus_values[Math.floor((Math.random() * this.status.stimulus_values.length))];
            randomName = randomName.toLowerCase();
        } while (randomName === this.lastShownSprite);

        return randomName;
    }

    updateScore() {
        this.game.scoreText.text = String(this.status.guessed) + " / " + String(this.status.failed);
        this.game.scoreText.addColor('#00FF00', 0);
        this.game.scoreText.addColor('#FFFFFF', this.game.scoreText.text.indexOf("/"));
        this.game.scoreText.addColor('#FF0000', this.game.scoreText.text.indexOf("/") + 1);
    }

}