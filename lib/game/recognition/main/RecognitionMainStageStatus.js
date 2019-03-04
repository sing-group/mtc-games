/*
 * MultiTasking Cubes - Games
 * Copyright (C) 2017-2019 - Miguel Reboiro-Jato, Germán Veras Gómez,
 * Andrés Vieira Vázquez, Adolfo Piñón Blanco, Hugo López-Fernández,
 * Rosalía Laza Fidalgo, Reyes Pavón Rial, Francisco Otero Lamas,
 * Adrián Varela Pomar, Carlos Spuch Calvar, and Tania Rivera Baltanás.
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

import check from 'check-types';

import StageStatus from '../../stage/StageStatus';
import RecognitionMainCallback from './RecognitionMainCallback';
import MtcDiceRoller from '../../../dice/MtcDiceRoller';
import RecognitionGameResult from '../RecognitionGameResult';

const PHASES = Symbol();

export default class RecognitionMainStageStatus extends StageStatus {
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

  constructor(gameStatus, callbacks) {
    super(gameStatus);

    check.assert.instance(callbacks, RecognitionMainCallback);

    this._callbacks = callbacks;
    this._isRunning = false;
    this._setDefaultValues();
  }

  _setDefaultValues() {
    this._guessed = 0;
    this._failed = 0;
    this._gameRunning = true;
    this._diceFace = MtcDiceRoller.rollFace();
    this._phase = RecognitionMainStageStatus.PHASES.DICE_SHOW;
    this._isShowingDice = false;
    this._currentDiceIteration = 0;
    this._timeTakenByShow = 0;
    this._dicesToSelectShown = false;
    this._endInfo = null;
  }

  start() {
    this._setDefaultValues();

    this._startTimestamp = Date.now();
    this.enableGame();

    this._callbacks.onGameStarted();
  }

  _startCountdown() {
    this._countdownTimer = setTimeout(
      () => this._callbacks.onGameFinished(new RecognitionGameResult(this.areAllGuessed(), this.guessed, this.failed)),
      this.secondsTotal * 1000
    );
  }

  finishGame() {
    clearTimeout(this._countdownTimer);
    this.disableGame();
    this._callbacks.onGameFinished(new RecognitionGameResult(this.areAllGuessed(), this.guessed, this.failed));
  }

  increaseGuessed() {
    this.guessed++;
    this.checkIfAllGuessed();
  }

  checkIfAllGuessed() {
    if (this.areAllGuessed()) {
      this.finishGame();
    }
  }

  areAllGuessed() {
    return this.guessed == this.gameStatus.configuration.numberOfElements;
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
    return this._diceFace.stimulus;
  }

  get stimulusValues() {
    return this._diceFace.values;
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
