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

import {GameConfig} from '../game';

export class GamesSessionMetadata {
  constructor(nameId, descriptionId, gameConfigs) {
    check.assert.nonEmptyString(nameId, 'nameId should be a non-empty string');
    check.assert.nonEmptyString(descriptionId, 'descriptionId should be a non-empty string');
    check.assert.array.of.instance(gameConfigs, GameConfig, 'gameConfigs should be an array of GameConfig instances');

    this._nameId = nameId;
    this._descriptionId = descriptionId;
    this._gameConfigs = gameConfigs.slice();

    Object.freeze(this._gameConfigs);
  }

  get gameConfigs() {
    return this._gameConfigs;
  }

  get nameId() {
    return this._nameId;
  }

  get descriptionId() {
    return this._descriptionId;
  }
}
