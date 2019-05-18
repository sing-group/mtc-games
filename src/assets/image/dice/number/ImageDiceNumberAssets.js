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

export class ImageDiceNumberAssets {
  constructor(
    number1,
    number2,
    number3,
    number4,
    number5,
    number6,
    number7,
    number8,
    number9,
    number10,
    number11,
    number12
  ) {
    this._number1 = number1;
    this._number2 = number2;
    this._number3 = number3;
    this._number4 = number4;
    this._number5 = number5;
    this._number6 = number6;
    this._number7 = number7;
    this._number8 = number8;
    this._number9 = number9;
    this._number10 = number10;
    this._number11 = number11;
    this._number12 = number12;
  }

  get number1() {
    return this._number1;
  }

  get number2() {
    return this._number2;
  }

  get number3() {
    return this._number3;
  }

  get number4() {
    return this._number4;
  }

  get number5() {
    return this._number5;
  }

  get number6() {
    return this._number6;
  }

  get number7() {
    return this._number7;
  }

  get number8() {
    return this._number8;
  }

  get number9() {
    return this._number9;
  }

  get number10() {
    return this._number10;
  }

  get number11() {
    return this._number11;
  }

  get number12() {
    return this._number12;
  }

  get resourceList() {
    const resources = new Map();

    resources.set('numbers-1', this.number1);
    resources.set('numbers-2', this.number2);
    resources.set('numbers-3', this.number3);
    resources.set('numbers-4', this.number4);
    resources.set('numbers-5', this.number5);
    resources.set('numbers-6', this.number6);
    resources.set('numbers-7', this.number7);
    resources.set('numbers-8', this.number8);
    resources.set('numbers-9', this.number9);
    resources.set('numbers-10', this.number10);
    resources.set('numbers-11', this.number11);
    resources.set('numbers-12', this.number12);

    return resources;
  }
}
