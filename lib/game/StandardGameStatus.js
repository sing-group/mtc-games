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

import StartStageRenderer from './stage/start/StartStageRenderer';
import EndStageRenderer from './stage/end/EndStageRenderer';
import StartStageCallback from './stage/start/StartStageCallback';
import EndStageCallback from './stage/end/EndStageCallback';
import StartStageStatus from './stage/start/StartStageStatus';
import EndStageStatus from './stage/end/EndStageStatus';
import GameStatus from './GameStatus';

export default class StandardGameStatus extends GameStatus {
  constructor(game) {
    super(game);

    this.states.forEach(state =>
      this.game.state.add(state.id, state.renderer, state.default)
    );
  }

  get states() {
    return [
      {
        id: 'StartRenderer',
        renderer: this._buildStartRenderer(),
        default: true
      },
      {
        id: 'MainRenderer',
        renderer: this._buildMainRenderer(),
        default: false
      },
      {
        id: 'TutorialRenderer',
        renderer: this._buildTutorialRenderer(),
        default: false
      },
      {
        id: 'EndRenderer',
        renderer: this._buildEndRenderer(),
        default: false
      }
    ];
  }

  _buildStartRenderer() {
    return new StartStageRenderer(
      new StartStageStatus(
        this,
        new StartStageCallback({
          onStartGameRequested: this._onStartGameRequested.bind(this),
          onStartTutorialRequested: this._onStartTutorialRequested.bind(this)
        })
      )
    );
  }

  _buildEndRenderer() {
    return new EndStageRenderer(
      new EndStageStatus(
        this,
        new EndStageCallback({
          onRetryRequested: this._onRetryRequested.bind(this)
        })
      )
    );
  }

  _buildMainRenderer() {
    throw new Error('_buildMainRenderer must be implemented by the subclasses of StandardGameRenderer');
  }

  _buildTutorialRenderer() {
    throw new Error('_buildTutorialRenderer must be implemented by the subclasses of StandardGameRenderer');
  }

  _onStartGameRequested() {
    this.setNormalMode();
    this._game.state.start('MainRenderer', true, true);
  }

  _onStartTutorialRequested() {
    this.setTutorialMode();
    this._game.state.start('TutorialRenderer', true, true);
  }

  _onGameStarted() {
    this.configuration.gameCallback.gameStarted();
  }

  _onGameFinished(gameResult) {
    this._addResult(gameResult);

    this.configuration.gameCallback.gameFinished(gameResult);

    this._game.state.start('EndRenderer', true, true);
  }

  _onTutorialGameStarted() {
  }

  _onTutorialGameFinished() {
    this._game.state.start('EndRenderer', true, true);
  }

  _onRetryRequested() {
    if (this.canRetry()) {
      this._game.state.start('StartRenderer', true, true);
    } else {
      console.log('Trying to retry with no retries left');
    }
  }
}
