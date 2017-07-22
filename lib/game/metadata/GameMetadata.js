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
import Parameter from './parameter/Parameter';
import I18NId from '../../i18n/I18NId';
import ArrayCheck from '../../util/ArrayCheck';
import GameConfig from '../GameConfig';

export default class GameMetadata {
  constructor(
    id,
    parameters = [],
    nameId = I18NId.forGame(id).name(),
    descriptionId = I18NId.forGame(id).description()
  ) {
    check.assert.array.of.instance(parameters, Parameter, 'parameters should be an array of Parameter');
    check.assert.nonEmptyString(id, 'id must be a non empty string');
    check.assert.nonEmptyString(nameId, 'nameId must be a string');
    check.assert.nonEmptyString(descriptionId, 'descriptionId must be a string');

    this._id = id;
    this._parameters = parameters.reduce((obj, param) => {
      obj[param.id] = param;
      return obj;
    }, {});
    this._nameId = nameId;
    this._descriptionId = descriptionId;

    Object.freeze(this._parameters);

    ArrayCheck.assert.nonRepeatedValues(this.parameterIds(), 'parameters should not have repeated ids');
  }

  get id() {
    return this._id;
  }

  get parameters() {
    return Object.values(this._parameters);
  }

  get nameId() {
    return this._nameId;
  }

  get descriptionId() {
    return this._descriptionId;
  }

  parameter(id) {
    const param = this._parameters[id];

    check.assert.assigned(param, id + ' is an invalid parameter id');

    return param;
  }

  parameterIds() {
    return Object.keys(this._parameters);
  }

  parameterValidators() {
    const validators = {};

    for (const id of this.parameterIds()) {
      validators[id] = this._parameters[id].isValid;
    }

    return validators;
  }

  isValid(configuration) {
    check.assert.instance(configuration, GameConfig, 'configuration should be a GameConfig instance');

    const paramValues = configuration.getParameterValues(false);

    const paramNames = Object.keys(paramValues);

    if (ArrayCheck.haveSameValues(paramNames, this.parameterIds())) {
      for (const paramId in paramValues) {
        if (!this._parameters[paramId].isValid(paramValues[paramId])) {
          return false;
        }
      }

      return true;
    } else {
      return false;
    }
  }
}
