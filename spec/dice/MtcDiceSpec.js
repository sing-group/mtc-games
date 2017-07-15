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

import MtcDice from '../../lib/dice/MtcDice';
import MtcDiceFace from '../../lib/dice/MtcDiceFace';

describe('MTC dice tests', () => {
  const faces = [
    new MtcDiceFace('face1', [ 1, 2, 3 ]),
    new MtcDiceFace('face2', [ 'a', 'b', 'c' ]),
    new MtcDiceFace('face3', [ 'red', 'green', 'blue' ])
  ];
  const faceValues = {
    'face1': 1,
    'face2': 'b',
    'face3': 'blue'
  };
  const faceNames = Object.keys(faceValues);
  const values = Object.values(faceValues);

  const dice = new MtcDice(faces, faceValues);

  const invalidFaces = [
    new MtcDiceFace('face.bad', [ -1, 0, 4 ]),
    new MtcDiceFace('face.wrong', [ '.', 'd', '-' ]),
    new MtcDiceFace('face.invalid', [ 'black', 'white', 'gray' ])
  ];
  const invalidFaceNames = [ 'face.bad', 'face.wrong', 'face.invalid' ];
  const invalidValues = [ -1, 0, 4, '.', 'd', '-', 'black', 'white', 'gray' ];

  it('assigns the values passed to constructor', () => {
    expect(dice.faceValues).toEqual(faceValues);
    expect(dice.values).toEqual(values);
    expect(dice.faceNames).toEqual(faceNames);
    expect(dice.faces).toEqual(faces);
  });

  it('checks valid values correctly', () => {
    for (const value of values) {
      expect(dice.isValidValue(value)).toBeTruthy();
    }

    for (const invalidValue of invalidValues) {
      expect(dice.isValidValue(invalidValue)).toBeFalsy();
    }
  });

  it('checks valid faces correctly', () => {
    for (const faceName of faceNames) {
      expect(dice.isValidFace(faceName)).toBeTruthy();
    }

    for (const face of faces) {
      expect(dice.isValidFace(face)).toBeTruthy();
    }

    for (const invalidFaceName of invalidFaceNames) {
      expect(dice.isValidFace(invalidFaceName)).toBeFalsy();
    }

    for (const invalidFace of invalidFaces) {
      expect(dice.isValidFace(invalidFace)).toBeFalsy();
    }
  });

  it('returns the value\'s face correclty', () => {
    for (let i = 0; i < values.length; i++) {
      expect(dice.getFaceForValue(values[i])).toEqual(faces[i]);
    }

    for (const invalidValue of invalidValues) {
      expect(() => dice.getFaceForValue(invalidValue)).toThrowError();
    }
  });

  it('returns the face\'s value correclty', () => {
    for (let i = 0; i < faces.length; i++) {
      expect(dice.getFaceValue(faces[i])).toEqual(values[i]);
      expect(dice.getFaceValue(faceNames[i])).toEqual(values[i]);
    }

    for (const invalidFace of invalidFaces) {
      expect(() => dice.getFaceValue(invalidFace)).toThrowError();
    }

    for (const invalidFaceName of invalidFaceNames) {
      expect(() => dice.getFaceValue(invalidFaceName)).toThrowError();
    }
  });
});