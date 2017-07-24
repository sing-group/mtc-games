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

const extendedArrayMatchers = {
  toBeAllIn() {
    return {
      compare(actual, expected) {
        const result = {};

        if (!Array.isArray(actual)) {
          result.pass = false;
          result.message = 'Expected [' + actual + '] to be an array';
        } else if (!Array.isArray(expected)) {
          result.pass = false;
          result.message = 'Expected [' + expected + '] to be an array';
        } else {
          result.pass = true;
          for (const value of actual) {
            if (expected.indexOf(value) === -1) {
              result.pass = false;
              break;
            }
          }

          if (result.pass) {
            result.message = '[' + expected + '] contains all the elements of [' + actual + ']';
          } else {
            result.message = 'Expected [' + expected + '] to contain all the elements of [' + actual
              + '], but some elements are missing';
          }
        }

        return result;
      }
    };
  },

  toHaveSameValuesAs() {
    return {
      compare(actual, expected) {
        const result = {};

        if (!Array.isArray(actual)) {
          result.pass = false;
          result.message = 'Expected [' + actual + '] to be an array';
        } else if (!Array.isArray(expected)) {
          result.pass = false;
          result.message = 'Expected [' + expected + '] to be an array';
        } else {
          result.pass = true;

          const actualSet = new Set(actual);
          const expectedSet = new Set(actual);

          result.pass = actualSet.size === expectedSet.size
            && Array.from(actualSet).every(value => expectedSet.has(value));

          if (result.pass) {
            result.message = '[' + expected + ' has the same elements as [' + actual + ']';
          } else {
            result.message = 'Expected [' + expected + '] to have the same elements as [' + actual
              + '], but there are some differences';
          }
        }

        return result;
      }
    };
  },

  toDoNotHaveRepeatedValues() {
    return {
      compare(actual) {
        const result = {};

        if (Array.isArray(actual)) {
          result.pass = true;

          for (const value1 of actual) {
            let found = false;

            for (const value2 of actual) {
              if (value1 === value2) {
                if (found) {
                  result.pass = false;
                  break;
                } else {
                  found = true;
                }
              }
            }

            if (!result.pass) break;
          }

          if (result.pass) {
            result.message = '[' + actual + '] does not contain repeated values';
          } else {
            result.message = 'Expected [' + actual + '] to do not contain repeated values, but it does';
          }
        } else {
          result.pass = false;
          result.message = 'Expected ' + actual + ' to be an array';
        }

        return result;
      }
    };
  },

  toContainOnce() {
    return {
      compare(actual, expected) {
        const result = {};

        if (Array.isArray(actual)) {
          result.pass = false;

          let found = false;

          for (const value of actual) {
            if (value === expected) {
              if (found) {
                result.pass = false;
                break;
              } else {
                found = true;
                result.pass = true;
              }
            }
          }

          if (result.pass) {
            result.message = '[' + actual + '] contains once ' + expected;
          } else if (found) {
            result.message = 'Expected [' + actual + '] to contain ' + expected + ' once, but it was found more than once';
          } else {
            result.message = 'Expected [' + actual + '] to contain ' + expected + ' once, but it was not found';
          }
        } else {
          result.message = 'Expected ' + actual + ' to be an array';
        }

        return result;
      }
    };
  }
};

export default extendedArrayMatchers;
