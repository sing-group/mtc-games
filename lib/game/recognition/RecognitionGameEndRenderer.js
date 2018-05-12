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

import endButtonImage from '../../assets/image/game/scene/end/end-tutorial-button-spritesheet.png';
import retryButtonImage from '../../assets/image/game/scene/end/retry-game-button-spritesheet.png';
import I18NId from '../../i18n/I18NId';
import GameStatus from '../GameStatus.js';

export default class RecognitionGameEndRenderer extends GameRenderer {

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
            this.game.i18n.text(I18NId.forGame("recognition").name()),
            style
        );
        this.game.gameTitleText.setShadow(0, 3, 'rgba(0,0,0,0.5)', 2);
        this.game.gameTitleText.anchor.setTo(0.5, 0.5);

        //  Description Text
        style = {
            font: "bold 24px Arial",
            fill: "#eee",
            boundsAlignH: "center",
            boundsAlignV: "middle",
            wordWrap: true,
            wordWrapWidth: this.world.width * 0.9
        };
        this.game.gameDescriptionText = this.game.add.text(
            this.world.width / 2,
            (this.world.height / 12) * 4,
            this.game.i18n.text(I18NId.forGame("recognition").description()),
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
            this.game.i18n.text(I18NId.forGame("recognition").result("gameCompleted").name()) + ": " + (this.game.status.endInfo.gameCompleted ? this.game.i18n.text("yes") : this.game.i18n.text("no")) + "\n" +
            this.game.i18n.text(I18NId.forGame("recognition").result("totalTries").name()) + ": " + this.game.status.endInfo.totalTries + "\n" +
            this.game.i18n.text(I18NId.forGame("recognition").result("guessedStimulus").name()) + ": " + this.game.status.endInfo.guessed + "\n" +
            this.game.i18n.text(I18NId.forGame("recognition").result("failedStimulus").name()) + ": " + this.game.status.endInfo.failed,
            style
        );
        this.game.gameDescriptionText.anchor.setTo(0.5, 0.5);

        if (this.game.status.gameMode == GameStatus.GAME_MODES.TUTORIAL) {
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
        } else if (this.game.status.gameMode == GameStatus.GAME_MODES.NORMAL) {
            // Retry button
            if (this.game.status.try < this.game.status.config.numberOfTries) {
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
        this.game.status.retryGame();
        this.game.state.start("MainRenderer");
    }

    onEndTutorial() {
        this.game.state.start("StartRenderer");
    }

}