/*
 * MultiTasking Cubes - Games
 * Copyright (C) 2017-2019 - Miguel Reboiro-Jato, Andrés Vieira Vázquez,
 * Adolfo Piñón Blanco, Hugo López-Fernández, Rosalía Laza Fidalgo,
 *  Reyes Pavón Rial, Francisco Otero Lamas, Adrián Varela Pomar,
 *  Carlos Spuch Calvar, and Tania Rivera Baltanás
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
import uheprng from 'random-seed';
import MtcDice from './MtcDice';

export default class MtcDiceRoller {
  constructor(dice, randomGenerator = uheprng.create()) {
    check.assert.instance(dice, MtcDice, 'dice should be a MtcDice');
    check.assert.function(randomGenerator, 'randomGenerator should be a valid function');

    this._dice = dice;
    this._randomGenerator = randomGenerator;
  }

  get dice() {
    return this._dice;
  }

  roll() {
    const values = this._dice.values;

    return values[this._randomGenerator(values.length)];
  }
}