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

import {GameResult} from '../GameResult';

import check from 'check-types';

export class VerbalFluencyGameResult extends GameResult {
  constructor(guessedWords, failedWords, repeatedWords) {
    super(['totalAttempts', 'guessedWords', 'failedWords', 'repeatedWords']);

    check.assert.array.of.nonEmptyString(guessedWords, 'guessedWords should be an array of non empty strings');
    check.assert.array.of.nonEmptyString(failedWords, 'failedWords should be an array of non empty strings');
    check.assert.array.of.nonEmptyString(repeatedWords, 'repeatedWords should be an array of non empty strings');

    this._guessedWords = guessedWords;
    this._failedWords = failedWords;
    this._repeatedWords = repeatedWords;
  }

  get totalAttempts() {
    return this._guessedWords.length + this._failedWords.length + this._repeatedWords.length;
  }

  get guessedWords() {
    return this._guessedWords;
  }

  get failedWords() {
    return this._failedWords;
  }

  get repeatedWords() {
    return this._repeatedWords;
  }


}
