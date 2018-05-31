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

import MtcDiceFace from '../../../dice/MtcDiceFace';
import Phaser from 'phaser-ce';

import backgroundImage from '../../../assets/image/game/scene/main/background-tiled.jpg';
import timeFrameImage from '../../../assets/image/game/scene/main/time-frame.png';
import scoreFrameImage from '../../../assets/image/game/scene/main/score-frame.png';
import cubeSlotImage from '../../../assets/image/game/verbal_fluency/cube-slot.png';
import dockImage from '../../../assets/image/game/verbal_fluency/dock.png';
import resetButtonImage from '../../../assets/image/game/verbal_fluency/reset-button-spritesheet.png';
import checkButtonImage from '../../../assets/image/game/verbal_fluency/check-button-spritesheet.png';
import startDragFX from '../../../assets/audio/fx/dice/start_drag.wav';
import endDragFX from '../../../assets/audio/fx/dice/end_drag.wav';


export default class VerbalFluencyMainRenderer extends StageRenderer {

    constructor(configuration, status) {
        // check types
        super(configuration, status);
    }

    preload() {
        this.letterSprites = new Array();
        this.cubeSlots = new Array();
        this.resetButtonHOffset = 320;
        this.resetButtonVOffset = -10;
        this.checkButtonHOffset = 320;
        this.checkButtonVOffset = 30;

        this.diceScale = this.configuration.diceScale;
        this.diceScaleDocked = this.configuration.diceScaleDocked;
        this.diceScaleDragged = this.configuration.diceScaleDragged;

        this.draggingSprite = null;

        // Prevents game from pausing when browser loses focus
        this.game.stage.disableVisibilityChange = true;

        super.preloadImages();

        this.loadImage("background", backgroundImage);
        this.loadImage("cube-slot", cubeSlotImage);
        this.loadImage("dock", dockImage);
        this.loadImage("time-frame", timeFrameImage);
        this.loadImage("score-frame", scoreFrameImage);
        this.loadSpritesheet("reset-button", resetButtonImage, 114, 34);
        this.loadSpritesheet("check-button", checkButtonImage, 114, 34);
        this.loadAudio("startDragFX", startDragFX);
        this.loadAudio("endDragFX", endDragFX);
    }

    create() {
        // Add sounds
        this.game.startDragSound = this.game.add.audio("startDragFX");
        this.game.endDragSound = this.game.add.audio("endDragFX");

        // Add background image
        this.game.backgroundSprite = this.game.add.tileSprite(0, 0, this.worldWidth, this.worldHeight, 'background');

        // Add dock image
        this.game.dockSprite = this.game.add.sprite(0, 0, 'dock');
        this.game.dockSprite.anchor.setTo(0.5, 0.5);
        this.game.dockSprite.x = this.worldWidth / 2;
        this.game.dockSprite.y = this.calculateCenteredY(this.game.dockSprite.height);

        // Add time frame image
        this.game.timeFrameSprite = this.game.add.sprite(0, 0, 'time-frame');
        this.game.timeFrameSprite.anchor.setTo(0, 0.5);
        this.game.timeFrameSprite.x = 0;
        this.game.timeFrameSprite.y = this.game.timeFrameSprite.height / 2;

        // Add score frame image
        this.game.scoreFrameSprite = this.game.add.sprite(0, 0, 'score-frame');
        this.game.scoreFrameSprite.anchor.setTo(1, 0.5);
        this.game.scoreFrameSprite.x = this.worldWidth;
        this.game.scoreFrameSprite.y = this.game.scoreFrameSprite.height / 2;

        // Add time text
        this.game.timeText = this.game.add.text(0, 0,
            this.getStandardGameText("time") + ": " + this.game.configuration.time,
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
            const leftOffset = this.game.dockSprite.x - (this.game.dockSprite.width / 2) + 45;
            const innerSeparation = 3;
            const currentSprite = this.game.add.sprite(0, 0, "cube-slot");

            currentSprite.anchor.setTo(0.5, 0.5);
            currentSprite.scale.setTo(1, 1);
            currentSprite.x = (currentSprite.width + innerSeparation) * i + leftOffset;
            currentSprite.y = this.game.dockSprite.y + 10;

            this.cubeSlots.push(currentSprite);
        }

        //Calculate automatic dice scale
        if (this.diceScale < 0 || this.diceScaleDragged < 0) {
            let calcSprite = this.game.add.sprite(0, 0, "letter-" + MtcDiceFace.LETTERS_FACE_VALUES[0].toLowerCase());
            calcSprite.width = Math.min(this.game.configuration.width, this.game.configuration.height) / 7;
            this.diceScale = calcSprite.scale.x;
            this.diceScaleDragged = calcSprite.scale.x * 1.25;
            calcSprite.width = this.cubeSlots[0].width;
            calcSprite.height = this.cubeSlots[0].height;
            this.diceScaleDocked = calcSprite.scale.x;
            calcSprite.destroy();
        }

        // Add letter sprites to the game
        for (let i = 0, len = MtcDiceFace.LETTERS_FACE_VALUES.length; i < len; i++) {
            let currentSprite = this.game.add.sprite(0, 0, "letter-" + MtcDiceFace.LETTERS_FACE_VALUES[i].toLowerCase());
            currentSprite.scale.setTo(this.diceScale, this.diceScale);
            currentSprite.anchor.setTo(0.5, 0.5);

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
            if(this.game.configuration.useDrag){
                currentSprite.input.enableDrag();
                currentSprite.events.onDragStart.add(this.onSpriteDragged, this);
                currentSprite.events.onDragStop.add(this.onSpriteReleased, this);
            }else{
                currentSprite.events.onInputDown.add(this.onSpriteClicked, this);
            }

            this.letterSprites.push(currentSprite);
        }
        this.status.start();
    }

    update() {
        this.game.timeText.setText(
            this.status.isRunning()
                ? this.getStandardGameText("time", text => text + ": " + Math.ceil(this.status.secondsLeft))
                : this.getStandardGameText("timeIsUp")
        );

        if(this.draggingSprite){
            this.draggingSprite.x = this.game.input.x;
            this.draggingSprite.y = this.game.input.y;
        }

        this.updateScore();

        if (!this.status.isRunning()) {
            this.disableGame();
        }
    }

    updateScore() {
        this.game.scoreText.text = String(this.status.countGuessedWords()) + " / " + String(this.status.countFailedWords());
        this.game.scoreText.addColor('#00FF00', 0);
        this.game.scoreText.addColor('#FFFFFF', this.game.scoreText.text.indexOf("/"));
        this.game.scoreText.addColor('#FF0000', this.game.scoreText.text.indexOf("/") + 1);
    }

    isLetterColliding(x, y) {
        //Spawn a sprite to get pixel size
        const tempSprite = this.game.add.sprite(0, 0, "letter-" + MtcDiceFace.LETTERS_FACE_VALUES[0].toLowerCase());
        tempSprite.scale.setTo(this.diceScale, this.diceScale);
        const spriteWidth = tempSprite.width;
        tempSprite.destroy();
        const minimumSeparation = Math.sqrt(Math.pow(spriteWidth, 2) + Math.pow(spriteWidth / 2, 2)) + spriteWidth / 10;

        return this.letterSprites.some(element =>
            this.calculateDistance(x, y, element.finalX, element.finalY) < minimumSeparation
        );
    }

    getRandomScrambleCoords() {
        const randX = Math.floor(Math.random() * (this.game.configuration.width - 75 - 75 + 1)) + 75;
        const randY = Math.floor(Math.random() * (this.game.configuration.height - 200 - 100 + 1)) + 100;

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
        this.status.checkWord();

        this.shuffleLetters();
    }

    onWordReset() {
        this.status.resetWord();

        this.shuffleLetters();
    }

    shuffleLetters() {
        let randomCoords;

        for (let i = 0, len = MtcDiceFace.LETTERS_FACE_VALUES.length; i < len; i++) {
            do {
                randomCoords = this.getRandomScrambleCoords();
            } while (this.isLetterColliding(randomCoords[0], randomCoords[1]));

            this.letterSprites[i].finalX = randomCoords[0];
            this.letterSprites[i].finalY = randomCoords[1];

            this.letterSprites[i].scale.setTo(this.diceScale, this.diceScale);

            this.game.add.tween(this.letterSprites[i]).to(
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

    onSpriteClicked(sprite, pointer){
        if(!this.draggingSprite){
            this.onSpriteDragged(sprite, pointer);
            this.draggingSprite = sprite;
        }else{
            this.onSpriteReleased(sprite, pointer);
            this.draggingSprite = null;
        }
    }

    onSpriteDragged(sprite, pointer) {
        // Bring sprite to top
        sprite.bringToTop();
        this.game.startDragSound.play();

        //Scale the dice so it makes the illusion of lifting it
        this.game.add.tween(sprite.scale).to(
            { x: this.diceScaleDragged, y: this.diceScaleDragged },
            50,
            Phaser.Easing.Linear.None,
            true,
            0,
            0,
            false
        );
    }

    onSpriteReleased(sprite, pointer) {
        this.game.endDragSound.play();

        const currentLetter = sprite.key.substr(sprite.key.length - 1);
        const currentLetterIndex = this.status.currentWord.indexOf(currentLetter);

        let boundToSomething = false;
        let boundIndex = -1

        //Check if the dropped letter dice is near some socket
        this.cubeSlots.forEach(function (currentItem, index) {
            //Check if the dice is near this cubeSlot and if the word has an empty letter there.
            if (
                this.calculateDistance(currentItem.x, currentItem.y, sprite.x, sprite.y) < 30.0
                && this.status.currentWord[index] === ' '
            ) {
                sprite.x = currentItem.x;
                sprite.y = currentItem.y;
                boundToSomething = true;
                boundIndex = index;
            }
        }, this);

        //Clear the letter from the temporal word
        if (currentLetterIndex >= 0) {
            this.status.clearLetter(currentLetterIndex);
        }

        //If it was bound to something insert the letter into the temporal word
        if (boundToSomething && boundIndex != -1) {
            this.status.putLetter(boundIndex, currentLetter);
        }

        const finalScale = boundToSomething
            ? { x: this.diceScaleDocked, y: this.diceScaleDocked }
            : { x: this.diceScale, y: this.diceScale };

        this.game.add.tween(sprite.scale).to(
            finalScale,
            50,
            Phaser.Easing.Linear.None,
            true,
            0,
            0,
            false
        );
    }
}