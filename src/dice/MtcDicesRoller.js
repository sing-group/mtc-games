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
import uheprng from 'random-seed';
import {MtcDice} from './MtcDice';
import {MtcDiceFace} from './MtcDiceFace';
import {MtcDiceRoller} from './MtcDiceRoller';

export class MtcDicesRoller {
  constructor(dices, randomGenerator = uheprng.create()) {
    check.assert.array.of.instance(dices, MtcDice, 'dices should be an array of MtcDice');
    check.assert.function(randomGenerator, 'randomGenerator should be a valid function');

    this._dices = dices.slice();
    this._diceRollers = dices.map(dice => new MtcDiceRoller(dice, randomGenerator));
    this._randomGenerator = randomGenerator;

    Object.freeze(this._dices);
  }

  get dices() {
    return this._dices;
  }

  get diceCount() {
    return this._dices.length;
  }

  getDices(count = this.diceCount) {
    if (count === this.diceCount) {
      return this.dices;
    } else {
      this._checkCount(count);

      return this._dices.slice(0, count);
    }
  }

  getRandomDices(count = this.diceCount) {
    return this._getRandomItems(count, this._dices);
  }

  roll(count = this.diceCount) {
    return this._getDiceRollers(count).map(roller => roller.roll());
  }

  randomRoll(count = this.diceCount) {
    return this._getRandomDiceRollers(count).map(roller => roller.roll());
  }

  faceRoll(face, count) {
    if (check.instance(face, MtcDiceFace))
      face = face.name;

    return this.getDices(count).map(dice => dice.getFaceValue(face));
  }

  randomFaceRoll(face, count = this.diceCount) {
    if (check.instance(face, MtcDiceFace))
      face = face.name;

    return this.getRandomDices(count).map(dice => dice.getFaceValue(face));
  }

  _getDiceRollers(count = this.diceCount) {
    if (count === this.diceCount) {
      return this._diceRollers;
    } else {
      this._checkCount(count);

      return this._diceRollers.slice(0, count);
    }
  }

  _getRandomDiceRollers(count) {
    return this._getRandomItems(count, this._diceRollers);
  }

  _getRandomItems(count, values) {
    this._checkCount(count, values);

    const selectedValues = [];
    const selected = new Set();

    while (selected.size < count) {
      const index = this._randomGenerator(values.length);

      if (!selected.has(index)) {
        selected.add(index);
        selectedValues.push(values[index]);
      }
    }

    return selectedValues;
  }

  _checkCount(count, values = this._dices) {
    check.assert.integer(count, 'count should be an integer');
    check.assert.inRange(count, 1, values.length, 'count should be in ranged [1, ' + values.length + ']');
  }
}
