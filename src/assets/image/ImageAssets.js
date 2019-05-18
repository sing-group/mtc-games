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
import {ImageDiceAssets} from './dice';

export class ImageAssets {
  constructor(color, letter, number, tool, trigram, word) {
    check.assert.instance(color, ImageDiceAssets, 'color should be an instance of ImageDiceAssets');
    check.assert.instance(letter, ImageDiceAssets, 'letter should be an instance of ImageDiceAssets');
    check.assert.instance(number, ImageDiceAssets, 'number should be an instance of ImageDiceAssets');
    check.assert.instance(tool, ImageDiceAssets, 'tool should be an instance of ImageDiceAssets');
    check.assert.instance(trigram, ImageDiceAssets, 'trigram should be an instance of ImageDiceAssets');
    check.assert.instance(word, ImageDiceAssets, 'word should be an instance of ImageDiceAssets');

    this._color = color;
    this._letter = letter;
    this._number = number;
    this._tool = tool;
    this._trigram = trigram;
    this._word = word;
  }

  get color() {
    return this._color;
  }

  get letter() {
    return this._letter;
  }

  get number() {
    return this._number;
  }

  get tool() {
    return this._tool;
  }

  get trigram() {
    return this._trigram;
  }

  get word() {
    return this._word;
  }

  get resourceColorList() {
    return this.color.resourceList;
  }

  get resourceLetterList() {
    return this.letter.resourceList;
  }

  get resourceNumberList() {
    return this.number.resourceList;
  }

  get resourceToolList() {
    return this.tool.resourceList;
  }

  get resourceTrigramList() {
    return this.trigram.resourceList;
  }

  get resourceWordList() {
    return this.word.resourceList;
  }

  get resourceList() {
    return {
      color: this.resourceColorList,
      letter: this.resourceLetterList,
      number: this.resourceNumberList,
      tool: this.resourceToolList,
      trigram: this.resourceTrigramList,
      word: this.resourceWordList
    };
  }
}
