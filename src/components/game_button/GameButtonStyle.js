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
const alphaDefault = 1;
const fontDefault = '25px Arial';
const textColorDefault = '#fafafa';
const strokeColorDefault = 0xfafafa;
const backgroundColorDefault = 0xa9d795;

const DEFAULTS = Symbol();

export class GameButtonStyle {

  constructor(style) {

    this._font = style.font || GameButtonStyle.DEFAULTS.font;
    this._backgroundColor = style.backgroundColor || GameButtonStyle.DEFAULTS.backgroundColor;
    this._textColor = style.textColor || GameButtonStyle.DEFAULTS.textColor;
    this._strokeColor = style.strokeColor || GameButtonStyle.DEFAULTS.strokeColor;
    this._alpha = style.alpha || GameButtonStyle.DEFAULTS.alpha;
  }

  get font() {
    return this._font;
  }

  get backgroundColor() {
    return this._backgroundColor;
  }

  get textColor() {
    return this._textColor;
  }

  get strokeColor() {
    return this._strokeColor;
  }

  get alpha() {
    return this._alpha;
  }

  static get DEFAULTS() {
    if (!GameButtonStyle[DEFAULTS]) {
      GameButtonStyle[DEFAULTS] = Object.assign({
        font: fontDefault,
        backgroundColor: backgroundColorDefault,
        textColor: textColorDefault,
        strokeColor: strokeColorDefault,
        alpha: alphaDefault
      });

      Object.freeze(GameButtonStyle[DEFAULTS]);
    }

    return GameButtonStyle[DEFAULTS];
  }

}
