/**
 * MultiTasking Cubes - Games
 * Copyright (C) 2017 - Miguel Reboiro-Jato
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

import GameState from '../GameState.js';
import MtcDiceFace from '../../dice/MtcDiceFace';

export default class VerbalFluencyMainState extends GameState {


    constructor() {
        super();

        this.DICE_SCALE = 0.25;
        this.DICE_SCALE_DRAGGED = 0.35;

        this.currentWord = new Array(' ', ' ', ' ', ' ', ' ', ' ', ' ');
        this.letterSprites = new Array();
        this.cubeSlots = new Array();
        this.possible_words = ['babel', 'ace', 'back'];
        this.resetButtonHOffset = 320;
        this.resetButtonVOffset = -10;
        this.checkButtonHOffset = 320;
        this.checkButtonVOffset = 30;
        this.gameRunning = false;
    }

    preload() {
        // Preloading all the image assets for letters
        for (let i = 0, len = MtcDiceFace.LETTERS_FACE_VALUES.length; i < len; i++) {
            this.game.load.image("letter-" + MtcDiceFace.LETTERS_FACE_VALUES[i].toLowerCase(), "assets/img/letra_" + MtcDiceFace.LETTERS_FACE_VALUES[i].toUpperCase() + ".jpg");
        }
        this.game.load.image("background", "assets/img/background-tiled.jpg");
        this.game.load.image("cube-slot", "assets/img/cube-slot.png");
        this.game.load.image("dock", "assets/img/dock.png");
        this.game.load.image("time-frame", "assets/img/time-frame.png");
        this.game.load.spritesheet("reset-button", "assets/img/reset-button-spritesheet.png", 114, 34);
        this.game.load.spritesheet("check-button", "assets/img/check-button-spritesheet.png", 114, 34);
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
        this.game.timeFrameSprite.anchor.setTo(0.5, 0.5);
        this.game.timeFrameSprite.x = this.game.world.width / 2;
        this.game.timeFrameSprite.y = this.game.timeFrameSprite.height / 2;

        // Add time text
        this.game.timeText = this.game.add.text(this.game.world.width / 2, 30,
            "Time: " + this.game.gameConfig.time,
            {
                font: "24px Arial",
                fill: "#EEEEEE",
                align: "left"
            }
        );
        this.game.timeText.anchor.setTo(0.5, 0.5);

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

            currentSprite.inputEnabled = true;
            currentSprite.input.enableDrag(true);
            currentSprite.events.onDragStart.add(this.onDragStart, this);
            currentSprite.events.onDragStop.add(this.onDragStop, this);
            this.letterSprites.push(currentSprite);
        }

        //Throw a call to the game-start function
        if(this.game.gameConfig.gameStartCallbackFunction != null){
            this.game.gameConfig.gameStartCallbackFunction();
        }
        this.gameRunning = true;
    }

    update() {
        // Calculate the remaining time and set the text accordingly
        let remainingTime = this.game.gameConfig.time - this.game.elapsedTime();
        this.game.timeText.setText(
            remainingTime > 0 ? "Time: " + Math.ceil(this.game.gameConfig.time - this.game.elapsedTime()) : "Time's up"
        );
        if (remainingTime <= 0 && this.gameRunning) {
            this.disableGame();
            this.onGameEndCallback();
            this.gameRunning = false;
        }
    }

    isLetterColliding(x, y) {
        let toRet = false;
        this.letterSprites.forEach(function (element) {
            if (this.getDistance(x, y, element.x, element.y) < 65) {
                toRet = true;
            }
        }, this);
        return toRet;
    }

    realWord() {
        return this.currentWord.join("").replace(/\s+/g, '');
    }

    getRandomScrambleCoords() {
        let randX = Math.floor(Math.random() * (this.game.gameConfig.resX - 75 - 75 + 1)) + 75;
        let randY = Math.floor(Math.random() * (this.game.gameConfig.resY - 200 - 100 + 1)) + 100;
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
        if(this.game.gameConfig.gameCheckCallbackFunction != null){
            this.game.gameConfig.gameCheckCallbackFunction();
        }
        if (this.possible_words.indexOf(this.realWord().toLowerCase()) !== -1) {
            console.log(this.realWord() + " is a valid word");
        } else {
            console.log(this.realWord() + " is not a valid word");
        }
        //Reset word.
        this.onWordReset();
    }

    onWordReset() {
        if(this.game.gameConfig.gameResetCallbackFunction != null){
            this.game.gameConfig.gameResetCallbackFunction();
        }
        this.currentWord = new Array(' ', ' ', ' ', ' ', ' ', ' ', ' ');
        let randomCoords = Array(0, 0);
        for (let i = 0, len = MtcDiceFace.LETTERS_FACE_VALUES.length; i < len; i++) {
            do {
                randomCoords = this.getRandomScrambleCoords();
            } while (this.isLetterColliding(randomCoords[0], randomCoords[1]));
            this.letterSprites[i].x = randomCoords[0];
            this.letterSprites[i].y = randomCoords[1];
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
        sprite.scale.setTo(this.DICE_SCALE_DRAGGED, this.DICE_SCALE_DRAGGED);
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

        sprite.scale.setTo(this.DICE_SCALE, this.DICE_SCALE);
    }

    onGameEndCallback(){
        if(this.game.gameEndCallbackFunction != null){
            this.game.gameConfig.gameEndCallbackFunction();
        }
    }
}