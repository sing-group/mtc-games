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
import I18NId from '../i18n/I18NId';

export default class GameConfig {
  static forMetadata(metadata) {
    check.assert.instance(metadata, GameMetadata, 'metadata should be an instance of a GameMetadata subclass');

    const config = new GameConfig();

    for (const parameter of metadata.parameters) {
      config['_' + parameter.id] = parameter.defaultValue;
    }

    return new Proxy(config, new GameConfigProxyHandler(
      [ 'time', 'timerVisible' ],
      [ 'timeNameId', 'timeDescriptionId', 'timerVisibleNameId', 'timerVisibleDescriptionId', 'getParameterValues' ],
      metadata
    ));
  }

  static get DEFAULTS() {
    return {
      TIME: 60,
      TIMER_VISIBLE: true,
      RESX: 800,
      REXY: 600,
      DOMID: 'game'
    };
  }

  constructor(
    time = GameConfig.DEFAULTS.TIME,
    timerVisible = GameConfig.DEFAULTS.TIMER_VISIBLE,
    resX = GameConfig.DEFAULTS.RESX,
    resY = GameConfig.DEFAULTS.RESY,
    domId = GameConfig.DEFAULTS.DOMID
  ) {
    check.assert.greaterOrEqual(time, 1, 'time must be greater than 0');
    check.assert.boolean(timerVisible, 'timerVisible must be a boolean');

    this._time = time;
    this._timerVisible = timerVisible;
    this._resX = resX;
    this._resY = resY;
    this.domId = domId;
  }

  get time() {
    return this._time;
  }

  set time(time) {
    check.assert.greaterOrEqual(time, 1, 'time must be greater than 0');

    this._time = time;
  }

  get timeNameId() {
    return I18NId.forParam('time').name();
  }

  get timeDescriptionId() {
    return I18NId.forParam('time').description();
  }

  get timerVisible() {
    return this._timerVisible;
  }

  set timerVisible(timerVisible) {
    check.assert.boolean(timerVisible, 'timerVisible should be a boolean value');

    this._timerVisible = timerVisible;
  }

  get timerVisibleNameId() {
    return I18NId.forParam('timerVisible').name();
  }

  get timerVisibleDescriptionId() {
    return I18NId.forParam('timerVisible').description();
  }

  get resX() {
    return this._resX;
  }

  set resX(resX) {
    check.assert.greaterOrEqual(resX, 1, 'resX must be greater than 0');

    this._resX = resX;
  }

  get resXNameId() {
    return I18NId.forParam('resX').name();
  }

  get resXDescriptionId() {
    return I18NId.forParam('resX').description();
  }

  get resY() {
    return this._resY;
  }

  set resY(resY) {
    check.assert.greaterOrEqual(resY, 1, 'resY must be greater than 0');

    this._resY = resY;
  }

  get resYNameId() {
    return I18NId.forParam('resY').name();
  }

  get resYDescriptionId() {
    return I18NId.forParam('resY').description();
  }

  get domId() {
    return this._domId;
  }

  set domId(domId) {
    check.assert.nonEmptyString(domId, 'domId cannot be empty');

    this._domId = domId;
  }

  get domIdNameId() {
    return I18NId.forParam('domId').name();
  }

  get domIdDescriptionId() {
    return I18NId.forParam('domId').description();
  }

  getParameterValues(includeStandard = true) {
    const paramValues = {};

    if (includeStandard) {
      paramValues.time = this.time;
      paramValues.timerVisible = this.timerVisible;
    }

    this._fillWithParameterValues(paramValues);

    Object.freeze(paramValues);

    return paramValues;
  }

  _fillWithParameterValues(paramValues) {
    return paramValues;
  }
}

class GameConfigProxyHandler {
  constructor(defaultProperties, delegatedProperties, metadata) {
    check.assert.array.of.nonEmptyString(defaultProperties, 'defaultProperties should be an array of non-empty strings');
    check.assert.array.of.nonEmptyString(delegatedProperties, 'delegatedProperties should be an array of non-empty strings');
    check.assert.instance(metadata, GameMetadata, 'metadata should be an instance of a GameMetadata subclass');

    this._metadata = metadata;
    this._defaultProperties = defaultProperties.slice();
    this._delegatedProperties = new Set(delegatedProperties);

    Object.freeze(this._defaultProperties);
  }

  isExtensible() {
    return false;
  }

  getKeys() {
    return this._defaultProperties;
  }

  getParamKeys() {
    return this._metadata.parameterIds();
  }

  isTargetProp(prop) {
    return this.getKeys().find(key => key === prop);
  }

  isParamProp(prop) {
    return this.getParamKeys().find(key => key === prop);
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

  ownKeys() {
    return [ ...this.getKeys(), ...this.getParamKeys() ];
  }

  has(target, prop) {
    return this.ownKeys(target).find(value => value === prop);
  }

  set(target, property, value) {
    if (this.isTargetProp(property)) {
      target[property] = value;
      return true;
    } else if (this.isParamProp(property)) {
      if (this._metadata.parameter(property).isValid(value)) {
        target['_' + property] = value;
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  get(target, property) {
    if (this.isTargetProp(property)) {
      return target[property];
    } else if (this.isParamProp(property)) {
      return target['_' + property];
    } else if (property === '_fillWithParameterValues') {
      return paramValues => {
        for (const param of this.getParamKeys()) {
          paramValues[param] = target['_' + param];
        }
      };
    } else if (this._delegatedProperties.has(property)) {
      return target[property];
    } else {
      throw new TypeError('unknown property: ' + property);
    }
  }
}
