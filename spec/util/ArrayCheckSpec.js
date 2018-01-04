/**
 * MultiTasking Cubes - Games
 * Copyright (C) 2017 - Miguel Reboiro-Jato, Andrés Vieira Vázquez,
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
import ArrayCheck from "../../lib/util/ArrayCheck";

describe('Array checks test', () => {
  const repeatedCases = [
    [ 1, 2, 3, 4, 5, 6, 1 ],
    [ 'a', 'b', 'c', 'a', 'x' ],
    [ 'hello', 'world', 'hola', 'mundo', 'hello' ],
    [ true, false, true ],
    [ 1, 2, 'a', 'hello', true, 1, false ],
    [ 1, 2, null, 3, null, 4, 5 ],
    [ 'a', 'b', undefined, 'c', undefined, 'x' ]
  ];

  const nonRepeatedCases = [
    [ 1, 2, 3, 4, 5, 6 ],
    [ 'a', 'b', 'c', 'x' ],
    [ 'hello', 'world', 'hola', 'mundo' ],
    [ true, false ],
    [ 1, 2, 'a', 'hello', true, 1.2, false ],
    [ 1, 2, null, 3, undefined, 4, 5 ]
  ];

  const sameValues = [
    [ 1, 2, 3 ], [ 1, 2, 3 ]
  ];

  const diffValues = [
    [ 1, 2, 3 ], [ 1, 2, 1 ]
  ];

  const presentValues = [
    1, 'b','world', false, 1.2, 5
  ];

  const absentValues = [
    10, 'w','ola', 0, 3.5, 0
  ];

  it('checks repeated values', () => {
    for (const repeatedCase of repeatedCases) {
     expect(ArrayCheck.nonRepeatedValues(repeatedCase)).toBeFalsy();
    }
  });

  it('checks non repeated values', () => {
    for (const nonRepeatedCase of nonRepeatedCases) {
      expect(ArrayCheck.nonRepeatedValues(nonRepeatedCase)).toBeTruthy();
    }
  });

  it('asserts repeated values', () => {
    for (const repeatedCase of repeatedCases) {
      expect(() => ArrayCheck.assert.nonRepeatedValues(repeatedCase)).toThrowError(TypeError);
    }
  });

  it('asserts non repeated values', () => {
    for (const repeatedCase of nonRepeatedCases) {
      ArrayCheck.assert.nonRepeatedValues(repeatedCase);
    }
  });

  it('throws custom error message when asserting repeated values', () => {
    const customMessage = 'error message';

     expect(() => ArrayCheck.assert.nonRepeatedValues(repeatedCases[0], customMessage))
       .toThrowError(TypeError, customMessage);
  });

  it('checks same values', () => {
    expect(ArrayCheck.haveSameValues(sameValues[0], sameValues[1])).toBeTruthy();
  });

  it('checks different values', () => {
    expect(ArrayCheck.haveSameValues(diffValues[0], diffValues[1])).toBeFalsy();
  });

  it('asserts same values', () => {
    ArrayCheck.assert.haveSameValues(sameValues[0], sameValues[1]);
  });

  it('asserts different values', () => {
    expect(() => ArrayCheck.assert.haveSameValues(diffValues[0], diffValues[1])).toThrowError(TypeError);
  });

  it('throws custom error message when asserting same values', () => {
    const customMessage = 'error message';

    expect(() => ArrayCheck.assert.haveSameValues(diffValues[0], diffValues[1], customMessage))
      .toThrowError(TypeError, customMessage);
  });

  it('checks if an array contains a value', () => {
    for (let i = 0; i < presentValues.length; i++) {
      const array = nonRepeatedCases[i];
      const value = presentValues[i];

      expect(ArrayCheck.hasValue(array, value)).toBeTruthy();
    }
  });

  it('checks if an array does not contain a value', () => {
    for (let i = 0; i < absentValues.length; i++) {
      const array = nonRepeatedCases[i];
      const value = absentValues[i];

      expect(ArrayCheck.hasValue(array, value)).toBeFalsy();
    }
  });

  it('asserts if an array contains a value', () => {
    for (let i = 0; i < presentValues.length; i++) {
      const array = nonRepeatedCases[i];
      const value = presentValues[i];

      ArrayCheck.assert.hasValue(array, value);
    }
  });

  it('asserts if an array does not contain a value', () => {
    for (let i = 0; i < absentValues.length; i++) {
      const array = nonRepeatedCases[i];
      const value = absentValues[i];

      expect(() => ArrayCheck.assert.hasValue(array, value)).toThrowError(TypeError);
    }
  });
});
