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

export default class GameConfig {
  static get DEFAULTS() {
    return {
      TIME: 60,
      TIMER_VISIBLE: true,
      REPEATS_ALLOWED: 0
    };
  }

  constructor(
    time = GameConfig.DEFAULTS.TIME,
    timerVisible = GameConfig.DEFAULTS.TIMER_VISIBLE,
    repeatsAllowed = GameConfig.DEFAULTS.REPEATS_ALLOWED
  ) {
    check.assert.greaterOrEqual(time, 1, 'time must be greater than 0');
    check.assert.boolean(timerVisible, 'timerVisible must be a boolean');
    check.assert.greaterOrEqual(time, 1, 'repeatsAllowed must be greater than 0');

    this._time = time;
    this._timerVisible = timerVisible;
    this._repeatsAllowed = repeatsAllowed;
  }

  get time() {
    return this._time;
  }

  set time(time) {
    check.assert.greaterOrEqual(time, 1, 'time must be greater than 0');

    this._time = time;
  }

  get timerVisible() {
    return this._timerVisible;
  }

  showTimer() {
    this._timerVisible = true;
  }

  hideTimer() {
    this._timerVisible = false;
  }

  get repeatsAllowed() {
    return this._repeatsAllowed;
  }

  set repeatsAllowed(repeatsAllowed) {
    check.assert.greaterOrEqual(time, 1, 'repeatsAllowed must be greater than 0');

    this._repeatsAllowed = repeatsAllowed;
  }
}
