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

describe('MTC dice face tests', () => {
  const name = 'face.name';
  const values = [ 1, 2, 3, 4, 5, 6 ];

  const face = new MtcDiceFace(name, values);

  const invalidValues = [ -1, 0, 7, 10];

  it('assigns the values passed to constructor', () => {
    expect(face.name).toBe(name);
    expect(face.values).toEqual(values);
  });

  it('returns correct values by index', () => {
    for (let i = 0; i < values.length; i++) {
      expect(face.value(i)).toBe(values[i]);
    }
  });

  it('manages values boundaries', () => {
    const lowerBound = 0;
    const upperBound = values.length - 1;

    expect(() => face.value(lowerBound - 1)).toThrowError(RangeError);
    expect(face.value(lowerBound)).toBe(values[lowerBound]);
    expect(face.value(upperBound)).toBe(values[upperBound]);
    expect(() => face.value(upperBound + 1)).toThrowError(RangeError);
  });

  it('returns correct value count', () => {
    expect(face.countValues()).toBe(values.length);
  });

  it('checks valid values correctly', () => {
    for (const value of values) {
      expect(face.isValidValue(value)).toBeTruthy();
    }

    for (const invalidValue of invalidValues) {
      expect(face.isValidValue(invalidValue)).toBeFalsy();
    }
  });

});