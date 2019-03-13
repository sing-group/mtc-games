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
import {Parameter} from './parameter';
import {I18NId} from '../../i18n';
import {ArrayCheck} from '../../util';
import {GameConfig} from '../GameConfig';
import {GameTaskType} from './GameTaskType';
import {GameCallback} from '../callback';

export class GameMetadata {
  constructor(
    id,
    taskTypes = [],
    parameters = [],
    gameCallbackType = GameCallback,
    nameId = I18NId.forGame(id).name(),
    descriptionId = I18NId.forGame(id).description()
  ) {
    check.assert.array.of.instance(taskTypes, GameTaskType, 'taskTypes should ba an array of GameTaskType');
    check.assert.array.of.instance(parameters, Parameter, 'parameters should be an array of Parameter');
    check.assert.instance(new gameCallbackType(), GameCallback, 'gameCallbackType should be the class GameCallback or a subclass');
    check.assert.nonEmptyString(id, 'id must be a non empty string');
    check.assert.nonEmptyString(nameId, 'nameId must be a string');
    check.assert.nonEmptyString(descriptionId, 'descriptionId must be a string');

    this._id = id;
    this._taskTypes = taskTypes.slice();
    this._parameters = parameters.reduce((obj, param) => {
      obj[param.id] = param;
      return obj;
    }, {});
    this._gameCallbackType = gameCallbackType;
    this._nameId = nameId;
    this._descriptionId = descriptionId;

    Object.freeze(this._taskTypes);
    Object.freeze(this._parameters);

    ArrayCheck.assert.nonRepeatedValues(this.parameterIds(), 'parameters should not have repeated ids');
  }

  get id() {
    return this._id;
  }

  get taskTypes() {
    return this._taskTypes;
  }

  get parameters() {
    return Object.values(this._parameters);
  }

  get gameCallbackType() {
    return this._gameCallbackType;
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

  hasParameter(parameter) {
    return this.parameterIds().includes(parameter);
  }

  parameterValidators() {
    const validators = {};

    for (const id of this.parameterIds()) {
      validators[id] = this._parameters[id].isValid;
    }

    return validators;
  }

  parameterParsers() {
    const parsers = {};

    for (const id of this.parameterIds()) {
      parsers[id] = this._parameters[id].parseValue;
    }

    return parsers;
  }

  isValid(configuration) {
    check.assert.instance(configuration, GameConfig, 'configuration should be a GameConfig instance');

    const paramValues = configuration.parameterValues;

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
