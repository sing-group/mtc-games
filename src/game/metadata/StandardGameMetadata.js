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
import {GameMetadata} from './GameMetadata';
import {I18NId} from '../../i18n';
import {BooleanParameter, IntegerParameter, Parameter, SecondsParameter} from './parameter';
import {GameCallback} from '../callback';

const DEFAULTS = Symbol();

export class StandardGameMetadata extends GameMetadata {

  static get DEFAULTS() {
    if (!StandardGameMetadata[DEFAULTS]) {
      StandardGameMetadata[DEFAULTS] = {
        TIME: 120,
        TIMER_VISIBLE: true,
        NUMBER_OF_TRIES: 3
      };

      Object.freeze(StandardGameMetadata[DEFAULTS]);
    }

    return StandardGameMetadata[DEFAULTS];
  }

  constructor(
    id,
    taskTypes = [],
    parameters = [],
    gameCallbackType = GameCallback,
    nameId = I18NId.forGame(id).name(),
    descriptionId = I18NId.forGame(id).description(),
    defaultTime = StandardGameMetadata.DEFAULTS.TIME,
    defaultTimerVisible = StandardGameMetadata.DEFAULTS.TIMER_VISIBLE,
    defaultNumberOfTries = StandardGameMetadata.DEFAULTS.NUMBER_OF_TRIES
  ) {
    super(
      id,
      taskTypes,
      [
        Parameter.build(SecondsParameter, 'standard', 'time', defaultTime),
        Parameter.build(BooleanParameter, 'standard', 'timerVisible', defaultTimerVisible),
        Parameter.build(IntegerParameter, 'standard', 'numberOfTries', defaultNumberOfTries, 1, 5),
        ...parameters
      ],
      gameCallbackType,
      nameId,
      descriptionId
    );
  }
}
