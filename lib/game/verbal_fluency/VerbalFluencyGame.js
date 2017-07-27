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
import Game from '../Game';
import VerbalFluencyGameMetadata from './VerbalFluencyGameMetadata';
import Phaser from 'phaser/build/custom/phaser-split';

export default class VerbalFluencyGame extends Game {
  constructor(gameConfig) {
    super(new VerbalFluencyGameMetadata(), gameConfig);
    this.state.add('GameState', GameState, true);
  }
}

class GameState extends Phaser.State {

  preload() {
    console.log('preload:');
  }

  create() {
    console.log('create:');
    this.game.timeText = this.game.add.text(
      15,
      15,
      "Remaining time: " + this.game.gameConfig.time,
      {
        font: "24px Arial",
        fill: "#FFFFFF",
        align: "center"
      }
    );
  }

  update() {
    this.game.timeText.setText("Remaining time: " + (this.game.gameConfig.time - this.game.elapsedTime()));
  }

}


