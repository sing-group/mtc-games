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

import {RecognitionSternbergMainCallback} from './RecognitionSternbergMainCallback';
import {RecognitionSternbergGameResult} from '../RecognitionSternbergGameResult';
import {StageStatus} from '../../../game/stage';
import {MtcDiceFace, MtcDiceRoller} from '../../../dice';

const PHASES = Symbol();

export class RecognitionSternbergMainStageStatus extends StageStatus {
  static get PHASES() {
    if (!RecognitionSternbergMainStageStatus[PHASES]) {
      RecognitionSternbergMainStageStatus[PHASES] = {
        DICE_SHOW: 0,
        DICE_SELECT: 1,
        COUNTDOWN_TO_START: 2,
        DICE_RESULT: 3
      };

      Object.freeze(RecognitionSternbergMainStageStatus[PHASES]);
    }

    return RecognitionSternbergMainStageStatus[PHASES];
  }

  constructor(gameStatus, callbacks) {
    super(gameStatus);

    check.assert.instance(callbacks, RecognitionSternbergMainCallback);

    this._callbacks = callbacks;
    this._isRunning = false;
    this._setDefaultValues();
  }

  _setDefaultValues() {
    this._guessed = 0;
    this._failed = 0;
    this._falsePositives = 0;
    this._gameRunning = true;
    this._diceFace = this._diceFace || MtcDiceRoller.rollFace();
    this._phase = RecognitionSternbergMainStageStatus.PHASES.DICE_SHOW;
    this._isShowingDice = false;
    this._isShowingCandidate = false;
    this._isShowingValidation = false;
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
      () => this._callbacks.onGameFinished(new RecognitionSternbergGameResult(this.areAllGuessed(), this.guessed, this.failed, this.falsePositives)),
      this.secondsTotal * 1000
    );
  }

  finishGame() {
    clearTimeout(this._countdownTimer);
    this.disableGame();
    this._callbacks.onGameFinished(new RecognitionSternbergGameResult(this.areAllGuessed(), this.guessed, this.failed, this.falsePositives));
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
    return this.guessed === this.gameStatus.configuration.numberOfElements;
  }

  increaseFailed() {
    this.failed++;
  }

  increaseFalsePositives() {
    this.falsePositives++;
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

  get falsePositives() {
    return this._falsePositives;
  }

  set falsePositives(value) {
    this._falsePositives = value;
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

  set stimulus(value) {
    let stimulusArray = value.split('.');
    stimulusArray.reverse();
    switch (stimulusArray[0]) {
      case (MtcDiceFace.NUMBERS_FACE_STIMULUS):
        this._diceFace = MtcDiceFace.NUMBERS_FACE;
        break;
      case (MtcDiceFace.LETTERS_FACE_STIMULUS):
        this._diceFace = MtcDiceFace.LETTERS_FACE;
        break;
      case (MtcDiceFace.TRIGRAMS_FACE_STIMULUS):
        this._diceFace = MtcDiceFace.TRIGRAMS_FACE;
        break;
      case (MtcDiceFace.COLORS_FACE_STIMULUS):
        this._diceFace = MtcDiceFace.COLORS_FACE;
        break;
      case (MtcDiceFace.WORDS_FACE_STIMULUS):
        this._diceFace = MtcDiceFace.WORDS_FACE;
        break;
      case (MtcDiceFace.TOOLS_FACE_STIMULUS):
        this._diceFace = MtcDiceFace.TOOLS_FACE;
        break;
      default:
        this._diceFace = MtcDiceRoller.rollFace();
        break;
    }
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

  get isShowingCandidate() {
    return this._isShowingCandidate;
  }

  set isShowingCandidate(value) {
    this._isShowingCandidate = value;
  }

  get isShowingValidation() {
    return this._isShowingValidation;
  }

  set isShowingValidation(value) {
    this._isShowingValidation = value;
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
