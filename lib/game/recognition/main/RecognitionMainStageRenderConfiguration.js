/*
 * MultiTasking Cubes - Games
 * Copyright (C) 2017-2018 - Miguel Reboiro-Jato, Andrés Vieira Vázquez,
 * Adolfo Piñón Blanco, Hugo López-Fernández, Rosalía Laza Fidalgo,
 * Reyes Pavón Rial, Francisco Otero Lamas, Adrián Varela Pomar,
 * Carlos Spuch Calvar, and Tania Rivera Baltanás
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
import check from 'check-types';
import StageRenderConfiguration from '../../StageRenderConfiguration';

const DEFAULTS = Symbol();

export default class RecognitionMainStageRenderConfiguration extends StageRenderConfiguration {
    static get DEFAULTS() {
        if (!RecognitionMainStageRenderConfiguration[DEFAULTS]) {
            RecognitionMainStageRenderConfiguration[DEFAULTS] = {
            DICE_SCALE: -1,
            DICE_SCALE_SHOWN: -1
          };
    
          Object.freeze(RecognitionMainStageRenderConfiguration[DEFAULTS]);
        }
    
        return RecognitionMainStageRenderConfiguration[DEFAULTS];
      }

    constructor(
        diceScale = RecognitionMainStageRenderConfiguration.DEFAULTS.DICE_SCALE,
        diceScaleDocked = RecognitionMainStageRenderConfiguration.DEFAULTS.DICE_SCALE_DOCKED,
        diceScaleDragged = RecognitionMainStageRenderConfiguration.DEFAULTS.DICE_SCALE_DRAGGED,
        diceScaleShown = RecognitionMainStageRenderConfiguration.DEFAULTS.DICE_SCALE_SHOWN
    ) {
        super();

        this._diceScale = diceScale;
        this._diceScaleShown = diceScaleShown;
    }

    get diceScale() {
        return this._diceScale;
    }
  
    get diceScaleShown() {
      return this._diceScaleShown;
    }
}