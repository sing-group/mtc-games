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
import RecognitionGameMetadata from '../../../lib/game/recognition/RecognitionGameMetadata';
import extendedArrayMatchers from '../../matchers/extendedArrayMatchers';
import SecondsParameter from "../../../lib/game/metadata/parameter/time/SecondsParameter";
import IntegerParameter from "../../../lib/game/metadata/parameter/basic/IntegerParameter";

describe('Recognition game metadata test', () => {
  let metadata;

  beforeAll(() => {
    jasmine.addMatchers(extendedArrayMatchers);
  });

  beforeEach(() => {
    metadata = new RecognitionGameMetadata();
  });

  afterEach(() => {
    metadata = null;
  });

  it('has the correct id', () => {
    expect(metadata.id).toBe(RecognitionGameMetadata.ID);
  });

  it('has the correct parameter ids', () => {
    expect(metadata.parameterIds()).toHaveSameValuesAs([ 'diceShowTime', 'numOfStimuli', 'maxRepetitions' ]);
  });

  it('has the correct parameter types', () => {
    expect(metadata.parameter('diceShowTime')).toEqual(jasmine.any(SecondsParameter));
    expect(metadata.parameter('numOfStimuli')).toEqual(jasmine.any(IntegerParameter));
    expect(metadata.parameter('maxRepetitions')).toEqual(jasmine.any(IntegerParameter));
  });
});