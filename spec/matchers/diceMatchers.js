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

const diceMatchers = {
  toBeAValidRollFor() {
    return {
      compare(actual, expected) {
        const result = {};

        if (!Array.isArray(actual)) {
          result.pass = false;
          result.message = 'Expected ' + actual + ' to be an array';
        } else if (!Array.isArray(expected)) {
          result.pass = false;
          result.message = 'Expected ' + expected + ' to be an array';
        } else {
          result.pass = true;

          const diceSet = new Set(expected);

          for (const rollResult of actual) {
            let found = false;

            for (const dice of diceSet) {
              if (dice.isValidValue(rollResult)) {
                diceSet.delete(dice);
                found = true;
                break;
              }
            }

            if (!found) {
              result.pass = false;
              break;
            }
          }

          if (result.pass) {
            result.message = actual + ' is a valid roll for ' + expected;
          } else {
            result.message = 'Expected ' + actual + ' to be a valid roll for ' + expected + ', but it is not';
          }
        }

        return result;
      }
    };
  },
  toBeAValidFaceRollFor(util, customEqualityTester) {
    const toBeAValidRollFor = diceMatchers.toBeAValidRollFor(util, customEqualityTester);

    return {
      compare(actual, expected) {
        const result = toBeAValidRollFor.compare(actual, expected);

        if (result.pass) {
          let face = null;

          for (const rollResult of actual) {
            for (const dice of expected) {
              if (dice.isValidValue(rollResult)) {
                if (face === null) {
                  face = dice.getFaceForValue(rollResult);
                } else if (face !== dice.getFaceForValue(rollResult)) {
                  result.pass = false;
                  result.message = 'Expected ' + actual + ' to be a valid face roll for ' + expected + ', but it is not';

                  break;
                }
              }
            }
          }
        }

        if (result.pass) {
          result.message = actual + ' is a valid face roll for ' + expected;
        }

        return result;
      }
    };
  }
};

export default diceMatchers;
