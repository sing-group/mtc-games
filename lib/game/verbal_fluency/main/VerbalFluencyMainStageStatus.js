/*
 * MultiTasking Cubes - Games
 * Copyright (C) 2017-2019 - Miguel Reboiro-Jato, Andrés Vieira Vázquez,
 * Adolfo Piñón Blanco, Hugo López-Fernández, Rosalía Laza Fidalgo,
 *  Reyes Pavón Rial, Francisco Otero Lamas, Adrián Varela Pomar,
 *  Carlos Spuch Calvar, and Tania Rivera Baltanás
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

import check from 'check-types';
import StageStatus from '../../StageStatus';
import VerbalFluencyMainCallback from './VerbalFluencyMainCallback';

export default class VerbalFluencyMainStageStatus extends StageStatus {

    constructor(gameStatus, callbacks) {
        super(gameStatus);

        check.assert.instance(callbacks, VerbalFluencyMainCallback);

        this._callbacks = callbacks;

        this._currentWord = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];

        this._guessedWords = [];
        this._failedWords = [];
        this._repeatedWords = [];
    }

    get secondsElapsed() {
        return (Date.now() - this._startTimestamp) / 1000;
    }

    get secondsLeft() {
        return this.secondsTotal - this.secondsElapsed;
    }

    get secondsTotal() {
        return this.gameStatus.configuration.time;
    }

    get currentWord() {
        return this._currentWord;
    }

    set currentWord(value) {
        this._currentWord = value;
    }

    start() {
        this._startTimestamp = Date.now();

        setTimeout(
            () => this._callbacks.onGameFinished({
                totalAttempts: this.countTotalWords(),
                guessedWords: this._guessedWords,
                failedWords: this._failedWords,
                repeatedWords: this._repeatedWords
            }),
            this.secondsTotal * 1000
        );

        this._callbacks.onGameStarted();
    }

    realWord() {
        return this.currentWord.join('').replace(/\s+/g, '').toLowerCase();
    }

    isValidWord(word) {
        return this.gameStatus.validWords.includes(word);
    }

    isRepeatedWord(word) {
        return this.isValidWord(word) && this._guessedWords.includes(word);
    }

    checkWord() {
        const word = this.realWord();

        const checkStatus = {
            word: word,
            timeLeft: this.secondsLeft,
            valid: this.isValidWord(word),
            repeated: this.isRepeatedWord(word)
        };

        if (checkStatus.valid) {
            if (checkStatus.repeated) {
                this._repeatedWords.push(word);
            } else {
                this._guessedWords.push(word);
            }
        } else {
            this._failedWords.push(word);
        }

        this._callbacks.onWordChecked(checkStatus);
        
        this._currentWord = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    }

    resetWord() {
        this._currentWord = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];

        this._callbacks.onWordReset();
    }

    clearLetter(index) {
        this.currentWord[index] = ' ';
    }

    putLetter(index, letter) {
        this.currentWord[index] = letter;
    }

    isRunning() {
        return this.secondsElapsed < this.secondsTotal;
    }

    countGuessedWords() {
        return this._guessedWords.length;
    }

    countFailedWords() {
        return this._failedWords.length;
    }

    countRepeatedWords() {
        return this._repeatedWords.length;
    }

    countTotalWords() {
        return this.countGuessedWords() + this.countFailedWords() + this.countRepeatedWords();
    }

}