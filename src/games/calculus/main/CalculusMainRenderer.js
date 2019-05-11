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
import {StageRenderer} from '../../../game/stage';
import {CalculusMainStageStatus} from './CalculusMainStageStatus';
import Phaser from "phaser";
import {
  addition,
  backgroundTiledImage,
  cancelImage,
  confirmImage,
  diceSelectFX,
  frameImage,
  inputBox,
  multiplication,
  subtraction
} from '../../../assets';

export class CalculusMainRenderer extends StageRenderer {

  constructor(configuration, status) {
    // check types
    super(configuration, status);
  }

  preload() {
    // Prevents game from pausing when browser loses focus
    this.game.scene.disableVisibilityChange = true;
    this.keyCodes = Phaser.Input.Keyboard.KeyCodes;

    this.operations = Array();
    this.currentShowOperation = null;
    this.currentShowOperationFirstNumber = null;
    this.currentShowOperationSecondNumber = null;
    this.currentShowOperationOperator = null;
    this.selectionConfirmation = null;
    this.isValidResponse = false;

    this.thereIsResponse = false;

    this.preloadImages();

    this.loadImage('background', backgroundTiledImage);
    this.loadImage('frame', frameImage);
    this.loadImage('addition', addition);
    this.loadImage('multiplication', multiplication);
    this.loadImage('subtraction', subtraction);
    this.loadImage('inputBox', inputBox);
    this.loadImage('confirm', confirmImage);
    this.loadImage('cancel', cancelImage);

    this.loadAudio('diceSelectFX', diceSelectFX);
  }

  create() {
    this._addBackgroundImage();
    this._addKeyboardListener();
    this._initAudioFiles();
    this._drawScorePanel();
    this._drawResponseInputPanel();
    this._calculateDiceScale();
    this._startGame();
  }

  update() {
    this._updateScore();
    this._manageGamePhases();
  }

  /**
   * Update the game score
   * @private
   */
  _updateScore() {
    this.scoreText.text = String(this.status.guessed) + ' / ' + String(this.status.failed);
    this.scoreText.setColor(this.configuration.colors.scoreGuessed, 0);
    this.scoreText.setColor(this.configuration.colors.scoreSeparator, this.scoreText.text.indexOf('/'));
    this.scoreText.setColor(this.configuration.colors.scoreFailed, this.scoreText.text.indexOf('/') + 1);
    this.scoreText.setColor(this.configuration.colors.scoreSeparator);
  }

  /**
   * Manage the game phases
   * @private
   */
  _manageGamePhases() {
    if (this.status.isRunning()) {
      if (this.status.phase === CalculusMainStageStatus.PHASES.OPERATION_SHOW && this.status.currentOperationIteration < this.game.configuration.parameterValues.numberOfOperations) {
        this._manageOperationShownPhase();
      } else if (this.status.phase === CalculusMainStageStatus.PHASES.OPERATION_RESPONSE) {
        this._manageOperationResponsePhase();
      } else if (this.status.phase === CalculusMainStageStatus.PHASES.OPERATION_CHECK) {
        this._manageOperationCheckPhase();
      }
    }
  }

  /**
   * Manage the operation shown phase
   */
  _manageOperationShownPhase() {
    if (this.status.isShowingOperation) {
      let isTimeToHideOperation = Date.now() > this.operationShownTimestamp + (this.game.configuration.parameterValues.shownOperationTime * 1000);
      let operationExists = this.currentShowOperationFirstNumber !== null && this.currentShowOperationSecondNumber != null && this.currentShowOperationOperator != null;
      if (isTimeToHideOperation) {
        if (operationExists) {
          this.tweens.add({
            targets: [this.currentShowOperationFirstNumber, this.currentShowOperationSecondNumber, this.currentShowOperationOperator],
            duration: 200,
            alpha: 0
          });
        }
        this.status.currentOperationIteration++;
        this.status._isShowingOperation = false;
        this.status.phase = CalculusMainStageStatus.PHASES.OPERATION_RESPONSE;
      }

    } else {

      this._disableKeyboardListener();
      this._checkIfThereIsResponse();

      let operation = this._generateOperationWithoutDuplicates();

      this.currentShowOperation = operation;
      this.operations.push(operation);

      this.currentShowOperationFirstNumber = this.add.sprite(this.worldWidth / 4, this.worldHeight / 2, operation[0]);
      this.currentShowOperationFirstNumber.setScale(this.diceScaleShown, this.diceScaleShown);
      this.currentShowOperationFirstNumber.setOrigin(0.5, 0.5);
      this.currentShowOperationFirstNumber.alpha = 0;

      this.currentShowOperationSecondNumber = this.add.sprite(this.worldWidth / 4 + this.worldWidth / 2, this.worldHeight / 2, operation[1]);
      this.currentShowOperationSecondNumber.setScale(this.diceScaleShown, this.diceScaleShown);
      this.currentShowOperationSecondNumber.setOrigin(0.5, 0.5);
      this.currentShowOperationSecondNumber.alpha = 0;

      this.currentShowOperationOperator = this.add.image(this.worldWidth / 2, this.worldHeight / 2, operation[2]);
      this.currentShowOperationOperator.setOrigin(0.5, 0.5);
      this.currentShowOperationOperator.alpha = 0;

      this.tweens.add({
        targets: [this.currentShowOperationFirstNumber, this.currentShowOperationSecondNumber, this.currentShowOperationOperator],
        duration: 500,
        alpha: 1
      });

      this.operationShownTimestamp = Date.now();
      this.status._isShowingOperation = true;
      this._showGamePanels();
    }
  }

  /**
   * Manage operation response phase
   * @private
   */
  _manageOperationResponsePhase() {
    if (this.status.isShowingResponse) {
      let isTimeToHideResponseInput = Date.now() > this.responseShowTimestamp + (this.game.configuration.parameterValues.timePerOperation * 1000);
      if (isTimeToHideResponseInput) {
        this._hideResponseInputPanel();
        this._checkIfGameEnds();
        this.status.isShowingResponse = false;
        this.status.phase = CalculusMainStageStatus.PHASES.OPERATION_SHOW;
      }
    } else {
      this._enableKeyboardListener();
      this._cleanResponseInput();
      this._showResponseInputPanel();
      this._hideGamePanels();
      this.status.isShowingResponse = true;
      this.responseShowTimestamp = Date.now();
    }
  }

  /**
   * Manage keyboard events
   * @param event
   * @private
   */
  _manageKeyboardEvent(event) {
    event.preventDefault();
    event.stopPropagation();
    if ((event.keyCode === this.keyCodes.MINUS || event.keyCode === 109) && this.textEntry.text.length === 0) {
      this.textEntry.text += '-';
    } else if (event.keyCode === this.keyCodes.BACKSPACE && this.textEntry.text.length > 0) {
      this.textEntry.text = this.textEntry.text.substr(0, this.textEntry.text.length - 1);
    } else if (event.keyCode >= this.keyCodes.ZERO && event.keyCode <= this.keyCodes.NINE && this.textEntry.text.length < 12) {
      this.textEntry.text += event.key;
    } else if (event.keyCode >= this.keyCodes.NUMPAD_ZERO && event.keyCode <= this.keyCodes.NUMPAD_NINE && this.textEntry.text.length < 12) {
      this.textEntry.text += event.key;
    } else if (event.keyCode === this.keyCodes.ENTER && this.textEntry.text.length > 0) {
      this._hideResponseInputPanel();
      this.status.isShowingResponse = false;
      this.sound.play('diceSelectFX', this.diceSelectSound);
      let response = this.textEntry.text.trim();
      this.isValidResponse = response !== '' && !isNaN(response) && this._checkOperation(this.currentShowOperation, parseInt(response));
      this.thereIsResponse = true;
      this.status.phase = CalculusMainStageStatus.PHASES.OPERATION_CHECK;
      this._checkResponse();
    }
  }

  /**
   * Manage operation check phase
   * @private
   */
  _manageOperationCheckPhase() {
    let sprite = this.isValidResponse ? 'confirm' : 'cancel';
    if (this.status.isShowingValidation) {
      if (Date.now() > this.validationSimestamp + (1000)) {
        if (this.selectionConfirmation !== null) {
          this.tweens.add({
            targets: this.selectionConfirmation,
            duration: 200,
            alpha: 0
          });
        }
        this._checkIfGameEnds();
        this.selectionConfirmation.destroy();
        this.status.isShowingValidation = false;
        this.status.phase = CalculusMainStageStatus.PHASES.OPERATION_SHOW;
      }
    } else {
      this.status.isShowingValidation = true;
      this.selectionConfirmation = this.add.sprite(this.worldWidth / 2, this.worldHeight / 2, sprite);
      this.selectionConfirmation.setOrigin(0.5, 0.5);
      this.selectionConfirmation.alpha = 0;

      this.tweens.add({
        targets: this.selectionConfirmation,
        duration: 300,
        alpha: 1
      });

      this.validationSimestamp = Date.now();
    }
  }

  /**
   * Generates an operation without duplicates
   * @returns {any[]} the generated operation
   * @private
   */
  _generateOperationWithoutDuplicates() {
    let operation = Array();

    do {
      let randomPair = this._getRandomPairStimulus();
      let randomOperator = this._getRandomOperator();
      operation.push(randomPair[0]);
      operation.push(randomPair[1]);
      operation.push(randomOperator);
    } while (this._containsOperation(operation));

    return operation;
  }

  /**
   * Obtains a pair of stimulus values that not exists in the selected operations
   * @returns {any[] | string} the pair of stimulus generated
   * @private
   */
  _getRandomPairStimulus() {
    let randomPair = Array();

    randomPair[0] = this._getStimulusRandomValue();
    do {
      randomPair[1] = this._getStimulusRandomValue();
    } while (randomPair[0] === randomPair[1]);

    return randomPair;
  }

  /**
   * Gets a random stimulus value
   * @returns {string} the generated random stimulus value
   * @private
   */
  _getStimulusRandomValue() {
    let stimulus = this.status.stimulus + '-' + this.status.stimulusValues[Math.floor((Math.random() * this.status.stimulusValues.length))];
    return stimulus.toLowerCase();
  }

  /**
   * Get a random operator
   * @returns {string} the generated operator
   * @private
   */
  _getRandomOperator() {
    let index = Math.floor(Math.random() * CalculusMainStageStatus.OPERATORS_ARRAY.length);
    return this.status.operatorsValues[index];
  }

  /**
   * Check if is valid response and increase score
   * @private
   */
  _checkResponse() {
    if (this.isValidResponse) {
      this.status.increaseGuessed();
    } else {
      this.status.increaseFailed();
    }
  }

  /**
   * Check if the current iteration was the last
   * @private
   */
  _checkIfGameEnds() {
    let isLastIteration = this.status.currentOperationIteration === this.game.configuration.parameterValues.numberOfOperations;
    if (isLastIteration) {
      let userDidNotAnswered = this.status.totalAttempts === this.game.configuration.parameterValues.numberOfOperations - 1;
      if (userDidNotAnswered) {
        this.status.increaseFailed();
      }
      this.status.disableGame();
      this.status.finishGame();
    }
  }

  /**
   * Checks if the result is correct from a passed operation
   * @param operation the operation
   * @param {number} result the result
   * @returns {boolean} true if the result is correct, false if not.
   * @private
   */
  _checkOperation(operation, result) {

    let firstSpriteNumber = operation[0];
    let secondSpriteNumber = operation[1];
    let operator = operation[2];

    let firstNumber = parseInt(firstSpriteNumber.replace(this.status.stimulus + '-', ''));
    let secondNumber = parseInt(secondSpriteNumber.replace(this.status.stimulus + '-', ''));

    switch (operator) {
      case CalculusMainStageStatus.OPERATORS.ADDITION:
        return firstNumber + secondNumber === result;
      case CalculusMainStageStatus.OPERATORS.MULTIPLICATION:
        return firstNumber * secondNumber === result;
      case CalculusMainStageStatus.OPERATORS.SUBTRACTION:
        return firstNumber - secondNumber === result;
    }
  }

  /**
   * Check if the operation passed as parameter is already on the list
   * @param operation the operation the check if exists
   * @returns {boolean} true if the operation exists on the list, false if not.
   * @private
   */
  _containsOperation(operation) {
    let contains = false;
    this.operations.forEach(function (element) {
      if (element[0] === operation[0] && element[1] === operation[1] && element[2] === operation[2]) {
        contains = true;
      }
    });
    return contains;
  }

  _checkIfThereIsResponse() {
    if (!this.thereIsResponse && this.status.currentOperationIteration !== 0) {
      this.status.increaseFailed();
    }
    this.thereIsResponse = false;
  }

  /**
   * Start this game
   * @private
   */
  _startGame() {
    this.status.start();
  }

  /**
   * Add a background image
   * @private
   */
  _addBackgroundImage() {
    this.add.tileSprite(0, 0, this.worldWidth * 4, this.worldHeight * 4, 'background');
  }

  /**
   * Add keyboard listener
   * @private
   */
  _addKeyboardListener() {
    this.input.keyboard.on('keydown', this._manageKeyboardEvent.bind(this));
  }

  /**
   * Disable keyboard listeners
   * @private
   */
  _disableKeyboardListener() {
    this.input.keyboard.enabled = false;
  }

  /**
   * Enable keyboard listeners
   * @private
   */
  _enableKeyboardListener() {
    this.input.keyboard.enabled = true;
  }

  /**
   * Init audio files
   */
  _initAudioFiles() {
    this.diceSelectSound = this.load.audio('diceSelectFX', diceSelectFX);
  }

  /**
   * Draw the score panel
   * @private
   */
  _drawScorePanel() {
    this.scoreFrameSprite = this.add.sprite(0, 0, 'frame');
    this.scoreFrameSprite.setOrigin(0.5, 0.5);
    this.scoreFrameSprite.x = this.worldWidth / 2;
    this.scoreFrameSprite.y = this.scoreFrameSprite.height / 2 + this.configuration.pixelOffsets.frameY;

    this.scoreText = this.add.text(0, 0, '0 / 0', this.configuration.textStyles.score);
    this.scoreText.setOrigin(0.5, 0.5);
    this.scoreText.x = this.scoreFrameSprite.x;
    this.scoreText.y = this.scoreFrameSprite.y;
  }

  /**
   * Draw the response input panel
   * @private
   */
  _drawResponseInputPanel() {
    this.textLabel = this.add.text(this.worldWidth / 2, (this.worldHeight / 2) - 50,
      this.getStandardGameText('response'), this.configuration.textStyles.responseLabel);
    this.textLabel.setOrigin(0.5, 0.5);
    this.textLabel.setAlpha(0);

    this.textEntrySprite = this.add.sprite(this.textLabel.x, this.textLabel.y + 50, 'inputBox');
    this.textEntrySprite.setScale(0.4, 0.3);
    this.textEntrySprite.setOrigin(0.5, 0.5);
    this.textEntrySprite.setVisible(false);

    this.textEntry = this.add.text(this.textLabel.x, this.textLabel.y + 50, '', this.configuration.textStyles.responseInput);
    this.textEntry.setOrigin(0.5, 0.5);
    this.textEntry.setAlpha(0);
  }

  /**
   * Hide response input panel
   * @private
   */
  _hideResponseInputPanel() {
    this.textLabel.setAlpha(0);
    this.textEntry.setAlpha(0);
    this.textEntrySprite.setVisible(false);
  }

  /**
   * Show response input panel
   * @private
   */
  _showResponseInputPanel() {
    this.textLabel.setAlpha(1);
    this.textEntry.setAlpha(1);
    this.textEntrySprite.setVisible(true);
  }

  /**
   * Clean response input
   * @private
   */
  _cleanResponseInput() {
    this.textEntry.text = '';
  }

  /**
   * Hide all the initial game panels
   * @private
   */
  _hideGamePanels() {
    this.scoreFrameSprite.setAlpha(0);
    this.scoreText.setVisible(false);
  }

  /**
   * Show all the initial game panels
   * @private
   */
  _showGamePanels() {
    this.scoreFrameSprite.setAlpha(1);
    this.scoreText.setVisible(true);
  }

  /**
   * Calculates the dice scale
   * @private
   */
  _calculateDiceScale() {
    let calcSprite = this.add.sprite(0, 0, this._getStimulusRandomValue());
    calcSprite.width = Math.min(this.worldWidth, this.worldHeight) / 7;
    if (this.configuration.diceScales.shown < 0) {
      this.diceScaleShown = calcSprite.scaleX * 3;
    } else {
      this.diceScaleShown = this.configuration.diceScales.shown;
    }
    calcSprite.destroy();
  }

}
