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
import {GameButtonStyle, GameScoreStyle, GameTimeStyle} from '../../../components';

const DEFAULT_COLORS = Symbol();
const DEFAULT_TEXT_STYLES = Symbol();
const DEFAULT_DICE_SCALES = Symbol();
const DEFAULT_PIXEL_OFFSETS = Symbol();

export class VerbalFluencyMainStageColors {
  constructor(
    scoreSeparator = VerbalFluencyMainStageColors.DEFAULTS.SCORE_SEPARATOR,
    scoreSuccess = VerbalFluencyMainStageColors.DEFAULTS.SCORE_SUCCESS,
    scoreIntrusion = VerbalFluencyMainStageColors.DEFAULTS.SCORE_INTRUSION,
    scoreRepetition = VerbalFluencyMainStageColors.DEFAULTS.SCORE_REPETITION,
    inGameTime = VerbalFluencyMainStageColors.DEFAULTS.IN_GAME_TIME
  ) {
    this._scoreSeparator = scoreSeparator;
    this._scoreSuccess = scoreSuccess;
    this._scoreIntrusion = scoreIntrusion;
    this._scoreRepetition = scoreRepetition;
    this._inGameTime = inGameTime;
  }

  static get DEFAULTS() {
    if (!VerbalFluencyMainStageColors[DEFAULT_COLORS]) {
      VerbalFluencyMainStageColors[DEFAULT_COLORS] = {
        SCORE_SEPARATOR: '#FAFAFA',
        SCORE_SUCCESS: '#00FF00',
        SCORE_INTRUSION: '#FF0000',
        SCORE_REPETITION: '#FFFF00',
        IN_GAME_TIME: '#FAFAFA'
      };

      Object.freeze(VerbalFluencyMainStageColors[DEFAULT_COLORS]);
    }

    return VerbalFluencyMainStageColors[DEFAULT_COLORS];
  }

  get scoreSeparator() {
    return this._scoreSeparator;
  }

  get scoreSuccess() {
    return this._scoreSuccess;
  }

  get scoreIntrusion() {
    return this._scoreIntrusion;
  }

  get scoreRepetition() {
    return this._scoreRepetition;
  }

  get inGameTime() {
    return this._inGameTime;
  }
}

export class VerbalFluencyMainStageTextStyles {
  constructor(
    inGameTime = VerbalFluencyMainStageTextStyles.DEFAULTS.IN_GAME_TIME,
    scoreGuessed = VerbalFluencyMainStageTextStyles.DEFAULTS.SCORE_GUESSED,
    scoreFailed = VerbalFluencyMainStageTextStyles.DEFAULTS.SCORE_FAILED,
    scoreRepetition = VerbalFluencyMainStageTextStyles.DEFAULTS.SCORE_REPETITION
  ) {
    this._inGameTime = inGameTime;
    this._scoreGuessed = scoreGuessed;
    this._scoreFailed = scoreFailed;
    this._scoreRepetition = scoreRepetition;
  }

  static get DEFAULTS() {
    if (!VerbalFluencyMainStageTextStyles[DEFAULT_TEXT_STYLES]) {
      VerbalFluencyMainStageTextStyles[DEFAULT_TEXT_STYLES] = {
        IN_GAME_TIME: new GameTimeStyle({
          font: '24px Arial',
          fill: VerbalFluencyMainStageColors.DEFAULTS.IN_GAME_TIME,
          stroke: '#00000030',
          strokeThickness: 2
        }),
        SCORE_GUESSED: new GameScoreStyle({
          font: '24px Arial',
          fill: VerbalFluencyMainStageColors.DEFAULTS.SCORE_SUCCESS,
          stroke: '#00000030',
          strokeThickness: 2
        }),
        SCORE_FAILED: new GameScoreStyle({
          font: '24px Arial',
          fill: VerbalFluencyMainStageColors.DEFAULTS.SCORE_INTRUSION,
          stroke: '#00000030',
          strokeThickness: 2
        }),
        SCORE_REPETITION: new GameScoreStyle({
          font: '24px Arial',
          fill: VerbalFluencyMainStageColors.DEFAULTS.SCORE_REPETITION,
          stroke: '#00000030',
          strokeThickness: 2
        })
      };

      Object.freeze(VerbalFluencyMainStageTextStyles[DEFAULT_TEXT_STYLES]);
    }

    return VerbalFluencyMainStageTextStyles[DEFAULT_TEXT_STYLES];
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

  get scoreRepetition() {
    return this._scoreRepetition;
  }
}

export class VerbalFluencyMainStageDiceScales {
  constructor(
    normal = VerbalFluencyMainStageDiceScales.DEFAULTS.NORMAL,
    docked = VerbalFluencyMainStageDiceScales.DEFAULTS.DOCKED,
    dragged = VerbalFluencyMainStageDiceScales.DEFAULTS.DRAGGED
  ) {
    this._normal = normal;
    this._docked = docked;
    this._dragged = dragged;
  }

  static get DEFAULTS() {
    if (!VerbalFluencyMainStageDiceScales[DEFAULT_DICE_SCALES]) {
      VerbalFluencyMainStageDiceScales[DEFAULT_DICE_SCALES] = {
        NORMAL: 0.1,
        DOCKED: 0.065,
        DRAGGED: 0.1
      };

      Object.freeze(VerbalFluencyMainStageDiceScales[DEFAULT_DICE_SCALES]);
    }

    return VerbalFluencyMainStageDiceScales[DEFAULT_DICE_SCALES];
  }

  get normal() {
    return this._normal;
  }

  get docked() {
    return this._docked;
  }

  get dragged() {
    return this._dragged;
  }

}

export class VerbalFluencyMainStagePixelOffsets {
  constructor(
    checkButtonHorizontal = VerbalFluencyMainStagePixelOffsets.DEFAULTS.CHECK_BUTTON_HORIZONTAL,
    checkButtonVertical = VerbalFluencyMainStagePixelOffsets.DEFAULTS.CHECK_BUTTON_VERTICAL,
    resetButtonHorizontal = VerbalFluencyMainStagePixelOffsets.DEFAULTS.RESET_BUTTON_HORIZONTAL,
    resetButtonVertical = VerbalFluencyMainStagePixelOffsets.DEFAULTS.RESET_BUTTON_VERTICAL,
    frameX = VerbalFluencyMainStagePixelOffsets.DEFAULTS.FRAME_X,
    frameY = VerbalFluencyMainStagePixelOffsets.DEFAULTS.FRAME_Y
  ) {
    this._checkButtonHorizontal = checkButtonHorizontal;
    this._checkButtonVertical = checkButtonVertical;
    this._resetButtonHorizontal = resetButtonHorizontal;
    this._resetButtonVertical = resetButtonVertical;
    this._frameX = frameX;
    this._frameY = frameY;
  }

  static get DEFAULTS() {
    if (!VerbalFluencyMainStagePixelOffsets[DEFAULT_PIXEL_OFFSETS]) {
      VerbalFluencyMainStagePixelOffsets[DEFAULT_PIXEL_OFFSETS] = {
        CHECK_BUTTON_HORIZONTAL: 320,
        CHECK_BUTTON_VERTICAL: 32,
        RESET_BUTTON_HORIZONTAL: 320,
        RESET_BUTTON_VERTICAL: -10,
        FRAME_X: 10,
        FRAME_Y: -10
      };

      Object.freeze(VerbalFluencyMainStagePixelOffsets[DEFAULT_PIXEL_OFFSETS]);
    }

    return VerbalFluencyMainStagePixelOffsets[DEFAULT_PIXEL_OFFSETS];
  }

  get checkButtonHorizontal() {
    return this._checkButtonHorizontal;
  }

  get checkButtonVertical() {
    return this._checkButtonVertical;
  }

  get resetButtonHorizontal() {
    return this._resetButtonHorizontal;
  }

  get resetButtonVertical() {
    return this._resetButtonVertical;
  }

  get frameX() {
    return this._frameX;
  }

  get frameY() {
    return this._frameY;
  }

}

export class VerbalFluencyMainStageButtonStyles {
  constructor() {
    this._selectedButton = new GameButtonStyle({
      textColor: '#fafafa',
      strokeColor: 0xfafafa,
      font: 'bold 20px Arial'
    });
    this._unselectedButton = new GameButtonStyle({
      textColor: '#42633c',
      strokeColor: 0x42633c,
      font: '20px Arial'
    });
  }

  get selectedButton() {
    return this._selectedButton;
  }

  get unselectedButton() {
    return this._unselectedButton;
  }
}

export class VerbalFluencyMainStageRenderConfiguration extends StageRenderConfiguration {
  constructor(
    colors = new VerbalFluencyMainStageColors(),
    textStyles = new VerbalFluencyMainStageTextStyles(),
    buttonStyles = new VerbalFluencyMainStageButtonStyles(),
    diceScales = new VerbalFluencyMainStageDiceScales(),
    pixelOffsets = new VerbalFluencyMainStagePixelOffsets()
  ) {
    super();

    this._colors = colors;
    this._textStyles = textStyles;
    this._buttonStyles = buttonStyles;
    this._diceScales = diceScales;
    this._pixelOffsets = pixelOffsets;
  }

  get colors() {
    return Object.assign(new VerbalFluencyMainStageColors(), this._colors);
  }

  get textStyles() {
    return Object.assign(new VerbalFluencyMainStageTextStyles(), this._textStyles);
  }

  get buttonStyles() {
    return Object.assign(new VerbalFluencyMainStageButtonStyles(), this._buttonStyles);
  }

  get diceScales() {
    return Object.assign(new VerbalFluencyMainStageDiceScales(), this._diceScales);
  }

  get pixelOffsets() {
    return Object.assign(new VerbalFluencyMainStagePixelOffsets(), this._pixelOffsets);
  }

}
