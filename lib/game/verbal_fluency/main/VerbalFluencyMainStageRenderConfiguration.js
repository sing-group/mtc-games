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

export default class VerbalFluencyMainStageRenderConfiguration extends StageRenderConfiguration {
    static get DEFAULTS() {
        if (!VerbalFluencyMainStageRenderConfiguration[DEFAULTS]) {
            VerbalFluencyMainStageRenderConfiguration[DEFAULTS] = {
            DICE_SCALE: -1,
            DICE_SCALE_DOCKED: 0.25,
            DICE_SCALE_DRAGGED: -1,
          };
    
          Object.freeze(VerbalFluencyMainStageRenderConfiguration[DEFAULTS]);
        }
    
        return VerbalFluencyMainStageRenderConfiguration[DEFAULTS];
      }

    constructor(
        diceScale = VerbalFluencyMainStageRenderConfiguration.DEFAULTS.DICE_SCALE,
        diceScaleDocked = VerbalFluencyMainStageRenderConfiguration.DEFAULTS.DICE_SCALE_DOCKED,
        diceScaleDragged = VerbalFluencyMainStageRenderConfiguration.DEFAULTS.DICE_SCALE_DRAGGED,
        diceScaleShown = VerbalFluencyMainStageRenderConfiguration.DEFAULTS.DICE_SCALE_SHOWN
    ) {
        super();

        this._diceScale = diceScale;
        this._diceScaleDocked = diceScaleDocked;
        this._diceScaleDragged = diceScaleDragged;
        this._diceScaleShown = diceScaleShown;
    }

    get diceScale() {
        return this._diceScale;
    }

    get diceScaleDocked() {
        return this._diceScaleDocked;
    }
  
    get diceScaleDragged() {
      return this._diceScaleDragged;
    }
  
    get diceScaleShown() {
      return this._diceScaleShown;
    }
}