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
const fontDefault = '24px Arial';
const fillDefault = '#fafafa';
const strokeDefault = '#00000030';
const strokeThicknessDefault = 2;

const DEFAULTS = Symbol();

export class GameScoreStyle {

  constructor(style) {
    this._font = style.font || GameScoreStyle.DEFAULTS.font;
    this._fill = style.fill || GameScoreStyle.DEFAULTS.fill;
    this._stroke = style.stroke || GameScoreStyle.DEFAULTS.stroke;
    this._strokeThickness = style.strokeThickness || GameScoreStyle.DEFAULTS.strokeThickness;
  }

  get font() {
    return this._font;
  }

  get fill() {
    return this._fill;
  }

  get stroke() {
    return this._stroke;
  }

  get strokeThickness() {
    return this._strokeThickness;
  }

  static get DEFAULTS() {
    if (!GameScoreStyle[DEFAULTS]) {
      GameScoreStyle[DEFAULTS] = Object.assign({
        font: fontDefault,
        fill: fillDefault,
        stroke: strokeDefault,
        strokeThickness: strokeThicknessDefault
      });

      Object.freeze(GameScoreStyle[DEFAULTS]);
    }

    return GameScoreStyle[DEFAULTS];
  }

}
