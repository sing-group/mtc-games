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

export default class VerbalFluencyGameConfig extends GameConfig {

    static get DEFAULTS() {
        return {
            GAMERESETCALLBACKFUNCTION: null,
            GAMECHECKCALLBACKFUNCTION: null,
        };
    }

    constructor(
        time = GameConfig.DEFAULTS.TIME,
        timerVisible = GameConfig.DEFAULTS.TIMER_VISIBLE,
        resX = GameConfig.DEFAULTS.RESX,
        resY = GameConfig.DEFAULTS.RESY,
        domId = GameConfig.DEFAULTS.DOMID,
        gameStartCallbackFunction = GameConfig.DEFAULTS.GAMESTARTCALLBACKFUNCTION,
        gameEndCallbackFunction = GameConfig.DEFAULTS.GAMEENDCALLBACKFUNCTION,
        gameResetCallbackFunction = VerbalFluencyGameConfig.DEFAULTS.GAMERESETCALLBACKFUNCTION,
        gameCheckCallbackFunction = VerbalFluencyGameConfig.DEFAULTS.GAMECHECKCALLBACKFUNCTION
    ) {
        super(time = GameConfig.DEFAULTS.TIME,
            timerVisible = GameConfig.DEFAULTS.TIMER_VISIBLE,
            resX = GameConfig.DEFAULTS.RESX,
            resY = GameConfig.DEFAULTS.RESY,
            domId = GameConfig.DEFAULTS.DOMID,
            gameStartCallbackFunction = GameConfig.DEFAULTS.GAMESTARTCALLBACKFUNCTION,
            gameEndCallbackFunction = GameConfig.DEFAULTS.GAMEENDCALLBACKFUNCTION);
        this._gameResetCallbackFunction = gameResetCallbackFunction;
        this._gameCheckCallbackFunction = gameCheckCallbackFunction;
    }

    get gameResetCallbackFunction() {
        return this._gameResetCallbackFunction;
    }

    set gameResetCallbackFunction(gameResetCallbackFunction) {
        this._gameResetCallbackFunction = gameResetCallbackFunction;
    }

    get gameCheckCallbackFunction() {
        return this._gameCheckCallbackFunction;
    }

    set gameCheckCallbackFunction(gameCheckCallbackFunction) {
        this._gameCheckCallbackFunction = gameCheckCallbackFunction;
    }
}
