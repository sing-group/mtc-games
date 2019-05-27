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
import {GameInputStyle} from './GameInputStyle';

const blinkChar = '|';
const emptyText = '';

export class GameInputElement {

  constructor(x, y, width, height, spriteImage, selectedStyle, unselectedStyle, context) {
    check.assert.greaterOrEqual(x, 0, 'x should be positive');
    check.assert.greaterOrEqual(y, 0, 'y should be positive');
    check.assert.greaterOrEqual(width, 0, 'width should be positive');
    check.assert.greaterOrEqual(height, 0, 'height should be positive');

    check.assert.instance(context, StageRenderer, 'context should be an instance of StageRenderer');

    if (selectedStyle) {
      check.assert.instance(selectedStyle, GameInputStyle, 'selectedStyle should be an instance of GameInputStyle');
    }

    if (unselectedStyle) {
      check.assert.instance(unselectedStyle, GameInputStyle, 'unselectedStyle should be an instance of GameInputStyle');
    }

    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
    this._spriteImage = spriteImage;
    this._selectedStyle = selectedStyle || GameInputStyle.DEFAULTS;
    this._unselectedStyle = unselectedStyle || GameInputStyle.DEFAULTS;
    this._context = context;

    this._position = null;
    this._onSelectedCallback = null;

    this._focused = false;
    this._blinkEvent = null;

    this._generateElement();
    this._setOnPointerOver();
    this._setOnPointerOut();
    this._setOnPointerUp();
    this._setOnPointerDown();
  }

  _generateElement() {
    this._sprite = this._context.add.sprite(this._x, this._y, this._spriteImage);
    this._sprite.setOrigin(0.5, 0.5);
    this._sprite.setScale(0.1, 0.1);

    this._container = this._context.add.rectangle(this._x, this._sprite.y + this._sprite.displayHeight, this._width, this._height, this._unselectedStyle.backgroundColor);
    this._container.setOrigin(0.5, 0.5);
    this._container.setStrokeStyle(1, this._unselectedStyle.strokeColor, this._unselectedStyle.alpha);
    this._container.setInteractive();

    this._blinkerText = this._context.add.text(this._container.x, this._container.y, emptyText);
    this._blinkerText.setOrigin(0.5, 0.5);
    this._blinkerText.setAlpha(this._unselectedStyle.alpha);

    this._text = this._context.add.text(this._container.x, this._container.y, emptyText);
    this._text.setOrigin(0.5, 0.5);
    this._text.setAlpha(this._unselectedStyle.alpha);

    this._setUnselectedStyle();
  }

  _setUnselectedStyle() {
    this._container.setStrokeStyle(1, this._unselectedStyle.strokeColor, this._unselectedStyle.alpha);
    this._text.setStyle({font: this._unselectedStyle.font, fill: this._unselectedStyle.textColor});
    this._blinkerText.setAlpha(this._unselectedStyle.alpha);
    this._text.setAlpha(this._unselectedStyle.alpha);
  }

  _setSelectedStyle() {
    this._container.setStrokeStyle(2, this._selectedStyle.strokeColor);
    this._text.setStyle({font: this._selectedStyle.font, fill: this._selectedStyle.textColor});
    this._blinkerText.setAlpha(this._selectedStyle.alpha);
    this._text.setAlpha(this._selectedStyle.alpha);
  }

  _setOnPointerOver() {
    this._container.on('pointerover', () => {
      this._setSelectedStyle();
    });
  }

  _setOnPointerOut() {
    this._container.on('pointerout', () => {
      if (!this.hasFocus()) {
        this._setUnselectedStyle()
      }
    });
  }

  _setOnPointerUp() {
    this._container.on('pointerup', () => {
      // Do nothing
    });
  }

  _setOnPointerDown() {
    this._container.on('pointerdown', () => {
      this.addFocus();
      this._onSelectedCallback(this._position);
      if (!this._blinkEvent) {
        this._blinkEvent = this._context.time.addEvent({
          delay: 300, callback: this._startBlink, callbackScope: this, loop: true
        });
      }
    });
  }

  _addBlinkEvent() {
    if (!this._blinkEvent) {
      this._blinkEvent = this._context.time.addEvent({
        delay: 300, callback: this._startBlink, callbackScope: this, loop: true
      });
    }
  }

  _startBlink() {
    if (this.isEmpty()) {
      if (this._blinkerText.text === blinkChar) {
        this._blinkerText.text = emptyText;
      } else {
        this._blinkerText.text = blinkChar;
      }
    }
  }

  _endBlink() {
    if (this._blinkEvent) {
      this._blinkEvent.remove(false);
    }
    if (this.isEmpty()) {
      this._blinkerText.text = emptyText;
    }
    this._blinkEvent = null;
  }

  setText(text) {
    if (this.hasFocus()) {
      if (text !== emptyText) {
        this._blinkerText.text = emptyText;
      }
      this._text.text = text;
    }
  }

  getText() {
    return this._text ? this._text.text : emptyText;
  }

  isEmpty() {
    return this._text.text === emptyText || this._text.text === blinkChar;
  }

  addFocus() {
    this._focused = true;
    this._setSelectedStyle();
    this._addBlinkEvent();
  }

  removeFocus() {
    this._focused = false;
    this._setUnselectedStyle();
    this._endBlink();
  }

  hasFocus() {
    return this._focused;
  }

  updateVerticalPosition(y) {
    this._sprite.y = y;
    this._container.y = this._sprite.y + this._sprite.displayHeight;
    this._blinkerText.y = this._container.y;
    this._text.y = this._container.y;
  }

  updateHorizontalPosition(x) {
    this._sprite.x = x;
    this._container.x = x;
    this._blinkerText.x = this._container.x;
    this._text.x = this._container.x;
  }

  changeSprite(sprite, scale) {
    let x = this._sprite.x;
    let y = this._sprite.y;
    this._sprite.destroy();
    this._sprite = this._context.add.sprite(x, y, sprite);
    this._sprite.setOrigin(0.5, 0.5);
    this._sprite.setScale(scale || 0.1, scale || 0.1);
    this._context.tweens.add({
      targets: this._sprite,
      duration: 200,
      alpha: 1
    });
  }

  setGridPosition(position) {
    this._position = position;
  }

  getGridPosition() {
    return this._position;
  }

  setOnSelectedCallback(callback) {
    this._onSelectedCallback = callback;
  }

  hide() {
    this._sprite.setAlpha(0);
    this._container.setAlpha(0);
    this._text.setVisible(false);
    this._blinkerText.setVisible(false);
  }

  show() {
    this._sprite.setAlpha(1);
    this._container.setAlpha(1);
    this._text.setVisible(true);
    this._blinkerText.setVisible(true);
  }

  disable() {
    this._container.removeInteractive();
    this._setUnselectedStyle()
  }

  enable() {
    this._container.setInteractive();
  }
}
