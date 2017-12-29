/**
 * MultiTasking Cubes - Games
 * Copyright (C) 2017 - Miguel Reboiro-Jato, Andrés Vieira Vázquez,
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
import GameMetadata from '../../../lib/game/metadata/GameMetadata';
import GameTaskType from '../../../lib/game/metadata/GameTaskType';
import Parameter from '../../../lib/game/metadata/parameter/Parameter';
import SecondsParameter from '../../../lib/game/metadata/parameter/time/SecondsParameter';
import IntegerParameter from '../../../lib/game/metadata/parameter/basic/IntegerParameter';

const id = 'stub';

export default class GameMetadataStub extends GameMetadata {
  static get ID() {
    return id;
  }

  constructor() {
    super(
      GameMetadataStub.ID,
      [ GameTaskType.TYPES.FREE_MEMORY ],
      [
        Parameter.build(SecondsParameter, id, 'param1', 5),
        Parameter.build(IntegerParameter, id, 'param2', 1, 1, 10)
      ]
    );
  }

  isValid() {
    return true;
  }
}
