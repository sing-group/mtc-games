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
import Phaser from 'phaser';

import check from 'check-types';
import {StageRenderer} from '../../game/stage';
import {GameScoreStyle} from "./GameScoreStyle";

const defaultSeparator = '/';

export class GameScore {

  constructor(x, y, background, values, styles, context) {

    check.assert.array(values, Array, 'values should be an instance of Array');
    check.assert.array(styles, Array, 'styles should be an instance of Array');

    check.assert.equal(values.length, styles.length, 'values length should be equals than styles length');

    check.assert.instance(context, StageRenderer, 'context should be an instance of StageRenderer');

    this._x = x;
    this._y = y;
    this._background = background;
    this._values = values;
    this._styles = styles;
    this._context = context;

    this._generateContainerElement();
    this._generateScoreTextElement();
    this._initScoreStyle();
    this._initSlashesStyle();
    this._groupScoreElements();
  }

  _generateContainerElement() {
    this._scoreContainer = this._context.add.sprite(0, 0, this._background);
    this._scoreContainer.x = this._x;
    this._scoreContainer.y = (this._scoreContainer.height / 2) + this._y;
    this._scoreContainer.setOrigin(1, 0.5);
    this._scoreContainer.setDepth(0, 0);
  }

  _generateScoreTextElement() {
    this._scoreTextValues = Array();
    this._values.forEach((value, index) => {
      let score = this._context.add.text(0, 0, value);
      this._scoreTextValues.push(score);
      if (index !== this._values.length - 1) {
        let slash = this._context.add.text(0, 0, defaultSeparator);
        this._scoreTextValues.push(slash);
      }
    });
  }

  _initScoreStyle() {
    let scoreTextValuesMap = this._getScoreValues();
    this._styles.forEach((style, index) => {
      scoreTextValuesMap[index].setStyle({
        font: style.font,
        fill: style.fill,
        stroke: style.stroke,
        strokeThickness: style.strokeThickness,
      });
    });
  }

  _initSlashesStyle() {
    let slashes = this._getSlashes();
    slashes.forEach((slash) => {
      slash.setStyle(GameScoreStyle.DEFAULTS)
    });
  }

  _groupScoreElements() {
    let group = this._context.add.group(this._scoreTextValues);
    Phaser.Actions.GridAlign(group.getChildren(), {
      width: 30,
      height: 30,
      cellWidth: 32,
      cellHeight: 32,
      position: Phaser.Display.Align.CENTER,
      x: this._scoreContainer.x - (this._scoreContainer.width / 2) - (32 * this._scoreTextValues.length) / 2 + 20,
      y: this._scoreContainer.y
    });
  }

  _getScoreValues() {
    return this._scoreTextValues.filter((scoreValue, scoreIndex) => {
      if (scoreIndex % 2 === 0) {
        return scoreValue;
      }
    });
  }

  _getSlashes() {
    return this._scoreTextValues.filter((scoreValue, scoreIndex) => {
      if (scoreIndex % 2 === 1) {
        return scoreValue;
      }
    });
  }

  hide() {
    this._scoreContainer.setAlpha(0);
    this._scoreTextValues.forEach((scoreTextValue) => {
      scoreTextValue.setVisible(false);
    });
  }

  show() {
    this._scoreContainer.setAlpha(1);
    this._scoreTextValues.forEach((scoreTextValue) => {
      scoreTextValue.setVisible(true);
    });
  }

  update(values) {
    let scoreTextValuesMap = this._getScoreValues();
    scoreTextValuesMap.forEach((scoreTextValue, index) => {
      scoreTextValue.setText(values[index]);
    });
  }

}
