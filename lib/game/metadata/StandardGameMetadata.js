/**
 * MultiTasking Cubes - Games
 * Copyright (C) 2017-2018 - Miguel Reboiro-Jato, Andrés Vieira Vázquez,
 * Adolfo Piñón Blanco, Hugo López-Fernández, Rosalía Laza Fidalgo,
 * Reyes Pavón Rial, Francisco Otero Lamas, Adrián Varela Pomar,
 * Carlos Spuch Calvar, and Tania Rivera Baltanás
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
import GameMetadata from "./GameMetadata";
import I18NId from "../../i18n/I18NId";
import Parameter from "./parameter/Parameter";
import GameCallback from "../callback/GameCallback";
import SecondsParameter from "./parameter/time/SecondsParameter";
import BooleanParameter from "./parameter/basic/BooleanParameter";

const DEFAULTS = Symbol();

export default class StandardGameMetadata extends GameMetadata {

  static get DEFAULTS() {
    if (!StandardGameMetadata[DEFAULTS]) {
      StandardGameMetadata[DEFAULTS] = {
        TIME: 60,
        TIMER_VISIBLE: true
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
    defaultTimerVisible = StandardGameMetadata.DEFAULTS.TIMER_VISIBLE
  ) {
    super(
      id,
      taskTypes,
      [
        Parameter.build(SecondsParameter, 'standard', 'time', defaultTime),
        Parameter.build(BooleanParameter, 'standard', 'timerVisible', defaultTimerVisible),
        ...parameters
      ],
      gameCallbackType,
      nameId,
      descriptionId
    );
  }
}