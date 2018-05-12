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
import GameStatus from '../GameStatus';
import MtcDiceFace from '../../dice/MtcDiceFace';
import VerbalFluencyDictionary from '../verbal_fluency/VerbalFluencyDictionary';
import VerbalFluencyStatus from './VerbalFluencyStatus.js';

import backgroundImage from '../../assets/image/game/scene/main/background-tiled.jpg';
import timeFrameImage from '../../assets/image/game/scene/main/time-frame.png';
import scoreFrameImage from '../../assets/image/game/scene/main/score-frame.png';
import cubeSlotImage from '../../assets/image/game/verbal_fluency/cube-slot.png';
import dockImage from '../../assets/image/game/verbal_fluency/dock.png';
import resetButtonImage from '../../assets/image/game/verbal_fluency/reset-button-spritesheet.png';
import checkButtonImage from '../../assets/image/game/verbal_fluency/check-button-spritesheet.png';
import startDragFX from '../../assets/audio/fx/dice/start_drag.wav';
import endDragFX from '../../assets/audio/fx/dice/end_drag.wav';


export default class VerbalFluencyMainRenderer extends GameRenderer {


    constructor() {
        super();
    }

    preload() {
        this.letterSprites = new Array();
        this.cubeSlots = new Array();
        this.resetButtonHOffset = 320;
        this.resetButtonVOffset = -10;
        this.checkButtonHOffset = 320;
        this.checkButtonVOffset = 30;

        // Prevents game from pausing when browser loses focus
        this.game.stage.disableVisibilityChange = true;
        super.preload_load_images();

        this.game.load.image("background", backgroundImage);
        this.game.load.image("cube-slot", cubeSlotImage);
        this.game.load.image("dock", dockImage);
        this.game.load.image("time-frame", timeFrameImage);
        this.game.load.image("score-frame", scoreFrameImage);
        this.game.load.spritesheet("reset-button", resetButtonImage, 114, 34);
        this.game.load.spritesheet("check-button", checkButtonImage, 114, 34);
        this.game.load.audio("startDragFX", startDragFX);
        this.game.load.audio("endDragFX", endDragFX);
    }

    create() {
        // Add sounds
        this.game.startDragSound = this.game.add.audio("startDragFX");
        this.game.endDragSound = this.game.add.audio("endDragFX");

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

        //Calculate automatic dice scale
        if (this.game.status.config.diceScale < 0 || this.game.status.config.diceScaleDragged < 0){
            let calcSprite = this.game.add.sprite(0, 0, "letter-" + MtcDiceFace.LETTERS_FACE_VALUES[0].toLowerCase());
            calcSprite.width = Math.min(this.game.status.config.width, this.game.status.config.height) / 7;
            this.game.status.config.diceScale = calcSprite.scale.x;
            this.game.status.config.diceScaleDragged = calcSprite.scale.x * 1.25;
            calcSprite.destroy();
        }

        // Add letter sprites to the game
        for (let i = 0, len = MtcDiceFace.LETTERS_FACE_VALUES.length; i < len; i++) {
            let currentSprite = this.game.add.sprite(0, 0, "letter-" + MtcDiceFace.LETTERS_FACE_VALUES[i].toLowerCase());
            currentSprite.scale.setTo(this.game.status.config.diceScale, this.game.status.config.diceScale);
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

        this.gameRunning = true;

        this.game.currentStateStartTime = this.game.elapsedTime();
    }

    update() {
        // Calculate the remaining time and set the text accordingly
        let remainingTime = this.game.status.config.time - this.stateElapsedTime();
        this.game.timeText.setText(
            remainingTime > 0 ? this.game.i18n.text("game.standard.time") + ": " + Math.ceil(this.game.status.config.time - this.stateElapsedTime()) : this.game.i18n.text("game.standard.timeIsUp")
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
        this.game.scoreText.text = String(this.game.status.correctWords.length) + " / " + String(this.game.status.guessAttempts - this.game.status.correctWords.length);
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

    getRandomScrambleCoords() {
        let randX = Math.floor(Math.random() * (this.game.status.config.width - 75 - 75 + 1)) + 75;
        let randY = Math.floor(Math.random() * (this.game.status.config.height - 200 - 100 + 1)) + 100;
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
        this.game.status.wordCheck(this.game.status.config.time - this.stateElapsedTime());

        //Reset word.
        this.onWordReset(false);
    }

    onWordReset(callback = true) {
        this.game.status.wordReset(callback);

        let randomCoords = Array(0, 0);
        for (let i = 0, len = MtcDiceFace.LETTERS_FACE_VALUES.length; i < len; i++) {
            do {
                randomCoords = this.getRandomScrambleCoords();
            } while (this.isLetterColliding(randomCoords[0], randomCoords[1]));

            this.letterSprites[i].finalX = randomCoords[0];
            this.letterSprites[i].finalY = randomCoords[1];

            this.letterSprites[i].scale.setTo(this.game.status.config.diceScale, this.game.status.config.diceScale);

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
        this.game.startDragSound.play();

        //Scale the dice so it makes the illusion of lifting it
        let animation = this.game.add.tween(sprite.scale).to(
            { x: this.game.status.config.diceScaleDragged, y: this.game.status.config.diceScaleDragged },
            50,
            Phaser.Easing.Linear.None,
            true,
            0,
            0,
            false
        );
    }

    onDragStop(sprite, pointer) {
        this.game.endDragSound.play();
        let boundToSomething = false;
        let boundIndex = -1
        let currentLetter = sprite.key.substr(sprite.key.length - 1);
        let currentLetterIndex = this.game.status.currentWord.indexOf(currentLetter);

        //Check if the dropped letter dice is near some socket
        this.cubeSlots.forEach(function (currentItem, index) {
            //Check if the dice is near this cubeSlot and if the word has an empty letter there.
            if (this.getDistance(currentItem.x, currentItem.y, sprite.x, sprite.y) < 30.0 && this.game.status.currentWord[index] == ' ') {
                sprite.x = currentItem.x;
                sprite.y = currentItem.y;
                sprite.scale.setTo(this.game.status.diceScaleDocked, this.game.status.diceScaleDocked);
                boundToSomething = true;
                boundIndex = index;
            }
        }, this);

        //Clear the letter from the temporal word
        if (currentLetterIndex >= 0) {
            this.game.status.clearLetter(currentLetterIndex);
        }

        //If it was bound to something insert the letter into the temporal word
        if (boundToSomething && boundIndex != -1) {
            this.game.status.putLetter(boundIndex, currentLetter);
        }

        let finalScale = boundToSomething ? { x: this.game.status.diceScaleDocked, y: this.game.status.diceScaleDocked } : { x: this.game.status.config.diceScale, y: this.game.status.config.diceScale };

        let animation = this.game.add.tween(sprite.scale).to(
            finalScale,
            50,
            Phaser.Easing.Linear.None,
            true,
            0,
            0,
            false
        );
    }

    onGameEndCallback() {
        this.game.status.gameEndCallback();

        // Switch to the end state
        this.game.state.start("EndRenderer");
    }
}