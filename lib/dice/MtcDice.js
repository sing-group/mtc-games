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
import uheprng from 'random-seed';

const NUMBER_VALUES = new Symbol();
const LETTER_VALUES = new Symbol();
const COLOR_VALUES = new Symbol();
const SYLLABLE_VALUES = new Symbol();
const WORD_VALUES = new Symbol();
const TOOL_VALUES = new Symbol();

const DICES = new Symbol();

export default class MtcDice {
  static get NUMBER_VALUES() {
    if (!this[NUMBER_VALUES]) {
      this[NUMBER_VALUES] = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
      ];
    }

    return this[NUMBER_VALUES];
  }

  static get LETTER_VALUES() {
    if (!this[LETTER_VALUES]) {
      this[LETTER_VALUES] = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'
      ];
    }

    return this[LETTER_VALUES];
  }

  static get COLOR_VALUES() {
    if (!this[COLOR_VALUES]) {
      this[COLOR_VALUES] = [
        'pink', 'light-blue', 'black', 'brown',
        'purple', 'white', 'gray', 'blue',
        'red', 'yellow', 'green', 'orange'
      ];
    }

    return this[COLOR_VALUES];
  }

  static get SYLLABLE_VALUES() {
    if (!this[SYLLABLE_VALUES]) {
      this[SYLLABLE_VALUES] = [
        'sap', 'gem', 'wid', 'zof',
        'quel', 'ras', 'bra', 'ble',
        'pin', 'cod', 'ter', 'nuk'
      ]
    }

    return this[SYLLABLE_VALUES];
  }

  static get WORD_VALUES() {
    if (!this[WORD_VALUES]) {
      this[WORD_VALUES] = [
        'eggs', 'walnuts', 'drill', 'pear',
        'thyme', 'nut', 'apple', 'saw',
        'ham', 'hammer', 'melon', 'lemon'
      ];
    }

    return this[WORD_VALUES];
  }

  static get TOOL_VALUES() {
    if (!this[TOOL_VALUES]) {
      this[TOOL_VALUES] = [
        'roller', 'wheel barrow', 'broom', 'hammer',
        'hand saw', 'pliers', 'trowel', 'brush',
        'saw', 'ladder', 'scissors', 'measurement tape'
      ];
    }

    return this[TOOL_VALUES];
  }

  static get DICE_COUNT() {
    return [
        MtcDice.NUMBER_VALUES, MtcDice.LETTER_VALUES, MtcDice.COLOR_VALUES,
        MtcDice.SYLLABLE_VALUES, MtcDice.WORD_VALUES, MtcDice.TOOL_VALUES
      ]
      .map(values => values.length)
    .reduce((previous, current) => Math.min(previous, current), 0);
  }

  static dice(number, newInstance = false, randomGenerator = uheprng.create()) {
    check.assert.integer(number, 'number should be an integer');
    check.assert.inRange(number, 1, MtcDice.DICE_COUNT, 'invalid dice number: ' + number);
    check.assert.boolean(newInstance, 'newInstance should be a boolean value');

    if (newInstance) {
      return new MtcDice(
        MtcDice.NUMBER_VALUES[number - 1],
        MtcDice.LETTER_VALUES[number - 1],
        MtcDice.COLOR_VALUES[number - 1],
        MtcDice.SYLLABLE_VALUES[number - 1],
        MtcDice.WORD_VALUES[number - 1],
        MtcDice.TOOL_VALUES[number - 1],
        randomGenerator
      );
    } else {
      if (!this[DICES]) {
        this[DICES] = new Array(MTCDice.DICE_COUNT);

        for (let i = 0; i < this[DICES].length; i++) {
          this[DICES][i] = MtcDice.dice(i + 1);
        }
      }

      return this[DICES][number - 1];
    }
  }

  static randomDices(count, newInstance = false, randomGenerator = uheprng.create()) {
    const diceCount = MtcDice.DICE_COUNT;

    check.assert.integer(count, 'count should be a positive integer');
    check.assert.inRange(count, 1, MtcDice.DICE_COUNT, 'count should be an integer in range [1, ' + diceCount + ']');

    const dices = [];
    const indexes = new Set();

    while (indexes.size < count) {
      const index = randomGenerator(diceCount) + 1;

      if (!indexes.has(index)) {
        indexes.add(index);
        dices.push(MtcDice.dice(index, newInstance, randomGenerator));
      }
    }

    return dices;
  }

  static dices(numbers, newInstance = false, randomGenerator = uheprng.create()) {
    check.assert.array.integer(numbers, 'numbers should be an integer array');

    const dices = new Array(numbers.length);
    for (let index in numbers) {
      dices.push(MtcDice.dice(index));
    }

    return dices;
  }

  static diceRange(min, max, newInstance = false, randomGenerator = uheprng.create()) {
    check.assert.less(min, max, 'min should be lower than max');

    const dices = new Array(min - max);

    for (let i = min; i <= max; i++) {
      dices.push(MtcDice.dice(i, newInstance, randomGenerator));
    }

    return dices;
  }

  static roll(...dices) {
    dices.forEach(dice =>
      check.assert.array.instance(dice, MtcDice, 'invalid dice')
    );

    return dices.map(dice => dice.roll());
  }

  static isValidNumber(number) {
    return check.includes(MtcDice.NUMBER_VALUES, number);
  }

  static isValidLetter(letter) {
    return check.includes(MtcDice.LETTER_VALUES, letter);
  }

  static isValidColor(color) {
    return check.includes(MtcDice.COLOR_VALUES, color);
  }

  static isValidSyllable(syllable) {
    return check.includes(MtcDice.SYLLABLE_VALUES, syllable);
  }

  static isValidWord(word) {
    return check.includes(MtcDice.WORD_VALUES, word);
  }

  static isValidTool(tool) {
    return check.includes(MtcDice.TOOL_VALUES, tool);
  }

  constructor(
    faceNumber, faceLetter, faceColor,
    faceSyllable, faceWord, faceTool,
    randomGenerator = uheprng.create()
  ) {
    if (!MtcDice.isValidNumber())
      throw new TypeError('invalid number');
    if (!MtcDice.isValidLetter(letter))
      throw new TypeError('invalid letter');
    if (!MtcDice.isValidColor(faceColor))
      throw new TypeError('invalid color');
    if (!MtcDice.isValidSyllable(faceSyllable))
      throw new TypeError('invalid syllable');
    if (!MtcDice.isValidWord(faceWord))
      throw new TypeError('invalid word');
    if (!MtcDice.isValidTool(faceTool))
      throw new TypeError('invalid tool');
    check.assert.function(randomGenerator, 'randomGenerator should be a valid function');

    this._faceNumber = faceNumber;
    this._faceLetter = faceLetter;
    this._faceColor = faceColor;
    this._faceSyllable = faceSyllable;
    this._faceWord = faceWord;
    this._faceTool = faceTool;
    this._randomGenerator = randomGenerator;

    Object.freeze(this);
  }

  get faces() {
    return [
      this._faceNumber,
      this._faceLetter,
      this._faceColor,
      this._faceSyllable,
      this._faceWord,
      this._faceTool
    ];
  }

  get faceNumber() {
    return this._faceNumber;
  }

  get faceLetter() {
    return this._faceLetter;
  }

  get faceColor() {
    return this._faceColor;
  }

  get faceSyllable() {
    return this._faceSyllable;
  }

  get faceWord() {
    return this._faceWord;
  }

  get faceTool() {
    return this._faceTool;
  }

  roll() {
    const faces = this.faces;

    return faces[this._randomGenerator(faces.length)];
  }
}