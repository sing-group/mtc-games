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
        this.currentWord = "";
        this.letterSprites = new Array();
    }

    preload() {
        // Preloading all the image assets for letters
        for (let i = 0, len = this.letters.length; i < len; i++) {
            this.game.load.image("letter-" + this.letters[i], "assets/img/letra_" + this.letters[i].toUpperCase() + ".jpg");
        }
    }

    create() {
        // Add time text
        this.game.timeText = this.game.add.text(15, 15,
            "Remaining time: " + this.game.gameConfig.time,
            {
                font: "24px Arial",
                fill: "#FFFFFF",
                align: "center"
            }
        );

        // Add the current word display text
        this.game.currentWordText = this.game.add.text(15, this.game.world.height - 30,
            "Current Word: " + this.currentWord,
            {
                font: "24px Arial",
                fill: "#FFFFFF",
                align: "center"
            }
        );

        // Add letter sprites to the game
        for (let i = 0, len = this.letters.length; i < len; i++) {
            let currentSprite = this.game.add.sprite(70 * i, 50, "letter-" + this.letters[i]);
            currentSprite.scale.setTo(0.3, 0.3)
            currentSprite.inputEnabled = true;
            currentSprite.events.onInputDown.add(this.onLetterClick, this);
            this.letterSprites.push(currentSprite);
        }
    }

    update() {
        // Calculate the remaining time and set the text accordingly
        let remainingTime = this.game.gameConfig.time - this.game.elapsedTime();
        this.game.timeText.setText(
            remainingTime > 0 ? "Remaining time: " + (this.game.gameConfig.time - this.game.elapsedTime()) : "Time's up"
        );
    }

    onLetterClick(clickedSprite) {
        // Calculate the pressed letter and append it to the current word
        let pressedLetter = clickedSprite.key.split("-")[1].toUpperCase();
        this.currentWord += pressedLetter;
        this.game.currentWordText.setText("Current Word: " + this.currentWord);
    }

}