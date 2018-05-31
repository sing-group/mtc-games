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
import GameTaskType from '../metadata/GameTaskType';
import VerbalFluencyGameCallback from "./VerbalFluencyGameCallback";
import StandardGameMetadata from "../metadata/StandardGameMetadata";
import BooleanParameter from "../metadata/parameter/basic/BooleanParameter";
import Parameter from "../metadata/parameter/Parameter";
import RecognitionGameMetadata from "../recognition/RecognitionGameMetadata";
import MtcDiceFace from "../../dice/MtcDiceFace";

const DEFAULTS = Symbol();

export default class VerbalFluencyGameMetadata extends StandardGameMetadata {
    static get ID() {
        return 'verbalFluency';
    }

    static get DEFAULTS() {
        if (!VerbalFluencyGameMetadata[DEFAULTS]) {
            VerbalFluencyGameMetadata[DEFAULTS] = Object.assign({
                USE_DRAG: false
            }, StandardGameMetadata.DEFAULTS);

            Object.freeze(VerbalFluencyGameMetadata[DEFAULTS]);
        }

        return VerbalFluencyGameMetadata[DEFAULTS];
    }

    constructor() {
        super(VerbalFluencyGameMetadata.ID, [GameTaskType.TYPES.VERBAL_FLUENCY], [
            Parameter.build(BooleanParameter, 'standard', 'useDrag', VerbalFluencyGameMetadata.DEFAULTS.USE_DRAG)
        ], VerbalFluencyGameCallback);
    }
}
