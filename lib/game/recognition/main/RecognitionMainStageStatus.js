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
import MtcDiceFace from "../../../dice/MtcDiceFace";

const PHASES = Symbol();

export default class RecognitionMainStageStatus extends StageStatus {

    constructor(gameStatus, callbacks) {
        super(gameStatus);

        check.assert.instance(callbacks, RecognitionMainCallback);

        this._callbacks = callbacks;
        this._isRunning = false;
        this.set_default_values();

    }

    static get PHASES() {
        if (!RecognitionMainStageStatus[PHASES]) {
            RecognitionMainStageStatus[PHASES] = {
                DICE_SHOW: 0,
                DICE_SELECT: 1
            };

            Object.freeze(RecognitionMainStageStatus[PHASES]);
        }

        return RecognitionMainStageStatus[PHASES];
    }

    static select_random_stimulus() {
        let possible_stimuli = [
            "letter",
            "number",
            "color",
            "trigram",
            "word",
            "tool"
        ];
        return possible_stimuli[Math.floor((Math.random() * possible_stimuli.length))]
    }

    set_default_values() {
        this._guessed = 0;
        this._failed = 0;
        this._gameRunning = true;
        this._stimulus = RecognitionMainStageStatus.select_random_stimulus();
        this._stimulus_values = null;
        this._phase = RecognitionMainStageStatus.PHASES.DICE_SHOW;
        this._isShowingDice = false;
        this._currentDiceIteration = 0;
        this._timeTakenByShow = 0;
        this._dicesToSelectShown = false;
        this._gameCompleted = false;
        this._endInfo = null;

        switch (this.stimulus) {
            case "letter":
                this._stimulus_values = MtcDiceFace.LETTERS_FACE_VALUES;
                break;
            case "number":
                this._stimulus_values = MtcDiceFace.NUMBERS_FACE_VALUES;
                break;
            case "color":
                this._stimulus_values = MtcDiceFace.COLORS_FACE_VALUES;
                break;
            case "trigram":
                this._stimulus_values = MtcDiceFace.SYLLABLES_FACE_VALUES;
                break;
            case "word":
                this._stimulus_values = MtcDiceFace.WORDS_FACE_VALUES;
                break;
            case "tool":
                this._stimulus_values = MtcDiceFace.TOOLS_FACE_VALUES;
                break;
        }
    }

    start() {
        this._startTimestamp = Date.now();
        this.enableGame();

        this.startCountdown();

        this.set_default_values();
        this._callbacks.onGameStarted();
    }

    finishGame() {
        clearTimeout(this._countdownTimer);
        this.disableGame();
        this.gameStatus.completeGame();
        this._callbacks.onGameFinished({
            gameCompleted: this.gameCompleted,
            totalTries: this.guessed + this.failed,
            guessed: this.guessed,
            failed: this.failed
        })
    }

    startCountdown() {
        this._countdownTimer = setTimeout(
            () => this._callbacks.onGameFinished({
                gameCompleted: this.gameCompleted,
                totalTries: this.guessed + this.failed,
                guessed: this.guessed,
                failed: this.failed
            }),
            this.secondsTotal * 1000
        );
    }

    increaseGuessed() {
        this.guessed++;
        this.checkIfAllGuessed();
    }

    checkIfAllGuessed() {
        if (this.guessed === this.gameStatus.configuration.numberOfElements) {
            this.finishGame()
        }
    }

    increaseFailed() {
        this.failed++;
    }

    isRunning() {
        return this._isRunning;
    }

    enableGame() {
        this._isRunning = true;
    }

    disableGame() {
        this._isRunning = false;
    }

    get try() {
        return this._try;
    }

    set try(value) {
        this._try = value;
    }

    get gameMode() {
        return this._gameMode;
    }

    set gameMode(value) {
        this._gameMode = value;
    }

    get endInfo() {
        return this._endInfo;
    }

    set endInfo(value) {
        this._endInfo = value;
    }

    get diceScaleShown() {
        return this._diceScaleShown;
    }

    set diceScaleShown(value) {
        this._diceScaleShown = value;
    }

    get diceScale() {
        return this._diceScale;
    }

    set diceScale(value) {
        this._diceScale = value;
    }

    get guessed() {
        return this._guessed;
    }

    set guessed(value) {
        this._guessed = value;
    }

    get failed() {
        return this._failed;
    }

    set failed(value) {
        this._failed = value;
    }

    get gameRunning() {
        return this._gameRunning;
    }

    set gameRunning(value) {
        this._gameRunning = value;
    }

    get stimulus() {
        return this._stimulus;
    }

    set stimulus(value) {
        this._stimulus = value;
    }

    get stimulus_values() {
        return this._stimulus_values;
    }

    set stimulus_values(value) {
        this._stimulus_values = value;
    }

    get isShowingDice() {
        return this._isShowingDice;
    }

    set isShowingDice(value) {
        this._isShowingDice = value;
    }

    get currentDiceIteration() {
        return this._currentDiceIteration;
    }

    set currentDiceIteration(value) {
        this._currentDiceIteration = value;
    }

    get timeTakenByShow() {
        return this._timeTakenByShow;
    }

    set timeTakenByShow(value) {
        this._timeTakenByShow = value;
    }

    get dicesToSelectShown() {
        return this._dicesToSelectShown;
    }

    set dicesToSelectShown(value) {
        this._dicesToSelectShown = value;
    }

    get gameCompleted() {
        return this._gameCompleted;
    }

    set gameCompleted(value) {
        this._gameCompleted = value;
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

    get phase() {
        return this._phase;
    }

    set phase(value) {
        this._phase = value;
    }

}