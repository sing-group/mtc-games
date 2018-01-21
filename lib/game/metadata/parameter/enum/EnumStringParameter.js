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
import ArrayCheck from "../../../../util/ArrayCheck";

export default class EnumStringParameter extends Parameter {
  constructor(id, name, description, defaultValue, values) {
    super(id, name, description, defaultValue);

    check.assert.array.of.nonEmptyString(values, 'values should be an array of non empty strings');
    check.assert.nonEmptyString(defaultValue, 'defaultValue should be a non empty string');

    ArrayCheck.assert.hasValue(values, defaultValue, 'defaultValue should be in values');

    this._values = [...values];

    Object.freeze(this._values);
  }

  isValid(value) {
    return this._values.includes(value);
  }

  get values() {
    return this._values;
  }
}