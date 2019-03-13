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

export class I18NId {
  static get SEPARATOR() {
    return '.';
  }

  static join(...values) {
    values = values.filter(check.nonEmptyString);

    return values.join(I18NId.SEPARATOR);
  }

  static forGame(gameId) {
    return new GameIdBuilder(gameId);
  }

  static forParam(paramId) {
    return new ParamIdBuilder(paramId);
  }

  static forConfigParam(paramId) {
    return new ConfigParamIdBuilder(paramId);
  }
}

export class GameIdBuilder {
  static get PREFIX() {
    return 'game';
  }

  static get NAME_SUFFIX() {
    return 'name';
  }

  static get DESCRIPTION_SUFFIX() {
    return 'description';
  }

  constructor(gameId, prefix = GameIdBuilder.PREFIX) {
    this._id = I18NId.join(prefix, gameId);
  }

  param(paramId) {
    return new ParamIdBuilder(paramId, I18NId.join(this._id, ParamIdBuilder.PREFIX));
  }

  result(resultId) {
    return new ResultIdBuilder(resultId, I18NId.join(this._id, ResultIdBuilder.PREFIX));
  }

  id() {
    return this._id;
  }

  name() {
    return I18NId.join(this.id(), GameIdBuilder.NAME_SUFFIX);
  }

  description() {
    return I18NId.join(this.id(), GameIdBuilder.DESCRIPTION_SUFFIX);
  }
}

export class ParamIdBuilder {
  static get PREFIX() {
    return 'param';
  }

  static get NAME_SUFFIX() {
    return 'name';
  }

  static get DESCRIPTION_SUFFIX() {
    return 'description';
  }

  constructor(paramId, prefix = ParamIdBuilder.PREFIX) {
    this._id = I18NId.join(prefix, paramId);
  }

  id() {
    return this._id;
  }

  name() {
    return I18NId.join(this.id(), ParamIdBuilder.NAME_SUFFIX);
  }

  description() {
    return I18NId.join(this.id(), ParamIdBuilder.DESCRIPTION_SUFFIX);
  }
}

export class ConfigParamIdBuilder {
  static get PREFIX() {
    return 'game.config.param';
  }

  static get NAME_SUFFIX() {
    return 'name';
  }

  static get DESCRIPTION_SUFFIX() {
    return 'description';
  }

  constructor(paramId) {
    this._id = I18NId.join(ConfigParamIdBuilder.PREFIX, paramId);
  }

  id() {
    return this._id;
  }

  name() {
    return I18NId.join(this.id(), ConfigParamIdBuilder.NAME_SUFFIX);
  }

  description() {
    return I18NId.join(this.id(), ConfigParamIdBuilder.DESCRIPTION_SUFFIX);
  }
}

export class ResultIdBuilder {
  static get PREFIX() {
    return 'result';
  }

  static get NAME_SUFFIX() {
    return 'name';
  }

  constructor(paramId, prefix = ResultIdBuilder.PREFIX) {
    this._id = I18NId.join(prefix, paramId);
  }

  id() {
    return this._id;
  }

  name() {
    return I18NId.join(this.id(), ResultIdBuilder.NAME_SUFFIX);
  }
}
