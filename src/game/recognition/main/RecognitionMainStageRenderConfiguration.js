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

export class RecognitionMainStageColors {
  static get DEFAULTS() {
    if (!RecognitionMainStageColors[DEFAULT_COLORS]) {
      RecognitionMainStageColors[DEFAULT_COLORS] = {
        SCORE_SEPARATOR: '#FAFAFA',
        SCORE_GUESSED: '#00FF00',
        SCORE_FAILED: '#FF0000'
      };

      Object.freeze(RecognitionMainStageColors[DEFAULT_COLORS]);
    }

    return RecognitionMainStageColors[DEFAULT_COLORS];
  }

  constructor(
    scoreSeparator = RecognitionMainStageColors.DEFAULTS.SCORE_SEPARATOR,
    scoreGuessed = RecognitionMainStageColors.DEFAULTS.SCORE_GUESSED,
    scoreFailed = RecognitionMainStageColors.DEFAULTS.SCORE_FAILED
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

export class RecognitionMainStageTextStyles {
  static get DEFAULTS() {
    if (!RecognitionMainStageTextStyles[DEFAULT_TEXT_STYLES]) {
      RecognitionMainStageTextStyles[DEFAULT_TEXT_STYLES] = {
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

      Object.freeze(RecognitionMainStageTextStyles[DEFAULT_TEXT_STYLES]);
    }

    return RecognitionMainStageTextStyles[DEFAULT_TEXT_STYLES];
  }

  constructor(
    inGameTime = RecognitionMainStageTextStyles.DEFAULTS.IN_GAME_TIME,
    score = RecognitionMainStageTextStyles.DEFAULTS.SCORE
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

export class RecognitionMainStagePixelOffsets {
  static get DEFAULTS() {
    if (!RecognitionMainStagePixelOffsets[DEFAULT_PIXEL_OFFSETS]) {
      RecognitionMainStagePixelOffsets[DEFAULT_PIXEL_OFFSETS] = {
        FRAME_X: 10,
        FRAME_Y: -10
      };

      Object.freeze(RecognitionMainStagePixelOffsets[DEFAULT_PIXEL_OFFSETS]);
    }

    return RecognitionMainStagePixelOffsets[DEFAULT_PIXEL_OFFSETS];
  }

  constructor(
    frameX = RecognitionMainStagePixelOffsets.DEFAULTS.FRAME_X,
    frameY = RecognitionMainStagePixelOffsets.DEFAULTS.FRAME_Y
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

export class RecognitionMainStageDiceScales {
  static get DEFAULTS() {
    if (!RecognitionMainStageDiceScales[DEFAULT_DICE_SCALES]) {
      RecognitionMainStageDiceScales[DEFAULT_DICE_SCALES] = {
        NORMAL: 0.1,
        SHOWN: 0.40
      };

      Object.freeze(RecognitionMainStageDiceScales[DEFAULT_DICE_SCALES]);
    }

    return RecognitionMainStageDiceScales[DEFAULT_DICE_SCALES];
  }

  constructor(
    normal = RecognitionMainStageDiceScales.DEFAULTS.NORMAL,
    shown = RecognitionMainStageDiceScales.DEFAULTS.SHOWN
  ) {
    this._normal = normal;
    this._shown = shown;
  }

  get normal() {
    return this._normal;
  }

  get shown() {
    return this._shown;
  }

}

export class RecognitionMainStageRenderConfiguration extends StageRenderConfiguration {
  constructor(
    colors = new RecognitionMainStageColors(),
    textStyles = new RecognitionMainStageTextStyles(),
    diceScales = new RecognitionMainStageDiceScales(),
    pixelOffsets = new RecognitionMainStagePixelOffsets()
  ) {
    super();

    this._colors = colors;
    this._textStyles = textStyles;
    this._diceScales = diceScales;
    this._pixelOffsets = pixelOffsets;
  }

  get colors() {
    return Object.assign(new RecognitionMainStageColors(), this._colors);
  }

  get textStyles() {
    return Object.assign(new RecognitionMainStageTextStyles(), this._textStyles);
  }

  get diceScales() {
    return Object.assign(new RecognitionMainStageDiceScales(), this._diceScales);
  }

  get pixelOffsets() {
    return Object.assign(new RecognitionMainStagePixelOffsets(), this._pixelOffsets);
  }
}
