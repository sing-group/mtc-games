/*
 * MultiTasking Cubes - Games
 * Copyright (C) 2017 - Miguel Reboiro-Jato, Andrés Vieira Vázquez,
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
import check from 'check-types';

const TYPES = Symbol();

export default class GameTaskType {
  static get TYPES() {
    if (!GameTaskType[TYPES]) {
      GameTaskType[TYPES] = {
        FREE_MEMORY: new GameTaskType('game.task.freeMemory'),
        RECOGNITION: new GameTaskType('game.task.recognition'),
        PLAYBACK_HEARING: new GameTaskType('game.task.playbackHearing'),
        VERBAL_FLUENCY: new GameTaskType('game.task.verbalFluency'),
        ATTENTIONAL_SPAN: new GameTaskType('game.task.attentionalSpan'),
        CENTRAL_EXECUTIVE: new GameTaskType('game.task.centralExecutive'),
        CALCULUS: new GameTaskType('game.task.calculus'),
        ASSOCIATED_PAIRS: new GameTaskType('game.task.associatedPairs')
      };

      Object.freeze(GameTaskType[TYPES]);
    }

    return GameTaskType[TYPES];
  }

  constructor(id) {
    check.assert.nonEmptyString(id, 'id should be a non-empty string');
    this._id = id;
  }

  get id() {
    return this._id;
  }
}
