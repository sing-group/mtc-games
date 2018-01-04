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

import endButtonImage from '../../assets/image/game/scene/end/end-tutorial-button-spritesheet.png';
import retryButtonImage from '../../assets/image/game/scene/end/retry-game-button-spritesheet.png';

export default class RecognitionGameEndState extends GameState {

    constructor() {
        super();
    }

    preload() {
        this.game.load.spritesheet("end-tutorial-button", endButtonImage, 300, 60);
        this.game.load.spritesheet("retry-game-button", retryButtonImage, 300, 60);
    }

    create() {
        // Background color
        this.game.stage.backgroundColor = "#24486A";

        //  Title Text
        let style = {
            font: "bold 32px Arial",
            fill: "#fff",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };
        this.game.gameTitleText = this.game.add.text(
            this.world.width / 2,
            (this.world.height / 12) * 2,
            this.game.i18n.text("game.recognition.name"),
            style
        );
        this.game.gameTitleText.setShadow(0, 3, 'rgba(0,0,0,0.5)', 2);
        this.game.gameTitleText.anchor.setTo(0.5, 0.5);

        //  Description Text
        style = {
            font: "bold 24px Arial",
            fill: "#eee",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };
        this.game.gameDescriptionText = this.game.add.text(
            this.world.width / 2,
            (this.world.height / 12) * 3,
            this.game.i18n.text("game.recognition.description"),
            style
        );
        this.game.gameDescriptionText.anchor.setTo(0.5, 0.5);

        //  Results Text
        style = {
            font: "bold 24px Arial",
            fill: "#eee",
            boundsAlignH: "left",
            boundsAlignV: "middle"
        };
        this.game.gameDescriptionText = this.game.add.text(
            this.world.width / 2,
            (this.world.height / 12) * 8,
            "Game completed" + ": " + (this.game.endInfo.gameCompleted ? "Yes" : "No") + "\n" +
            "Total tries" + ": " + this.game.endInfo.totalTries + "\n" +
            "Guessed stimulus" + ": " + this.game.endInfo.guessed + "\n" +
            "Failed stimulus" + ": " + this.game.endInfo.failed,
            style
        );
        this.game.gameDescriptionText.anchor.setTo(0.5, 0.5);

        if (this.game.gameMode == Game.GAME_MODES.TUTORIAL) {
            // End Tutorial button
            this.game.endTutorialButton = this.game.add.button(
                (this.world.width / 12) * 6,
                (this.world.height / 12) * 10,
                'end-tutorial-button',
                this.onEndTutorial,
                this,
                2,
                1,
                0
            );
            this.game.endTutorialButton.anchor.setTo(0.5, 0.5);
        } else if (this.game.gameMode == Game.GAME_MODES.NORMAL) {
            // Retry button
            if (this.game.try < this.game.gameConfig.numberOfTries) {
                this.game.startGameButton = this.game.add.button(
                    this.world.width / 2,
                    (this.world.height / 12) * 10,
                    'retry-game-button',
                    this.onRetryGame,
                    this,
                    2,
                    1,
                    0
                );
                this.game.startGameButton.anchor.setTo(0.5, 0.5);
            }
        }
    }

    update() {

    }

    onRetryGame() {
        this.game.state.start("MainState");
        this.game.try++;
    }

    onEndTutorial() {
        this.game.state.start("StartState");
    }

}
