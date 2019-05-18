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

export class AudioDiceToolAssets {
  constructor(
    toolBroom,
    toolBrush,
    toolHammer,
    toolHandSaw,
    toolLadder,
    toolMeasurementTape,
    toolPliers,
    toolRoller,
    toolSaw,
    toolScissors,
    toolTrowel,
    toolWheelBarrow
  ) {
    this._toolBroom = toolBroom;
    this._toolBrush = toolBrush;
    this._toolHammer = toolHammer;
    this._toolHandSaw = toolHandSaw;
    this._toolLadder = toolLadder;
    this._toolMeasurementTape = toolMeasurementTape;
    this._toolPliers = toolPliers;
    this._toolRoller = toolRoller;
    this._toolSaw = toolSaw;
    this._toolScissors = toolScissors;
    this._toolTrowel = toolTrowel;
    this._toolWheelBarrow = toolWheelBarrow;
  }

  get toolBroom() {
    return this._toolBroom;
  }

  get toolBrush() {
    return this._toolBrush;
  }

  get toolHammer() {
    return this._toolHammer;
  }

  get toolHandSaw() {
    return this._toolHandSaw;
  }

  get toolLadder() {
    return this._toolLadder;
  }

  get toolMeasurementTape() {
    return this._toolMeasurementTape;
  }

  get toolPliers() {
    return this._toolPliers;
  }

  get toolRoller() {
    return this._toolRoller;
  }

  get toolSaw() {
    return this._toolSaw;
  }

  get toolScissors() {
    return this._toolScissors;
  }

  get toolTrowel() {
    return this._toolTrowel;
  }

  get toolWheelBarrow() {
    return this._toolWheelBarrow;
  }

  get resourceList() {
    const resources = new Map();

    resources.set('tools-broom-audio', this.toolBroom);
    resources.set('tools-brush-audio', this.toolBrush);
    resources.set('tools-hammer-tools-audio', this.toolHammer);
    resources.set('tools-hand-saw-audio', this.toolHandSaw);
    resources.set('tools-ladder-audio', this.toolLadder);
    resources.set('tools-measurement-tape-audio', this.toolMeasurementTape);
    resources.set('tools-pliers-audio', this.toolPliers);
    resources.set('tools-roller-audio', this.toolRoller);
    resources.set('tools-saw-tools-audio', this.toolSaw);
    resources.set('tools-scissors-audio', this.toolScissors);
    resources.set('tools-trowel-audio', this.toolTrowel);
    resources.set('tools-wheel-barrow-audio', this.toolWheelBarrow);

    return resources;
  }
}
