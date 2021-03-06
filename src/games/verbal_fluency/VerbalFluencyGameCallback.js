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

import {GameCallback} from '../../game/callback';

export class VerbalFluencyGameCallback extends GameCallback {
  static buildWith(customCallbacks) {
    check.assert.object(customCallbacks, 'customCallbacks should be an object');

    const callbacks = Object.assign(new VerbalFluencyGameCallback(), customCallbacks);

    check.assert.function(callbacks.gameStarted, 'customCallbacks.gameStarted should be a function');
    check.assert.function(callbacks.gameFinished, 'customCallbacks.gameFinished should be a function');
    check.assert.function(callbacks.wordReset, 'customCallbacks.wordReset should be a function');
    check.assert.function(callbacks.wordChecked, 'customCallbacks.wordChecked should be a function');

    return callbacks;
  }

  static merge(multipleCallbacks) {
    return VerbalFluencyGameCallback.buildWith({
      gameStarted() {
        multipleCallbacks.forEach(callbacks => callbacks.gameStarted(...arguments));
      },

      gameFinished() {
        multipleCallbacks.forEach(callbacks => callbacks.gameFinished(...arguments));
      },

      wordReset() {
        multipleCallbacks.forEach(callbacks => callbacks.wordReset(...arguments));
      },

      wordChecked() {
        multipleCallbacks.forEach(callbacks => callbacks.wordChecked(...arguments));
      }
    });
  }

  wordReset() {
  }

  wordChecked() {
  }
}
