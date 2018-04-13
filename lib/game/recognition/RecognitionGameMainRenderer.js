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
import GameState from '../GameState.js';
import RecognitionGame from './RecognitionGame';
import MtcDiceFace from '../../dice/MtcDiceFace';

import backgroundImage from '../../assets/image/game/scene/main/background-tiled.jpg';
import timeFrameImage from '../../assets/image/game/scene/main/time-frame.png';
import scoreFrameImage from '../../assets/image/game/scene/main/score-frame.png';

export default class RecognitionGameMainRenderer extends GameState {

    constructor() {
        super();
        this.DICE_SHOW_SCALE = 0.50;
        this.DICE_SCALE = 0.25;
    }

    select_random_stimulus() {
        let possible_stimuli = [
            "letter",
            "number",
            "color",
            "trigram",
            "word",
            "tool"
        ]
        return possible_stimuli[Math.floor((Math.random() * possible_stimuli.length))]
    }

    preload() {
        // Initialize game configuration
        this.guessed = 0;
        this.failed = 0;
        this.gameRunning = true;
        this.stimulus = this.select_random_stimulus();
        this.stimulus_values = null;
        switch (this.stimulus) {
            case "letter":
                this.stimulus_values = MtcDiceFace.LETTERS_FACE_VALUES;
                break;
            case "number":
                this.stimulus_values = MtcDiceFace.NUMBERS_FACE_VALUES;
                break;
            case "color":
                this.stimulus_values = MtcDiceFace.COLORS_FACE_VALUES;
                break;
            case "trigram":
                this.stimulus_values = MtcDiceFace.SYLLABLES_FACE_VALUES;
                break;
            case "word":
                this.stimulus_values = MtcDiceFace.WORDS_FACE_VALUES;
                break;
            case "tool":
                this.stimulus_values = MtcDiceFace.TOOLS_FACE_VALUES;
                break;
        }
        this.phase = RecognitionGame.PHASES.DICE_SHOW;
        this.isShowingDice = false;
        this.currentDiceIteration = 0;
        this.currentShowSprite = null;
        this.timeTakenByShow = 0;
        this.lastShownSprite = null;
        this.shownSprites = Array();
        this.dicesToSelectShown = false;
        this.shownSpritesToSelect = Array();
        this.gameCompleted = false;

        // Prevents game from pausing when browser loses focus
        this.game.stage.disableVisibilityChange = true;

        // Ensure all images are loaded
        super.preload_load_images();

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
            this.game.i18n.text("game.standard.time") + ": " + this.game.gameConfig.time,
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
        if (this.game.gameMode === Game.GAME_MODES.NORMAL) {
            this.game.gameConfig.gameCallback.gameStarted();
        }
        this.gameRunning = true;
    }

    update() {
        if (!this.gameRunning) {
            return;
        }

        // Calculate the remaining time and set the text accordingly
        let remainingTime = this.game.gameConfig.time;

        if (this.phase === RecognitionGame.PHASES.DICE_SELECT) {
            // Don't update if not in select mode. Let the user breath a little.
            remainingTime = remainingTime - this.game.elapsedTime() + this.timeTakenByShow;
        }

        this.game.timeText.setText(
            remainingTime > 0 ? this.game.i18n.text("game.standard.time") + ": " + Math.ceil(remainingTime) : this.game.i18n.text("game.standard.timeIsUp")
        );
        this.updateScore();

        // Execute the current phase of the game.
        if (this.phase === RecognitionGame.PHASES.DICE_SHOW && this.currentDiceIteration < this.game.gameConfig.numberOfElements) {
            this.diceShowPhaseUpdate();
        } else if (this.phase === RecognitionGame.PHASES.DICE_SELECT) {
            this.diceSelectPhaseUpdate();
        }

        if ((remainingTime <= 0 && this.gameRunning) || this.gameCompleted) {
            this.disableGame();
            this.onGameEndCallback();
            this.gameRunning = false;
        }
    }

    diceShowPhaseUpdate() {

        if (!this.isShowingDice) {

            let spriteName = this.getRandomStimulusSpriteName();
            this.lastShownSprite = spriteName;

            this.shownSprites.push(spriteName);

            this.currentShowSprite = this.game.add.sprite(this.game.world.width / 2, this.game.world.height / 2, spriteName);
            this.currentShowSprite.scale.setTo(this.DICE_SHOW_SCALE, this.DICE_SHOW_SCALE);
            this.currentShowSprite.anchor.setTo(0.5, 0.5);
            this.currentShowSprite.alpha = 0;
            this.game.add.tween(this.currentShowSprite).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);

            this.dice_show_timestamp = Date.now();
            this.isShowingDice = true;
        } else {
            // Check if its moment to hide the dice
            if (Date.now() > this.dice_show_timestamp + (this.game.gameConfig.timePerElement * 1000)) {

                if (this.currentShowSprite !== null) {
                    let animation = this.game.add.tween(this.currentShowSprite).to({ alpha: 0 }, 200, Phaser.Easing.Linear.None, true, 0, 0, false);
                }

                this.isShowingDice = false;
                this.currentDiceIteration++;
                if (this.currentDiceIteration === this.game.gameConfig.numberOfElements) {
                    this.phase = RecognitionGame.PHASES.DICE_SELECT;
                    this.timeTakenByShow = this.game.elapsedTime();
                }
            }
        }
    }

    diceSelectPhaseUpdate() {

        if (this.shownSprites.length === 0) {
            this.disableGame();
            this.gameCompleted = true;
            return;
        }

        if (!this.dicesToSelectShown) {
            // Add dice sprites
            for (let i = 0, len = this.stimulus_values.length; i < len; i++) {
                let currentSprite = this.game.add.button(0, 0, this.stimulus + "-" + String(this.stimulus_values[i]).toLowerCase(), this.onDiceClick, this);
                currentSprite.scale.setTo(this.DICE_SCALE, this.DICE_SCALE);
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
            this.dicesToSelectShown = true;
        } else {
            return;
        }

    }

    onDiceClick(clickedSprite) {
        if (this.shownSprites.indexOf(clickedSprite.key) !== -1) {
            this.shownSprites.splice(this.shownSprites.indexOf(clickedSprite.key), 1);
            clickedSprite.destroy();
            this.guessed++;
        } else {
            clickedSprite.destroy();
            this.failed++;
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
        let randX = Math.floor(Math.random() * (this.game.gameConfig.width - 75 - 75 + 1)) + 75;
        let randY = Math.floor(Math.random() * (this.game.gameConfig.height - 200 - 100 + 1)) + 100;
        return [randX, randY];
    }

    getRandomStimulusSpriteName() {
        let toRet = null;
        do {
            toRet = this.stimulus + "-" + this.stimulus_values[Math.floor((Math.random() * this.stimulus_values.length))];
            toRet = toRet.toLowerCase();
        } while (toRet === this.lastShownSprite);
        return toRet;
    }

    updateScore() {
        this.game.scoreText.text = String(this.guessed) + " / " + String(this.failed);
        this.game.scoreText.addColor('#00FF00', 0);
        this.game.scoreText.addColor('#FFFFFF', this.game.scoreText.text.indexOf("/"));
        this.game.scoreText.addColor('#FF0000', this.game.scoreText.text.indexOf("/") + 1);
    }

    disableGame() {
        //Ensure you can't play
        this.gameRunning = false;
        this.shownSpritesToSelect.forEach(element => {
            element.input.enabled = false;
        });
    }

    onGameEndCallback() {
        let info = {
            gameCompleted: this.shownSprites.length === 0,
            totalTries: this.guessed + this.failed,
            guessed: this.guessed,
            failed: this.failed
        }

        if (this.game.gameMode === Game.GAME_MODES.NORMAL) {
            this.game.gameConfig.gameCallback.gameFinished(info);
        }

        this.game.endInfo = info;

        // Switch to the end state
        this.game.state.start("EndRenderer");
    }
}