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
import {GameInputElement} from './GameInputElement';

const MINIMUM_ELEMENTS = 1;
const MAXIMUM_ELEMENTS = 12;

const MAXIMUM_ELEMENTS_PER_ROW = 4;

export class GameInputGrid {

  constructor(inputs, width, height, initialSprite, selectedStyle, unselectedStyle, context) {

    check.assert.greaterOrEqual(inputs, MINIMUM_ELEMENTS, 'inputs should be almost ' + MINIMUM_ELEMENTS);
    check.assert.lessOrEqual(inputs, MAXIMUM_ELEMENTS, 'inputs should be less or equals than ' + MAXIMUM_ELEMENTS);

    check.assert.greaterOrEqual(width, 0, 'width should be positive');
    check.assert.greaterOrEqual(height, 0, 'height should be positive');

    check.assert.nonEmptyString(initialSprite, 'initialSprite should be a non empty string');

    if (selectedStyle) {
      check.assert.instance(selectedStyle, GameInputStyle, 'selectedStyle should be an instance of GameInputStyle');
    }

    if (unselectedStyle) {
      check.assert.instance(unselectedStyle, GameInputStyle, 'unselectedStyle should be an instance of GameInputStyle');
    }

    check.assert.instance(context, StageRenderer, 'context should be an instance of StageRenderer');

    this._inputs = inputs;
    this._width = width;
    this._height = height;
    this._initialSprite = initialSprite;
    this._selectedStyle = selectedStyle || GameInputStyle.DEFAULTS;
    this._unselectedStyle = unselectedStyle || GameInputStyle.DEFAULTS;
    this._context = context;

    this._elements = null;
    this._focusedElement = null;

    this._generateGridElements();
    this._addGridPositionsAndListeners();
    this._updateVerticalPositionIfNeeded();
    this._updateHorizontalPositionIfNeeded();
  }

  _generateGridElements() {
    this._elements = new Map();
    let j = 0;
    for (let i = 0; i < this._inputs; i++) {
      this._elements.set(i, new GameInputElement(100 + j++ * 200, 120 + (Math.floor(i / MAXIMUM_ELEMENTS_PER_ROW) * 150), this._width, this._height,
        this._initialSprite, new GameInputStyle(this._selectedStyle), new GameInputStyle(this._unselectedStyle), this._context));
      if (j === MAXIMUM_ELEMENTS_PER_ROW) {
        j = 0;
      }
    }
  }

  _addGridPositionsAndListeners() {
    this._elements.forEach((element, index) => {
      element.setGridPosition(index);
      element.setOnSelectedCallback(this._onSelectedCallback.bind(this));
    });
  }

  _updateVerticalPositionIfNeeded() {
    let rows = (Math.ceil(this._inputs / MAXIMUM_ELEMENTS_PER_ROW));
    if (rows === 1) {
      this._elements.forEach((element) => {
        element.updateVerticalPosition(275);
      });
    } else if (rows === 2) {
      this._elements.forEach((element, index) => {
        let row = (Math.floor(index / MAXIMUM_ELEMENTS_PER_ROW));
        if (row === 0) {
          element.updateVerticalPosition(175);
        } else if (row === 1) {
          element.updateVerticalPosition(375);
        }
      });
    }
  }

  _updateHorizontalPositionIfNeeded() {
    let colsPerRow = this._calculateColsPerRowLinear();
    this._elements.forEach((element, index) => {
      let row = Math.floor(index / MAXIMUM_ELEMENTS_PER_ROW) + 1;
      let cols = colsPerRow[row];
      if (cols > 0 && cols < MAXIMUM_ELEMENTS_PER_ROW) {
        element.updateHorizontalPosition((this._context.worldWidth / (cols + 1)) * (index - (Math.floor(index / MAXIMUM_ELEMENTS_PER_ROW) * MAXIMUM_ELEMENTS_PER_ROW) + 1));
      }
    });
  }

  _calculateColsPerRowDistributed() {
    let colsPerRow = {1: 0, 2: 0, 3: 0};
    let rows = (Math.ceil(this._inputs / MAXIMUM_ELEMENTS_PER_ROW));
    this._elements.forEach((element, index) => {
      colsPerRow[(index % rows) + 1] = colsPerRow[(index % rows) + 1] + 1;
    });

    return colsPerRow;
  }

  _calculateColsPerRowLinear() {
    let colsPerRow = {1: 0, 2: 0, 3: 0};
    this._elements.forEach((element, index) => {
      let row = Math.floor(index / MAXIMUM_ELEMENTS_PER_ROW) + 1;
      colsPerRow[row] = colsPerRow[row] + 1;
    });

    return colsPerRow;
  }

  _onSelectedCallback(position) {
    this._focusedElement = this._elements.get(position);
    this._elements.forEach((element, index) => {
      if (position !== index) {
        element.removeFocus();
      }
    });
  }

  changeFocus(position) {
    this._focusedElement = this._elements.get(position);
    this._focusedElement.addFocus();
    this._elements.forEach((element, index) => {
      if (position !== index) {
        element.removeFocus();
      }
    });
  }

  getFocusedElementPosition() {
    return this._focusedElement ? this._focusedElement.getGridPosition() : null;
  }

  getText() {
    if (this._focusedElement) {
      return this._focusedElement.getText();
    }
    return null;
  }

  setText(text) {
    this._focusedElement.setText(text);
  }

  getValues() {
    let values = [];
    this._elements.forEach((element, index) => {
      values[index] = element.getText();
    });
    return values;
  }

  changeSprite(position, sprite, scale) {
    this._elements.get(position).changeSprite(sprite, scale);
  }

  hide() {
    this._elements.forEach((element) => {
      element.hide();
    });
  }

  show() {
    this._elements.forEach((element) => {
      element.show();
    });
  }

  disable() {
    this._elements.forEach((element) => {
      element.disable();
    });
  }

  enable() {
    this._elements.forEach((element) => {
      element.enable();
    });
  }
}
