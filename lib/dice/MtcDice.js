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
import MtcDiceFace from './MtcDiceFace';

const DICES = Symbol();

export default class MtcDice {
  static dice(number) {
    check.assert.integer(number, 'number should be an integer');
    check.assert.inRange(number, 1, MtcDiceFace.COUNT_VALUES, 'invalid dice number: ' + number);

    return MtcDice.DICES[(number - 1)];
  }

  static get DICES() {
    if (!this[DICES]) {
      this[DICES] = [];

      const faces = MtcDiceFace.FACES;

      for (let i = 0; i < MtcDiceFace.COUNT_VALUES; i++) {
        const diceFaces = {};
        for (const face of faces) {
          diceFaces[face.name] = face.value(i);
        }

        this[DICES][i] = new MtcDice(faces, diceFaces);
      }
    }

    return this[DICES];
  }

  constructor(faces, faceValues) {
    check.assert.array.of.instance(faces, MtcDiceFace, 'faces should be an array of MtcDiceFace');
    check.assert.object(faceValues, 'faceValues should be an object');

    for (const key of Object.keys(faceValues)) {
      const value = faceValues[key];

      if (faces.find(face => face.name === key) === undefined)
        throw new Error('invalid face name: ' + key);
      if (faces.find(face => face.values.indexOf(value) >= 0) === undefined)
        throw new Error('invalid value \'' + value + '\' for face \'' + key + '\'');
    }

    this._faces = faces;
    this._faceValues = faceValues;

    Object.freeze(this._faces);
    Object.freeze(this._faceValues);
  }

  get faceValues() {
    return this._faceValues;
  }

  get values() {
    return Object.values(this._faceValues);
  }

  get faceNames() {
    return Object.keys(this._faceValues);
  }

  get faces() {
    return this._faces;
  }

  isValidValue(value) {
    return check.includes(this.values, value);
  }

  isValidFace(face) {
    if (check.instance(face, MtcDiceFace)) {
      return check.includes(this.faces, face);
    } else {
      return check.includes(this.faceNames, face);
    }
  }

  getFaceForValue(value) {
    if (!this.isValidValue(value)) {
      throw new Error('value is not a valid dice value');
    }

    const index = this.values.indexOf(value);

    return this.faces[index];
  }

  getFaceValue(face) {
    if (check.instance(face, MtcDiceFace)) {
      return this.getFaceValue(face.name);
    } else if (this.isValidFace(face)) {
      const value = this._faceValues[face];

      if (value === undefined) {
        throw new Error('invalid face: ' + face);
      } else {
        return value;
      }
    } else {
      throw new Error('invalid face: ' + face);
    }
  }
}