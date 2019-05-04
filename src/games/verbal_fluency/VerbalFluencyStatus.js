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

import {VerbalFluencyDictionary} from './VerbalFluencyDictionary';
import {VerbalFluencyGame} from './VerbalFluencyGame';
import {
  VerbalFluencyMainCallback,
  VerbalFluencyMainRenderer,
  VerbalFluencyMainStageRenderConfiguration,
  VerbalFluencyMainStageStatus
} from './main';
import {StandardGameStatus} from '../../game/StandardGameStatus';

export class VerbalFluencyStatus extends StandardGameStatus {
  constructor(game) {
    check.assert.instance(game, VerbalFluencyGame);

    super(game);

    if (typeof VerbalFluencyDictionary[this.configuration.locale] === 'undefined') {
      this._validWords = VerbalFluencyDictionary.en_US;
    } else {
      this._validWords = VerbalFluencyDictionary[this.configuration.locale];
    }
  }

  get validWords() {
    return this._validWords;
  }

  _buildMainRenderer() {
    return new VerbalFluencyMainRenderer(
      new VerbalFluencyMainStageRenderConfiguration(),
      new VerbalFluencyMainStageStatus(this, new VerbalFluencyMainCallback({
        onGameStarted: this._onGameStarted.bind(this),
        onGameFinished: this._onGameFinished.bind(this),
        onWordChecked: this._onWordChecked.bind(this),
        onWordReset: this._onWordReset.bind(this)
      }))
    );
  }

  _buildTutorialRenderer() {
    return new VerbalFluencyMainRenderer(
      new VerbalFluencyMainStageRenderConfiguration(),
      new VerbalFluencyMainStageStatus(this, new VerbalFluencyMainCallback({
        onGameStarted: this._onTutorialGameStarted.bind(this),
        onGameFinished: this._onTutorialGameFinished.bind(this),
        onWordChecked: this._onTutorialWordChecked.bind(this),
        onWordReset: this._onTutorialWordReset.bind(this)
      }))
    );
  }

  _onWordChecked(checkStatus) {
    this.configuration.gameCallback.wordChecked(checkStatus);
  }

  _onWordReset() {
    this.configuration.gameCallback.wordReset();
  }

  _onTutorialWordChecked() {
  }

  _onTutorialWordReset() {
  }
}
