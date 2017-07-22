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
import GameConfig from '../../lib/game/GameConfig';
import GameMetadataStub from './metadata/GameMetadataStub';

describe('Game config test', () => {
  let metadata;
  let config;

  beforeEach(() => {
    metadata = new GameMetadataStub();
    config = GameConfig.forMetadata(metadata);
  });

  afterEach(() => {
    metadata = null;
    config = null;
  });

  it('extracts the metadata properties', () => {
    expect(config.time).toBe(GameConfig.DEFAULTS.TIME);
    expect(config.timerVisible).toBe(GameConfig.DEFAULTS.TIMER_VISIBLE);
    expect(config.repeatsAllowed).toBe(GameConfig.DEFAULTS.REPEATS_ALLOWED);

    for (const param of metadata.parameterIds()) {
      expect(config[param]).toBe(metadata.parameter(param).defaultValue);
    }
  });

  it('returns the complete list of parameter values', () => {
    const expectedParamValues = {
      param1: 5,
      param2: 1
    };

    const expectedValues = {
      time: GameConfig.DEFAULTS.TIME,
      timerVisible: GameConfig.DEFAULTS.TIMER_VISIBLE,
      repeatsAllowed: GameConfig.DEFAULTS.REPEATS_ALLOWED,
      ...expectedParamValues
    };

    expect(config.getParameterValues()).toEqual(expectedValues);
    expect(config.getParameterValues(true)).toEqual(expectedValues);
    expect(config.getParameterValues(false)).toEqual(expectedParamValues);
  });

  it('changes the property values', () => {
    config.param1 = 10;
    config.param2 = 8;

    expect(config.param1).toBe(10);
    expect(config.param2).toBe(8);
  });

  it('validates the property values', () => {
    expect(() => config.param1 = 100).toThrowError(TypeError);
    expect(() => config.param2 = 11).toThrowError(TypeError);
  });
});