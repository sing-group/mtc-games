/**
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
import StandardGameMetadata from "../metadata/StandardGameMetadata";

const TEXT_STYLES = Symbol();
const COLORS = Symbol();

export default class RecognitionDesign {

    static get TEXT_STYLES() {
        if (!RecognitionDesign[TEXT_STYLES]) {
            RecognitionDesign[TEXT_STYLES] = Object.assign({
                TITLE: {
                    font: "bold 32px Arial",
                    fill: "#fff",
                    boundsAlignH: "center",
                    boundsAlignV: "middle"
                },
                DESCRIPTION: {
                    font: "bold 24px Arial",
                    fill: "#eee",
                    boundsAlignH: "center",
                    boundsAlignV: "middle",
                    wordWrap: true
                },
                TIME: {
                    font: "bold 24px Arial",
                    fill: "#eee",
                    boundsAlignH: "left",
                    boundsAlignV: "middle"
                },
                IN_GAME_TIME: {
                    font: "24px Arial",
                    fill: "#EEEEEE",
                    align: "left"
                },
                SCORE: {
                    font: "24px Arial",
                    fill: "#EEEEEE",
                    align: "left"
                },
                RESULTS: {
                    font: "bold 24px Arial",
                    fill: "#eee",
                    boundsAlignH: "left",
                    boundsAlignV: "middle"
                }
            }, StandardGameMetadata.TEXT_STYLES);

            Object.freeze(RecognitionDesign[TEXT_STYLES]);
        }

        return RecognitionDesign[TEXT_STYLES];
    }

    static get COLORS() {
        if (!RecognitionDesign[COLORS]) {
            RecognitionDesign[COLORS] = Object.assign({
                START_BACKGROUND: "#4488AA",
                SCORE_SEPARATOR: "#FFFFFF",
                SCORE_GUESSED: "#00FF00",
                SCORE_FAILED: "#FF0000",
            }, StandardGameMetadata.COLORS);

            Object.freeze(RecognitionDesign[COLORS]);
        }

        return RecognitionDesign[COLORS];
    }
}