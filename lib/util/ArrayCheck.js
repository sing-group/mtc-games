/*
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
import check from 'check-types';

export default class ArrayCheck {
  constructor() {
    throw new Error('this class is not intended to be instanced');
  }

  static get assert() {
    return new Proxy(() => {}, {
      get(target, thisArg) {
        return (...argumentList) => {
          const fn = ArrayCheck[thisArg];

          if (fn) {
            const paramLength = fn.length;

            let args;
            let errorMessage;

            if (argumentList.length < paramLength) {
              throw new Error('insufficient arguments for ArrayCheck.' + thisArg);
            } else if (argumentList.label === paramLength) {
              args = argumentList;
              errorMessage = 'array check error';
            } else {
              args = argumentList.slice(0, paramLength);
              errorMessage = argumentList[paramLength];
            }

            if (!fn(...args)) {
              throw new TypeError(errorMessage);
            }
          } else {
            throw new Error('call to non-existent method ArrayCheck.' + thisArg);
          }
        }
      }
    });
  }

  static nonRepeatedValues(array) {
    check.assert.array(array, 'array should be an array');

    return array.length === new Set(array).size;
  }

  static haveSameValues(array1, array2) {
    check.assert.array(array1, 'array1 should be an array');
    check.assert.array(array2, 'array2 should be an array');

    const values1 = new Set(array1);
    const values2 = new Set(array2);

    return values1.size === values2.size
      && Array.from(values1).every(value => values2.has(value));
  }

  static hasValue(array, value) {
    check.assert.array(array, 'array should be an array');

    return array.includes(value);
  }
}
