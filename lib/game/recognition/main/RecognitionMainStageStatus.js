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

import StageStatus from '../../StageStatus';
import RecognitionMainCallback from './RecognitionMainCallback';

export default class RecognitionMainStageStatus extends StageStatus {

    constructor(gameStatus, callbacks) {
        super(gameStatus);

        check.assert.instance(callbacks, RecognitionMainCallback);

        this._callbacks = callbacks;

    }

    get secondsElapsed() {
        return (Date.now() - this._startTimestamp) / 1000;
    }

    get secondsLeft() {
        return this.secondsTotal - this.secondsElapsed;
    }

    get secondsTotal() {
        return this.gameStatus.configuration.time;
    }

    get currentWord() {
        return this._currentWord;
    }

    set currentWord(value) {
        this._currentWord = value;
    }

    start() {
        this._startTimestamp = Date.now();

        this._callbacks.onGameStarted();
    }

    finishGame(){
        clearTimeout(this._countdownTimer);
        this._callbacks.onGameFinished({
            gameCompleted: this.secondsLeft > 0,
            totalTries: this.gameStatus.guessed + this.gameStatus.failed,
            guessed: this.gameStatus.guessed,
            failed: this.gameStatus.failed
        })
    }

    startCountdown(){
        this._countdownTimer = setTimeout(
            () => this._callbacks.onGameFinished({

            }),
            this.secondsTotal * 1000
        );
    }

}