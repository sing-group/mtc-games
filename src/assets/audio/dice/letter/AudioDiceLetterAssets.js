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

export class AudioDiceLetterAssets {
  constructor(a, b, c, d, e, f, g, h, i, j, k, l) {
    this._a = a;
    this._b = b;
    this._c = c;
    this._d = d;
    this._e = e;
    this._f = f;
    this._g = g;
    this._h = h;
    this._i = i;
    this._j = j;
    this._k = k;
    this._l = l;
  }

  get a() {
    return this._a;
  }

  get b() {
    return this._b;
  }

  get c() {
    return this._c;
  }

  get d() {
    return this._d;
  }

  get e() {
    return this._e;
  }

  get f() {
    return this._f;
  }

  get g() {
    return this._g;
  }

  get h() {
    return this._h;
  }

  get i() {
    return this._i;
  }

  get j() {
    return this._j;
  }

  get k() {
    return this._k;
  }

  get l() {
    return this._l;
  }

  get resourceList() {
    const resources = new Map();

    resources.set('letters-a-audio', this.a);
    resources.set('letters-b-audio', this.b);
    resources.set('letters-c-audio', this.c);
    resources.set('letters-d-audio', this.d);
    resources.set('letters-e-audio', this.e);
    resources.set('letters-f-audio', this.f);
    resources.set('letters-g-audio', this.g);
    resources.set('letters-h-audio', this.h);
    resources.set('letters-i-audio', this.i);
    resources.set('letters-j-audio', this.j);
    resources.set('letters-k-audio', this.k);
    resources.set('letters-l-audio', this.l);

    return resources;
  }
}
