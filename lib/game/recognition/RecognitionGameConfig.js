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
import check from 'check-types';
import GameConfig from '../GameConfig';

export default class RecognitionGameConfig extends GameConfig {
  constructor(
    numOfStimuli,
    showTime,
    time = GameConfig.DEFAULTS.TIME,
    timerVisible = GameConfig.DEFAULTS.TIMER_VISIBLE,
    repeatsAllowed = GameConfig.DEFAULTS.REPEATS_ALLOWED
  ) {
    super(time, timerVisible, repeatsAllowed);

    check.assert.inRange(numOfStimuli, 1, 12, 'numOfStimuli should be in range [1, 12]');
    check.assert.greaterOrEqual(showTime, 1, 'showTime must be greater than 0');

    this._numOfStimuli = numOfStimuli;
    this._showTime = showTime;
  }

  get numOfStimuli() {
    return this._numOfStimuli;
  }

  get showTime() {
    return this._showTime;
  }
}