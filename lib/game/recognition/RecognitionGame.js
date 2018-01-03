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
import Game from '../Game';
import RecognitionGameMetadata from './RecognitionGameMetadata';
import RecognitionGameStartState from './RecognitionGameStartState';
import RecognitionGameMainState from './RecognitionGameMainState';
import RecognitionGameEndState from './RecognitionGameEndState';

const PHASES = Symbol();

export default class RecognitionGame extends Game {

  static get PHASES() {
    if (!RecognitionGame[PHASES]) {
      RecognitionGame[PHASES] = {
        DICE_SHOW: 0,
        DICE_SELECT: 1
      };

      Object.freeze(RecognitionGame[PHASES]);
    }

    return RecognitionGame[PHASES];
  }

  constructor(gameConfig) {
    super(new RecognitionGameMetadata(), gameConfig);
    this.try = 0;
    this.state.add('StartState', RecognitionGameStartState, true);
    this.state.add('MainState', RecognitionGameMainState, false);
    this.state.add('EndState', RecognitionGameEndState, false);
  }
}