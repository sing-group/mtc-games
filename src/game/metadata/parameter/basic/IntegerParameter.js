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

import {Parameter} from '../Parameter';

export class IntegerParameter extends Parameter {
  constructor(id, name, description, defaultValue, min, max) {
    super(id, name, description, defaultValue);

    check.assert.integer(defaultValue, 'defaultValue should be a integer value');

    this._min = this.parseValue(min);
    this._max = this.parseValue(max);

    check.assert.integer(this._min, 'min should be an integer value');
    check.assert.integer(this._max, 'max should be an integer value');
    check.assert.less(this._min, this._max, 'min should be lower than max value');

    check.assert.inRange(this.defaultValue, this._min, this._max, 'defaultValue should be in range [' + min + ', ' + max + ']');
  }

  get min() {
    return this._min;
  }

  get max() {
    return this._max;
  }

  isValid(value) {
    value = this.parseValue(value);

    return check.integer(value) && check.inRange(value, this._min, this._max);
  }

  parseValue(value) {
    return typeof value === 'string' ? parseInt(value) : value;
  }
}
