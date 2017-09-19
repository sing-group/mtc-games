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

import GameState from '../GameState.js'

export default class VerbalFluencyMainState extends GameState {
    constructor() {
        super();

        this.letters = "abcdefghijkl";
        this.currentWord = new Array(' ', ' ', ' ', ' ', ' ', ' ', ' ');
        this.letterSprites = new Array();
        this.cubeSlots = new Array();
        this.possible_words = ['babel', 'ace', 'back'];
    }

    preload() {
        // Preloading all the image assets for letters
        for (let i = 0, len = this.letters.length; i < len; i++) {
            this.game.load.image("letter-" + this.letters[i], "assets/img/letra_" + this.letters[i].toUpperCase() + ".jpg");
        }
        this.game.load.image("background", "assets/img/background-tiled.jpg");
        this.game.load.image("cube-slot", "assets/img/cube-slot.png");

    }

    create() {
        // Add background image
        this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'background');

        // Add time text
        this.game.timeText = this.game.add.text(15, 15,
            "Remaining time: " + this.game.gameConfig.time,
            {
                font: "24px Arial",
                fill: "#000000",
                align: "center"
            }
        );

        // Add the current word display text
        this.game.currentWordText = this.game.add.text(15, this.game.world.height - 30,
            "Current Word: ",
            {
                font: "24px Arial",
                fill: "#000000",
                align: "center"
            }
        );

        // Add check word text
        this.game.checkWordText = this.game.add.text(this.game.world.width - 150, this.game.world.height - 30,
            "Check Word",
            {
                font: "24px Arial",
                fill: "#33FF33",
                align: "center"
            }
        );

        this.game.checkWordText.inputEnabled = true;
        this.game.checkWordText.events.onInputDown.add(this.onWordCheck, this);

        // Add reset word text
        this.game.resetWordText = this.game.add.text(this.game.world.width - 150, this.game.world.height - 60,
            "Reset",
            {
                font: "24px Arial",
                fill: "#FF3333",
                align: "center"
            }
        );

        this.game.resetWordText.inputEnabled = true;
        this.game.resetWordText.events.onInputDown.add(this.onWordReset, this);

        //Add cube slots
        for (let i = 0, len = 12; i < len; i++) {
            let currentSprite = this.game.add.sprite(65 * i + 40, this.game.world.height - 120, "cube-slot");
            currentSprite.anchor.setTo(0.5, 0.5);
            currentSprite.scale.setTo(1, 1);
            this.cubeSlots.push(currentSprite);
        }


        // Add letter sprites to the game
        for (let i = 0, len = this.letters.length; i < len; i++) {
            let randomCoords = this.getRandomScrambleCoords();
            let currentSprite = this.game.add.sprite(randomCoords[0], randomCoords[1], "letter-" + this.letters[i]);
            currentSprite.scale.setTo(0.3, 0.3);
            currentSprite.anchor.setTo(0.5, 0.5);
            currentSprite.inputEnabled = true;
            currentSprite.input.enableDrag(true);
            currentSprite.events.onDragStart.add(this.onDragStart, this);
            currentSprite.events.onDragStop.add(this.onDragStop, this);
            this.letterSprites.push(currentSprite);
        }
    }

    update() {
        // Calculate the remaining time and set the text accordingly
        let remainingTime = this.game.gameConfig.time - this.game.elapsedTime();
        this.game.timeText.setText(
            remainingTime > 0 ? "Remaining time: " + (this.game.gameConfig.time - this.game.elapsedTime()) : "Time's up"
        );
        if (remainingTime <= 0) {
            this.disableGame();
        }
    }

    realWord() {
        return this.currentWord.join("").replace(/\s+/g, '');
    }

    getRandomScrambleCoords(){
        let randX = Math.floor(Math.random() * (this.game.gameConfig.resX - 75 - 75 + 1)) + 75;
        let randY = Math.floor(Math.random() * (this.game.gameConfig.resY - 200 - 100 + 1)) + 100;
        return [randX , randY];
    }

    disableGame(){
        //Ensure you cant play
        this.game.resetWordText.inputEnabled = false;
        this.game.checkWordText.inputEnabled = false;
        this.letterSprites.forEach(function (element) {
            element.inputEnabled = false;
        }, this);
    }

    onWordCheck() {
        if (this.possible_words.indexOf(this.realWord().toLowerCase()) !== -1) {
            console.log(this.realWord() + " is a valid word");
        } else {
            console.log(this.realWord() + " is not a valid word");
        }
        //Reset word.
        this.onWordReset();
    }

    onWordReset() {
        console.log('Resetting word');
        this.currentWord = new Array(' ', ' ', ' ', ' ', ' ', ' ', ' ');
        this.game.currentWordText.setText("Current Word: " + this.realWord());
        for (let i = 0, len = this.letters.length; i < len; i++) {
            let randomCoords = this.getRandomScrambleCoords();
            this.letterSprites[i].x = randomCoords[0];
            this.letterSprites[i].y = randomCoords[1];
        }
    }

    onDragStart(sprite, pointer) {
        sprite.scale.setTo(0.5, 0.5);
        console.log("Dragging " + sprite.key);
    }

    getDistance(x1, y1, x2, y2) {
        let dx = x1 - x2;
        let dy = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy);
    }

    onDragStop(sprite, pointer) {
        let boundToSomething = false;
        let boundIndex = -1
        let currentLetter = sprite.key.substr(sprite.key.length - 1);
        this.cubeSlots.forEach(function (currentItem, index) {
            // console.log(slot.key + index + " is in x: " + slot.x + "; y: " + slot.y);
            if (this.getDistance(currentItem.x, currentItem.y, sprite.x, sprite.y) < 30.0) {
                sprite.x = currentItem.x;
                sprite.y = currentItem.y;
                boundToSomething = true;
                boundIndex = index;
            }
        }, this);

        let currentLetterIndex = this.currentWord.indexOf(currentLetter);
        if (currentLetterIndex >= 0) {
            this.currentWord[currentLetterIndex] = ' ';
        }

        if (boundToSomething && boundIndex != -1) {
            this.currentWord[boundIndex] = currentLetter;
        }

        console.log(this.currentWord + ' as a string is: ' + this.realWord());

        this.game.currentWordText.setText("Current Word: " + this.realWord());

        sprite.scale.setTo(0.3, 0.3);
    }
}