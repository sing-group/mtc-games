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

const DEFAULTS = Symbol();

export default class VerbalFluencyGameConfig extends GameConfig {
  static get DEFAULTS() {
    if (!VerbalFluencyGameConfig[DEFAULTS]) {
      VerbalFluencyGameConfig[DEFAULTS] = {
        RESET_CALLBACK: () => {},
        CHECK_CALLBACK: () => {}
      };

      Object.freeze(VerbalFluencyGameConfig[DEFAULTS]);
    }

    return VerbalFluencyGameConfig[DEFAULTS];
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
    resetCallback = VerbalFluencyGameConfig.DEFAULTS.RESET_CALLBACK,
    checkCallback = VerbalFluencyGameConfig.DEFAULTS.CHECK_CALLBACK
  ) {
    super(time, timerVisible, width, height, domId, startCallback, endCallback, locale);

    check.assert.function(resetCallback, 'resetCallback must be a function');
    check.assert.function(checkCallback, 'checkCallback must be a function');

    this._resetCallback = resetCallback;
    this._checkCallback = checkCallback;
  }

  get resetCallback() {
    return this._resetCallback;
  }

  set resetCallback(resetCallback) {
    check.assert.function(resetCallback, 'resetCallback must be a function');

    this._resetCallback = resetCallback;
  }

  get checkCallback() {
    return this._checkCallback;
  }

  set checkCallback(checkCallback) {
    check.assert.function(checkCallback, 'checkCallback must be a function');

    this._checkCallback = checkCallback;
  }
}
