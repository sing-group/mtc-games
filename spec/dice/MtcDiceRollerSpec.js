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

import MtcDiceRoller from '../../lib/dice/MtcDiceRoller';
import MtcDice from '../../lib/dice/MtcDice';

describe('MTC dice roller tests', () => {
  const dice = MtcDice.dice(1);
  const roller = new MtcDiceRoller(dice);

  it('assigns the values passed to constructor', () => {
    expect(roller.dice).toBe(dice);
  });

  it('returns valid roll results (100 rolls)', () => {
    for (let i = 0; i < 100; i++) {
      const result = roller.roll();

      expect(dice.isValidValue(result)).toBeTruthy();
    }
  });
});