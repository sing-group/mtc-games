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
import {EnumStringParameter, GameTaskType, StandardGameMetadata} from '../../game/metadata';
import {IntegerParameter, Parameter, SecondsParameter} from '../../game/metadata/parameter';
import {I18NId} from "../../i18n";

const DEFAULTS = Symbol();
const DICE_FACES_TYPES = Symbol();

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
        Parameter.build(EnumStringParameter, RecognitionGameMetadata.ID,
          'diceFace', RecognitionGameMetadata.DEFAULTS.DICE_FACE, RecognitionGameMetadata.DICE_FACES_TYPES),
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
        DICE_FACE: RecognitionGameMetadata.DICE_FACES_TYPES[6]
      }, StandardGameMetadata.DEFAULTS);

      Object.freeze(RecognitionGameMetadata[DEFAULTS]);
    }

    return RecognitionGameMetadata[DEFAULTS];
  }

  static get DICE_FACES_TYPES() {
    if (!RecognitionGameMetadata[DICE_FACES_TYPES]) {
      RecognitionGameMetadata[DICE_FACES_TYPES] = [
        I18NId.forConfigParamValue('diceFace').value('numbers'),
        I18NId.forConfigParamValue('diceFace').value('letters'),
        I18NId.forConfigParamValue('diceFace').value('trigrams'),
        I18NId.forConfigParamValue('diceFace').value('colors'),
        I18NId.forConfigParamValue('diceFace').value('words'),
        I18NId.forConfigParamValue('diceFace').value('tools'),
        I18NId.forConfigParamValue('diceFace').value('random')
      ];

      Object.freeze(RecognitionGameMetadata[DICE_FACES_TYPES]);
    }

    return RecognitionGameMetadata[DICE_FACES_TYPES];
  }
}
