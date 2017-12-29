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

import MtcDice from '../../lib/dice/MtcDice';
import MtcDiceFace from '../../lib/dice/MtcDiceFace';

describe('MTC dice const values tests', () => {
  const getFaceValues = index => {
    return MtcDiceFace.FACES.map(face => face.value(index));
  };

  it('generates 12 dices', () => {
    expect(MtcDice.DICES.length).toBe(12);

    for (let i = 1; i <= 12; i++) {
      MtcDice.dice(i);
    }

    expect(() => MtcDice.dice(0)).toThrowError();
    expect(() => MtcDice.dice(13)).toThrowError();
  });

  it('returns the dices correctly', () => {
    for (let i = 1; i <= 12; i++) {
      const dice = MtcDice.dice(i);

      expect(dice.faces).toEqual(MtcDiceFace.FACES);
      expect(dice.values).toEqual(getFaceValues(i - 1));
    }
  });
});