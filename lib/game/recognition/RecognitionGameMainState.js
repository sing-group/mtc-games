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
import VerbalFluencyDictionary from '../verbal_fluency/VerbalFluencyDictionary';

export default class RecognitionGameMainState extends GameState {


    constructor() {
        super();
        this.DICE_SCALE = 0.25;
    }

    preload() {
        // Preloading all the image assets for letters
        for (let i = 0, len = MtcDiceFace.LETTERS_FACE_VALUES.length; i < len; i++) {
            this.game.load.image("letter-" + MtcDiceFace.LETTERS_FACE_VALUES[i].toLowerCase(), "assets/img/letra_" + MtcDiceFace.LETTERS_FACE_VALUES[i].toUpperCase() + ".jpg");
        }

        // TODO: Load images for the rest of types of faces

        this.game.load.image("background", "assets/img/background-tiled.jpg");
        this.game.load.image("time-frame", "assets/img/time-frame.png");
        this.game.load.image("score-frame", "assets/img/score-frame.png");
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
        this.game.timeText = this.game.add.text(0,0,
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
        this.game.scoreText = this.game.add.text(0,0,
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
        this.updateScore();
        if (remainingTime <= 0 && this.gameRunning) {
            this.disableGame();
            this.onGameEndCallback();
            this.gameRunning = false;
        }
    }

    updateScore(){
        this.game.scoreText.text = "0 / 0";
        this.game.scoreText.addColor('#00FF00', 0);
        this.game.scoreText.addColor('#FFFFFF', this.game.scoreText.text.indexOf("/"));
        this.game.scoreText.addColor('#FF0000', this.game.scoreText.text.indexOf("/") + 1);
    }

    disableGame() {
        //Ensure you cant play
        // TODO: Adapt for this game
    }

    onGameEndCallback(){
        let info = {
        }

        if(this.game.gameConfig.gameEndCallbackFunction != null){
            this.game.gameConfig.gameEndCallbackFunction(info);
        }
    }
}