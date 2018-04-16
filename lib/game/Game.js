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
import check from 'check-types';
import GameMetadata from './metadata/GameMetadata';
import GameConfig from './GameConfig';
import GameStatus from './GameStatus';
import Phaser from 'phaser-ce';
import I18NStatic from '../i18n/I18NStatic';

const GAME_MODES = Symbol();

export default class Game extends Phaser.Game {
  constructor(mtcMetadata, gameStatus) {
    check.assert.instance(mtcMetadata, GameMetadata);
    check.assert.instance(gameStatus, GameStatus);
    if (!mtcMetadata.isValid(gameStatus.config)) {
      throw new TypeError('invalid config for the provided metadata');
    }

    super(
      gameStatus.config.width,
      gameStatus.config.height,
      Phaser.AUTO,
      gameStatus.config.domId
    );
    this._metadata = mtcMetadata;
    this._startTimestamp = Date.now();
    this._i18n = new I18NStatic(gameStatus.config.locale);
    this._status = gameStatus;
  }

  get metadata() {
    return this._metadata;
  }

  get status() {
    return this._status;
  }

  set status(value) {
    this._status = value;
  }

  get startTimestamp() {
    return this._startTimestamp;
  }

  get i18n() {
    return this._i18n;
  }

  elapsedTime() {
    // Returns elapsed time since the game started in seconds
    return (Date.now() - this.startTimestamp) / 1000;
  }


}
