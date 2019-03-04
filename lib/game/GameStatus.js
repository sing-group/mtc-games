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
import Game from './Game';
import {GameResult} from './GameResult';

const GAME_MODES = Symbol();

export default class GameStatus {
  static get GAME_MODES() {
    if (!GameStatus[GAME_MODES]) {
      GameStatus[GAME_MODES] = {
        NORMAL: 0,
        TUTORIAL: 1
      };

      Object.freeze(GameStatus[GAME_MODES]);
    }

    return GameStatus[GAME_MODES];
  }

  constructor(game) {
    check.assert.instance(game, Game, 'game should be a Game subclass');

    this._game = game;
    this._results = [];
    this._gameMode = GameStatus.GAME_MODES.NORMAL;
  }

  get states() {
    throw new Error('states getter must be implemented in subclasses');
  }

  get game() {
    return this._game;
  }

  get configuration() {
    return this._game.configuration;
  }

  get results() {
    return this._results;
  }

  get gameMode() {
    return this._gameMode;
  }

  setNormalMode() {
    this._gameMode = GameStatus.GAME_MODES.NORMAL;
  }

  setTutorialMode() {
    this._gameMode = GameStatus.GAME_MODES.TUTORIAL;
  }

  hasResults() {
    return this._results.length > 0;
  }

  getLastResult() {
    return this.hasResults() ? this._results[this._results.length - 1] : null;
  }

  canRetry() {
    return this._results.length < this.configuration.numberOfTries;
  }

  _addResult(gameResult) {
    check.assert.instance(gameResult, GameResult, 'gameResult should be a GameResult subclass');

    this._results.push(gameResult);
  }
}
