/**
 * MultiTasking Cubes - Games
 * Copyright (C) 2017 - Miguel Reboiro-Jato
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
import check from 'check-types';

const FACES = Symbol();

const NUMBERS_FACE = Symbol();
const LETTERS_FACE = Symbol();
const COLORS_FACE = Symbol();
const SYLLABLES_FACE = Symbol();
const WORDS_FACE = Symbol();
const TOOLS_FACE = Symbol();

export default class MtcDiceFace {
  static get NUMBERS_FACE_VALUES() {
    return [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
    ];
  }

  static get LETTERS_FACE_VALUES() {
    return [
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'
    ];
  }

  static get COLORS_FACE_VALUES() {
    return [
      'pink', 'light-blue', 'black', 'brown',
      'purple', 'white', 'gray', 'blue',
      'red', 'yellow', 'green', 'orange'
    ];
  }

  static get SYLLABLES_FACE_VALUES() {
    return [
      'sap', 'gem', 'wid', 'zof',
      'quel', 'ras', 'bra', 'ble',
      'pin', 'cod', 'ter', 'nuk'
    ];
  }

  static get WORDS_FACE_VALUES() {
    return [
      'eggs', 'walnuts', 'drill', 'pear',
      'thyme', 'nut', 'apple', 'saw',
      'ham', 'hammer', 'melon', 'lemon'
    ];
  }

  static get TOOLS_FACE_VALUES() {
    return [
      'tool roller', 'tool wheel barrow', 'tool broom', 'tool hammer',
      'tool hand saw', 'tool pliers', 'tool trowel', 'tool brush',
      'tool saw', 'tool ladder', 'tool scissors', 'tool measurement tape'
    ];
  }

  static get NUMBERS_FACE_NAME() {
    return 'face.numbers';
  }

  static get LETTERS_FACE_NAME() {
    return 'face.letters';
  }

  static get COLORS_FACE_NAME() {
    return 'face.colors';
  }

  static get SYLLABLES_FACE_NAME() {
    return 'face.syllables';
  }

  static get WORDS_FACE_NAME() {
    return 'face.words';
  }

  static get TOOLS_FACE_NAME() {
    return 'face.tools';
  }

  static get NUMBERS_FACE() {
    if (!MtcDiceFace[NUMBERS_FACE]) {
      MtcDiceFace[NUMBERS_FACE] = new MtcDiceFace(
        MtcDiceFace.NUMBERS_FACE_NAME, MtcDiceFace.NUMBERS_FACE_VALUES
      );
    }

    return this[NUMBERS_FACE];
  }

  static get LETTERS_FACE() {
    if (!MtcDiceFace[LETTERS_FACE]) {
      MtcDiceFace[LETTERS_FACE] = new MtcDiceFace(
        MtcDiceFace.LETTERS_FACE_NAME, MtcDiceFace.LETTERS_FACE_VALUES
      );
    }

    return MtcDiceFace[LETTERS_FACE];
  }

  static get COLORS_FACE() {
    if (!MtcDiceFace[COLORS_FACE]) {
      MtcDiceFace[COLORS_FACE] = new MtcDiceFace(
        MtcDiceFace.COLORS_FACE_NAME, MtcDiceFace.COLORS_FACE_VALUES
      );
    }

    return MtcDiceFace[COLORS_FACE];
  }

  static get SYLLABLES_FACE() {
    if (!MtcDiceFace[SYLLABLES_FACE]) {
      MtcDiceFace[SYLLABLES_FACE] = new MtcDiceFace(
        MtcDiceFace.SYLLABLES_FACE_NAME, MtcDiceFace.SYLLABLES_FACE_VALUES
      );
    }

    return MtcDiceFace[SYLLABLES_FACE];
  }

  static get WORDS_FACE() {
    if (!MtcDiceFace[WORDS_FACE]) {
      MtcDiceFace[WORDS_FACE] = new MtcDiceFace(
        MtcDiceFace.WORDS_FACE_NAME, MtcDiceFace.WORDS_FACE_VALUES
      );
    }

    return MtcDiceFace[WORDS_FACE];
  }

  static get TOOLS_FACE() {
    if (!MtcDiceFace[TOOLS_FACE]) {
      MtcDiceFace[TOOLS_FACE] = new MtcDiceFace(
        MtcDiceFace.TOOLS_FACE_NAME, MtcDiceFace.TOOLS_FACE_VALUES
      );
    }

    return MtcDiceFace[TOOLS_FACE];
  }

  static get FACES() {
    if (!MtcDiceFace[FACES]) {
      MtcDiceFace[FACES] = [
        MtcDiceFace.NUMBERS_FACE,
        MtcDiceFace.LETTERS_FACE,
        MtcDiceFace.COLORS_FACE,
        MtcDiceFace.SYLLABLES_FACE,
        MtcDiceFace.WORDS_FACE,
        MtcDiceFace.TOOLS_FACE
      ];
    }

    return MtcDiceFace[FACES];
  }

  static get FACE_NAMES() {
    return MtcDiceFace.FACES.map(face => face.name);
  }

  static get COUNT_VALUES() {
    return MtcDiceFace.FACES
      .map(face => face.countValues())
    .reduce((previous, current) => Math.min(previous, current));
  }

  static withName(name) {
    check.assert.nonEmptyString('name should be a non-empty string');

    const face = MtcDiceFace.FACES.find(face => face.name === name);

    if (face) {
      return face;
    } else {
      throw new Error('invalid face name: ' + name);
    }
  }

  static isValidFaceName(name) {
    return MtcDiceFace.FACE_NAMES.find(face => face === name) !== undefined;
  }

  constructor(name, values) {
    check.assert.nonEmptyString(name, 'name should be a non-empty string');
    check.assert.array.of.assigned(values, 'values should be an array without null and undefined values');

    this._name = name;
    this._values = values.slice();

    Object.freeze(this);
  }

  get name() {
    return this._name;
  }

  get values() {
    return this._values.slice();
  }

  value(index) {
    if (!check.inRange(index, 0, this.countValues() - 1)) {
      throw new RangeError('index should be on range [0, ' + this.countValues() + ']');
    }

    return this._values[index];
  }

  countValues() {
    return this._values.length;
  }

  isValidValue(value) {
    return check.includes(this.values, value);
  }
}