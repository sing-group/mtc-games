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

import {GameResult} from '../../game/GameResult';
import check from 'check-types';

export class RecognitionSternbergGameResult extends GameResult {
  constructor(gameCompleted, guessed, failed, falsePositives) {
    super(['gameCompleted', 'guessed', 'failed', 'falsePositives', 'totalTries']);

    check.assert.boolean(gameCompleted, 'gameCompleted should be a boolean value');
    check.assert.greaterOrEqual(guessed, 0, 'guessed should be positive');
    check.assert.greaterOrEqual(failed, 0, 'failed should be positive');
    check.assert.greaterOrEqual(falsePositives, 0, 'falsePositives should be positive');

    this._gameCompleted = gameCompleted;
    this._guessed = guessed;
    this._failed = failed;
    this._falsePositives = falsePositives;
  }

  get gameCompleted() {
    return this._gameCompleted;
  }

  get guessed() {
    return this._guessed;
  }

  get failed() {
    return this._failed;
  }

  get falsePositives() {
    return this._falsePositives;
  }

  get totalTries() {
    return this._guessed + this._failed;
  }
}
