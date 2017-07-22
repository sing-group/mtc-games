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

export default class ParameterTestBuilder {
  static intRange(min, max) {
    check.assert.integer(min, 'min should be an integer value');
    check.assert.integer(max, 'max should be an integer value');
    check.assert.less(min, max, 'min should be lower than max');

    const range = [];
    for (let i = min; i <= max; i++) {
      range.push(i);
    }

    return range;
  }

  static build(parameters) {
    return new ParameterTestBuilder(
      parameters.paramConstructor,
      parameters.id,
      parameters.name,
      parameters.description,
      parameters.defaultValue,
      parameters.validValues,
      parameters.invalidValues,
      parameters.additionalParameters,
      parameters.additionalTests
    ).createBuilder();
  }

  constructor(constructor, id, name, description, defaultValue, validValues, invalidValues, additionalParameters, additionalTests) {
    this._constructor = constructor;
    this._id = id;
    this._name = name;
    this._description = description;
    this._defaultValue = defaultValue;
    this._validValues = validValues;
    this._invalidValues = invalidValues;
    this._additionalParameters = additionalParameters || [];
    this._additionalTests = additionalTests || function() {};
  }

  createBuilder() {
    return () => {
      const parameter = new this._constructor(
        this._id, this._name, this._description, this._defaultValue, ...this._additionalParameters
      );

      it('assigns the default properties correctly', () => {
        expect(parameter.id).toBe(this._id);
        expect(parameter.name).toBe(this._name);
        expect(parameter.description).toBe(this._description);
        expect(parameter.defaultValue).toBe(this._defaultValue);
      });

      it('accepts valid values', () => {
        for (const value of this._validValues) {
          expect(parameter.isValid(value)).toBeTruthy();
        }
      });

      it('rejects invalid values', () => {
        for (let value of this._invalidValues) {
          expect(parameter.isValid(value)).toBeFalsy();
        }
      });

      this._additionalTests.bind(this)();
    };
  }
}