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

import startGameButtonImage from '../../../assets/image/game/scene/start/start-game-button-spritesheet.png';
import tutorialButtonImage from '../../../assets/image/game/scene/common/tutorial-button-spritesheet.png';
import I18NId from '../../../i18n/I18NId';
import RecognitionDesign from "../RecognitionDesign";

export default class RecognitionStartRenderer extends StageRenderer {

    constructor(configuration, status) {
        // check types
        super(configuration, status);
    }

    preload() {
        this.game.load.spritesheet("start-game-button", startGameButtonImage, 300, 60);
        this.game.load.spritesheet("tutorial-button", tutorialButtonImage, 300, 60);
    }

    create() {
        // Background color
        this.game.stage.backgroundColor = RecognitionDesign.COLORS.START_BACKGROUND;

        //  Title Text
        this.gameTitleText = this.game.add.text(
            this.world.width / 2,
            (this.world.height / 12) * 2,
            this.game.i18n.text(I18NId.forGame("recognition").name()),
            RecognitionDesign.TEXT_STYLES.TITLE
        );
        this.gameTitleText.anchor.setTo(0.5, 0.5);

        //  Description Text
        let gameDescriptionTextStyle = RecognitionDesign.TEXT_STYLES.DESCRIPTION;
        gameDescriptionTextStyle.wordWrapWidth = this.world.width * 0.9;
        this.gameDescriptionText = this.game.add.text(
            this.world.width / 2,
            (this.world.height / 12) * 4,
            this.game.i18n.text(I18NId.forGame("recognition").description()),
            gameDescriptionTextStyle
        );
        this.gameDescriptionText.anchor.setTo(0.5, 0.5);

        //  Time Text
        this.gameDescriptionText = this.game.add.text(
            this.world.width / 2,
            (this.world.height / 12) * 8,
            this.game.i18n.text(I18NId.forGame("standard").param("time").name()) + ": " + this.game.configuration.time + "\n" +
            this.game.i18n.text(I18NId.forGame("recognition").param("timePerElement").name()) + ": " + this.game.configuration.timePerElement + "\n" +
            this.game.i18n.text(I18NId.forGame("recognition").param("numberOfElements").name()) + ": " + this.game.configuration.numberOfElements,
            RecognitionDesign.TEXT_STYLES.TIME
        );
        this.gameDescriptionText.anchor.setTo(0.5, 0.5);

        // Start button
        this.startGameButton = this.game.add.button(
            (this.world.width / 12) * 3,
            (this.world.height / 12) * 10,
            'start-game-button',
            this.onStartGame,
            this,
            2,
            1,
            0
        );
        this.startGameButton.anchor.setTo(0.5, 0.5);

        // Tutorial button
        this.tutorialButton = this.game.add.button(
            (this.world.width / 12) * 9,
            (this.world.height / 12) * 10,
            'tutorial-button',
            this.onStartTutorial,
            this,
            2,
            1,
            0
        );
        this.tutorialButton.anchor.setTo(0.5, 0.5);

    }

    update() {

    }

    onStartGame() {
        this.game.status.startGame();
        this.game.state.start("MainRenderer", true, true);
    }

    onStartTutorial() {
        this.game.status.startTutorial();
        this.game.state.start("MainRenderer", true, true);
    }
}