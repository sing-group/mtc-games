/**
 * MultiTasking Cubes - Games
 * Copyright (C) 2017 - Miguel Reboiro-Jato
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

export default class Game {
  constructor(metadata, config = GameConfig.forMetadata(metadata)) {
    check.assert.instance(metadata, GameMetadata);
    check.assert.instance(config, GameConfig);
    if (!metadata.isValid(config)) {
      throw new TypeError('invalid config for the provided metadata');
    }

    this._metadata = metadata;
    this._config = config;

    this._game = new Phaser.Game(
      this.config.resX,
      this.config.resY,
      Phaser.CANVAS,
      this.config.domId,
      {
        preload: this.preload,
        create: this.create,
        update: this.update
      }
    );
  }

  get metadata() {
    return this._metadata;
  }

  get config() {
    return this._config;
  }

  preload() {

  }

  create() {

  }

  update() {

  }
}
