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

export class AssociatedPairsMainStageColors {
  constructor(
    scoreSeparator = AssociatedPairsMainStageColors.DEFAULTS.SCORE_SEPARATOR,
    scoreGuessed = AssociatedPairsMainStageColors.DEFAULTS.SCORE_GUESSED,
    scoreFailed = AssociatedPairsMainStageColors.DEFAULTS.SCORE_FAILED,
    inGameTime = AssociatedPairsMainStageColors.DEFAULTS.IN_GAME_TIME
  ) {
    this._scoreSeparator = scoreSeparator;
    this._scoreGuessed = scoreGuessed;
    this._scoreFailed = scoreFailed;
    this._inGameTime = inGameTime;
  }

  static get DEFAULTS() {
    if (!AssociatedPairsMainStageColors[DEFAULT_COLORS]) {
      AssociatedPairsMainStageColors[DEFAULT_COLORS] = {
        SCORE_SEPARATOR: '#FAFAFA',
        SCORE_GUESSED: '#00FF00',
        SCORE_FAILED: '#FF0000',
        IN_GAME_TIME: '#FAFAFA'
      };

      Object.freeze(AssociatedPairsMainStageColors[DEFAULT_COLORS]);
    }

    return AssociatedPairsMainStageColors[DEFAULT_COLORS];
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

export class AssociatedPairsMainStageTextStyles {
  static get DEFAULTS() {
    if (!AssociatedPairsMainStageTextStyles[DEFAULT_TEXT_STYLES]) {
      AssociatedPairsMainStageTextStyles[DEFAULT_TEXT_STYLES] = {
        IN_GAME_TIME: new GameTimeStyle({
          font: '24px Arial',
          fill: AssociatedPairsMainStageColors.DEFAULTS.IN_GAME_TIME,
          stroke: '#00000030',
          strokeThickness: 2
        }),
        SCORE_GUESSED: new GameScoreStyle({
          font: '24px Arial',
          fill: AssociatedPairsMainStageColors.DEFAULTS.SCORE_GUESSED,
          stroke: '#00000030',
          strokeThickness: 2
        }),
        SCORE_FAILED: new GameScoreStyle({
          font: '24px Arial',
          fill: AssociatedPairsMainStageColors.DEFAULTS.SCORE_FAILED,
          stroke: '#00000030',
          strokeThickness: 2
        })
      };

      Object.freeze(AssociatedPairsMainStageTextStyles[DEFAULT_TEXT_STYLES]);
    }

    return AssociatedPairsMainStageTextStyles[DEFAULT_TEXT_STYLES];
  }

  constructor(
    inGameTime = AssociatedPairsMainStageTextStyles.DEFAULTS.IN_GAME_TIME,
    scoreGuessed = AssociatedPairsMainStageTextStyles.DEFAULTS.SCORE_GUESSED,
    scoreFailed = AssociatedPairsMainStageTextStyles.DEFAULTS.SCORE_FAILED
  ) {
    this._inGameTime = inGameTime;
    this._scoreGuessed = scoreGuessed;
    this._scoreFailed = scoreFailed;
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

}

export class AssociatedPairsMainStagePixelOffsets {
  constructor(
    frameX = AssociatedPairsMainStagePixelOffsets.DEFAULTS.FRAME_X,
    frameY = AssociatedPairsMainStagePixelOffsets.DEFAULTS.FRAME_Y
  ) {
    this._frameX = frameX;
    this._frameY = frameY;
  }

  static get DEFAULTS() {
    if (!AssociatedPairsMainStagePixelOffsets[DEFAULT_PIXEL_OFFSETS]) {
      AssociatedPairsMainStagePixelOffsets[DEFAULT_PIXEL_OFFSETS] = {
        FRAME_X: 10,
        FRAME_Y: -10
      };

      Object.freeze(AssociatedPairsMainStagePixelOffsets[DEFAULT_PIXEL_OFFSETS]);
    }

    return AssociatedPairsMainStagePixelOffsets[DEFAULT_PIXEL_OFFSETS];
  }

  get frameX() {
    return this._frameX;
  }

  get frameY() {
    return this._frameY;
  }

}

export class AssociatedPairsMainStageDiceScales {
  constructor(
    normal = AssociatedPairsMainStageDiceScales.DEFAULTS.NORMAL,
    shown = AssociatedPairsMainStageDiceScales.DEFAULTS.SHOWN,
    result = AssociatedPairsMainStageDiceScales.DEFAULTS.RESULT
  ) {
    this._normal = normal;
    this._shown = shown;
    this._result = result;
  }

  static get DEFAULTS() {
    if (!AssociatedPairsMainStageDiceScales[DEFAULT_DICE_SCALES]) {
      AssociatedPairsMainStageDiceScales[DEFAULT_DICE_SCALES] = {
        NORMAL: 0.1,
        SHOWN: 0.40,
        RESULT: 0.1
      };

      Object.freeze(AssociatedPairsMainStageDiceScales[DEFAULT_DICE_SCALES]);
    }

    return AssociatedPairsMainStageDiceScales[DEFAULT_DICE_SCALES];
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

export class AssociatedPairsMainStageRenderConfiguration extends StageRenderConfiguration {
  constructor(
    colors = new AssociatedPairsMainStageColors(),
    textStyles = new AssociatedPairsMainStageTextStyles(),
    diceScales = new AssociatedPairsMainStageDiceScales(),
    pixelOffsets = new AssociatedPairsMainStagePixelOffsets()
  ) {
    super();

    this._colors = colors;
    this._textStyles = textStyles;
    this._diceScales = diceScales;
    this._pixelOffsets = pixelOffsets;
  }

  get colors() {
    return Object.assign(new AssociatedPairsMainStageColors(), this._colors);
  }

  get textStyles() {
    return Object.assign(new AssociatedPairsMainStageTextStyles(), this._textStyles);
  }

  get diceScales() {
    return Object.assign(new AssociatedPairsMainStageDiceScales(), this._diceScales);
  }

  get pixelOffsets() {
    return Object.assign(new AssociatedPairsMainStagePixelOffsets(), this._pixelOffsets);
  }
}
