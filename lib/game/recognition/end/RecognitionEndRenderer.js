/*
 * MultiTasking Cubes - Games
 * Copyright (C) 2017-2019 - Miguel Reboiro-Jato, Andrés Vieira Vázquez,
 * Adolfo Piñón Blanco, Hugo López-Fernández, Rosalía Laza Fidalgo,
 *  Reyes Pavón Rial, Francisco Otero Lamas, Adrián Varela Pomar,
 *  Carlos Spuch Calvar, and Tania Rivera Baltanás
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

import StageRenderer from '../../StageRenderer';
import GameStatus from '../../GameStatus';

import endButtonImage from '../../../assets/image/game/scene/end/end-tutorial-button-spritesheet.png';
import retryButtonImage from '../../../assets/image/game/scene/end/retry-game-button-spritesheet.png';
import I18NId from '../../../i18n/I18NId';
import RecognitionDesign from "../RecognitionDesign";

export default class RecognitionGameEndRenderer extends StageRenderer {

    constructor(configuration, status) {
        // check types
        super(configuration, status);
    }

    preload() {
        this.game.load.spritesheet("end-tutorial-button", endButtonImage, 300, 60);
        this.game.load.spritesheet("retry-game-button", retryButtonImage, 300, 60);
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
        this.gameDescriptionText = this.game.add.text(
            this.world.width / 2,
            (this.world.height / 12) * 4,
            this.game.i18n.text(I18NId.forGame("recognition").description()),
            RecognitionDesign.TEXT_STYLES.DESCRIPTION
        );
        this.gameDescriptionText.anchor.setTo(0.5, 0.5);

        //  Results Text
        if (this.status.hasResults()) {
            const result = this.status.getLastResult();

            this.gameDescriptionText = this.game.add.text(
                this.world.width / 2,
                (this.world.height / 12) * 8,
                this.game.i18n.text(I18NId.forGame("recognition").result("gameCompleted").name()) + ": " + (result.gameCompleted ? this.game.i18n.text("yes") : this.game.i18n.text("no")) + "\n" +
                this.game.i18n.text(I18NId.forGame("recognition").result("totalTries").name()) + ": " + result.totalTries + "\n" +
                this.game.i18n.text(I18NId.forGame("recognition").result("guessedStimulus").name()) + ": " + result.guessed + "\n" +
                this.game.i18n.text(I18NId.forGame("recognition").result("failedStimulus").name()) + ": " + result.failed,
                RecognitionDesign.TEXT_STYLES.RESULTS
            );
            this.gameDescriptionText.anchor.setTo(0.5, 0.5);
        }

        if (this.status.gameMode() === GameStatus.GAME_MODES.TUTORIAL) {
            // End Tutorial button
            this.endTutorialButton = this.game.add.button(
                (this.world.width / 12) * 6,
                (this.world.height / 12) * 10,
                'end-tutorial-button',
                this.onEndTutorial,
                this,
                2,
                1,
                0
            );
            this.endTutorialButton.anchor.setTo(0.5, 0.5);
        } else if (this.status.gameMode() === GameStatus.GAME_MODES.NORMAL) {
            // Retry button
            if (this.game.status.canRetry()) {
                this.startGameButton = this.game.add.button(
                    this.world.width / 2,
                    (this.world.height / 12) * 10,
                    'retry-game-button',
                    this.onRetryGame,
                    this,
                    2,
                    1,
                    0
                );
                this.startGameButton.anchor.setTo(0.5, 0.5);
            }
        }
    }

    update() {

    }

    onRetryGame() {
        this.status.nextTry();
    }

    onEndTutorial() {
        this.status.retry();
    }

}
