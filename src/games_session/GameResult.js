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
import check from 'check-types';

import {AssignedGamesSession} from './AssignedGamesSession';

export class GameResult {
  constructor(
    assignedGamesSession,
    gameIndex,
    attempt,
    startDate,
    endDate,
    results
  ) {
    check.assert.instance(assignedGamesSession, AssignedGamesSession, 'assignedGamesSession should be an instance of AssignedGamesSession');
    check.assert.inRange(gameIndex, 0, assignedGamesSession.countGames() - 1, 'gameIndex should be a valid game index');
    check.assert.positive(attempt, 'attempt should be a positive value');
    check.assert.instance(startDate, Date, 'startDate should be a valid date');
    check.assert.instance(endDate, Date, 'endDate should be a valid date');
    check.assert.object(results, 'results should be an object');

    this._assignedGamesSession = assignedGamesSession;
    this._gameIndex = gameIndex;
    this._attempt = attempt;
    this._startDate = startDate;
    this._endDate = endDate;
    this._results = results;
  }

  get assignedGamesSession() {
    return this._assignedGamesSession;
  }

  get gameIndex() {
    return this._gameIndex;
  }

  get attempt() {
    return this._attempt;
  }

  get startDate() {
    return this._startDate;
  }

  get endDate() {
    return this._endDate;
  }

  get results() {
    return this._results;
  }

}
