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
import {GameButtonStyle} from '../../../components/game_button';

const DEFAULT_COLORS = Symbol();
const DEFAULT_TEXT_STYLES = Symbol();

export class StartStageColors {
  constructor(
    background = StartStageColors.DEFAULTS.BACKGROUND
  ) {
    this._background = background;
  }

  static get DEFAULTS() {
    if (!StartStageColors[DEFAULT_COLORS]) {
      StartStageColors[DEFAULT_COLORS] = {
        BACKGROUND: '#a9d795'
      };

      Object.freeze(StartStageColors[DEFAULT_COLORS]);
    }

    return StartStageColors[DEFAULT_COLORS];
  }

  get background() {
    return this._background;
  }
}

export class StartStageTextStyles {
  constructor(
    title = StartStageTextStyles.DEFAULTS.TITLE,
    description = StartStageTextStyles.DEFAULTS.DESCRIPTION,
    parameters = StartStageTextStyles.DEFAULTS.PARAMETERS
  ) {
    this._title = title;
    this._description = description;
    this._parameters = parameters;
  }

  static get DEFAULTS() {
    if (!StartStageTextStyles[DEFAULT_TEXT_STYLES]) {
      StartStageTextStyles[DEFAULT_TEXT_STYLES] = {
        TITLE: {
          font: 'bold 32px Arial',
          fill: '#fafafa',
          boundsAlignH: 'center',
          boundsAlignV: 'middle'
        },
        DESCRIPTION: {
          font: 'bold 22px Arial',
          fill: '#fafafa',
          boundsAlignH: 'center',
          boundsAlignV: 'middle',
          wordWrap: true
        },
        PARAMETERS: {
          font: 'bold 20px Arial',
          fill: '#fafafa',
          boundsAlignH: 'center',
          boundsAlignV: 'middle',
          wordWrap: true
        }
      };

      Object.freeze(StartStageTextStyles[DEFAULT_TEXT_STYLES]);
    }

    return StartStageTextStyles[DEFAULT_TEXT_STYLES];
  }

  get title() {
    return Object.assign({}, this._title);
  }

  get description() {
    return Object.assign({}, this._description);
  }

  get parameters() {
    return Object.assign({}, this._parameters);
  }
}

export class StartStageButtonStyles {
  constructor() {
    this._selectedButton = new GameButtonStyle({
      font: 'bold 25px Arial'
    });
    this._unselectedButton = new GameButtonStyle({
      font: '25px Arial'
    });
  }

  get selectedButton() {
    return this._selectedButton;
  }

  get unselectedButton() {
    return this._unselectedButton;
  }
}

export class StartStageRenderConfiguration extends StageRenderConfiguration {
  constructor(
    colors = new StartStageColors(),
    textStyles = new StartStageTextStyles(),
    buttonStyles = new StartStageButtonStyles()
  ) {
    super();
    this._colors = colors;
    this._textStyles = textStyles;
    this._buttonStyles = buttonStyles;
  }

  get colors() {
    return Object.assign(new StartStageColors(), this._colors);
  }

  get textStyles() {
    return Object.assign(new StartStageTextStyles(), this._textStyles);
  }

  get buttonStyles() {
    return Object.assign(new StartStageButtonStyles(), this._buttonStyles);
  }
}
