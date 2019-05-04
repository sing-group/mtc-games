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
import {AssociatedPairsGameCallback} from './AssociatedPairsGameCallback';
import {I18NId} from "../../i18n";

const DEFAULTS = Symbol();
const DICE_FACES_TYPES = Symbol();

export class AssociatedPairsGameMetadata extends StandardGameMetadata {
  constructor() {
    super(
      AssociatedPairsGameMetadata.ID,
      [GameTaskType.TYPES.ASSOCIATED_PAIRS],
      [
        Parameter.build(
          SecondsParameter, AssociatedPairsGameMetadata.ID,
          'timePerPair', AssociatedPairsGameMetadata.DEFAULTS.TIME_PER_PAIR
        ),
        Parameter.build(
          IntegerParameter, AssociatedPairsGameMetadata.ID,
          'numberOfPairs', AssociatedPairsGameMetadata.DEFAULTS.NUMBER_OF_PAIRS, 1, 100
        ),
        Parameter.build(EnumStringParameter, AssociatedPairsGameMetadata.ID,
          'diceFace', AssociatedPairsGameMetadata.DEFAULTS.DICE_FACE, AssociatedPairsGameMetadata.DICE_FACES_TYPES),
      ],
      AssociatedPairsGameCallback
    );
  }

  static get ID() {
    return 'associatedPairs';
  }

  static get DEFAULTS() {
    if (!AssociatedPairsGameMetadata[DEFAULTS]) {
      AssociatedPairsGameMetadata[DEFAULTS] = Object.assign({
        TIME_PER_PAIR: 3,
        NUMBER_OF_PAIRS: Math.floor(MtcDiceFace.COUNT_VALUES / 6),
        DICE_FACE: AssociatedPairsGameMetadata.DICE_FACES_TYPES[6]
      }, StandardGameMetadata.DEFAULTS);

      Object.freeze(AssociatedPairsGameMetadata[DEFAULTS]);
    }

    return AssociatedPairsGameMetadata[DEFAULTS];
  }

  static get DICE_FACES_TYPES() {
    if (!AssociatedPairsGameMetadata[DICE_FACES_TYPES]) {
      AssociatedPairsGameMetadata[DICE_FACES_TYPES] = [
        I18NId.forConfigParamValue('diceFace').value('numbers'),
        I18NId.forConfigParamValue('diceFace').value('letters'),
        I18NId.forConfigParamValue('diceFace').value('trigrams'),
        I18NId.forConfigParamValue('diceFace').value('colors'),
        I18NId.forConfigParamValue('diceFace').value('words'),
        I18NId.forConfigParamValue('diceFace').value('tools'),
        I18NId.forConfigParamValue('diceFace').value('random')
      ];

      Object.freeze(AssociatedPairsGameMetadata[DICE_FACES_TYPES]);
    }

    return AssociatedPairsGameMetadata[DICE_FACES_TYPES];
  }
}
