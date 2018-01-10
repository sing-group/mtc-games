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
import I18NId from '../i18n/I18NId';
import I18NStatic from '../i18n/I18NStatic';
import GameCallback from "./callback/GameCallback";

const DEFAULTS = Symbol();

export default class GameConfig {
  static forMetadata(metadata, gameCallback = new GameCallback()) {
    check.assert.instance(metadata, GameMetadata, 'metadata should be an instance of a GameMetadata subclass');
    check.assert.instance(gameCallback, metadata.gameCallbackType, 'gameCallback should be an instance of ' + metadata.gameCallbackType.name);

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

  constructor(
    metadata,
    width = GameConfig.DEFAULTS.WIDTH,
    height = GameConfig.DEFAULTS.HEIGHT,
    domId = GameConfig.DEFAULTS.DOM_ID,
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
    this._gameCallback = gameCallback;
    this._locale = locale;
    this._i18n = new I18NStatic(locale);
  }

  get metadata() {
    return this._metadata;
  }

  get gameCallback() {
    return this._gameCallback;
  }

  set gameCallback(gameCallback){
    check.assert.instance(gameCallback, this.gameCallbackType, 'gameCallback must be an instance of GameCallback');

    this._gameCallback = gameCallback;
  }

  set gameCallbackType(gameCallbackType) {
    check.assert.instance(new gameCallbackType(), GameCallback, 'gameCallbackType should be the class GameCallback or a subclass');

    if (check.assigned(this._gameCallback)) {
      check.assert.instance(this._gameCallback, gameCallbackType, 'gameCallbackType is not compatible with the current gameCallback');
    }

    this._gameCallbackType = gameCallbackType;
  }

  get gameCallbackType() {
    return check.assigned(this._gameCallbackType) ? this._gameCallbackType : new GameCallback();
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
      if (this._metadata.parameter(prop).isValid(value)) {
        target['_' + prop] = value;
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
