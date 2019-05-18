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

export class ImageDiceColorAssets {
  constructor(
    black,
    blue,
    brown,
    gray,
    green,
    lightBlue,
    orange,
    pink,
    purple,
    red,
    white,
    yellow
  ) {
    this._black = black;
    this._blue = blue;
    this._brown = brown;
    this._gray = gray;
    this._green = green;
    this._lightBlue = lightBlue;
    this._orange = orange;
    this._pink = pink;
    this._purple = purple;
    this._red = red;
    this._white = white;
    this._yellow = yellow;
  }

  get black() {
    return this._black;
  }

  get blue() {
    return this._blue;
  }

  get brown() {
    return this._brown;
  }

  get gray() {
    return this._gray;
  }

  get green() {
    return this._green;
  }

  get lightBlue() {
    return this._lightBlue;
  }

  get orange() {
    return this._orange;
  }

  get pink() {
    return this._pink;
  }

  get purple() {
    return this._purple;
  }

  get red() {
    return this._red;
  }

  get white() {
    return this._white;
  }

  get yellow() {
    return this._yellow;
  }

  get resourceList() {
    const resources = new Map();

    resources.set('colors-black', this.black);
    resources.set('colors-blue', this.blue);
    resources.set('colors-brown', this.brown);
    resources.set('colors-gray', this.gray);
    resources.set('colors-green', this.green);
    resources.set('colors-light-blue', this.lightBlue);
    resources.set('colors-orange', this.orange);
    resources.set('colors-pink', this.pink);
    resources.set('colors-purple', this.purple);
    resources.set('colors-red', this.red);
    resources.set('colors-white', this.white);
    resources.set('colors-yellow', this.yellow);

    return resources;
  }
}
