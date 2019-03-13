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

const TEXT_STYLES = Symbol();
const COLORS = Symbol();
const PIXEL_OFFSETS = Symbol();

export class GameDesign {

  static get TEXT_STYLES() {
    if (!GameDesign[TEXT_STYLES]) {
      GameDesign[TEXT_STYLES] = {
        TITLE: {
          font: 'bold 32px Arial',
          fill: '#fafafa',
          boundsAlignH: 'center',
          boundsAlignV: 'middle'
        },
        DESCRIPTION: {
          font: 'bold 24px Arial',
          fill: '#fafafa',
          boundsAlignH: 'center',
          boundsAlignV: 'middle',
          wordWrap: true
        },
        TIME: {
          font: 'bold 24px Arial',
          fill: '#fafafa',
          boundsAlignH: 'left',
          boundsAlignV: 'middle'
        },
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
        },
        RESULTS: {
          font: 'bold 24px Arial',
          fill: '#fafafa',
          boundsAlignH: 'left',
          boundsAlignV: 'middle'
        }
      };

      Object.freeze(GameDesign[TEXT_STYLES]);
    }

    return GameDesign[TEXT_STYLES];
  }

  static get COLORS() {
    if (!GameDesign[COLORS]) {
      GameDesign[COLORS] = {
        START_BACKGROUND: '#a9d795',
        SCORE_SEPARATOR: '#fafafa',
        SCORE_SUCCESS: '#00FF00',
        SCORE_INTRUSION: '#FF0000',
        SCORE_REPETITION: '#FFFF00'
      };

      Object.freeze(GameDesign[COLORS]);
    }

    return GameDesign[COLORS];
  }

  static get PIXEL_OFFSETS() {
    if (!GameDesign[PIXEL_OFFSETS]) {
      GameDesign[PIXEL_OFFSETS] = {
        RESET_BUTTON_H_OFFSET: 320,
        RESET_BUTTON_V_OFFSET: -10,
        CHECK_BUTTON_H_OFFSET: 320,
        CHECK_BUTTON_V_OFFSET: 32,
        FRAME_X_OFFSET: 10,
        FRAME_Y_OFFSET: -10
      };

      Object.freeze(GameDesign[PIXEL_OFFSETS]);
    }

    return GameDesign[PIXEL_OFFSETS];
  }

}
