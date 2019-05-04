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
import {StandardGameStatus} from '../../game/StandardGameStatus';
import {CentralExecutiveGame} from './CentralExecutiveGame';
import {
  CentralExecutiveMainCallback,
  CentralExecutiveMainRenderer,
  CentralExecutiveMainStageRenderConfiguration,
  CentralExecutiveMainStageStatus
} from './main';


export class CentralExecutiveStatus extends StandardGameStatus {

  constructor(game) {
    check.assert.instance(game, CentralExecutiveGame);

    super(game);
  }

  _buildMainRenderer() {
    return new CentralExecutiveMainRenderer(
      new CentralExecutiveMainStageRenderConfiguration(),
      new CentralExecutiveMainStageStatus(this, new CentralExecutiveMainCallback({
        onGameStarted: this._onGameStarted.bind(this),
        onGameFinished: this._onGameFinished.bind(this)
      }))
    );
  }

  _buildTutorialRenderer() {
    return new CentralExecutiveMainRenderer(
      new CentralExecutiveMainStageRenderConfiguration(),
      new CentralExecutiveMainStageStatus(this, new CentralExecutiveMainCallback({
        onGameStarted: this._onTutorialGameStarted.bind(this),
        onGameFinished: this._onTutorialGameFinished.bind(this)
      }))
    );
  }

  completeGame() {
    this.gameCompleted = true;
  }

  disableGame() {
    this.gameRunning = false;
  }

  enableGame() {
    this.gameRunning = true;
  }

}
