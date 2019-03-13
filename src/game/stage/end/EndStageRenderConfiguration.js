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
import {StageRenderConfiguration} from '../StageRenderConfiguration';

const DEFAULT_COLORS = Symbol();
const DEFAULT_TEXT_STYLES = Symbol();

export class EndStageColors {
  constructor(
    background = EndStageColors.DEFAULTS.BACKGROUND
  ) {
    this._background = background;
  }

  static get DEFAULTS() {
    if (!EndStageColors[DEFAULT_COLORS]) {
      EndStageColors[DEFAULT_COLORS] = {
        BACKGROUND: '#a9d795'
      };

      Object.freeze(EndStageColors[DEFAULT_COLORS]);
    }

    return EndStageColors[DEFAULT_COLORS];
  }

  get background() {
    return this._background;
  }
}

export class EndStageTextStyles {
  constructor(
    title = EndStageTextStyles.DEFAULTS.TITLE,
    description = EndStageTextStyles.DEFAULTS.DESCRIPTION,
    results = EndStageTextStyles.DEFAULTS.RESULTS
  ) {
    this._title = title;
    this._description = description;
    this._results = results;
  }

  static get DEFAULTS() {
    if (!EndStageTextStyles[DEFAULT_TEXT_STYLES]) {
      EndStageTextStyles[DEFAULT_TEXT_STYLES] = {
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
        RESULTS: {
          font: 'bold 24px Arial',
          fill: '#fafafa',
          boundsAlignH: 'left',
          boundsAlignV: 'middle'
        }
      };

      Object.freeze(EndStageTextStyles[DEFAULT_TEXT_STYLES]);
    }

    return EndStageTextStyles[DEFAULT_TEXT_STYLES];
  }

  get title() {
    return Object.assign({}, this._title);
  }

  get description() {
    return Object.assign({}, this._description);
  }

  get results() {
    return Object.assign({}, this._results);
  }
}

export class EndStageRenderConfiguration extends StageRenderConfiguration {
  constructor(
    colors = new EndStageColors(),
    textStyles = new EndStageTextStyles()
  ) {
    super();
    this._colors = colors;
    this._textStyles = textStyles;
  }

  get colors() {
    return Object.assign(new EndStageColors(), this._colors);
  }

  get textStyles() {
    return Object.assign(new EndStageTextStyles(), this._textStyles);
  }
}
