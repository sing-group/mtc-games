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

import SecondsParameter from '../../../../../lib/game/metadata/parameter/time/SecondsParameter';
import ParameterTestBuilder from '../ParameterTestBuilder';

const id = 'seconds.id';
const name = 'seconds.name';
const description = 'seconds.descriptionId';
const valueRange = ParameterTestBuilder.intRange(SecondsParameter.MIN, SecondsParameter.MAX);

describe('Minutes parameter tests', ParameterTestBuilder.build({
  paramConstructor: SecondsParameter,
  id: id,
  nameId: name,
  descriptionId: description,
  defaultValue: 1,
  validValues: [
    ...valueRange,
    ...valueRange.map(value => value.toString())
  ],
  invalidValues: [ null, undefined, true, false, 1.2, 'hello', [], {} ],
  additionalTests: () => {
    it('constructors checks range', () => {
      const invalidConstructors = [
        () => new SecondsParameter(id, name, description, SecondsParameter.MIN - 1),
        () => new SecondsParameter(id, name, description, SecondsParameter.MAX + 1)
      ];

      for (const invalid of invalidConstructors) {
        expect(invalid).toThrowError(TypeError);
      }
    });
  }
}));