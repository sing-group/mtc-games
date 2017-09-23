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

import VerbalFluencyGame from '../lib/game/verbal_fluency/VerbalFluencyGame';
import RecognitionGame from '../lib/game/recognition/RecognitionGame';
import VerbalFluencyGameConfig from '../lib/game/verbal_fluency/VerbalFluencyGameConfig';

function gameStartHandler(){
    console.log("The game has started");
}

function gameEndHandler(result){
    console.log("The game has ended. Results:");
    console.log(result);
}

function gameResetHandler(){
    console.log("User pressed reset");
}

function gameCheckHandler(result){
    console.log("User checked a word. Result: ");
    console.log(result);
}

let gameConfig = new VerbalFluencyGameConfig();
gameConfig.resX = 800;
gameConfig.resY = 600;
gameConfig.time = 20;
gameConfig.domId = 'targetDiv';
gameConfig.gameStartCallbackFunction = gameStartHandler;
gameConfig.gameEndCallbackFunction = gameEndHandler;
gameConfig.gameCheckCallbackFunction = gameCheckHandler;
gameConfig.gameResetCallbackFunction = gameResetHandler;

const game = new VerbalFluencyGame(gameConfig);
