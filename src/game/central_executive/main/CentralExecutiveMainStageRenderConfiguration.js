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
import {StageRenderConfiguration} from '../../stage';

const DEFAULT_DICE_SCALES = Symbol();
const DEFAULT_PIXEL_OFFSETS = Symbol();
const DEFAULT_TEXT_STYLES = Symbol();
const DEFAULT_COLORS = Symbol();

export class CentralExecutiveMainStageColors {
  static get DEFAULTS() {
    if (!CentralExecutiveMainStageColors[DEFAULT_COLORS]) {
      CentralExecutiveMainStageColors[DEFAULT_COLORS] = {
        SCORE_SEPARATOR: '#FAFAFA',
        SCORE_GUESSED: '#00FF00',
        SCORE_FAILED: '#FF0000'
      };

      Object.freeze(CentralExecutiveMainStageColors[DEFAULT_COLORS]);
    }

    return CentralExecutiveMainStageColors[DEFAULT_COLORS];
  }

  constructor(
    scoreSeparator = CentralExecutiveMainStageColors.DEFAULTS.SCORE_SEPARATOR,
    scoreGuessed = CentralExecutiveMainStageColors.DEFAULTS.SCORE_GUESSED,
    scoreFailed = CentralExecutiveMainStageColors.DEFAULTS.SCORE_FAILED
  ) {
    this._scoreSeparator = scoreSeparator;
    this._scoreGuessed = scoreGuessed;
    this._scoreFailed = scoreFailed;
  }

  get scoreSeparator() {
    return this._scoreSeparator;
  }

  get scoreGuessed() {
    return this._scoreGuessed;
  }

  get scoreFailed() {
    return this._scoreFailed;
  }
}

export class CentralExecutiveMainStageTextStyles {
  static get DEFAULTS() {
    if (!CentralExecutiveMainStageTextStyles[DEFAULT_TEXT_STYLES]) {
      CentralExecutiveMainStageTextStyles[DEFAULT_TEXT_STYLES] = {
        IN_GAME_TIME: {
          font: '24px Arial',
          fill: '#fafafa',
          align: 'left',
          stroke: '#00000030',
          strokeThickness: 2
        },
        SCORE: {
          font: '24px Arial',
          fill: '#fafafa',
          align: 'left',
          stroke: '#00000030',
          strokeThickness: 2
        }
      };

      Object.freeze(CentralExecutiveMainStageTextStyles[DEFAULT_TEXT_STYLES]);
    }

    return CentralExecutiveMainStageTextStyles[DEFAULT_TEXT_STYLES];
  }

  constructor(
    inGameTime = CentralExecutiveMainStageTextStyles.DEFAULTS.IN_GAME_TIME,
    score = CentralExecutiveMainStageTextStyles.DEFAULTS.SCORE
  ) {
    this._inGameTime = inGameTime;
    this._score = score;
  }

  get inGameTime() {
    return Object.assign({}, this._inGameTime);
  }

  get score() {
    return Object.assign({}, this._score);
  }

}

export class CentralExecutiveMainStagePixelOffsets {
  static get DEFAULTS() {
    if (!CentralExecutiveMainStagePixelOffsets[DEFAULT_PIXEL_OFFSETS]) {
      CentralExecutiveMainStagePixelOffsets[DEFAULT_PIXEL_OFFSETS] = {
        FRAME_X: 10,
        FRAME_Y: -10
      };

      Object.freeze(CentralExecutiveMainStagePixelOffsets[DEFAULT_PIXEL_OFFSETS]);
    }

    return CentralExecutiveMainStagePixelOffsets[DEFAULT_PIXEL_OFFSETS];
  }

  constructor(
    frameX = CentralExecutiveMainStagePixelOffsets.DEFAULTS.FRAME_X,
    frameY = CentralExecutiveMainStagePixelOffsets.DEFAULTS.FRAME_Y
  ) {
    this._frameX = frameX;
    this._frameY = frameY;
  }

  get frameX() {
    return this._frameX;
  }

  get frameY() {
    return this._frameY;
  }

}

export class CentralExecutiveMainStageDiceScales {
  static get DEFAULTS() {
    if (!CentralExecutiveMainStageDiceScales[DEFAULT_DICE_SCALES]) {
      CentralExecutiveMainStageDiceScales[DEFAULT_DICE_SCALES] = {
        NORMAL: 0.1,
        SHOWN: 0.40,
        RESULT: 0.065
      };

      Object.freeze(CentralExecutiveMainStageDiceScales[DEFAULT_DICE_SCALES]);
    }

    return CentralExecutiveMainStageDiceScales[DEFAULT_DICE_SCALES];
  }

  constructor(
    normal = CentralExecutiveMainStageDiceScales.DEFAULTS.NORMAL,
    shown = CentralExecutiveMainStageDiceScales.DEFAULTS.SHOWN,
    result = CentralExecutiveMainStageDiceScales.DEFAULTS.RESULT
  ) {
    this._normal = normal;
    this._shown = shown;
    this._result = result;
  }

  get normal() {
    return this._normal;
  }

  get shown() {
    return this._shown;
  }

  get result() {
    return this._result;
  }

}

export class CentralExecutiveMainStageRenderConfiguration extends StageRenderConfiguration {
  constructor(
    colors = new CentralExecutiveMainStageColors(),
    textStyles = new CentralExecutiveMainStageTextStyles(),
    diceScales = new CentralExecutiveMainStageDiceScales(),
    pixelOffsets = new CentralExecutiveMainStagePixelOffsets()
  ) {
    super();

    this._colors = colors;
    this._textStyles = textStyles;
    this._diceScales = diceScales;
    this._pixelOffsets = pixelOffsets;
  }

  get colors() {
    return Object.assign(new CentralExecutiveMainStageColors(), this._colors);
  }

  get textStyles() {
    return Object.assign(new CentralExecutiveMainStageTextStyles(), this._textStyles);
  }

  get diceScales() {
    return Object.assign(new CentralExecutiveMainStageDiceScales(), this._diceScales);
  }

  get pixelOffsets() {
    return Object.assign(new CentralExecutiveMainStagePixelOffsets(), this._pixelOffsets);
  }
}
