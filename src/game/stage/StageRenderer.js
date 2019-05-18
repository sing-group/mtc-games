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

import Phaser from 'phaser';
import check from 'check-types';

import {Assets} from '../../assets';
import {I18NId, I18NStatic} from '../../i18n';
import {StageStatus} from './StageStatus';
import {StageRenderConfiguration} from './StageRenderConfiguration';

export class StageRenderer extends Phaser.Scene {

  constructor(configuration, status) {
    super();

    check.assert.instance(configuration, StageRenderConfiguration, 'configuration should be a StageRenderConfiguration instance');
    check.assert.instance(status, StageStatus, 'status should be a StageStatus instance');

    this._i18n = new I18NStatic(status.gameStatus.configuration.locale);
    this._assets = new Assets(status.gameStatus.configuration.locale);
    this._configuration = configuration;
    this._status = status;
  }

  get assets() {
    return this._assets;
  }

  get configuration() {
    return this._configuration;
  }

  get status() {
    return this._status;
  }

  get worldWidth() {
    return this.cameras.main.width;
  }

  get worldHeight() {
    return this.cameras.main.height;
  }

  get worldHorizontalMiddle() {
    return this.worldWidth / 2;
  }

  get worldVerticalMiddle() {
    return this.worldHeight / 2;
  }

  preloadImages() {
    for (let imageAsset in this._assets.imageResourceList) {
      if (this._assets.imageResourceList.hasOwnProperty(imageAsset)) {
        this._assets.imageResourceList[imageAsset].forEach((value, key) => {
          this.loadImage(key, value);
        });
      }
    }
  }

  preloadAudios() {
    for (let audioAsset in this._assets.audioResourceList) {
      if (this._assets.audioResourceList.hasOwnProperty(audioAsset)) {
        this._assets.audioResourceList[audioAsset].forEach((value, key) => {
          this.loadAudio(key, value);
        });
      }
    }
  }

  loadImage(id, path) {
    check.assert.nonEmptyString(id, 'id should be a non empty string');
    check.assert.nonEmptyString(path, 'path should be a non empty string');

    this.load.image(id, path);
  }

  loadAudio(id, path) {
    check.assert.nonEmptyString(id, 'id should be a non empty string');
    check.assert.nonEmptyString(path, 'path should be a non empty string');

    this.load.audio(id, path);
  }

  calculateCenteredX(elementWidth) {
    check.assert.greaterOrEqual(elementWidth, 0, 'elementWidth should be positive');

    return this.worldWidth - elementWidth / 2;
  }

  calculateCenteredY(elementHeight) {
    check.assert.greaterOrEqual(elementHeight, 0, 'elementHeight should be positive');

    return this.worldHeight - elementHeight / 2;
  }

  calculateDistance(x1, y1, x2, y2) {
    const dx = x1 - x2;
    const dy = y1 - y2;

    return Math.sqrt(dx * dx + dy * dy);
  }

  getRandomScrambleCoords() {
    const randX = Math.floor(Math.random() * (this.worldWidth - 75 - 75 + 1)) + 75;
    const randY = Math.floor(Math.random() * (this.worldHeight - 200 - 100 + 1)) + 100;

    return [randX, randY];
  }

  getGameTextId() {
    return I18NId.forGame(this.game.metadata.id);
  }

  getStandardGameText(id, callback = text => text) {
    check.assert.nonEmptyString(id, 'id should be a non empty string');

    return this.getText('game.standard.' + id, callback);
  }

  getText(id, callback = text => text) {
    check.assert.nonEmptyString(id, 'id should be a non empty string');
    check.assert.function(callback, 'callback should be a function');

    return callback(this._i18n.text(id));
  }

  setBackgroundColorFromHex(color) {
    this.cameras.main.setBackgroundColor(Phaser.Display.Color.HexStringToColor(color));
  }

  hideSprite(sprite) {
    sprite.setAlpha(0);
  }
}
