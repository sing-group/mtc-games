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

export class AudioDiceWordAssets {
  constructor(
    wordApple,
    wordDrill,
    wordEggs,
    wordHam,
    wordHammer,
    wordLemon,
    wordMelon,
    wordNuts,
    wordPear,
    wordSaw,
    wordThyme,
    wordWalnuts
  ) {
    this._wordApple = wordApple;
    this._wordDrill = wordDrill;
    this._wordEggs = wordEggs;
    this._wordHam = wordHam;
    this._wordHammer = wordHammer;
    this._wordLemon = wordLemon;
    this._wordMelon = wordMelon;
    this._wordNuts = wordNuts;
    this._wordPear = wordPear;
    this._wordSaw = wordSaw;
    this._wordThyme = wordThyme;
    this._wordWalnuts = wordWalnuts;
  }

  get wordApple() {
    return this._wordApple;
  }

  get wordDrill() {
    return this._wordDrill;
  }

  get wordEggs() {
    return this._wordEggs;
  }

  get wordHam() {
    return this._wordHam;
  }

  get wordHammer() {
    return this._wordHammer;
  }

  get wordLemon() {
    return this._wordLemon;
  }

  get wordMelon() {
    return this._wordMelon;
  }

  get wordNuts() {
    return this._wordNuts;
  }

  get wordPear() {
    return this._wordPear;
  }

  get wordSaw() {
    return this._wordSaw;
  }

  get wordThyme() {
    return this._wordThyme;
  }

  get wordWalnuts() {
    return this._wordWalnuts;
  }

  get resourceList() {
    const resources = new Map();

    resources.set('words-apple-audio', this.wordApple);
    resources.set('words-drill-audio', this.wordDrill);
    resources.set('words-eggs-audio', this.wordEggs);
    resources.set('words-ham-audio', this.wordHam);
    resources.set('words-hammer-audio', this.wordHammer);
    resources.set('words-lemon-audio', this.wordLemon);
    resources.set('words-melon-audio', this.wordMelon);
    resources.set('words-nuts-audio', this.wordNuts);
    resources.set('words-pear-audio', this.wordPear);
    resources.set('words-saw-audio', this.wordSaw);
    resources.set('words-thyme-audio', this.wordThyme);
    resources.set('words-walnuts-audio', this.wordWalnuts);

    return resources;
  }
}
