/*
 * MultiTasking Cubes - Games
 * Copyright (C) 2017-2018 - Miguel Reboiro-Jato, Andrés Vieira Vázquez,
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
import Parameter from '../Parameter';
import check from 'check-types';

export default class IntegerParameter extends Parameter {
  constructor(id, name, description, defaultValue, min, max) {
    check.assert.integer(min, 'min should be an integer value');
    check.assert.integer(max, 'max should be an integer value');
    check.assert.integer(defaultValue, 'defaultValue should be a integer value');
    check.assert.less(min, max, 'min should be lower than max value');
    check.assert.inRange(defaultValue, min, max, 'defaultValue should be in range [' + min + ', ' + max + ']');

    super(id, name, description, defaultValue);

    this._min = min;
    this._max = max;
  }

  isValid(value) {
    return check.integer(value) && check.inRange(value, this._min, this._max);
  }
}