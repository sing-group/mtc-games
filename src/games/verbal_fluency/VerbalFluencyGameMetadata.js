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
import {VerbalFluencyGameCallback} from './VerbalFluencyGameCallback';
import {EnumStringParameter, GameTaskType, Parameter, StandardGameMetadata} from '../../game/metadata';
import {I18NId} from "../../i18n";

const DEFAULTS = Symbol();
const GAME_MODE_TYPES = Symbol();

export class VerbalFluencyGameMetadata extends StandardGameMetadata {
  constructor() {
    super(VerbalFluencyGameMetadata.ID, [GameTaskType.TYPES.VERBAL_FLUENCY], [
      Parameter.build(EnumStringParameter, VerbalFluencyGameMetadata.ID,
        'gameMode', VerbalFluencyGameMetadata.DEFAULTS.GAME_MODE, VerbalFluencyGameMetadata.GAME_MODE_TYPES),

    ], VerbalFluencyGameCallback);
  }

  static get ID() {
    return 'verbalFluency';
  }

  static get DEFAULTS() {
    if (!VerbalFluencyGameMetadata[DEFAULTS]) {
      VerbalFluencyGameMetadata[DEFAULTS] = Object.assign({
        GAME_MODE: VerbalFluencyGameMetadata.GAME_MODE_TYPES[0]
      }, StandardGameMetadata.DEFAULTS);

      Object.freeze(VerbalFluencyGameMetadata[DEFAULTS]);
    }

    return VerbalFluencyGameMetadata[DEFAULTS];
  }

  static get GAME_MODE_TYPES() {
    if (!VerbalFluencyGameMetadata[GAME_MODE_TYPES]) {
      VerbalFluencyGameMetadata[GAME_MODE_TYPES] = [
        I18NId.forConfigParamValue('gameMode').value('click'),
        I18NId.forConfigParamValue('gameMode').value('drag')
      ];

      Object.freeze(VerbalFluencyGameMetadata[GAME_MODE_TYPES]);
    }

    return VerbalFluencyGameMetadata[GAME_MODE_TYPES];
  }
}
