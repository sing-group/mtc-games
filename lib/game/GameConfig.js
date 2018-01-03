/*
 * MultiTasking Cubes - Games
 * Copyright (C) 2017 - Miguel Reboiro-Jato, Andrés Vieira Vázquez,
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

const DEFAULTS = Symbol();

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
    if (!GameConfig[DEFAULTS]) {
      GameConfig[DEFAULTS] = {
        TIME: 60,
        TIMER_VISIBLE: true,
        WIDTH: 800,
        HEIGHT: 600,
        DOM_ID: 'game',
        START_CALLBACK: () => {},
        END_CALLBACK: () => {},
        LOCALE: 'en_US'
      };

      Object.freeze(GameConfig[DEFAULTS]);
    }

    return GameConfig[DEFAULTS];
  }

  constructor(
    time = GameConfig.DEFAULTS.TIME,
    timerVisible = GameConfig.DEFAULTS.TIMER_VISIBLE,
    width = GameConfig.DEFAULTS.WIDTH,
    height = GameConfig.DEFAULTS.HEIGHT,
    domId = GameConfig.DEFAULTS.DOM_ID,
    startCallback = GameConfig.DEFAULTS.START_CALLBACK,
    endCallback = GameConfig.DEFAULTS.END_CALLBACK,
    locale = GameConfig.DEFAULTS.LOCALE
  ) {
    check.assert.positive(time, 'time must be a positive number');
    check.assert.boolean(timerVisible, 'timerVisible must be a boolean');
    check.assert.positive(width, 'width must be a positive value');
    check.assert.positive(height, 'height must be a positive value');
    check.assert.nonEmptyString(domId, 'domId must be a non empty string');
    check.assert.function(startCallback, 'startCallback must be a function');
    check.assert.function(endCallback, 'endCallback must be a function');
    check.assert.nonEmptyString(locale, 'locale must be a non empty string');

    this._time = time;
    this._timerVisible = timerVisible;
    this._width = width;
    this._height = height;
    this._domId = domId;
    this._startCallback = startCallback;
    this._endCallback = endCallback;
    this._locale = locale;
    this._I18N = new I18NStatic(locale);
  }

  get startCallback(){
    return this._startCallback;
  }

  set startCallback(startCallback){
    check.assert.function(startCallback, 'startCallback must be a function');

    this._startCallback = startCallback;
  }

  get endCallback(){
    return this._endCallback;
  }

  set endCallback(endCallback){
    check.assert.function(endCallback, 'endCallback must be a function');

    this._endCallback = endCallback;
  }

  get time() {
    return this._time;
  }

  set time(time) {
    check.assert.positive(time, 'time must be a positive number');

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

  get width() {
    return this._width;
  }

  set width(width) {
    check.assert.positive(width, 'width must be a positive number');

    this._width = width;
  }

  get widthNameId() {
    return I18NId.forParam('width').name();
  }

  get widthDescriptionId() {
    return I18NId.forParam('width').description();
  }

  get height() {
    return this._height;
  }

  set height(height) {
    check.assert.positive(height, 'height must be a positive number');

    this._height = height;
  }

  get heightNameId() {
    return I18NId.forParam('height').name();
  }

  get heightDescriptionId() {
    return I18NId.forParam('height').description();
  }

  get domId() {
    return this._domId;
  }

  set domId(domId) {
    check.assert.nonEmptyString(domId, 'domId must be a non empty string');

    this._domId = domId;
  }

  get domIdNameId() {
    return I18NId.forParam('domId').name();
  }

  get domIdDescriptionId() {
    return I18NId.forParam('domId').description();
  }

  get locale() {
    return this._locale;
  }

  set locale(locale) {
    check.assert.nonEmptyString(locale, 'locale must be a non empty string');

    this._locale = locale;
  }

  get localeNameId() {
    return I18NId.forParam('locale').name();
  }

  get localeDescriptionId() {
    return I18NId.forParam('locale').description();
  }

  get I18N() {
    return this._I18N;
  }

  set I18N(I18N) {
    this._I18N = I18N;
  }

  get I18NNameId() {
    return I18NId.forParam('I18N').name();
  }

  get I18NDescriptionId() {
    return I18NId.forParam('I18N').description();
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
