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

import GameStatus from '../GameStatus.js';
import VerbalFluencyDictionary from './VerbalFluencyDictionary.js';

export default class VerbalFluencyStatus extends GameStatus {

    constructor(genericStatus) {
        super(genericStatus.config);
        this._gameMode = GameStatus.GAME_MODES.NORMAL;
        this._diceScale = 0.25;
        this._diceScaleDragged = 0.35;
        this._currentWord = new Array(' ', ' ', ' ', ' ', ' ', ' ', ' ');
        this._gameRunning = false;
        this._correctWords = new Array();
        this._guessAttempts = 0;
        this._repeatedWords = 0;

        switch (this.config.locale) {
            case "es_ES":
                this._possible_words = VerbalFluencyDictionary.es_ES;
                break;
            case "en_US":
                this._possible_words = VerbalFluencyDictionary.en_US;
                break;
            case "gl_ES":
                this._possible_words = VerbalFluencyDictionary.gl_ES;
                break;
            default:
                this._possible_words = VerbalFluencyDictionary.en_US;
        }
    }

    get possibleWords() {
        return this._possible_words;
    }

    set possibleWords(value) {
        this._possible_words = value;
    }

    get gameMode() {
        return this._gameMode;
    }

    set gameMode(value) {
        this._gameMode = value;
    }

    get diceScale() {
        return this._diceScale;
    }

    set diceScale(value) {
        this._diceScale = value;
    }

    get diceScaleDragged() {
        return this._diceScaleDragged;
    }

    set diceScaleDragged(value) {
        this._diceScaleDragged = value;
    }

    get currentWord() {
        return this._currentWord;
    }

    set currentWord(value) {
        this._currentWord = value;
    }

    get gameRunning() {
        return this._gameRunning;
    }

    set gameRunning(value) {
        this._gameRunning = value;
    }

    get correctWords() {
        return this._correctWords;
    }

    set correctWords(value) {
        this._correctWords = value;
    }

    get guessAttempts() {
        return this._guessAttempts;
    }

    set guessAttempts(value) {
        this._guessAttempts = value;
    }

    get repeatedWords() {
        return this._repeatedWords;
    }

    set repeatedWords(value) {
        this._repeatedWords = value;
    }

}