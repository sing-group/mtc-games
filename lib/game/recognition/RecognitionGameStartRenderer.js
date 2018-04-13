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

import startGameButtonImage from '../../assets/image/game/scene/start/start-game-button-spritesheet.png';
import tutorialButtonImage from '../../assets/image/game/scene/common/tutorial-button-spritesheet.png';
import I18NId from "../../i18n/I18NId";


export default class RecognitionGameStartRenderer extends GameState {

    constructor() {
        super();
    }

    preload() {
        this.game.load.spritesheet("start-game-button", startGameButtonImage, 300, 60);
        this.game.load.spritesheet("tutorial-button", tutorialButtonImage, 300, 60);
        this.game.gameMode = Game.GAME_MODES.NORMAL;
    }

    create() {
        // Background color
        this.game.stage.backgroundColor = "#4488AA";

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

        //  Time Text
        style = {
            font: "bold 24px Arial",
            fill: "#eee",
            boundsAlignH: "left",
            boundsAlignV: "middle"
        };
        this.game.gameDescriptionText = this.game.add.text(
            this.world.width / 2,
            (this.world.height / 12) * 8,
            this.game.i18n.text(I18NId.forGame("standard").param("time").name()) + ": " + this.game.gameConfig.time + "\n" +
            this.game.i18n.text(I18NId.forGame("recognition").param("timePerElement").name()) + ": " + this.game.gameConfig.timePerElement + "\n" +
            this.game.i18n.text(I18NId.forGame("recognition").param("numberOfElements").name()) + ": " + this.game.gameConfig.numberOfElements,
            style
        );
        this.game.gameDescriptionText.anchor.setTo(0.5, 0.5);

        // Start button
        this.game.startGameButton = this.game.add.button(
            (this.world.width / 12) * 3,            
            (this.world.height / 12) * 10,
            'start-game-button',
            this.onStartGame,
            this,
            2,
            1,
            0
        );
        this.game.startGameButton.anchor.setTo(0.5, 0.5);

        // Tutorial button
        this.game.tutorialButton = this.game.add.button(
            (this.world.width / 12) * 9,
            (this.world.height / 12) * 10,
            'tutorial-button',
            this.onStartTutorial,
            this,
            2,
            1,
            0
        );
        this.game.tutorialButton.anchor.setTo(0.5, 0.5);

    }

    update() {

    }

    onStartGame() {
        this.game.gameMode = Game.GAME_MODES.NORMAL;
        this.game.try++;
        this.game.state.start("MainRenderer", true, true);
    }

    onStartTutorial() {
        this.game.gameMode = Game.GAME_MODES.TUTORIAL;
        this.game.state.start("MainRenderer", true, true);
    }
}