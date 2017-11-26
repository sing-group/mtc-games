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
import VerbalFluencyGameConfig from '../lib/game/verbal_fluency/VerbalFluencyGameConfig';
import RecognitionGame from '../lib/game/recognition/RecognitionGame';
import RecognitionGameConfig from '../lib/game/recognition/RecognitionGameConfig';

// Common functions
function gameStartHandler(){
    console.log("The game has started");
}

function gameEndHandler(result){
    console.log("The game has ended. Results:");
    console.log(result);
}




// region Test VerbalFluencyGame

function gameResetHandler(){
    console.log("User pressed reset");
}

function gameCheckHandler(result){
    console.log("User checked a word. Result: ");
    console.log(result);
}

let gameConfig1 = new VerbalFluencyGameConfig();
gameConfig1.resX = 800;
gameConfig1.resY = 600;
gameConfig1.time = 20;
gameConfig1.domId = 'div1';
gameConfig1.locale = 'en_US';
gameConfig1.gameStartCallbackFunction = gameStartHandler;
gameConfig1.gameEndCallbackFunction = gameEndHandler;
gameConfig1.gameCheckCallbackFunction = gameCheckHandler;
gameConfig1.gameResetCallbackFunction = gameResetHandler;

const game1 = new VerbalFluencyGame(gameConfig1);

// endregion

// region Test RecognitionGame

let gameConfig2 = new RecognitionGameConfig();
gameConfig2.resX = 800;
gameConfig2.resY = 600;
gameConfig2.time = 20;
gameConfig2.domId = 'div2';
gameConfig2.locale = 'en_US';
gameConfig2.timePerElement = 3,
gameConfig2.numberOfElements = 2,
gameConfig2.numberOfTries = 2,
gameConfig2.responseIntroduction = RecognitionGameConfig.RESPONSETYPES.NORMAL;
gameConfig2.gameStartCallbackFunction = gameStartHandler;
gameConfig2.gameEndCallbackFunction = gameEndHandler;

const game2 = new RecognitionGame(gameConfig2);

// endregion