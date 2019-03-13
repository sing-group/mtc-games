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
import {RecognitionGameCallback} from './RecognitionGameCallback';
import {MtcDiceFace} from '../../dice';
import {GameTaskType, StandardGameMetadata} from '../metadata';
import {EnumStringParameter, IntegerParameter, Parameter, SecondsParameter} from '../metadata/parameter';

const DEFAULTS = Symbol();
const RESPONSE_TYPES = Symbol();

export class RecognitionGameMetadata extends StandardGameMetadata {
  constructor() {
    super(
      RecognitionGameMetadata.ID,
      [GameTaskType.TYPES.RECOGNITION],
      [
        Parameter.build(
          SecondsParameter, RecognitionGameMetadata.ID,
          'timePerElement', RecognitionGameMetadata.DEFAULTS.TIME_PER_ELEMENT
        ),
        Parameter.build(
          IntegerParameter, RecognitionGameMetadata.ID,
          'numberOfElements', RecognitionGameMetadata.DEFAULTS.NUMBER_OF_ELEMENTS, 1, MtcDiceFace.COUNT_VALUES
        ),
        Parameter.build(
          EnumStringParameter, RecognitionGameMetadata.ID,
          'responseIntroduction', RecognitionGameMetadata.DEFAULTS.RESPONSE_INTRODUCTION, RecognitionGameMetadata.RESPONSE_TYPES
        )
      ],
      RecognitionGameCallback
    );
  }

  static get ID() {
    return 'recognition';
  }

  static get DEFAULTS() {
    if (!RecognitionGameMetadata[DEFAULTS]) {
      RecognitionGameMetadata[DEFAULTS] = Object.assign({
        TIME_PER_ELEMENT: 3,
        NUMBER_OF_ELEMENTS: Math.floor(MtcDiceFace.COUNT_VALUES / 2),
        RESPONSE_INTRODUCTION: RecognitionGameMetadata.RESPONSE_TYPES[0]
      }, StandardGameMetadata.DEFAULTS);

      Object.freeze(RecognitionGameMetadata[DEFAULTS]);
    }

    return RecognitionGameMetadata[DEFAULTS];
  }

  static get RESPONSE_TYPES() {
    if (!RecognitionGameMetadata[RESPONSE_TYPES]) {
      RecognitionGameMetadata[RESPONSE_TYPES] = [
        'NORMAL', 'STERNBERG'
      ];

      Object.freeze(RecognitionGameMetadata[RESPONSE_TYPES]);
    }

    return RecognitionGameMetadata[RESPONSE_TYPES];
  }
}
