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
import {MtcDiceFace} from '../../dice';
import {GameTaskType, StandardGameMetadata} from '../metadata';
import {EnumStringParameter, IntegerParameter, Parameter, SecondsParameter} from '../metadata/parameter';
import {CentralExecutiveGameCallback} from './CentralExecutiveGameCallback';

const DEFAULTS = Symbol();
const RESPONSE_TYPES = Symbol();

export class CentralExecutiveGameMetadata extends StandardGameMetadata {
  constructor() {
    super(
      CentralExecutiveGameMetadata.ID,
      [GameTaskType.TYPES.CENTRAL_EXECUTIVE],
      [
        Parameter.build(
          SecondsParameter, CentralExecutiveGameMetadata.ID,
          'timePerElement', CentralExecutiveGameMetadata.DEFAULTS.TIME_PER_ELEMENT
        ),
        Parameter.build(
          IntegerParameter, CentralExecutiveGameMetadata.ID,
          'numberOfElements', CentralExecutiveGameMetadata.DEFAULTS.NUMBER_OF_ELEMENTS, 1, MtcDiceFace.COUNT_VALUES
        ),
        Parameter.build(
          EnumStringParameter, CentralExecutiveGameMetadata.ID,
          'responseIntroduction', CentralExecutiveGameMetadata.DEFAULTS.RESPONSE_INTRODUCTION, CentralExecutiveGameMetadata.RESPONSE_TYPES
        )
      ],
      CentralExecutiveGameCallback
    );
  }

  static get ID() {
    return 'centralExecutive';
  }

  static get DEFAULTS() {
    if (!CentralExecutiveGameMetadata[DEFAULTS]) {
      CentralExecutiveGameMetadata[DEFAULTS] = Object.assign({
        TIME_PER_ELEMENT: 3,
        NUMBER_OF_ELEMENTS: Math.floor(MtcDiceFace.COUNT_VALUES / 2),
        RESPONSE_INTRODUCTION: CentralExecutiveGameMetadata.RESPONSE_TYPES[0]
      }, StandardGameMetadata.DEFAULTS);

      Object.freeze(CentralExecutiveGameMetadata[DEFAULTS]);
    }

    return CentralExecutiveGameMetadata[DEFAULTS];
  }

  static get RESPONSE_TYPES() {
    if (!CentralExecutiveGameMetadata[RESPONSE_TYPES]) {
      CentralExecutiveGameMetadata[RESPONSE_TYPES] = [
        'NORMAL', 'STERNBERG'
      ];

      Object.freeze(CentralExecutiveGameMetadata[RESPONSE_TYPES]);
    }

    return CentralExecutiveGameMetadata[RESPONSE_TYPES];
  }
}
