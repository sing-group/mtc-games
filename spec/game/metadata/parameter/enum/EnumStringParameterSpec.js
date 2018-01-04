/**
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

import ParameterTestBuilder from '../ParameterTestBuilder';
import EnumStringParameter from "../../../../../lib/game/metadata/parameter/enum/EnumStringParameter";

const id = 'enumString.id';
const name = 'enumString.name';
const description = 'enumString.descriptionId';
const values = [ 'ONE', 'TWO', 'THREE' ];
const invalidValues = [ null, undefined, true, false, 1.2, 'hello', [], {} ];
const invalidEnumValues = [
  [ null, 'TWO', 'THREE' ],
  [ 'ONE', 2, 'THREE' ],
  [ true, 'TWO', 'THREE' ],
  [ 'ONE', 'TWO', 3.0 ],
  [ 'ONE', 'TWO', [] ],
  [ 'ONE', 'TWO', {} ],
  {},
  null,
  undefined,
  'ONE',
  1,
  false,
  4.0
];

describe('Enum string parameter tests', ParameterTestBuilder.build({
  paramConstructor: EnumStringParameter,
  id: id,
  nameId: name,
  descriptionId: description,
  defaultValue: 'TWO',
  validValues: values,
  invalidValues: invalidValues,
  additionalParameters: [ values ],
  additionalTests: () => {
    it('constructors checks default value', () => {
      const invalidConstructors = invalidValues.map(invalidValue =>
        () => new EnumStringParameter(id, name, description, invalidValue, values)
      );

      for (const invalid of invalidConstructors) {
        expect(invalid).toThrowError(TypeError);
      }
    });

    it('constructors checks values', () => {
      const invalidConstructors = invalidEnumValues.map(invalidEnumValue =>
        () => new EnumStringParameter(id, name, description, 'ONE', invalidEnumValue)
      );

      for (const invalid of invalidConstructors) {
        expect(invalid).toThrowError(TypeError);
      }
    });
  }
}));