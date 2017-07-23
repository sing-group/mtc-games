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

import BooleanParameter from '../../../../../lib/game/metadata/parameter/basic/BooleanParameter';
import ParameterTestBuilder from '../ParameterTestBuilder';

describe('Boolean parameter tests', ParameterTestBuilder.build({
  paramConstructor: BooleanParameter,
  id: 'boolean.id',
  nameId: 'boolean.name',
  descriptionId: 'boolean.descriptionId',
  defaultValue: true,
  validValues: [ true, false ],
  invalidValues: [ null, undefined, 0, 1, 1.2, 'hello', [], {} ]
}));