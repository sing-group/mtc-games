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
import {GameButtonStyle} from "./GameButtonStyle";
import {StageRenderer} from "../../game/stage";

export class GameButton {

  constructor(x, y, width, height, text, onClick, context, selectedStyle, unselectedStyle) {

    check.assert.greaterOrEqual(x, 0, 'x should be positive');
    check.assert.greaterOrEqual(y, 0, 'y should be positive');
    check.assert.greaterOrEqual(width, 0, 'width should be positive');
    check.assert.greaterOrEqual(height, 0, 'height should be positive');

    check.assert.nonEmptyString(text, 'text should be a non empty string');
    check.assert.function(onClick, 'onClick should be a function');
    check.assert.instance(context, StageRenderer, 'context should be an instance of StageRenderer');

    if (selectedStyle) {
      check.assert.instance(selectedStyle, GameButtonStyle, 'selectedStyle should be an instance of GameButtonStyle');
    }

    if (unselectedStyle) {
      check.assert.instance(unselectedStyle, GameButtonStyle, 'unselectedStyle should be an instance of GameButtonStyle');
    }

    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
    this._text = text;
    this._onClick = onClick;
    this._context = context;
    this._selectedStyle = selectedStyle || GameButtonStyle.DEFAULTS;
    this._unselectedStyle = unselectedStyle || GameButtonStyle.DEFAULTS;

    this.generateContainerElement();
    this.generateTextElement();
    this.setOnPointerOver();
    this.setOnPointerOut();
    this.setOnPointerUp();
    this.setOnclick();
  }

  generateContainerElement() {
    this._buttonContainer = this._context.add.rectangle(this._x, this._y, this._width, this._height, this._unselectedStyle.backgroundColor);
    this._buttonContainer.setStrokeStyle(1, this._unselectedStyle.strokeColor, this._unselectedStyle.alpha);
    this._buttonContainer.setInteractive();
  }

  generateTextElement() {
    this._textContainer = this._context.add.text(this._buttonContainer.x, this._buttonContainer.y, this._text);
    this._textContainer.setOrigin(0.5, 0.5);
    this._textContainer.setAlpha(this._unselectedStyle.alpha);

    this.initButtonStyle();
  }

  initButtonStyle() {
    this._buttonContainer.setStrokeStyle(1, this._unselectedStyle.strokeColor, this._unselectedStyle.alpha);
    this._textContainer.setStyle({font: this._unselectedStyle.font, fill: this._unselectedStyle.textColor});
    this._textContainer.setAlpha(this._unselectedStyle.alpha);
  }

  setOnPointerOver() {
    this._buttonContainer.on('pointerover', () => {
      this._buttonContainer.setStrokeStyle(2, this._selectedStyle.strokeColor);
      this._textContainer.setStyle({font: this._selectedStyle.font, fill: this._selectedStyle.textColor});
      this._textContainer.setAlpha(this._selectedStyle.alpha);
    });
  }

  setOnPointerOut() {
    this._buttonContainer.on('pointerout', () => {
      this.initButtonStyle()
    });
  }

  setOnPointerUp() {
    this._buttonContainer.on('pointerup', () => {
      this.initButtonStyle()
    });
  }

  setOnclick() {
    this._buttonContainer.on('pointerdown', this._onClick.bind(this._context));
  }

  disable() {
    this._buttonContainer.removeInteractive();
    this.initButtonStyle()
  }

  enable() {
    this._buttonContainer.setInteractive();
  }
}
