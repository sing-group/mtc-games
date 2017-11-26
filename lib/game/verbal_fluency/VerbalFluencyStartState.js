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
import VerbalFluencyMainState from './VerbalFluencyMainState.js';


export default class VerbalFluencyStartState extends GameState {

    constructor() {
        super();
    }

    preload() {
        this.game.load.spritesheet("start-game-button", "assets/img/start-game-button-spritesheet.png", 300, 60);
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
            this.game.i18N.text("game.verbalFluency.name"),
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
            this.game.i18N.text("game.verbalFluency.description"),
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
            this.game.i18N.text("param.time.name") + ": " + this.game.gameConfig.time,
            style
        );
        this.game.gameDescriptionText.anchor.setTo(0.5, 0.5);

        // Start button
        this.game.startGameButton = this.game.add.button(
            this.world.width / 2,
            (this.world.height / 12) * 10,
            'start-game-button',
            this.onStartGame,
            this,
            2,
            1,
            0
        );
        this.game.startGameButton.anchor.setTo(0.5, 0.5);

    }

    update() {

    }

    onStartGame() {
        this.game.state.start("MainState");
    }
}