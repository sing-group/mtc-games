/**
 * MultiTasking Cubes - Games
 * Copyright (C) 2017 - Miguel Reboiro-Jato
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
import GameConfig from '../GameConfig.js';

export default class RecognitionGameConfig extends GameConfig {

    static get DEFAULTS() {
        return {
            TIMEPERELEMENT: 3,
            NUMBEROFELEMENTS: 2,
            NUMBEROFTRIES: 1,
            RESPONSEINTRODUCTION: RecognitionGameConfig.RESPONSETYPES.NORMAL
        };
    }

    static RESPONSETYPES = {
        NORMAL: 0,
        STERNBERG: 1
    }

    constructor(
        time = GameConfig.DEFAULTS.TIME,
        timerVisible = GameConfig.DEFAULTS.TIMER_VISIBLE,
        resX = GameConfig.DEFAULTS.RESX,
        resY = GameConfig.DEFAULTS.RESY,
        domId = GameConfig.DEFAULTS.DOMID,
        gameStartCallbackFunction = GameConfig.DEFAULTS.GAMESTARTCALLBACKFUNCTION,
        gameEndCallbackFunction = GameConfig.DEFAULTS.GAMEENDCALLBACKFUNCTION,
        locale = GameConfig.DEFAULTS.LOCALE,        
        timePerElement = RecognitionGameConfig.DEFAULTS.TIMEPERELEMENT,
        numberOfElements = RecognitionGameConfig.DEFAULTS.NUMBEROFELEMENTS,
        numberOfTries = RecognitionGameConfig.DEFAULTS.NUMBEROFTRIES,
        responseIntroduction = RecognitionGameConfig.DEFAULTS.RESPONSEINTRODUCTION
    ) {
        super(time = GameConfig.DEFAULTS.TIME,
            timerVisible = GameConfig.DEFAULTS.TIMER_VISIBLE,
            resX = GameConfig.DEFAULTS.RESX,
            resY = GameConfig.DEFAULTS.RESY,
            domId = GameConfig.DEFAULTS.DOMID,
            gameStartCallbackFunction = GameConfig.DEFAULTS.GAMESTARTCALLBACKFUNCTION,
            gameEndCallbackFunction = GameConfig.DEFAULTS.GAMEENDCALLBACKFUNCTION,
            locale = GameConfig.DEFAULTS.LOCALE);
            this._timePerElement = timePerElement,
            this._numberOfElements = numberOfElements,
            this._numberOfTries = numberOfTries
            this._responseIntroduction = responseIntroduction;
    }

    get numberOfElements(){
        return this._numberOfElements;
    }

    set numberOfElements(numberOfElements){
        this._numberOfElements = numberOfElements;
    }

    get timePerElement(){
        return this._timePerElement;
    }

    set timePerElement(timePerElement){
        this._timePerElement = timePerElement;
    }

    get numberOfTries(){
        return this._numberOfTries;
    }

    set numberOfTries(numberOfTries){
        this._numberOfTries = numberOfTries;
    }

    get responseIntroduction(){
        return this._responseIntroduction;
    }

    set responseIntroduction(responseIntroduction){
        this._responseIntroduction = responseIntroduction;
    }

}
