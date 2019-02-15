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

export default class EndStageData {
  constructor(
    title, description, results = new Map()
  ) {
    check.assert.nonEmptyString(title, 'title should be a non-empty string');
    check.assert.nonEmptyString(description, 'description should be a non-empty string');
    check.assert.instance(results, Map, 'results should be a Map instance');

    this._title = title;
    this._description = description;
    this._results = results;
  }

  get title() {
    return this._title;
  }

  get description() {
    return this._description;
  }

  get results() {
    return this._results;
  }
}
