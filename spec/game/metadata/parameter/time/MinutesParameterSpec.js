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

import MinutesParameter from '../../../../../lib/game/metadata/parameter/time/MinutesParameter';
import ParameterTestBuilder from '../ParameterTestBuilder';

const id = 'minutes.id';
const name = 'minutes.name';
const description = 'minutes.description';

describe('Minutes parameter tests', ParameterTestBuilder.build({
  paramConstructor: MinutesParameter,
  id: id,
  name: name,
  description: description,
  defaultValue: 1,
  validValues: ParameterTestBuilder.intRange(MinutesParameter.MIN, MinutesParameter.MAX),
  invalidValues: [ null, undefined, true, false, 1.2, 'hello', [], {} ],
  additionalTests: () => {
    it('constructors checks range', () => {
      const invalidConstructors = [
        () => new MinutesParameter(id, name, description, MinutesParameter.MIN - 1),
        () => new MinutesParameter(id, name, description, MinutesParameter.MAX + 1)
      ];

      for (const invalid of invalidConstructors) {
        expect(invalid).toThrowError(TypeError);
      }
    });
  }
}));