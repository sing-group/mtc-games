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

import check from 'check-types';

import {StartStageRenderConfiguration} from './StartStageRenderConfiguration';
import {StartStageStatus} from './StartStageStatus';
import {StageRenderer} from '../../stage';
import {I18NId} from '../../../i18n';
import {GameButton} from '../../../components/game_button';

export class StartStageRenderer extends StageRenderer {

  constructor(status = new StartStageStatus(), configuration = new StartStageRenderConfiguration()) {
    // check types
    super(configuration, status);

    check.assert.instance(status, StartStageStatus, 'status should be a StartStageStatus instance');
    check.assert.instance(configuration, StartStageRenderConfiguration, 'configuration should be a StartStageRenderConfiguration instance');
  }

  preload() {
  }

  _getParametersAsText() {
    const paramIds = this.game.metadata.parameterIds();

    let text = paramIds.indexOf('time') !== -1 ? this.getText(I18NId.forGame('standard').param('time').name()) + ': ' + this.game.configuration.time : '';

    for (let paramId of paramIds) {
      try {
        text += '\n' + this.getText(this.getGameTextId().param(paramId).name()) + ': ' + this._getValueFromParam(paramId);
      } catch (e) {
        // Parameters without text are ignored.
      }
    }

    return text;
  }

  _getValueFromParam(paramId) {
    const value = this.game.configuration[paramId];
    if (StartStageRenderer.valueRequireTranslation(value)) {
      return this.getText(value, undefined);
    }
    return value;
  }

  static valueRequireTranslation(value) {
    if (value instanceof String || typeof value === 'string') {
      return value.indexOf('.') !== -1;
    }
    return false;
  }

  create() {
    // Background color
    this.setBackgroundColorFromHex(this.configuration.colors.background);

    //  Title Text
    this.gameTitleText = this.add.text(
      this.worldWidth / 2,
      (this.worldHeight / 12) * 2,
      this.getText(this.getGameTextId().name()),
      this.configuration.textStyles.title
    );
    this.gameTitleText.setOrigin(0.5, 0.5);

    // Description Text
    this.gameDescriptionText = this.add.text(
      this.worldWidth / 2,
      (this.worldHeight / 12) * 4,
      this.getText(this.getGameTextId().description()),
      this.configuration.textStyles.description
    );
    this.gameDescriptionText.setOrigin(0.5, 0.5);
    this.gameDescriptionText.setWordWrapWidth(this.worldWidth * 0.9);

    // Parameters text
    this.gameParametersText = this.add.text(
      (this.worldWidth / 2),
      ((this.worldHeight / 12) * 8) - 50,
      this._getParametersAsText(),
      this.configuration.textStyles.parameters
    );
    this.gameParametersText.setOrigin(0.5, 0.5);

    // Start button
    new GameButton(
      (this.worldWidth / 12) * 3,
      (this.worldHeight / 12) * 10,
      300,
      60,
      this._i18n.text('game.standard.startGameBtn'),
      this.onStartGame,
      this,
      this.configuration.buttonStyles.selectedButton,
      this.configuration.buttonStyles.unselectedButton
    );

    // Tutorial button
    new GameButton(
      (this.worldWidth / 12) * 9,
      (this.worldHeight / 12) * 10,
      300,
      60,
      this._i18n.text('game.standard.tutorialBtn'),
      this.onStartTutorial,
      this,
      this.configuration.buttonStyles.selectedButton,
      this.configuration.buttonStyles.unselectedButton
    );
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
