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

export class PlaybackHearingMainStageColors {
  static get DEFAULTS() {
    if (!PlaybackHearingMainStageColors[DEFAULT_COLORS]) {
      PlaybackHearingMainStageColors[DEFAULT_COLORS] = {
        SCORE_SEPARATOR: '#FAFAFA',
        SCORE_GUESSED: '#00FF00',
        SCORE_FAILED: '#FF0000'
      };

      Object.freeze(PlaybackHearingMainStageColors[DEFAULT_COLORS]);
    }

    return PlaybackHearingMainStageColors[DEFAULT_COLORS];
  }

  constructor(
    scoreSeparator = PlaybackHearingMainStageColors.DEFAULTS.SCORE_SEPARATOR,
    scoreGuessed = PlaybackHearingMainStageColors.DEFAULTS.SCORE_GUESSED,
    scoreFailed = PlaybackHearingMainStageColors.DEFAULTS.SCORE_FAILED
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

export class PlaybackHearingMainStageTextStyles {
  static get DEFAULTS() {
    if (!PlaybackHearingMainStageTextStyles[DEFAULT_TEXT_STYLES]) {
      PlaybackHearingMainStageTextStyles[DEFAULT_TEXT_STYLES] = {
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

      Object.freeze(PlaybackHearingMainStageTextStyles[DEFAULT_TEXT_STYLES]);
    }

    return PlaybackHearingMainStageTextStyles[DEFAULT_TEXT_STYLES];
  }

  constructor(
    inGameTime = PlaybackHearingMainStageTextStyles.DEFAULTS.IN_GAME_TIME,
    score = PlaybackHearingMainStageTextStyles.DEFAULTS.SCORE
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

export class PlaybackHearingMainStagePixelOffsets {
  static get DEFAULTS() {
    if (!PlaybackHearingMainStagePixelOffsets[DEFAULT_PIXEL_OFFSETS]) {
      PlaybackHearingMainStagePixelOffsets[DEFAULT_PIXEL_OFFSETS] = {
        FRAME_X: 10,
        FRAME_Y: -10
      };

      Object.freeze(PlaybackHearingMainStagePixelOffsets[DEFAULT_PIXEL_OFFSETS]);
    }

    return PlaybackHearingMainStagePixelOffsets[DEFAULT_PIXEL_OFFSETS];
  }

  constructor(
    frameX = PlaybackHearingMainStagePixelOffsets.DEFAULTS.FRAME_X,
    frameY = PlaybackHearingMainStagePixelOffsets.DEFAULTS.FRAME_Y
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

export class PlaybackHearingMainStageDiceScales {
  static get DEFAULTS() {
    if (!PlaybackHearingMainStageDiceScales[DEFAULT_DICE_SCALES]) {
      PlaybackHearingMainStageDiceScales[DEFAULT_DICE_SCALES] = {
        NORMAL: 0.1,
        SHOWN: 0.40,
        RESULT: 0.065
      };

      Object.freeze(PlaybackHearingMainStageDiceScales[DEFAULT_DICE_SCALES]);
    }

    return PlaybackHearingMainStageDiceScales[DEFAULT_DICE_SCALES];
  }

  constructor(
    normal = PlaybackHearingMainStageDiceScales.DEFAULTS.NORMAL,
    shown = PlaybackHearingMainStageDiceScales.DEFAULTS.SHOWN,
    result = PlaybackHearingMainStageDiceScales.DEFAULTS.RESULT
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

export class PlaybackHearingMainStageRenderConfiguration extends StageRenderConfiguration {
  constructor(
    colors = new PlaybackHearingMainStageColors(),
    textStyles = new PlaybackHearingMainStageTextStyles(),
    diceScales = new PlaybackHearingMainStageDiceScales(),
    pixelOffsets = new PlaybackHearingMainStagePixelOffsets()
  ) {
    super();

    this._colors = colors;
    this._textStyles = textStyles;
    this._diceScales = diceScales;
    this._pixelOffsets = pixelOffsets;
  }

  get colors() {
    return Object.assign(new PlaybackHearingMainStageColors(), this._colors);
  }

  get textStyles() {
    return Object.assign(new PlaybackHearingMainStageTextStyles(), this._textStyles);
  }

  get diceScales() {
    return Object.assign(new PlaybackHearingMainStageDiceScales(), this._diceScales);
  }

  get pixelOffsets() {
    return Object.assign(new PlaybackHearingMainStagePixelOffsets(), this._pixelOffsets);
  }
}
