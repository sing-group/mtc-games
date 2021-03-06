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

import Phaser from 'phaser';

import {GameMetadata} from './metadata';
import {I18NId, I18NStatic} from '../i18n';
import {GameCallback} from './callback';

const DEFAULTS = Symbol();

export class GameConfig {
  constructor(
    metadata,
    width = GameConfig.DEFAULTS.WIDTH,
    height = GameConfig.DEFAULTS.HEIGHT,
    domId = GameConfig.DEFAULTS.DOM_ID,
    canvas = GameConfig.DEFAULTS.DOM_ID,
    renderType = Phaser.CANVAS,
    gameCallback = GameConfig.DEFAULTS.GAME_CALLBACK,
    locale = GameConfig.DEFAULTS.LOCALE
  ) {
    check.assert.instance(metadata, GameMetadata, 'metadata should be an instance of a GameMetadata subclass');
    check.assert.positive(width, 'width must be a positive value');
    check.assert.positive(height, 'height must be a positive value');
    check.assert.nonEmptyString(domId, 'domId must be a non empty string');
    if (check.assigned(gameCallback))
      check.assert.instance(gameCallback, GameCallback, 'gameCallback must be an instance of GameCallback');
    check.assert.nonEmptyString(locale, 'locale must be a non empty string');

    this._metadata = metadata;
    this._width = width;
    this._height = height;
    this._domId = domId;
    this._canvas = canvas;
    this._renderType = renderType;
    this._gameCallback = gameCallback;
    this._locale = locale;
    this._i18n = new I18NStatic(locale);
  }

  static get DEFAULTS() {
    if (!GameConfig[DEFAULTS]) {
      GameConfig[DEFAULTS] = {
        WIDTH: 800,
        HEIGHT: 600,
        DOM_ID: 'game',
        GAME_CALLBACK: null,
        LOCALE: 'en_US'
      };

      Object.freeze(GameConfig[DEFAULTS]);
    }

    return GameConfig[DEFAULTS];
  }

  get metadata() {
    return this._metadata;
  }

  get gameCallback() {
    return this._gameCallback;
  }

  set gameCallback(gameCallback) {
    check.assert.object(gameCallback, 'gameCallback should be an object');

    if (!(gameCallback instanceof this.gameCallbackType)) {
      gameCallback = this.gameCallbackType.buildWith(gameCallback);
    }

    this._gameCallback = gameCallback;
  }

  get gameCallbackType() {
    return check.assigned(this._gameCallbackType) ? this._gameCallbackType : new GameCallback();
  }

  set gameCallbackType(gameCallbackType) {
    check.assert.instance(new gameCallbackType(), GameCallback, 'gameCallbackType should be the class GameCallback or a subclass');

    if (check.assigned(this._gameCallback)) {
      check.assert.instance(this._gameCallback, gameCallbackType, 'gameCallbackType is not compatible with the current gameCallback');
    }

    this._gameCallbackType = gameCallbackType;
  }

  get width() {
    return this._width;
  }

  set width(width) {
    check.assert.positive(width, 'width must be a positive number');

    this._width = width;
  }

  get widthNameId() {
    return I18NId.forConfigParam('width').name();
  }

  get widthDescriptionId() {
    return I18NId.forConfigParam('width').description();
  }

  get height() {
    return this._height;
  }

  set height(height) {
    check.assert.positive(height, 'height must be a positive number');

    this._height = height;
  }

  get heightNameId() {
    return I18NId.forConfigParam('height').name();
  }

  get heightDescriptionId() {
    return I18NId.forConfigParam('height').description();
  }

  get domId() {
    return this._domId;
  }

  set domId(domId) {
    check.assert.nonEmptyString(domId, 'domId must be a non empty string');

    this._domId = domId;
  }

  get domIdNameId() {
    return I18NId.forConfigParam('domId').name();
  }

  get domIdDescriptionId() {
    return I18NId.forConfigParam('domId').description();
  }

  get canvas() {
    return this._canvas;
  }

  set canvas(canvas) {

    this._canvas = canvas;
  }

  get renderType() {
    return this._renderType;
  }

  set renderType(renderType) {

    this._renderType = renderType;
  }

  get locale() {
    return this._locale;
  }

  set locale(locale) {
    check.assert.nonEmptyString(locale, 'locale must be a non empty string');

    this._locale = locale;
  }

  get localeNameId() {
    return I18NId.forConfigParam('locale').name();
  }

  get localeDescriptionId() {
    return I18NId.forConfigParam('locale').description();
  }

  get i18n() {
    return this._i18n;
  }

  set i18n(i18n) {
    this._i18n = i18n;
  }

  get i18nNameId() {
    return I18NId.forConfigParam('i18n').name();
  }

  get i18nDescriptionId() {
    return I18NId.forConfigParam('i18n').description();
  }

  get parameterValues() {
    return {};
  }

  static forMetadata(metadata, gameCallback = new GameCallback()) {
    check.assert.instance(metadata, GameMetadata, 'metadata should be an instance of a GameMetadata subclass');
    check.assert.object(gameCallback, 'gameCallback should be an object');

    if (!(gameCallback instanceof metadata.gameCallbackType)) {
      gameCallback = metadata.gameCallbackType.buildWith(gameCallback);
    }

    const config = new GameConfig(metadata);
    config.gameCallbackType = metadata.gameCallbackType;
    config.gameCallback = gameCallback;

    for (const parameter of metadata.parameters) {
      config['_' + parameter.id] = parameter.defaultValue;
    }

    return new Proxy(config,
      new GameConfigProxyHandler(
        metadata,
        {
          parameterValues: (handler, target) => {
            const paramValues = {};

            for (const param of handler._getParamNames()) {
              paramValues[param] = target['_' + param];
            }

            return paramValues;
          }
        }
      )
    );
  }
}

class GameConfigProxyHandler {
  constructor(
    metadata,
    customImplementations = {}
  ) {
    check.assert.instance(metadata, GameMetadata, 'metadata should be an instance of a GameMetadata subclass');
    check.assert.object(customImplementations, 'customImplementations should be an object');

    this._metadata = metadata;
    this._customImplementations = Object.assign({}, customImplementations);

    Object.freeze(this._defaultProperties);
  }

  _isCustomImplementation(prop) {
    return this._customImplementations[prop];
  }

  _isParameter(prop) {
    return this._metadata.hasParameter(prop);
  }

  _getParamNames() {
    return this._metadata.parameterIds();
  }

  isExtensible() {
    return false;
  }

  getOwnPropertyDescriptor(target, prop) {
    if (this.has(target, prop)) {
      return {
        value: this.get(target, prop),
        configurable: true,
        enumerable: true,
        writable: true
      };
    } else {
      return undefined;
    }
  }

  ownKeys(target) {
    return [
      ...Object.getOwnPropertyNames(target).filter(name => !name.startsWith('_')),
      ...this._customImplementations.keys(),
      ...this._metadata.parameterIds()
    ];
  }

  has(target, prop) {
    return this.ownKeys().includes(prop);
  }

  set(target, prop, value) {
    if (this._isParameter(prop)) {
      const parameter = this._metadata.parameter(prop);

      if (parameter.isValid(value)) {
        target['_' + prop] = parameter.parseValue(value);
        return true;
      } else {
        return false;
      }
    } else if (check.assigned(target[prop])) {
      target[prop] = value;

      return true;
    } else {
      return false;
    }
  }

  get(target, prop) {
    if (this._isCustomImplementation(prop)) {
      return this._customImplementations[prop](this, target);
    } else if (this._isParameter(prop)) {
      return target['_' + prop];
    } else if (check.assigned(target[prop])) {
      return target[prop];
    } else {
      throw new TypeError('unknown property: ' + prop);
    }
  }
}
