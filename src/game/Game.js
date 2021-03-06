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

import Phaser, {Game as PhaserGame} from 'phaser';

import {GameStatus} from './GameStatus';
import {GameMetadata} from './metadata';
import {I18NStatic} from '../i18n';

export class Game extends PhaserGame {
  constructor(metadata, config, gameStatusConstructor) {
    check.assert.instance(metadata, GameMetadata);
    if (!metadata.isValid(config)) {
      throw new TypeError('invalid config for the provided metadata');
    }

    super({
        width: config.width,
        height: config.height,
        type: Phaser.CANVAS,
        canvas: config.canvas
      }
    );

    this._metadata = metadata;
    this._config = config;
    this._i18n = new I18NStatic(config.locale);
    this._status = new gameStatusConstructor(this);

    check.assert.instance(this._status, GameStatus, 'gameStatusConstructor should be a GameStatus subclass');
  }

  get metadata() {
    return this._metadata;
  }

  get status() {
    return this._status;
  }

  get i18n() {
    return this._i18n;
  }

  get configuration() {
    return this._config;
  }

}
