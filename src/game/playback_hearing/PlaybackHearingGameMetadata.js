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
import {PlaybackHearingGameCallback} from './PlaybackHearingGameCallback';
import {I18NId} from "../../i18n";

const DEFAULTS = Symbol();
const RESPONSE_TYPES = Symbol();
const DICE_FACES_TYPES = Symbol();

export class PlaybackHearingGameMetadata extends StandardGameMetadata {
  constructor() {
    super(
      PlaybackHearingGameMetadata.ID,
      [GameTaskType.TYPES.PLAYBACK_HEARING],
      [
        Parameter.build(
          SecondsParameter, PlaybackHearingGameMetadata.ID,
          'timeBetweenElements', PlaybackHearingGameMetadata.DEFAULTS.TIME_BETWEEN_ELEMENTS
        ),
        Parameter.build(
          IntegerParameter, PlaybackHearingGameMetadata.ID,
          'numberOfElements', PlaybackHearingGameMetadata.DEFAULTS.NUMBER_OF_ELEMENTS, 4, MtcDiceFace.COUNT_VALUES
        ),
        Parameter.build(
          EnumStringParameter, PlaybackHearingGameMetadata.ID,
          'responseIntroduction', PlaybackHearingGameMetadata.DEFAULTS.RESPONSE_INTRODUCTION, PlaybackHearingGameMetadata.RESPONSE_TYPES
        ),
        Parameter.build(EnumStringParameter, PlaybackHearingGameMetadata.ID,
          'diceFace', PlaybackHearingGameMetadata.DEFAULTS.DICE_FACE, PlaybackHearingGameMetadata.DICE_FACES_TYPES),
      ],
      PlaybackHearingGameCallback
    );
  }

  static get ID() {
    return 'playbackHearing';
  }

  static get DEFAULTS() {
    if (!PlaybackHearingGameMetadata[DEFAULTS]) {
      PlaybackHearingGameMetadata[DEFAULTS] = Object.assign({
        TIME_BETWEEN_ELEMENTS: 1,
        NUMBER_OF_ELEMENTS: Math.floor(MtcDiceFace.COUNT_VALUES / 3),
        RESPONSE_INTRODUCTION: PlaybackHearingGameMetadata.RESPONSE_TYPES[1],
        DICE_FACE: PlaybackHearingGameMetadata.DICE_FACES_TYPES[3]
      }, StandardGameMetadata.DEFAULTS);

      Object.freeze(PlaybackHearingGameMetadata[DEFAULTS]);
    }

    return PlaybackHearingGameMetadata[DEFAULTS];
  }

  static get RESPONSE_TYPES() {
    if (!PlaybackHearingGameMetadata[RESPONSE_TYPES]) {
      PlaybackHearingGameMetadata[RESPONSE_TYPES] = [
        I18NId.forConfigParamValue('responseIntroduction').value('direct'),
        I18NId.forConfigParamValue('responseIntroduction').value('inverse')
      ];

      Object.freeze(PlaybackHearingGameMetadata[RESPONSE_TYPES]);
    }

    return PlaybackHearingGameMetadata[RESPONSE_TYPES];
  }

  static get DICE_FACES_TYPES() {
    if (!PlaybackHearingGameMetadata[DICE_FACES_TYPES]) {
      PlaybackHearingGameMetadata[DICE_FACES_TYPES] = [
        I18NId.forConfigParamValue('diceFace').value('numbers'),
        I18NId.forConfigParamValue('diceFace').value('letters'),
        I18NId.forConfigParamValue('diceFace').value('trigrams'),
        I18NId.forConfigParamValue('diceFace').value('random')
      ];

      Object.freeze(PlaybackHearingGameMetadata[DICE_FACES_TYPES]);
    }

    return PlaybackHearingGameMetadata[DICE_FACES_TYPES];
  }
}
