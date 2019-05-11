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

import {CalculusMainCallback} from './CalculusMainCallback';
import {CalculusGameResult} from '../CalculusGameResult';
import {StageStatus} from '../../../game/stage';
import {MtcDiceFace} from "../../../dice";

const PHASES = Symbol();
const OPERATORS = Symbol();
const OPERATORS_VALUES = Symbol();
const OPERATORS_ARRAY = Symbol();

export class CalculusMainStageStatus extends StageStatus {
  static get PHASES() {
    if (!CalculusMainStageStatus[PHASES]) {
      CalculusMainStageStatus[PHASES] = {
        OPERATION_SHOW: 0,
        OPERATION_RESPONSE: 1,
        OPERATION_CHECK: 2
      };

      Object.freeze(CalculusMainStageStatus[PHASES]);
    }

    return CalculusMainStageStatus[PHASES];
  }

  static get OPERATORS() {
    if (!CalculusMainStageStatus[OPERATORS]) {
      CalculusMainStageStatus[OPERATORS] = {
        ADDITION: 'addition',
        MULTIPLICATION: 'multiplication',
        SUBTRACTION: 'subtraction'
      };

      Object.freeze(CalculusMainStageStatus[OPERATORS]);
    }

    return CalculusMainStageStatus[OPERATORS];
  }

  static get OPERATORS_VALUES() {
    if (!CalculusMainStageStatus[OPERATORS_VALUES]) {
      CalculusMainStageStatus[OPERATORS_VALUES] = {
        0: CalculusMainStageStatus.OPERATORS.ADDITION,
        1: CalculusMainStageStatus.OPERATORS.MULTIPLICATION,
        2: CalculusMainStageStatus.OPERATORS.SUBTRACTION
      };

      Object.freeze(CalculusMainStageStatus[OPERATORS_VALUES]);
    }

    return CalculusMainStageStatus[OPERATORS_VALUES];
  }

  static get OPERATORS_ARRAY() {
    if (!CalculusMainStageStatus[OPERATORS_ARRAY]) {
      CalculusMainStageStatus[OPERATORS_ARRAY] = [
        CalculusMainStageStatus.OPERATORS.ADDITION,
        CalculusMainStageStatus.OPERATORS.MULTIPLICATION,
        CalculusMainStageStatus.OPERATORS.SUBTRACTION
      ];

      Object.freeze(CalculusMainStageStatus[OPERATORS_ARRAY]);
    }

    return CalculusMainStageStatus[OPERATORS_ARRAY];
  }

  constructor(gameStatus, callbacks) {
    super(gameStatus);

    check.assert.instance(callbacks, CalculusMainCallback);

    this._callbacks = callbacks;
    this._isRunning = false;
    this._setDefaultValues();
  }

  _setDefaultValues() {
    this._guessed = 0;
    this._failed = 0;
    this._gameRunning = true;
    this._diceFace = MtcDiceFace.NUMBERS_FACE;
    this._operators = CalculusMainStageStatus.OPERATORS;
    this._operatorsValues = CalculusMainStageStatus.OPERATORS_VALUES;
    this._phase = CalculusMainStageStatus.PHASES.OPERATION_SHOW;
    this._isShowingOperation = false;
    this._isShowingResponse = false;
    this._isShowingValidation = false;
    this._currentOperationIteration = 0;
    this._endInfo = null;
  }

  start() {
    this._setDefaultValues();

    this.enableGame();

    this._callbacks.onGameStarted();
  }

  finishGame() {
    this.disableGame();
    this._callbacks.onGameFinished(new CalculusGameResult(this.areAllGuessed(), this.guessed, this.failed));
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
    return this.guessed === this.gameStatus.configuration.numberOfOperations;
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

  get stimulus() {
    return this._diceFace.stimulus;
  }

  get operators() {
    return this._operators;
  }

  get operatorsValues() {
    return this._operatorsValues;
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

  get totalAttempts() {
    return this._guessed + this._failed;
  }

  get gameRunning() {
    return this._gameRunning;
  }

  set gameRunning(value) {
    this._gameRunning = value;
  }

  get stimulusValues() {
    return this._diceFace.values;
  }

  get isShowingOperation() {
    return this._isShowingOperation;
  }

  set isShowingOperation(value) {
    this._isShowingOperation = value;
  }

  get isShowingResponse() {
    return this._isShowingResponse;
  }

  set isShowingResponse(value) {
    this._isShowingResponse = value;
  }

  get isShowingValidation() {
    return this._isShowingValidation;
  }

  set isShowingValidation(value) {
    this._isShowingValidation = value;
  }

  get currentOperationIteration() {
    return this._currentOperationIteration;
  }

  set currentOperationIteration(value) {
    this._currentOperationIteration = value;
  }

  get gameCompleted() {
    return this._gameCompleted;
  }

  set gameCompleted(value) {
    this._gameCompleted = value;
  }

  get phase() {
    return this._phase;
  }

  set phase(value) {
    this._phase = value;
  }
}
