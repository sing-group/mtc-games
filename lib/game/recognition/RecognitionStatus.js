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
import check from 'check-types';

import GameStatus from '../GameStatus.js';
import RecognitionGame from './RecognitionGame';
import RecognitionStartRenderer from './start/RecognitionStartRenderer';
import RecognitionStartStageStatus from './start/RecognitionStartStageStatus';
import RecognitionStartCallback from './start/RecognitionStartCallback';
import RecognitionMainRenderer from './main/RecognitionMainRenderer';
import RecognitionMainStageRenderConfiguration from './main/RecognitionMainStageRenderConfiguration';
import RecognitionMainStageStatus from './main/RecognitionMainStageStatus';
import RecognitionMainCallback from './main/RecognitionMainCallback';
import RecognitionEndRenderer from './end/RecognitionEndRenderer';
import RecognitionEndStageStatus from './end/RecognitionEndStageStatus';
import RecognitionEndCallback from './end/RecognitionEndCallback';
import StageRenderConfiguration from '../StageRenderConfiguration';

export default class RecognitionStatus extends GameStatus {

    constructor(game) {
        check.assert.instance(game, RecognitionGame);

        super(game);

        this._results = [];
    }

    startGame() {
        this.gameMode = GameStatus.GAME_MODES.NORMAL;
        this.try++;
    }

    nextTry() {
        this.try++;
    }

    canRetry() {
        return this._results.length < this.configuration.numberOfTries;
    }

    hasResults() {
        return this._results.length > 0;
    }

    getLastResult() {
        return this.hasResults() ? this._results[this._results.length - 1] : null;
    }

    get states() {
        return [
            {
                id: 'StartRenderer',
                renderer: new RecognitionStartRenderer(
                    new StageRenderConfiguration(),
                    new RecognitionStartStageStatus(this, new RecognitionStartCallback({
                        onStartGameRequested: this._onStartGameRequested.bind(this),
                        onStartTutorialRequested: this._onStartTutorialRequested.bind(this)
                    }))
                ),
                default: true
            },
            {
                id: 'MainRenderer',
                renderer: new RecognitionMainRenderer(
                    new RecognitionMainStageRenderConfiguration(),
                    new RecognitionMainStageStatus(this, new RecognitionMainCallback({
                        onGameStarted: this._onGameStarted.bind(this),
                        onGameFinished: this._onGameFinished.bind(this)
                    }))
                ),
                default: false
            },
            {
                id: 'TutorialRenderer',
                renderer: new RecognitionMainRenderer(
                    new RecognitionMainStageRenderConfiguration(),
                    new RecognitionMainStageStatus(this, new RecognitionMainCallback({
                        onGameStarted: this._onTutorialGameStarted.bind(this),
                        onGameFinished: this._onTutorialGameFinished.bind(this)
                    }))
                ),
                default: false
            },
            {
                id: 'EndRenderer',
                renderer: new RecognitionEndRenderer(
                    new StageRenderConfiguration(),
                    new RecognitionEndStageStatus(this, new RecognitionEndCallback({
                        onRetryRequested: this._onRetryRequested.bind(this),
                        onNextTryRequested: this._onNextTryRequested.bind(this)
                    }))
                ),
                default: false
            }
        ]
    }

    _onStartGameRequested() {
        this.startGame();
        this._game.state.start('MainRenderer', true, true);
    }

    _onStartTutorialRequested() {
        this._game.state.start('TutorialRenderer', true, true);
    }

    _onGameStarted() {
        this.configuration.gameCallback.gameStarted();
    }

    _onGameFinished(info) {
        this.configuration.gameCallback.gameFinished(info);

        this._results.push(info);
        this._game.state.start('EndRenderer', true, true);
    }

    _onTutorialGameStarted() {
    }

    _onTutorialGameFinished() {
        this._game.state.start('EndRenderer', true, true);
    }

    _onRetryRequested() {
        if (this.canRetry()) {
            this._game.state.start('StartRenderer', true, true);
        } else {
            console.log('Trying to retry with no retries left');
        }
    }

    _onNextTryRequested() {
        if (this.canRetry()) {
            this.nextTry();
            this._game.state.start('MainRenderer', true, true);
        } else {
            console.log('Trying to retry with no retries left');
        }
    }

    startTutorial() {
        this.gameMode = GameStatus.GAME_MODES.TUTORIAL;
    }

    completeGame() {
        this.gameCompleted = true;
    }

    disableGame() {
        this.gameRunning = false;
    }

    enableGame() {
        this.gameRunning = true;
    }

}