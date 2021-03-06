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
import {StageRenderConfiguration} from '../../../game/stage';
import {GameScoreStyle, GameTimeStyle} from '../../../components';

const DEFAULT_DICE_SCALES = Symbol();
const DEFAULT_PIXEL_OFFSETS = Symbol();
const DEFAULT_TEXT_STYLES = Symbol();
const DEFAULT_COLORS = Symbol();

export class CalculusMainStageColors {
  static get DEFAULTS() {
    if (!CalculusMainStageColors[DEFAULT_COLORS]) {
      CalculusMainStageColors[DEFAULT_COLORS] = {
        SCORE_SEPARATOR: '#FAFAFA',
        SCORE_GUESSED: '#00FF00',
        SCORE_FAILED: '#FF0000',
        IN_GAME_TIME: '#FAFAFA'
      };

      Object.freeze(CalculusMainStageColors[DEFAULT_COLORS]);
    }

    return CalculusMainStageColors[DEFAULT_COLORS];
  }

  constructor(
    scoreSeparator = CalculusMainStageColors.DEFAULTS.SCORE_SEPARATOR,
    scoreGuessed = CalculusMainStageColors.DEFAULTS.SCORE_GUESSED,
    scoreFailed = CalculusMainStageColors.DEFAULTS.SCORE_FAILED,
    inGameTime = CalculusMainStageColors.DEFAULTS.IN_GAME_TIME
  ) {
    this._scoreSeparator = scoreSeparator;
    this._scoreGuessed = scoreGuessed;
    this._scoreFailed = scoreFailed;
    this._inGameTime = inGameTime;
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

  get inGameTime() {
    return this._inGameTime;
  }
}

export class CalculusMainStageTextStyles {
  static get DEFAULTS() {
    if (!CalculusMainStageTextStyles[DEFAULT_TEXT_STYLES]) {
      CalculusMainStageTextStyles[DEFAULT_TEXT_STYLES] = {
        IN_GAME_TIME: new GameTimeStyle({
          font: '24px Arial',
          fill: CalculusMainStageColors.DEFAULTS.IN_GAME_TIME,
          stroke: '#00000030',
          strokeThickness: 2
        }),
        SCORE_GUESSED: new GameScoreStyle({
          font: '24px Arial',
          fill: CalculusMainStageColors.DEFAULTS.SCORE_GUESSED,
          stroke: '#00000030',
          strokeThickness: 2
        }),
        SCORE_FAILED: new GameScoreStyle({
          font: '24px Arial',
          fill: CalculusMainStageColors.DEFAULTS.SCORE_FAILED,
          stroke: '#00000030',
          strokeThickness: 2
        }),
        RESPONSE_LABEL: {
          font: '32px Arial',
          fill: '#1d3d1e'
        },
        RESPONSE_INPUT: {
          font: '32px Arial',
          fill: '#1d3d1e',
          padding: {
            x: 10,
            y: 10
          },
        }
      };

      Object.freeze(CalculusMainStageTextStyles[DEFAULT_TEXT_STYLES]);
    }

    return CalculusMainStageTextStyles[DEFAULT_TEXT_STYLES];
  }

  constructor(
    inGameTime = CalculusMainStageTextStyles.DEFAULTS.IN_GAME_TIME,
    scoreGuessed = CalculusMainStageTextStyles.DEFAULTS.SCORE_GUESSED,
    scoreFailed = CalculusMainStageTextStyles.DEFAULTS.SCORE_FAILED,
    responseLabel = CalculusMainStageTextStyles.DEFAULTS.RESPONSE_LABEL,
    responseInput = CalculusMainStageTextStyles.DEFAULTS.RESPONSE_INPUT,
  ) {
    this._inGameTime = inGameTime;
    this._scoreGuessed = scoreGuessed;
    this._scoreFailed = scoreFailed;
    this._responseLabel = responseLabel;
    this._responseInput = responseInput;
  }

  get inGameTime() {
    return this._inGameTime;
  }

  get scoreGuessed() {
    return this._scoreGuessed;
  }

  get scoreFailed() {
    return this._scoreFailed;
  }

  get responseLabel() {
    return Object.assign({}, this._responseLabel);
  }

  get responseInput() {
    return Object.assign({}, this._responseInput);
  }
}

export class CalculusMainStagePixelOffsets {
  static get DEFAULTS() {
    if (!CalculusMainStagePixelOffsets[DEFAULT_PIXEL_OFFSETS]) {
      CalculusMainStagePixelOffsets[DEFAULT_PIXEL_OFFSETS] = {
        FRAME_X: 10,
        FRAME_Y: -10
      };

      Object.freeze(CalculusMainStagePixelOffsets[DEFAULT_PIXEL_OFFSETS]);
    }

    return CalculusMainStagePixelOffsets[DEFAULT_PIXEL_OFFSETS];
  }

  constructor(
    frameX = CalculusMainStagePixelOffsets.DEFAULTS.FRAME_X,
    frameY = CalculusMainStagePixelOffsets.DEFAULTS.FRAME_Y
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

export class CalculusMainStageDiceScales {
  static get DEFAULTS() {
    if (!CalculusMainStageDiceScales[DEFAULT_DICE_SCALES]) {
      CalculusMainStageDiceScales[DEFAULT_DICE_SCALES] = {
        NORMAL: 0.1,
        SHOWN: 0.30,
        RESULT: 0.065
      };

      Object.freeze(CalculusMainStageDiceScales[DEFAULT_DICE_SCALES]);
    }

    return CalculusMainStageDiceScales[DEFAULT_DICE_SCALES];
  }

  constructor(
    normal = CalculusMainStageDiceScales.DEFAULTS.NORMAL,
    shown = CalculusMainStageDiceScales.DEFAULTS.SHOWN,
    result = CalculusMainStageDiceScales.DEFAULTS.RESULT
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

export class CalculusMainStageRenderConfiguration extends StageRenderConfiguration {
  constructor(
    colors = new CalculusMainStageColors(),
    textStyles = new CalculusMainStageTextStyles(),
    diceScales = new CalculusMainStageDiceScales(),
    pixelOffsets = new CalculusMainStagePixelOffsets()
  ) {
    super();

    this._colors = colors;
    this._textStyles = textStyles;
    this._diceScales = diceScales;
    this._pixelOffsets = pixelOffsets;
  }

  get colors() {
    return Object.assign(new CalculusMainStageColors(), this._colors);
  }

  get textStyles() {
    return Object.assign(new CalculusMainStageTextStyles(), this._textStyles);
  }

  get diceScales() {
    return Object.assign(new CalculusMainStageDiceScales(), this._diceScales);
  }

  get pixelOffsets() {
    return Object.assign(new CalculusMainStagePixelOffsets(), this._pixelOffsets);
  }
}
