/*
 * MultiTasking Cubes - Games
 * Copyright (C) 2017-2019 - Miguel Reboiro-Jato, Andrés Vieira Vázquez,
 * Adolfo Piñón Blanco, Hugo López-Fernández, Rosalía Laza Fidalgo,
 *  Reyes Pavón Rial, Francisco Otero Lamas, Adrián Varela Pomar,
 *  Carlos Spuch Calvar, and Tania Rivera Baltanás
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
import GamesSessionMetadata from './GamesSessionMetadata';
import GameResult from './GameResult';

export default class AssignedGamesSession {
  constructor(
    id,
    metadata,
    startDate,
    endDate,
    results
  ) {
    check.assert.instance(metadata, GamesSessionMetadata, 'metadata should be an instance of GamesSessionMetadata');
    check.assert.instance(startDate, Date, 'startDate should be a Date');
    check.assert.instance(endDate, Date, 'endDate should be a Date');
    check.assert.array.of.instance(results, GameResult, 'results should be an array of GameResult');

    this._id = id;
    this._metadata = metadata;
    this._startDate = startDate;
    this._endDate = endDate;
    this._results = results;
  }

  get id() {
    return this._id;
  }

  get startDate() {
    return this._startDate;
  }

  get endDate() {
    return this._endDate;
  }

  get metadata() {
    return this._metadata;
  }

  get results() {
    return this._results;
  }

  isOpen() {
    return this.isActive() && this._startDate < new Date();
  }

  isActive() {
    return this._endDate > new Date();
  }

  addResult(gameResult) {
    check.assert.instance(gameResult, GameResult, 'gameResult should be an instance of GameResult');
    if (gameResult.assignedGamesSession !== this)
      throw new Error('gameResult does not belong to this session');
    if (gameResult.gameIndex < 0 || gameResult.gameIndex >= this.countGames())
      throw new Error('gameResult has an invalid gameIndex');

    const game = this.metadata.gameConfigs[gameResult.gameIndex];
    const hasResultWithSameAttempt = this.getResultsOfGame(game)
      .some(r => r.attempt === gameResult.attempt);

    if (hasResultWithSameAttempt)
      throw new Error('another gameResult with the same attempt is already present');

    this._results.push(gameResult);
  }

  getResultsOfGame(gameConfig) {
    if (this.hasGame(gameConfig)) {
      const index = this.getGameIndex(gameConfig);

      return this._results.filter(result => result.gameIndex === index)
        .sort((r1, r2) => r1.attempt - r2.attempt);
    } else {
      throw new Error('gameConfig does not belong to this session');
    }
  }

  hasResultsOfGame(gameConfig) {
    if (this.hasGame(gameConfig)) {
      const index = this.getGameIndex(gameConfig);

      return this._results.some(result => result.gameIndex === index);
    } else {
      throw new Error('gameConfig does not belong to this session');
    }
  }

  countResultsOfGame(gameConfig) {
    return this.getResultsOfGame(gameConfig).length;
  }

  hasGame(gameConfig) {
    return this.metadata.gameConfigs.includes(gameConfig);
  }

  getGameIndex(gameConfig) {
    if (this.hasGame(gameConfig)) {
      return this.metadata.gameConfigs.indexOf(gameConfig);
    } else {
      throw new Error('gameConfig does not belong to this session');
    }
  }

  nextPendingGame() {
    if (this.isCompleted()) {
      throw new Error('There are no pending games');
    } else {
      return this.metadata.gameConfigs[this.countCompletedGames()];
    }
  }

  nextPendingGameIndex() {
    return this.getGameIndex(this.nextPendingGame());
  }

  isCompleted() {
    return this.countGames() === this.countCompletedGames();
  }

  isGameCompleted(gameConfig) {
    const gameIndex = this.getGameIndex(gameConfig);

    return this._results.some(result => result.gameIndex === gameIndex);
  }

  countGames() {
    return this._metadata.gameConfigs.length;
  }

  countCompletedGames() {
    return this._metadata.gameConfigs
      .filter(gameConfig => this.hasResultsOfGame(gameConfig))
    .length;
  }
}
