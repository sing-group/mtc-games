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
import extendedArrayMatchers from '../matchers/extendedArrayMatchers';
import i18nMatchers from '../matchers/i18nMatchers';

export default class GameTestBuilder {
  static build(parameters) {
    return new GameTestBuilder(
      parameters.metadataConstructor,
      parameters.paramTypes
    ).createBuilder();
  }

  constructor(metadataConstructor, paramTypes = []) {
    this._metadataConstructor = metadataConstructor;
    this._paramTypes = paramTypes;
  }

  createBuilder() {
    return () => {
      let metadata;

      beforeAll(() => {
        jasmine.addMatchers(extendedArrayMatchers);
        jasmine.addMatchers(i18nMatchers);
      });

      beforeEach(() => {
        metadata = new this._metadataConstructor();
      });

      afterEach(() => {
        metadata = null;
      });

      it('has the correct id', () => {
        expect(metadata.id).toBe(this._metadataConstructor.ID);
      });

      it('has the correct parameter ids', () => {
        expect(metadata.parameterIds()).toHaveSameValuesAs(Object.keys(this._paramTypes));
      });

      it('has valid i18n ids', () => {
        expect(metadata.nameId).toHaveI18NMessage();
        expect(metadata.descriptionId).toHaveI18NMessage();
      });

      if (Object.keys(this._paramTypes).length > 0) {
        it('has the correct parameter types', () => {
          for (const paramId in this._paramTypes) {
            expect(metadata.parameter(paramId)).toEqual(jasmine.any(this._paramTypes[paramId]));
          }
        });

        it('has valid param i18n ids', () => {
          for (const paramId in this._paramTypes) {
            const param = metadata.parameter(paramId);

            expect(param.nameId).toHaveI18NMessage();
            expect(param.descriptionId).toHaveI18NMessage();
          }
        });
      }
    };
  }
}