/*
 * MultiTasking Cubes - Games
 * Copyright (C) 2017-2019 - Miguel Reboiro-Jato, Germán Veras Gómez,
 * Andrés Vieira Vázquez, Adolfo Piñón Blanco, Hugo López-Fernández,
 * Rosalía Laza Fidalgo, Reyes Pavón Rial, Francisco Otero Lamas,
 * Adrián Varela Pomar, Carlos Spuch Calvar, and Tania Rivera Baltanás.
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

import StageRenderer from '../../stage/StageRenderer';

import startGameButtonImage from '../../../assets/image/game/scene/start/start-game-button-spritesheet.png';
import tutorialButtonImage from '../../../assets/image/game/scene/common/tutorial-button-spritesheet.png';
import StartStageRenderConfiguration from './StartStageRenderConfiguration';
import StartStageStatus from './StartStageStatus';
import check from 'check-types';
import I18NId from '../../../i18n/I18NId';

export default class StartStageRenderer extends StageRenderer {

  constructor(status = new StartStageStatus(), configuration = new StartStageRenderConfiguration()) {
    // check types
    super(configuration, status);

    check.assert.instance(status, StartStageStatus, 'status should be a StartStageStatus instance');
    check.assert.instance(configuration, StartStageRenderConfiguration, 'configuration should be a StartStageRenderConfiguration instance');
  }

  preload() {
    this.loadSpritesheet('start-game-button', startGameButtonImage, 300, 60);
    this.loadSpritesheet('tutorial-button', tutorialButtonImage, 300, 60);
  }

  _getParametersAsText() {
    const paramIds = this.game.metadata.parameterIds();

    let text = this.getText(I18NId.forGame('standard').param('time').name()) + ': ' + this.game.configuration.time;

    for (let paramId of paramIds) {
      try {
        text += '\n' + this.getText(this.getGameTextId().param(paramId).name()) + ': ' + this.game.configuration[paramId];
      } catch (e) {
        // Parameters without text are ignored.
      }
    }

    return text;
  }

  create() {
    // Background color
    this.game.stage.backgroundColor = this.configuration.colors.background;

    //  Title Text
    this.gameTitleText = this.game.add.text(
      this.world.width / 2,
      (this.world.height / 12) * 2,
      this.getText(this.getGameTextId().name()),
      this.configuration.textStyles.title
    );
    this.gameTitleText.anchor.setTo(0.5, 0.5);

    // Description Text
    const descriptionTextStyle = this.configuration.textStyles.description;
    descriptionTextStyle.wordWrapWidth = this.world.width * 0.9;
    this.gameDescriptionText = this.game.add.text(
      this.world.width / 2,
      (this.world.height / 12) * 4,
      this.getText(this.getGameTextId().description()),
      descriptionTextStyle
    );
    this.gameDescriptionText.anchor.setTo(0.5, 0.5);

    // Parameters text
    const parametersTextStyle = this.configuration.textStyles.parameters;
    parametersTextStyle.wordWrapWidth = this.world.width * 0.6;
    this.gameDescriptionText = this.game.add.text(
      this.world.width / 2,
      (this.world.height / 12) * 8,
      this._getParametersAsText(),
      parametersTextStyle
    );
    this.gameDescriptionText.anchor.setTo(0.5, 0.5);

    // Start button
    this.startGameButton = this.game.add.button(
      (this.world.width / 12) * 3,
      (this.world.height / 12) * 10,
      'start-game-button',
      this.onStartGame,
      this,
      2,
      1,
      0
    );
    this.startGameButton.anchor.setTo(0.5, 0.5);

    // Tutorial button
    this.tutorialButton = this.game.add.button(
      (this.world.width / 12) * 9,
      (this.world.height / 12) * 10,
      'tutorial-button',
      this.onStartTutorial,
      this,
      2,
      1,
      0
    );
    this.tutorialButton.anchor.setTo(0.5, 0.5);

  }

  update() {

  }

  onStartGame() {
    this.status.startGame();
  }

  onStartTutorial() {
    this.status.startTutorial();
  }
}
