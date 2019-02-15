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

export default class MainStageCallback {
  constructor(callbacks) {
    check.assert.object(callbacks, 'callbacks should be an object');
    check.assert.function(callbacks.onTutorialStarted, 'callbacks should have an onTutorialStarted function');
    check.assert.function(callbacks.onTutorialFinished, 'callbacks should have an onTutorialFinished function');

    this.onTutorialStarted = callbacks.onTutorialStarted.bind(this);
    this.onTutorialFinished = callbacks.onTutorialFinished.bind(this);
  }
}
