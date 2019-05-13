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
import check from 'check-types';
import {StageRenderer} from '../../game/stage';
import {GameTimeStyle} from "./GameTimeStyle";

export class GameTime {

  constructor(x, y, background, value, style, context) {

    check.assert.nonEmptyString(value, 'value should be a non empty string');

    if (style) {
      check.assert.instance(style, GameTimeStyle, 'style should be an instance of GameTimeStyle');
    }

    check.assert.instance(context, StageRenderer, 'context should be an instance of StageRenderer');

    this._x = x;
    this._y = y;
    this._background = background;
    this._value = value;
    this._style = style;
    this._context = context;

    this._generateContainerElement();
    this._generateTextElement();
    this._initTimeStyle();
  }

  _generateContainerElement() {
    this._timeContainer = this._context.add.sprite(0, 0, this._background);
    this._timeContainer.x = this._x;
    this._timeContainer.y = (this._timeContainer.height / 2) + this._y;
    this._timeContainer.setOrigin(0, 0.5);
  }

  _generateTextElement() {
    this._textContainer = this._context.add.text(this._timeContainer.width / 2 + this._timeContainer.x, this._timeContainer.y, this._value);
    this._textContainer.setOrigin(0.5, 0.5);
  }

  _initTimeStyle() {
    let style = this._style || GameTimeStyle.DEFAULTS;
    this._textContainer.setStyle({
      font: style.font,
      fill: style.fill,
      stroke: style.stroke,
      strokeThickness: style.strokeThickness
    });
  }

  hide() {
    this._timeContainer.setAlpha(0);
    this._textContainer.setVisible(false);
  }

  show() {
    this._timeContainer.setAlpha(1);
    this._textContainer.setVisible(true);

  }

  update(value) {
    this._textContainer.text = value;
  }

}
