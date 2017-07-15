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

import MtcDicesRoller from '../../lib/dice/MtcDicesRoller';
import MtcDice from '../../lib/dice/MtcDice';
import MtcDiceFace from '../../lib/dice/MtcDiceFace';
import extendedArrayMatchers from '../matchers/extendedArrayMatchers';
import diceMatchers from '../matchers/diceMatchers';

describe('MTC dice roller tests', () => {
  const dices = MtcDice.DICES;
  const roller = new MtcDicesRoller(dices);

  beforeEach(() => {
    jasmine.addMatchers(extendedArrayMatchers);
    jasmine.addMatchers(diceMatchers);
  });

  it('assigns the values passed to constructor', () => {
    expect(roller.dices).toEqual(dices);
    expect(roller.diceCount).toBe(dices.length);
  });

  it('returns the dices correctly', () => {
    for (let i = 1; i <= dices.length; i++) {
      expect(roller.getDices(i)).toEqual(dices.slice(0, i));
    }

    expect(() => roller.getDices(0)).toThrowError();
    expect(() => roller.getDices(dices.length + 1)).toThrowError();
  });

  it('returns random dices correctly', () => {
    for (let i = 1; i <= dices.length; i++) {
      let randomDices = roller.getRandomDices(i);

      expect(randomDices).toDoNotHaveRepeatedValues();
      expect(randomDices).toBeAllIn(dices);
    }

    expect(() => roller.getRandomDices(0)).toThrowError();
    expect(() => roller.getRandomDices(dices.length + 1)).toThrowError();
  });

  it('generates rolls correctly', () => {
    for (let i = 1; i <= dices.length; i++) {
      const results = roller.roll(i);

      expect(results).toDoNotHaveRepeatedValues();
      expect(results).toBeAValidRollFor(dices.slice(0, i));
    }

    expect(() => roller.roll(0)).toThrowError();
    expect(() => roller.roll(dices.length + 1)).toThrowError();
  });

  it('generates random rolls correctly', () => {
    for (let i = 1; i <= dices.length; i++) {
      const results = roller.randomRoll(i);

      expect(results).toDoNotHaveRepeatedValues();
      expect(results).toBeAValidRollFor(dices);
    }

    expect(() => roller.randomRoll(0)).toThrowError();
    expect(() => roller.randomRoll(dices.length + 1)).toThrowError();
  });

  it('generates face rolls correctly', () => {
    for (const faceName of MtcDiceFace.FACE_NAMES) {
      for (let i = 1; i <= dices.length; i++) {
        const results = roller.faceRoll(faceName, i);

        expect(results).toDoNotHaveRepeatedValues();
        expect(results).toBeAValidFaceRollFor(dices.slice(0, i));
      }
    }

    expect(() => roller.roll(0)).toThrowError();
    expect(() => roller.roll(dices.length + 1)).toThrowError();
  });

  it('generates random face rolls correctly', () => {
    for (const faceName of MtcDiceFace.FACE_NAMES) {
      for (let i = 1; i <= dices.length; i++) {
        const results = roller.randomFaceRoll(faceName, i);

        expect(results).toDoNotHaveRepeatedValues();
        expect(results).toBeAValidFaceRollFor(dices);
      }
    }

    expect(() => roller.randomFaceRoll(0)).toThrowError();
    expect(() => roller.randomFaceRoll(dices.length + 1)).toThrowError();
  });
});