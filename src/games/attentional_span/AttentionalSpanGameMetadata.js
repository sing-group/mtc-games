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
import {GameTaskType, StandardGameMetadata} from '../../game/metadata';
import {EnumStringParameter, IntegerParameter, Parameter, SecondsParameter} from '../../game/metadata/parameter';
import {AttentionalSpanGameCallback} from './AttentionalSpanGameCallback';
import {I18NId} from '../../i18n';

const DEFAULTS = Symbol();
const RESPONSE_TYPES = Symbol();
const DICE_FACES_TYPES = Symbol();

export class AttentionalSpanGameMetadata extends StandardGameMetadata {
  constructor() {
    super(
      AttentionalSpanGameMetadata.ID,
      [GameTaskType.TYPES.ATTENTIONAL_SPAN],
      [
        Parameter.build(
          SecondsParameter, AttentionalSpanGameMetadata.ID,
          'timeBetweenElements', AttentionalSpanGameMetadata.DEFAULTS.TIME_BETWEEN_ELEMENTS
        ),
        Parameter.build(
          IntegerParameter, AttentionalSpanGameMetadata.ID,
          'numberOfElements', AttentionalSpanGameMetadata.DEFAULTS.NUMBER_OF_ELEMENTS, 3, MtcDiceFace.COUNT_VALUES
        ),
        Parameter.build(
          EnumStringParameter, AttentionalSpanGameMetadata.ID,
          'responseIntroduction', AttentionalSpanGameMetadata.DEFAULTS.RESPONSE_INTRODUCTION, AttentionalSpanGameMetadata.RESPONSE_TYPES
        ),
        Parameter.build(EnumStringParameter, AttentionalSpanGameMetadata.ID,
          'diceFace', AttentionalSpanGameMetadata.DEFAULTS.DICE_FACE, AttentionalSpanGameMetadata.DICE_FACES_TYPES),
      ],
      AttentionalSpanGameCallback
    );
  }

  static get ID() {
    return 'attentionalSpan';
  }

  static get DEFAULTS() {
    if (!AttentionalSpanGameMetadata[DEFAULTS]) {
      AttentionalSpanGameMetadata[DEFAULTS] = Object.assign({
        TIME_BETWEEN_ELEMENTS: 1,
        NUMBER_OF_ELEMENTS: Math.floor(MtcDiceFace.COUNT_VALUES / 4),
        RESPONSE_INTRODUCTION: AttentionalSpanGameMetadata.RESPONSE_TYPES[1],
        DICE_FACE: AttentionalSpanGameMetadata.DICE_FACES_TYPES[2]
      }, StandardGameMetadata.DEFAULTS);

      Object.freeze(AttentionalSpanGameMetadata[DEFAULTS]);
    }

    return AttentionalSpanGameMetadata[DEFAULTS];
  }

  static get RESPONSE_TYPES() {
    if (!AttentionalSpanGameMetadata[RESPONSE_TYPES]) {
      AttentionalSpanGameMetadata[RESPONSE_TYPES] = [
        I18NId.forConfigParamValue('responseIntroduction').value('direct'),
        I18NId.forConfigParamValue('responseIntroduction').value('inverse')
      ];

      Object.freeze(AttentionalSpanGameMetadata[RESPONSE_TYPES]);
    }

    return AttentionalSpanGameMetadata[RESPONSE_TYPES];
  }

  static get DICE_FACES_TYPES() {
    if (!AttentionalSpanGameMetadata[DICE_FACES_TYPES]) {
      AttentionalSpanGameMetadata[DICE_FACES_TYPES] = [
        I18NId.forConfigParamValue('diceFace').value('numbers'),
        I18NId.forConfigParamValue('diceFace').value('letters'),
        I18NId.forConfigParamValue('diceFace').value('random')
      ];

      Object.freeze(AttentionalSpanGameMetadata[DICE_FACES_TYPES]);
    }

    return AttentionalSpanGameMetadata[DICE_FACES_TYPES];
  }
}
