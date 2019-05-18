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

export class ImageDiceTrigramAssets {
  constructor(
    trigramBle,
    trigramBra,
    trigramCod,
    trigramGem,
    trigramNuk,
    trigramPin,
    trigramQuel,
    trigramRas,
    trigramSab,
    trigramTer,
    trigramWid,
    trigramZof
  ) {
    this._trigramBle = trigramBle;
    this._trigramBra = trigramBra;
    this._trigramCod = trigramCod;
    this._trigramGem = trigramGem;
    this._trigramNuk = trigramNuk;
    this._trigramPin = trigramPin;
    this._trigramQuel = trigramQuel;
    this._trigramRas = trigramRas;
    this._trigramSab = trigramSab;
    this._trigramTer = trigramTer;
    this._trigramWid = trigramWid;
    this._trigramZof = trigramZof;
  }

  get trigramBle() {
    return this._trigramBle;
  }

  get trigramBra() {
    return this._trigramBra;
  }

  get trigramCod() {
    return this._trigramCod;
  }

  get trigramGem() {
    return this._trigramGem;
  }

  get trigramNuk() {
    return this._trigramNuk;
  }

  get trigramPin() {
    return this._trigramPin;
  }

  get trigramQuel() {
    return this._trigramQuel;
  }

  get trigramRas() {
    return this._trigramRas;
  }

  get trigramSab() {
    return this._trigramSab;
  }

  get trigramTer() {
    return this._trigramTer;
  }

  get trigramWid() {
    return this._trigramWid;
  }

  get trigramZof() {
    return this._trigramZof;
  }

  get resourceList() {
    const resources = new Map();

    resources.set('trigrams-ble', this.trigramBle);
    resources.set('trigrams-bra', this.trigramBra);
    resources.set('trigrams-cod', this.trigramCod);
    resources.set('trigrams-gem', this.trigramGem);
    resources.set('trigrams-nuk', this.trigramNuk);
    resources.set('trigrams-pin', this.trigramPin);
    resources.set('trigrams-quel', this.trigramQuel);
    resources.set('trigrams-ras', this.trigramRas);
    resources.set('trigrams-sab', this.trigramSab);
    resources.set('trigrams-ter', this.trigramTer);
    resources.set('trigrams-wid', this.trigramWid);
    resources.set('trigrams-zof', this.trigramZof);

    return resources;
  }
}
