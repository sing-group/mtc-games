/*
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

import GameConfig from './GameConfig';

const GAME_MODES = Symbol();

export default class GameStatus {
    static get GAME_MODES() {
        if (!GameStatus[GAME_MODES]) {
            GameStatus[GAME_MODES] = {
                NORMAL: 0,
                TUTORIAL: 1
            };

            Object.freeze(GameStatus[GAME_MODES]);
        }

        return GameStatus[GAME_MODES];
    }

    constructor(game) {
        this._game = game;
        this._states = [];

        this.states.forEach(state =>
            this.game.state.add(state.id, state.renderer, state.default)
        );
    }

    get states() {
        return this._states;
    }

    get game() {
        return this._game;
    }

    get configuration() {
        return this._game.configuration;
    }
}