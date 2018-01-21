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

export default class SecondsParameter extends Parameter {
  static get MIN() {
    return 1;
  }

  static get MAX() {
    return 900; // 15 minutes
  }

  constructor(id, name, description, defaultValue) {
    super(id, name, description, defaultValue);

    check.assert.integer(this.defaultValue, 'defaultValue should be a integer value');
    check.assert.inRange(this.defaultValue, SecondsParameter.MIN, SecondsParameter.MAX,
      'defaultValue should be in range [' + SecondsParameter.MIN + ', ' + SecondsParameter.MAX + ']'
    );

  }

  isValid(value) {
    value = this.parseValue(value);

    return check.integer(value) && check.inRange(value, SecondsParameter.MIN, SecondsParameter.MAX);
  }

  parseValue(value) {
    return typeof value === 'string' ? parseInt(value) : value;
  }
}