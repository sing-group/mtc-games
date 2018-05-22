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

import GameStatus from '../GameStatus';
import VerbalFluencyGame from './VerbalFluencyGame';
import VerbalFluencyDictionary from './VerbalFluencyDictionary';
import VerbalFluencyStartRenderer from './start/VerbalFluencyStartRenderer';
import VerbalFluencyStartStageStatus from './start/VerbalFluencyStartStageStatus';
import VerbalFluencyStartCallback from './start/VerbalFluencyStartCallback';
import VerbalFluencyMainRenderer from './main/VerbalFluencyMainRenderer';
import VerbalFluencyMainStageRenderConfiguration from './main/VerbalFluencyMainStageRenderConfiguration';
import VerbalFluencyMainStageStatus from './main/VerbalFluencyMainStageStatus';
import VerbalFluencyMainCallback from './main/VerbalFluencyMainCallback';
import VerbalFluencyEndRenderer from './end/VerbalFluencyEndRenderer';
import VerbalFluencyEndStageStatus from './end/VerbalFluencyEndStageStatus';
import VerbalFluencyEndCallback from './end/VerbalFluencyEndCallback';
import VerbalFluencyGameCallback from './VerbalFluencyGameCallback';
import StageRenderConfiguration from '../StageRenderConfiguration';

export default class VerbalFluencyStatus extends GameStatus {

    constructor(game) {
        check.assert.instance(game, VerbalFluencyGame);

        super(game);

        this._results = [];

        if (typeof VerbalFluencyDictionary[this.configuration.locale] === 'undefined') {
            this._validWords = VerbalFluencyDictionary.en_US;
        } else {
            this._validWords = VerbalFluencyDictionary[this.configuration.locale];
        }
    }

    get validWords() {
        return this._validWords;
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
                renderer: new VerbalFluencyStartRenderer(
                    new StageRenderConfiguration(),
                    new VerbalFluencyStartStageStatus(this, new VerbalFluencyStartCallback({
                        onStartGameRequested: this._onStartGameRequested.bind(this),
                        onStartTutorialRequested: this._onStartTutorialRequested.bind(this)
                    }))
                ),
                default: true
            },
            {
                id: 'MainRenderer',
                renderer: new VerbalFluencyMainRenderer(
                    new VerbalFluencyMainStageRenderConfiguration(),
                    new VerbalFluencyMainStageStatus(this, new VerbalFluencyMainCallback({
                        onGameStarted: this._onGameStarted.bind(this),
                        onGameFinished: this._onGameFinished.bind(this),
                        onWordChecked: this._onWordChecked.bind(this),
                        onWordReset: this._onWordReset.bind(this)
                    }))
                ),
                default: false
            },
            {
                id: 'TutorialRenderer',
                renderer: new VerbalFluencyMainRenderer(
                    new VerbalFluencyMainStageRenderConfiguration(),
                    new VerbalFluencyMainStageStatus(this, new VerbalFluencyMainCallback({
                        onGameStarted: this._onTutorialGameStarted.bind(this),
                        onGameFinished: this._onTutorialGameFinished.bind(this),
                        onWordChecked: this._onTutorialWordChecked.bind(this),
                        onWordReset: this._onTutorialWordReset.bind(this)
                    }))
                ),
                default: false
            },
            {
                id: 'EndRenderer',
                renderer: new VerbalFluencyEndRenderer(
                    new StageRenderConfiguration(),
                    new VerbalFluencyEndStageStatus(this, new VerbalFluencyEndCallback({
                        onRetryRequested: this._onRetryRequested.bind(this)
                    }))
                ),
                default: false
            }
        ];
    }

    _onStartGameRequested() {
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

    _onWordChecked(info) {
        this.configuration.gameCallback.wordChecked(info);
    }

    _onWordReset(info) {
        this.configuration.gameCallback.wordReset(info);
    }

    _onTutorialGameStarted() {}

    _onTutorialGameFinished() {
        this._game.state.start('EndRenderer', true, true);
    }

    _onTutorialWordChecked() {}

    _onTutorialWordReset() {}

    _onRetryRequested() {
        if (this.canRetry()) {
            this._game.state.start('StartRenderer', true, true);
        } else {
            console.log('Trying to retry with no retries left');
        }
    }
}