/**
 * MultiTasking Cubes - Games
 * Copyright (C) 2017-2018 - Miguel Reboiro-Jato, Andrés Vieira Vázquez,
 * Adolfo Piñón Blanco, Hugo López-Fernández, Rosalía Laza Fidalgo,
 * Reyes Pavón Rial, Francisco Otero Lamas, Adrián Varela Pomar,
 * Carlos Spuch Calvar, and Tania Rivera Baltanás
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

import MtcDiceFace from '../../lib/dice/MtcDiceFace';

describe('MTC dice face const values tests', () => {
  const faceNames = [
    MtcDiceFace.NUMBERS_FACE_NAME,
    MtcDiceFace.LETTERS_FACE_NAME,
    MtcDiceFace.COLORS_FACE_NAME,
    MtcDiceFace.SYLLABLES_FACE_NAME,
    MtcDiceFace.WORDS_FACE_NAME,
    MtcDiceFace.TOOLS_FACE_NAME,
  ];

  const invalidFaceNames = [
    'face.bad', 'face.wrong', 'face.invalid'
  ];

  it('has twelve face values', () => {
    expect(MtcDiceFace.COUNT_VALUES).toBe(12);
  });

  it('has six dice faces', () => {
    expect(MtcDiceFace.FACES.length).toBe(6);
  });

  it('has correct names for the dice faces', () => {
    expect(MtcDiceFace.NUMBERS_FACE.name).toBe(MtcDiceFace.NUMBERS_FACE_NAME);
    expect(MtcDiceFace.LETTERS_FACE.name).toBe(MtcDiceFace.LETTERS_FACE_NAME);
    expect(MtcDiceFace.COLORS_FACE.name).toBe(MtcDiceFace.COLORS_FACE_NAME);
    expect(MtcDiceFace.SYLLABLES_FACE.name).toBe(MtcDiceFace.SYLLABLES_FACE_NAME);
    expect(MtcDiceFace.WORDS_FACE.name).toBe(MtcDiceFace.WORDS_FACE_NAME);
    expect(MtcDiceFace.TOOLS_FACE.name).toBe(MtcDiceFace.TOOLS_FACE_NAME);
  });

  it('has correct values for the dice faces', () => {
    expect(MtcDiceFace.NUMBERS_FACE.values).toEqual(MtcDiceFace.NUMBERS_FACE_VALUES);
    expect(MtcDiceFace.LETTERS_FACE.values).toEqual(MtcDiceFace.LETTERS_FACE_VALUES);
    expect(MtcDiceFace.COLORS_FACE.values).toEqual(MtcDiceFace.COLORS_FACE_VALUES);
    expect(MtcDiceFace.SYLLABLES_FACE.values).toEqual(MtcDiceFace.SYLLABLES_FACE_VALUES);
    expect(MtcDiceFace.WORDS_FACE.values).toEqual(MtcDiceFace.WORDS_FACE_VALUES);
    expect(MtcDiceFace.TOOLS_FACE.values).toEqual(MtcDiceFace.TOOLS_FACE_VALUES);
  });

  it('returns correct dice face names', () => {
    expect(MtcDiceFace.FACE_NAMES).toEqual(faceNames);
  });

  it('check valid names correctly', () => {
    for (const name of faceNames) {
      expect(MtcDiceFace.isValidFaceName(name)).toBeTruthy();
    }

    for (const invalidName of invalidFaceNames) {
      expect(MtcDiceFace.isValidFaceName(invalidName)).toBeFalsy();
    }
  });
});