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
import I18NId from '../../../i18n/I18NId';

export default class Parameter {
  static build(paramClass, gameId, paramId, ...additionalParameters) {
    const idBuilder = I18NId.forGame(gameId).param(paramId);

    return new paramClass(
      paramId, idBuilder.name(), idBuilder.description(), ...additionalParameters
    );
  }

  constructor(id, nameId, descriptionId, defaultValue) {
    check.assert.nonEmptyString(id, 'id should be a non-empty string');
    check.assert.nonEmptyString(nameId, 'nameId should be a non-empty string');
    check.assert.nonEmptyString(descriptionId, 'descriptionId should be a non-empty string');
    check.assert.assigned(defaultValue, 'defaultValue should have a value');

    this._id = id;
    this._nameId = nameId;
    this._descriptionId = descriptionId;
    this._defaultValue = defaultValue;
  }

  get id() {
    return this._id;
  }

  get nameId() {
    return this._nameId;
  }

  get descriptionId() {
    return this._descriptionId;
  }

  get defaultValue() {
    return this._defaultValue;
  }

  isValid() {
    throw new TypeError('this method should be implemented by the subclasses');
  }
}
