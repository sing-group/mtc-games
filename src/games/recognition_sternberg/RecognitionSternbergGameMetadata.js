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
import {RecognitionSternbergGameCallback} from './RecognitionSternbergGameCallback';
import {MtcDiceFace} from '../../dice';
import {EnumStringParameter, GameTaskType, StandardGameMetadata} from '../../game/metadata';
import {IntegerParameter, Parameter, SecondsParameter} from '../../game/metadata/parameter';
import {I18NId} from "../../i18n";

const DEFAULTS = Symbol();
const RESPONSE_TYPES = Symbol();
const CANDIDATE_SHOWN_TYPES = Symbol();
const DICE_FACES_TYPES = Symbol();

export class RecognitionSternbergGameMetadata extends StandardGameMetadata {
  constructor() {
    super(
      RecognitionSternbergGameMetadata.ID,
      [GameTaskType.TYPES.RECOGNITION],
      [
        Parameter.build(
          SecondsParameter, RecognitionSternbergGameMetadata.ID,
          'timePerElement', RecognitionSternbergGameMetadata.DEFAULTS.TIME_PER_ELEMENT
        ),
        Parameter.build(
          SecondsParameter, RecognitionSternbergGameMetadata.ID,
          'timePerCandidate', RecognitionSternbergGameMetadata.DEFAULTS.TIME_PER_CANDIDATE
        ),
        Parameter.build(
          IntegerParameter, RecognitionSternbergGameMetadata.ID,
          'numberOfElements', RecognitionSternbergGameMetadata.DEFAULTS.NUMBER_OF_ELEMENTS, 1, MtcDiceFace.COUNT_VALUES
        ),
        Parameter.build(
          EnumStringParameter, RecognitionSternbergGameMetadata.ID,
          'candidateShown', RecognitionSternbergGameMetadata.DEFAULTS.CANDIDATE_SHOWN, RecognitionSternbergGameMetadata.CANDIDATE_SHOWN_TYPES
        ),
        Parameter.build(
          EnumStringParameter, RecognitionSternbergGameMetadata.ID,
          'responseIntroduction', RecognitionSternbergGameMetadata.DEFAULTS.RESPONSE_INTRODUCTION, RecognitionSternbergGameMetadata.RESPONSE_TYPES
        ),
        Parameter.build(EnumStringParameter, RecognitionSternbergGameMetadata.ID,
          'diceFace', RecognitionSternbergGameMetadata.DEFAULTS.DICE_FACE, RecognitionSternbergGameMetadata.DICE_FACES_TYPES),
      ],
      RecognitionSternbergGameCallback
    );
  }

  static get ID() {
    return 'recognitionSternberg';
  }

  static get DEFAULTS() {
    if (!RecognitionSternbergGameMetadata[DEFAULTS]) {
      RecognitionSternbergGameMetadata[DEFAULTS] = Object.assign({
        TIME_PER_ELEMENT: 3,
        TIME_PER_CANDIDATE: 3,
        NUMBER_OF_ELEMENTS: Math.floor(MtcDiceFace.COUNT_VALUES / 4),
        CANDIDATE_SHOWN: RecognitionSternbergGameMetadata.CANDIDATE_SHOWN_TYPES[2],
        RESPONSE_INTRODUCTION: RecognitionSternbergGameMetadata.RESPONSE_TYPES[2],
        DICE_FACE: RecognitionSternbergGameMetadata.DICE_FACES_TYPES[6]
      }, StandardGameMetadata.DEFAULTS);

      Object.freeze(RecognitionSternbergGameMetadata[DEFAULTS]);
    }

    return RecognitionSternbergGameMetadata[DEFAULTS];
  }

  static get RESPONSE_TYPES() {
    if (!RecognitionSternbergGameMetadata[RESPONSE_TYPES]) {
      RecognitionSternbergGameMetadata[RESPONSE_TYPES] = [
        I18NId.forConfigParamValue('responseIntroduction').value('direct'),
        I18NId.forConfigParamValue('responseIntroduction').value('inverse'),
        I18NId.forConfigParamValue('responseIntroduction').value('random')
      ];

      Object.freeze(RecognitionSternbergGameMetadata[RESPONSE_TYPES]);
    }

    return RecognitionSternbergGameMetadata[RESPONSE_TYPES];
  }

  static get CANDIDATE_SHOWN_TYPES() {
    if (!RecognitionSternbergGameMetadata[CANDIDATE_SHOWN_TYPES]) {
      RecognitionSternbergGameMetadata[CANDIDATE_SHOWN_TYPES] = [
        I18NId.forConfigParamValue('candidateShown').value('direct'),
        I18NId.forConfigParamValue('candidateShown').value('inverse'),
        I18NId.forConfigParamValue('candidateShown').value('randomWithDuplicates'),
        I18NId.forConfigParamValue('candidateShown').value('randomWithoutDuplicates')
      ];

      Object.freeze(RecognitionSternbergGameMetadata[CANDIDATE_SHOWN_TYPES]);
    }

    return RecognitionSternbergGameMetadata[CANDIDATE_SHOWN_TYPES];
  }

  static get DICE_FACES_TYPES() {
    if (!RecognitionSternbergGameMetadata[DICE_FACES_TYPES]) {
      RecognitionSternbergGameMetadata[DICE_FACES_TYPES] = [
        I18NId.forConfigParamValue('diceFace').value('numbers'),
        I18NId.forConfigParamValue('diceFace').value('letters'),
        I18NId.forConfigParamValue('diceFace').value('trigrams'),
        I18NId.forConfigParamValue('diceFace').value('colors'),
        I18NId.forConfigParamValue('diceFace').value('words'),
        I18NId.forConfigParamValue('diceFace').value('tools'),
        I18NId.forConfigParamValue('diceFace').value('random')
      ];

      Object.freeze(RecognitionSternbergGameMetadata[DICE_FACES_TYPES]);
    }

    return RecognitionSternbergGameMetadata[DICE_FACES_TYPES];
  }
}
