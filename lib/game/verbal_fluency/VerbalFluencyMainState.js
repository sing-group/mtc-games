/*
 * MultiTasking Cubes - Games
 * Copyright (C) 2017 - Miguel Reboiro-Jato, Andrés Vieira Vázquez,
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
import MtcDiceFace from '../../dice/MtcDiceFace';
import VerbalFluencyDictionary from '../verbal_fluency/VerbalFluencyDictionary';

import backgroundImage from '../../assets/image/game/scene/main/background-tiled.jpg';
import timeFrameImage from '../../assets/image/game/scene/main/time-frame.png';
import scoreFrameImage from '../../assets/image/game/scene/main/score-frame.png';
import cubeSlotImage from '../../assets/image/game/verbal_fluency/cube-slot.png';
import dockImage from '../../assets/image/game/verbal_fluency/dock.png';
import resetButtonImage from '../../assets/image/game/verbal_fluency/reset-button-spritesheet.png';
import checkButtonImage from '../../assets/image/game/verbal_fluency/check-button-spritesheet.png';


export default class VerbalFluencyMainState extends GameState {


    constructor() {
        super();

        this.DICE_SCALE = 0.25;
        this.DICE_SCALE_DRAGGED = 0.35;

        this.currentWord = new Array(' ', ' ', ' ', ' ', ' ', ' ', ' ');
        this.letterSprites = new Array();
        this.cubeSlots = new Array();
        this.resetButtonHOffset = 320;
        this.resetButtonVOffset = -10;
        this.checkButtonHOffset = 320;
        this.checkButtonVOffset = 30;
        this.gameRunning = false;
        this.correctWords = new Array();
        this.guessAttempts = 0;
        this.repeatedWords = 0;

        // Needs to be set when game exists
        this.possible_words = null;
    }

    preload() {
        // Prevents game from pausing when browser loses focus
        this.game.stage.disableVisibilityChange = true;
        super.preload_load_images();

        // Finish construction as game exists
        switch (this.game.gameConfig.locale) {
            case "es_ES":
                this.possible_words = VerbalFluencyDictionary.es_ES;
                break;
            case "en_US":
                this.possible_words = VerbalFluencyDictionary.en_US;
                break;
            case "es_GL":
                break;
            default:
                this.possible_words = VerbalFluencyDictionary.en_US;
        }

        this.game.load.image("background", backgroundImage);
        this.game.load.image("cube-slot", cubeSlotImage);
        this.game.load.image("dock", dockImage);
        this.game.load.image("time-frame", timeFrameImage);
        this.game.load.image("score-frame", scoreFrameImage);
        this.game.load.spritesheet("reset-button", resetButtonImage, 114, 34);
        this.game.load.spritesheet("check-button", checkButtonImage, 114, 34);
    }

    create() {
        // Add background image
        this.game.backgroundSprite = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'background');

        // Add dock image
        this.game.dockSprite = this.game.add.sprite(0, 0, 'dock');
        this.game.dockSprite.anchor.setTo(0.5, 0.5);
        this.game.dockSprite.x = this.game.world.width / 2;
        this.game.dockSprite.y = this.game.world.height - this.game.dockSprite.height / 2;

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
            "Time: " + this.game.gameConfig.time,
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

        // Add check button
        this.game.checkButton = this.game.add.button(0, 0, 'check-button', this.onWordCheck, this, 2, 1, 0);
        this.game.checkButton.anchor.setTo(0.5, 0.5);
        this.game.checkButton.y = this.game.dockSprite.y + this.checkButtonVOffset;
        this.game.checkButton.x = this.game.dockSprite.x + this.checkButtonHOffset;

        // Add reset button
        this.game.resetButton = this.game.add.button(0, 0, 'reset-button', this.onWordReset, this, 2, 1, 0);
        this.game.resetButton.anchor.setTo(0.5, 0.5);
        this.game.resetButton.y = this.game.dockSprite.y + this.resetButtonVOffset;
        this.game.resetButton.x = this.game.dockSprite.x + this.resetButtonHOffset;

        //Add cube slots
        for (let i = 0, len = 12; i < len; i++) {
            let leftOffset = this.game.dockSprite.x - (this.game.dockSprite.width / 2) + 45;
            let innerSeparation = 3;
            let currentSprite = this.game.add.sprite(0, 0, "cube-slot");
            currentSprite.anchor.setTo(0.5, 0.5);
            currentSprite.scale.setTo(1, 1);
            currentSprite.x = (currentSprite.width + innerSeparation) * i + leftOffset;
            currentSprite.y = this.game.dockSprite.y + 10;
            this.cubeSlots.push(currentSprite);
        }


        // Add letter sprites to the game
        for (let i = 0, len = MtcDiceFace.LETTERS_FACE_VALUES.length; i < len; i++) {
            let currentSprite = this.game.add.sprite(0, 0, "letter-" + MtcDiceFace.LETTERS_FACE_VALUES[i].toLowerCase());
            currentSprite.scale.setTo(this.DICE_SCALE, this.DICE_SCALE);
            currentSprite.anchor.setTo(0.5, 0.5);

            let randomCoords = Array(0, 0);

            do {
                randomCoords = this.getRandomScrambleCoords();
            } while (this.isLetterColliding(randomCoords[0], randomCoords[1]));
            currentSprite.x = randomCoords[0];
            currentSprite.y = randomCoords[1];

            // Needed to support tween
            currentSprite.finalX = randomCoords[0];
            currentSprite.finalY = randomCoords[1];

            currentSprite.inputEnabled = true;
            currentSprite.input.enableDrag(true);
            currentSprite.events.onDragStart.add(this.onDragStart, this);
            currentSprite.events.onDragStop.add(this.onDragStop, this);
            this.letterSprites.push(currentSprite);
        }

        //Throw a call to the game-start function
        if (this.game.gameConfig.startCallback != null &&
            this.game.gameMode == Game.GAME_MODES.NORMAL) {
            this.game.gameConfig.startCallback();
        }
        this.gameRunning = true;

        this.game.currentStateStartTime = this.game.elapsedTime();
    }

    update() {
        // Calculate the remaining time and set the text accordingly
        let remainingTime = this.game.gameConfig.time - this.stateElapsedTime();
        this.game.timeText.setText(
            remainingTime > 0 ? "Time: " + Math.ceil(this.game.gameConfig.time - this.stateElapsedTime()) : "Time's up"
        );
        this.updateScore();
        if (remainingTime <= 0 && this.gameRunning) {
            this.disableGame();
            this.onGameEndCallback();
            this.gameRunning = false;
        }
    }

    stateElapsedTime() {
        return this.game.elapsedTime() - this.game.currentStateStartTime;
    }

    updateScore() {
        this.game.scoreText.text = String(this.correctWords.length) + " / " + String(this.guessAttempts - this.correctWords.length);
        this.game.scoreText.addColor('#00FF00', 0);
        this.game.scoreText.addColor('#FFFFFF', this.game.scoreText.text.indexOf("/"));
        this.game.scoreText.addColor('#FF0000', this.game.scoreText.text.indexOf("/") + 1);
    }

    isLetterColliding(x, y) {
        let toRet = false;
        this.letterSprites.forEach(function (element) {
            if (this.getDistance(x, y, element.finalX, element.finalY) < 65) {
                toRet = true;
            }
        }, this);
        return toRet;
    }

    realWord() {
        return this.currentWord.join("").replace(/\s+/g, '');
    }

    getRandomScrambleCoords() {
        let randX = Math.floor(Math.random() * (this.game.gameConfig.width - 75 - 75 + 1)) + 75;
        let randY = Math.floor(Math.random() * (this.game.gameConfig.height - 200 - 100 + 1)) + 100;
        return [randX, randY];
    }

    disableGame() {
        //Ensure you cant play
        this.game.resetButton.inputEnabled = false;
        this.game.checkButton.inputEnabled = false;
        this.letterSprites.forEach(function (element) {
            element.inputEnabled = false;
        }, this);
    }

    onWordCheck() {
        let checkResult = {
            timeLeft: this.game.gameConfig.time - this.stateElapsedTime(),
            repeated: false,
            validWord: false
        }

        if (this.possible_words.indexOf(this.realWord().toLowerCase()) !== -1) {
            if (this.correctWords.indexOf(this.realWord().toLowerCase()) !== -1) {
                // Already guessed.
                console.log(this.realWord() + " was already guessed");
                checkResult.repeated = true;
                this.repeatedWords++;
            } else {
                console.log(this.realWord() + " is a valid word");
                this.correctWords.push(this.realWord().toLowerCase());
                checkResult.validWord = true;
            }
        } else {
            console.log(this.realWord() + " is not a valid word");
        }

        this.guessAttempts++;

        if (this.game.gameConfig.checkCallback != null &&
            this.game.gameMode == Game.GAME_MODES.NORMAL) {
            this.game.gameConfig.checkCallback(checkResult);
        }

        //Reset word.
        this.onWordReset(false);
    }

    onWordReset(callback = true) {
        if (this.game.gameConfig.resetCallback != null &&
            callback &&
            this.game.gameMode == Game.GAME_MODES.NORMAL) {
            this.game.gameConfig.resetCallback();
        }
        this.currentWord = new Array(' ', ' ', ' ', ' ', ' ', ' ', ' ');
        let randomCoords = Array(0, 0);
        for (let i = 0, len = MtcDiceFace.LETTERS_FACE_VALUES.length; i < len; i++) {
            do {
                randomCoords = this.getRandomScrambleCoords();
            } while (this.isLetterColliding(randomCoords[0], randomCoords[1]));

            this.letterSprites[i].finalX = randomCoords[0];
            this.letterSprites[i].finalY = randomCoords[1];

            let animation = this.game.add.tween(this.letterSprites[i]).to(
                { x: randomCoords[0], y: randomCoords[1] },
                100,
                Phaser.Easing.Linear.None,
                true,
                0,
                0,
                false
            );


        }
    }

    getDistance(x1, y1, x2, y2) {
        let dx = x1 - x2;
        let dy = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy);
    }

    onDragStart(sprite, pointer) {
        // Bring sprite to top
        sprite.bringToTop();

        //Scale the dice so it makes the illusion of lifting it
        let animation = this.game.add.tween(sprite.scale).to(
            { x: this.DICE_SCALE_DRAGGED, y: this.DICE_SCALE_DRAGGED },
            50,
            Phaser.Easing.Linear.None,
            true,
            0,
            0,
            false
        );
    }

    onDragStop(sprite, pointer) {
        let boundToSomething = false;
        let boundIndex = -1
        let currentLetter = sprite.key.substr(sprite.key.length - 1);
        let currentLetterIndex = this.currentWord.indexOf(currentLetter);

        //Check if the dropped letter dice is near some socket
        this.cubeSlots.forEach(function (currentItem, index) {
            //Check if the dice is near this cubeSlot and if the word has an empty letter there.
            if (this.getDistance(currentItem.x, currentItem.y, sprite.x, sprite.y) < 30.0 && this.currentWord[index] == ' ') {
                sprite.x = currentItem.x;
                sprite.y = currentItem.y;
                boundToSomething = true;
                boundIndex = index;
            }
        }, this);

        //Clear the letter from the temporal word
        if (currentLetterIndex >= 0) {
            this.currentWord[currentLetterIndex] = ' ';
        }

        //If it was bound to something insert the letter into the temporal word
        if (boundToSomething && boundIndex != -1) {
            this.currentWord[boundIndex] = currentLetter;
        }

        console.log(this.currentWord + ' as a string is: ' + this.realWord());

        let animation = this.game.add.tween(sprite.scale).to(
            { x: this.DICE_SCALE, y: this.DICE_SCALE },
            50,
            Phaser.Easing.Linear.None,
            true,
            0,
            0,
            false
        );
    }

    onGameEndCallback() {
        let info = {
            totalAttempts: this.guessAttempts,
            totalGuessedWords: this.correctWords.length,
            guessedWords: this.correctWords,
            repeatedGuesses: this.repeatedWords
        }

        if (this.game.gameConfig.endCallback != null &&
            this.game.gameMode == Game.GAME_MODES.NORMAL) {
            this.game.gameConfig.endCallback(info);
        }

        this.game.endInfo = info;

        // Switch to the end state
        this.game.state.start("EndState");
    }
}