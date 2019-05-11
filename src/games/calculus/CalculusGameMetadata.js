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
import {CalculusGameCallback} from './CalculusGameCallback';
import {GameMetadata, GameTaskType} from '../../game/metadata';
import {IntegerParameter, Parameter, SecondsParameter} from '../../game/metadata/parameter';

const DEFAULTS = Symbol();

export class CalculusGameMetadata extends GameMetadata {

  constructor() {
    super(
      CalculusGameMetadata.ID,
      [GameTaskType.TYPES.CALCULUS],
      [
        Parameter.build(IntegerParameter, CalculusGameMetadata.ID,
          'numberOfTries', CalculusGameMetadata.DEFAULTS.NUMBER_OF_TRIES, 1, 5),
        Parameter.build(IntegerParameter, CalculusGameMetadata.ID,
          'numberOfOperations', CalculusGameMetadata.DEFAULTS.NUMBER_OF_OPERATIONS, 1, 66),
        Parameter.build(SecondsParameter, CalculusGameMetadata.ID,
          'timePerOperation', CalculusGameMetadata.DEFAULTS.TIME_PER_OPERATION),
        Parameter.build(SecondsParameter, CalculusGameMetadata.ID,
          'shownOperationTime', CalculusGameMetadata.DEFAULTS.SHOWN_OPERATION_TIME)
      ],
      CalculusGameCallback
    );
  }

  static get ID() {
    return 'calculus';
  }

  static get DEFAULTS() {
    if (!CalculusGameMetadata[DEFAULTS]) {
      CalculusGameMetadata[DEFAULTS] = Object.assign({
        NUMBER_OF_TRIES: 3,
        NUMBER_OF_OPERATIONS: 5,
        TIME_PER_OPERATION: 5,
        SHOWN_OPERATION_TIME: 2
      }, {});

      Object.freeze(CalculusGameMetadata[DEFAULTS]);
    }

    return CalculusGameMetadata[DEFAULTS];
  }

}
