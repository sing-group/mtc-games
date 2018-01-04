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

import IntegerParameter from '../../../../../lib/game/metadata/parameter/basic/IntegerParameter';
import ParameterTestBuilder from '../ParameterTestBuilder';

const id = 'integer.id';
const name = 'integer.name';
const description = 'integer.descriptionId';
const min = 0;
const max = 10;

describe('Integer parameter tests', ParameterTestBuilder.build({
  paramConstructor: IntegerParameter,
  id: id,
  nameId: name,
  descriptionId: description,
  defaultValue: 3,
  validValues: ParameterTestBuilder.intRange(min, max),
  invalidValues: [ null, undefined, true, false, 1.2, 'hello', [], {} ],
  additionalParameters: [ min, max ],
  additionalTests: () => {
    it('constructors checks range', () => {
      const invalidConstructors = [
        () => new IntegerParameter(id, name, description, 0, 1, 10),
        () => new IntegerParameter(id, name, description, 11, 1, 10),
        () => new IntegerParameter(id, name, description, 9, 10, 9),
        () => new IntegerParameter(id, name, description, 10, 10, 10)
      ];

      for (const invalid of invalidConstructors) {
        expect(invalid).toThrowError(TypeError);
      }
    });
  }
}));