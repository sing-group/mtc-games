/*
 * MultiTasking Cubes - Games
 * Copyright (C) 2017-2019 - Miguel Reboiro-Jato, Germán Veras Gómez,
 * Andrés Vieira Vázquez, Adolfo Piñón Blanco, Hugo López-Fernández,
 * Rosalía Laza Fidalgo, Reyes Pavón Rial, Francisco Otero Lamas,
 * Adrián Varela Pomar, Carlos Spuch Calvar, and Tania Rivera Baltanás.
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
import check from "check-types";
import {StageRenderer} from "../../game/stage";

export class Countdown {

  constructor(x, y, text, time, textStyle, timeStyle, onCountdownFinish, context) {
    check.assert.greaterOrEqual(x, 0, 'x should be positive');
    check.assert.greaterOrEqual(y, 0, 'y should be positive');

    check.assert.nonEmptyString(text, 'text should be a non empty string');
    check.assert.greaterOrEqual(time, 1, 'time should be positive');

    check.assert.function(onCountdownFinish, 'onClick should be a function');
    check.assert.instance(context, StageRenderer, 'context should be an instance of StageRenderer');

    this._x = x;
    this._y = y;
    this._text = text;
    this._time = time;
    this._textStyle = textStyle;
    this._timeStyle = timeStyle;
    this._onCountdownFinish = onCountdownFinish;
    this._context = context;

    this.generateTextCountdown();
    this.generateTimeCountdown();

    this._countdownEvent = null;
  }

  generateTextCountdown() {
    this._textCountdown = this._context.add.text(this._x, this._y, this._text, this._textStyle);
    this._textCountdown.setOrigin(0.5, 1);
    this._textCountdown.setAlpha(0);
  }

  generateTimeCountdown() {
    this._timeCountdown = this._context.add.text(this._x, this._y, '', this._timeStyle);
    this._timeCountdown.setOrigin(0.5, 0);
    this._textCountdown.setAlpha(0);
  }

  destroy() {
    this._textCountdown.destroy();
    this._timeCountdown.destroy();
  }

  start() {
    this._countdownEvent = this._context.time.delayedCall(this._time * 1000, this._onCountdownFinish, [], this._context);
    this._textCountdown.setAlpha(1);
    this._timeCountdown.setAlpha(1);
  }

  update() {
    if (this._countdownEvent) {
      let progress = this._time - Math.floor(this._countdownEvent.getProgress() * this._time);
      this._timeCountdown.setText(progress);
    }
  }
}
