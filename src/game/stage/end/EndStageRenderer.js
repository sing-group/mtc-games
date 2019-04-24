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

import {EndStageRenderConfiguration} from './EndStageRenderConfiguration';
import {EndStageStatus} from './EndStageStatus';
import {GameStatus} from '../../GameStatus';
import {StageRenderer} from '../../stage';
import {endTutorialButtonImage, retryGameButtonImage} from '../../../assets';

export class EndStageRenderer extends StageRenderer {

  constructor(status, configuration = new EndStageRenderConfiguration()) {
    // check types
    super(configuration, status);

    check.assert.instance(status, EndStageStatus, 'status should be an EndStageStatus instance');
    check.assert.instance(configuration, EndStageRenderConfiguration, 'configuration should be an EndStageRenderConfiguration instance');
  }

  preload() {
    this.loadSpriteSheet('end-tutorial-button', endTutorialButtonImage, 300, 60);
    this.loadSpriteSheet('retry-button', retryGameButtonImage, 300, 60);
  }

  _getResultsAsText() {
    const result = this.status.getLastResult();

    let text = '';

    for (let resultId of result.resultIds) {
      const value = result[resultId];

      try {
        if (text.length > 0)
          text += '\n';

        let result;
        if (Array.isArray(value)) {
          result = value.length;
        } else if (typeof value === 'boolean') {
          result = value ? this.getText('yes') : this.getText('no');
        } else {
          result = value;
        }

        text += this.getText(this.getGameTextId().result(resultId).name()) + ': ' + result;
        // eslint-disable-next-line no-empty
      } catch (e) {
      }
    }

    return text;
  }

  create() {
    // Background color
    this.setBackgroundColorFromHex(this.configuration.colors.background);

    //  Title Text
    this.gameTitleText = this.add.text(
      this.worldWidth / 2,
      (this.worldHeight / 12 * 2),
      this.getText(this.getGameTextId().name()),
      this.configuration.textStyles.title
    );
    this.gameTitleText.setOrigin(0.5, 0.5);

    //  Description Text
    this.gameDescriptionText = this.add.text(
      this.worldWidth / 2,
      (this.worldHeight / 12) * 4,
      this.getText(this.getGameTextId().description()),
      this.configuration.textStyles.description
    );
    this.gameDescriptionText.setOrigin(0.5, 0.5);
    this.gameDescriptionText.setWordWrapWidth(this.worldWidth * 0.9);

    //  Results Text
    if (this.status.gameStatus.gameMode === GameStatus.GAME_MODES.NORMAL) {
      this.gameResultsText = this.add.text(
        this.worldWidth / 2,
        ((this.worldHeight / 12) * 8) - 50,
        this._getResultsAsText(),
        this.configuration.textStyles.results
      );
      this.gameResultsText.setOrigin(0.5, 0.5);

      if (this.status.gameStatus.canRetry()) {
        this.retryButton = this.add.sprite(
          (this.worldWidth / 12) * 6,
          (this.worldHeight / 12) * 10,
          'retry-button',
          1
        );
        this.retryButton.setInteractive();
        this.retryButton.on('pointerover', this.over);
        this.retryButton.on('pointerout', this.out);
        this.retryButton.on('pointerdown', this.onEndTutorial.bind(this));
        this.retryButton.on('pointerdup', this.up);
      }
    } else {// End Tutorial button
      this.endTutorialButton = this.add.sprite(
        (this.worldWidth / 12) * 6,
        (this.worldHeight / 12) * 10,
        'end-tutorial-button',
        1
      );
      this.endTutorialButton.setInteractive();
      this.endTutorialButton.on('pointerover', this.over);
      this.endTutorialButton.on('pointerout', this.out);
      this.endTutorialButton.on('pointerdown', this.onEndTutorial.bind(this));
      this.endTutorialButton.on('pointerdup', this.up);
    }
  }

  update() {

  }

  onEndTutorial() {
    this.status.retry();
  }

  up() {
    this.setTexture(this.texture.key, 1);
  }

  over() {
    this.setTexture(this.texture.key, 2);
  }

  out() {
    this.setTexture(this.texture.key, 1);
  }
}
