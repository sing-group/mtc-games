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

// function gameResetHandler(){
//     console.log("User pressed reset");
// }

// function gameCheckHandler(result){
//     console.log("User checked a word. Result: ");
//     console.log(result);
// }

// let gameConfig = new VerbalFluencyGameConfig();
// gameConfig.resX = 800;
// gameConfig.resY = 600;
// gameConfig.time = 20;
// gameConfig.domId = 'targetDiv';
// gameConfig.gameStartCallbackFunction = gameStartHandler;
// gameConfig.gameEndCallbackFunction = gameEndHandler;
// gameConfig.gameCheckCallbackFunction = gameCheckHandler;
// gameConfig.gameResetCallbackFunction = gameResetHandler;

// const game = new VerbalFluencyGame(gameConfig);
// endregion

// region Test RecognitionGame

let gameConfig = new RecognitionGameConfig();
gameConfig.resX = 800;
gameConfig.resY = 600;
gameConfig.time = 20;
gameConfig.domId = 'targetDiv';
gameConfig.timePerElement = 3,
gameConfig.numberOfElements = 2,
gameConfig.numberOfTries = 1,
gameConfig.responseIntroduction = RecognitionGameConfig.RESPONSETYPES.NORMAL;
gameConfig.gameStartCallbackFunction = gameStartHandler;
gameConfig.gameEndCallbackFunction = gameEndHandler;

const game = new RecognitionGame(gameConfig);

// endregion