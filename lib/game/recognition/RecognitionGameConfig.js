/*
 * MultiTasking Cubes - Games
 * Copyright (C) 2017 - Miguel Reboiro-Jato, Andrés Vieira Vázquez,
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
import GameConfig from '../GameConfig.js';
import check from "check-types";
import MtcDiceFace from "../../dice/MtcDiceFace";

const DEFAULTS = Symbol();
const RESPONSE_TYPES = Symbol();

export default class RecognitionGameConfig extends GameConfig {

  static get DEFAULTS() {
    if (!RecognitionGameConfig[DEFAULTS]) {
      RecognitionGameConfig[DEFAULTS] = {
        TIME_PER_ELEMENT: 3,
        NUMBER_OF_ELEMENTS: 2,
        NUMBER_OF_RETRIES: 1,
        RESPONSE_INTRODUCTION: RecognitionGameConfig.RESPONSE_TYPES.NORMAL
      };

      Object.freeze(RecognitionGameConfig[DEFAULTS]);
    }

    return RecognitionGameConfig[DEFAULTS];
  }

  static get RESPONSE_TYPES() {
    if (!RecognitionGameConfig[RESPONSE_TYPES]) {
      RecognitionGameConfig[RESPONSE_TYPES] = {
        NORMAL: 0,
        STERNBERG: 1,
        count() {
          return 2;
        }
      };

      Object.freeze(RecognitionGameConfig[RESPONSE_TYPES]);
    }

    return RecognitionGameConfig[RESPONSE_TYPES];
  }

  constructor(
    time = GameConfig.DEFAULTS.TIME,
    timerVisible = GameConfig.DEFAULTS.TIMER_VISIBLE,
    width = GameConfig.DEFAULTS.WIDTH,
    height = GameConfig.DEFAULTS.HEIGHT,
    domId = GameConfig.DEFAULTS.DOM_ID,
    startCallback = GameConfig.DEFAULTS.START_CALLBACK,
    endCallback = GameConfig.DEFAULTS.END_CALLBACK,
    locale = GameConfig.DEFAULTS.LOCALE,
    timePerElement = RecognitionGameConfig.DEFAULTS.TIME_PER_ELEMENT,
    numberOfElements = RecognitionGameConfig.DEFAULTS.NUMBER_OF_ELEMENTS,
    numberOfTries = RecognitionGameConfig.DEFAULTS.NUMBER_OF_RETRIES,
    responseIntroduction = RecognitionGameConfig.DEFAULTS.RESPONSE_INTRODUCTION
  ) {
    super(time, timerVisible, width, height, domId, startCallback, endCallback, locale);

    this.timePerElement = timePerElement;
    this.numberOfElements = numberOfElements;
    this.numberOfTries = numberOfTries;
    this.responseIntroduction = responseIntroduction;
  }

  get timePerElement() {
    return this._timePerElement;
  }

  set timePerElement(timePerElement) {
    check.assert.positive(timePerElement, 'timePerElement must be a positive number');

    this._timePerElement = timePerElement;
  }

  get numberOfElements() {
    return this._numberOfElements;
  }

  set numberOfElements(numberOfElements) {
    check.assert.inRange(numberOfElements, 1, MtcDiceFace.COUNT_VALUES,
      'numberOfElements must be a number between 1 and ' + MtcDiceFace.COUNT_VALUES);

    this._numberOfElements = numberOfElements;
  }

  get numberOfTries() {
    return this._numberOfTries;
  }

  set numberOfTries(numberOfTries) {
    check.assert.positive(numberOfTries, 'numberOfTries must be a positive number');

    this._numberOfTries = numberOfTries;
  }

  get responseIntroduction() {
    return this._responseIntroduction;
  }

  set responseIntroduction(responseIntroduction) {
    check.assert.inRange(responseIntroduction, 0, RecognitionGameConfig.RESPONSE_TYPES.count() - 1,
      'responseIntroduction must be a number between 0 and X' + RecognitionGameConfig.RESPONSE_TYPES.count() - 1);

    this._responseIntroduction = responseIntroduction;
  }

}
