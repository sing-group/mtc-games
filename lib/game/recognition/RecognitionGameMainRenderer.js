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

import Game from '../Game.js';
import GameRenderer from '../GameRenderer.js';
import RecognitionGame from './RecognitionGame';
import RecognitionStatus from './RecognitionStatus';
import MtcDiceFace from '../../dice/MtcDiceFace';

import backgroundImage from '../../assets/image/game/scene/main/background-tiled.jpg';
import timeFrameImage from '../../assets/image/game/scene/main/time-frame.png';
import scoreFrameImage from '../../assets/image/game/scene/main/score-frame.png';
import GameStatus from '../GameStatus.js';

export default class RecognitionGameMainRenderer extends GameRenderer {

    constructor() {
        super();
    }

    preload() {
        // Prevents game from pausing when browser loses focus
        this.game.stage.disableVisibilityChange = true;

        // Ensure all images are loaded
        super.preload_load_images();

        this.currentShowSprite = null;
        this.lastShownSprite = null;
        this.shownSprites = Array();
        this.shownSpritesToSelect = Array();

        this.game.load.image("background", backgroundImage);
        this.game.load.image("time-frame", timeFrameImage);
        this.game.load.image("score-frame", scoreFrameImage);
    }

    create() {
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
            this.game.i18n.text("game.standard.time") + ": " + this.game.status.config.time,
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

        //Throw a call to the game-start function
        if (this.game.status.gameMode === GameStatus.GAME_MODES.NORMAL) {
            this.game.status.config.gameCallback.gameStarted();
        }
        this.gameRunning = true;
    }

    update() {
        if (!this.game.status.gameRunning) {
            return;
        }

        // Calculate the remaining time and set the text accordingly
        let remainingTime = this.game.status.config.time;

        if (this.game.status.phase === RecognitionStatus.PHASES.DICE_SELECT) {
            // Don't update if not in select mode. Let the user breath a little.
            remainingTime = remainingTime - this.game.elapsedTime() + this.game.status.timeTakenByShow;
        }

        this.game.timeText.setText(
            remainingTime > 0 ? this.game.i18n.text("game.standard.time") + ": " + Math.ceil(remainingTime) : this.game.i18n.text("game.standard.timeIsUp")
        );
        this.updateScore();

        // Execute the current phase of the game.
        if (this.game.status.phase === RecognitionStatus.PHASES.DICE_SHOW && this.game.status.currentDiceIteration < this.game.status.config.numberOfElements) {
            this.diceShowPhaseUpdate();
        } else if (this.game.status.phase === RecognitionStatus.PHASES.DICE_SELECT) {
            this.diceSelectPhaseUpdate();
        }

        if ((remainingTime <= 0 && this.game.status.gameRunning) || this.game.status.gameCompleted) {
            this.disableGame();
            this.onGameEndCallback();
            this.game.status.gameRunning = false;
        }
    }

    diceShowPhaseUpdate() {

        if (!this.game.status.isShowingDice) {
            
            let spriteName = this.getRandomStimulusSpriteName();
            this.lastShownSprite = spriteName;
            
            this.shownSprites.push(spriteName);
            
            this.currentShowSprite = this.game.add.sprite(this.game.world.width / 2, this.game.world.height / 2, spriteName);
            this.currentShowSprite.scale.setTo(this.game.status.config.diceScaleShown, this.game.status.config.diceScaleShown);
            this.currentShowSprite.anchor.setTo(0.5, 0.5);
            this.currentShowSprite.alpha = 0;
            this.game.add.tween(this.currentShowSprite).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
            
            this.dice_show_timestamp = Date.now();
            this.game.status.isShowingDice = true;
        } else {
            // Check if its moment to hide the dice
            if (Date.now() > this.dice_show_timestamp + (this.game.status.config.timePerElement * 1000)) {

                if (this.currentShowSprite !== null) {
                    let animation = this.game.add.tween(this.currentShowSprite).to({ alpha: 0 }, 200, Phaser.Easing.Linear.None, true, 0, 0, false);
                }

                this.game.status.isShowingDice = false;
                this.game.status.currentDiceIteration++;
                if (this.game.status.currentDiceIteration === this.game.status.config.numberOfElements) {
                    this.game.status.phase = RecognitionStatus.PHASES.DICE_SELECT;
                    this.game.status.timeTakenByShow = this.game.elapsedTime();
                }
            }
        }
    }

    diceSelectPhaseUpdate() {

        if (this.shownSprites.length === 0) {
            this.disableGame();
            this.game.status.gameCompleted = true;
            return;
        }

        if (!this.game.status.dicesToSelectShown) {
            // Add dice sprites
            for (let i = 0, len = this.game.status.stimulus_values.length; i < len; i++) {
                let currentSprite = this.game.add.button(0, 0, this.game.status.stimulus + "-" + String(this.game.status.stimulus_values[i]).toLowerCase(), this.onDiceClick, this);
                currentSprite.scale.setTo(this.game.status.config.diceScale, this.game.status.config.diceScale);
                currentSprite.anchor.setTo(0.5, 0.5);

                let randomCoords = Array(0, 0);

                do {
                    randomCoords = this.getRandomScrambleCoords();
                } while (this.isLetterColliding(randomCoords[0], randomCoords[1]));
                currentSprite.x = randomCoords[0];
                currentSprite.y = randomCoords[1];

                currentSprite.inputEnabled = true;
                this.shownSpritesToSelect.push(currentSprite);
            }
            this.game.status.dicesToSelectShown = true;
        } else {
            return;
        }

    }

    onDiceClick(clickedSprite) {
        if (this.shownSprites.indexOf(clickedSprite.key) !== -1) {
            this.shownSprites.splice(this.shownSprites.indexOf(clickedSprite.key), 1);
            clickedSprite.destroy();
            this.game.status.guessed++;
        } else {
            clickedSprite.destroy();
            this.game.status.failed++;
        }
    }

    getDistance(x1, y1, x2, y2) {
        let dx = x1 - x2;
        let dy = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy);
    }

    isLetterColliding(x, y) {
        let toRet = false;
        this.shownSpritesToSelect.forEach(function (element) {
            if (this.getDistance(x, y, element.x, element.y) < 65) {
                toRet = true;
            }
        }, this);
        return toRet;
    }

    getRandomScrambleCoords() {
        let randX = Math.floor(Math.random() * (this.game.status.config.width - 75 - 75 + 1)) + 75;
        let randY = Math.floor(Math.random() * (this.game.status.config.height - 200 - 100 + 1)) + 100;
        return [randX, randY];
    }

    getRandomStimulusSpriteName() {
        let toRet = null;
        do {
            toRet = this.game.status.stimulus + "-" + this.game.status.stimulus_values[Math.floor((Math.random() * this.game.status.stimulus_values.length))];
            toRet = toRet.toLowerCase();
        } while (toRet === this.lastShownSprite);
        return toRet;
    }

    updateScore() {
        this.game.scoreText.text = String(this.game.status.guessed) + " / " + String(this.game.status.failed);
        this.game.scoreText.addColor('#00FF00', 0);
        this.game.scoreText.addColor('#FFFFFF', this.game.scoreText.text.indexOf("/"));
        this.game.scoreText.addColor('#FF0000', this.game.scoreText.text.indexOf("/") + 1);
    }

    disableGame() {
        //Ensure you can't play
        this.game.status.gameRunning = false;
        this.shownSpritesToSelect.forEach(element => {
            element.input.enabled = false;
        });
    }

    onGameEndCallback() {
        let info = {
            gameCompleted: this.shownSprites.length === 0,
            totalTries: this.game.status.guessed + this.game.status.failed,
            guessed: this.game.status.guessed,
            failed: this.game.status.failed
        }

        if (this.game.status.gameMode === GameStatus.GAME_MODES.NORMAL) {
            this.game.status.config.gameCallback.gameFinished(info);
        }

        this.game.status.endInfo = info;

        // Switch to the end state
        this.game.state.start("EndRenderer");
    }
}