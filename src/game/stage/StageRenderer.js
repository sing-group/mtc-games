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

import Phaser from 'phaser';

import check from 'check-types';

import {
  letterA,
  letterB,
  letterC,
  letterD,
  letterE,
  letterF,
  letterG,
  letterH,
  letterI,
  letterJ,
  letterK,
  letterL,
  number1,
  number2,
  number3,
  number4,
  number5,
  number6,
  number7,
  number8,
  number9,
  number10,
  number11,
  number12,
  colorPink,
  colorLightBlue,
  colorBlack,
  colorBrown,
  colorPurple,
  colorWhite,
  colorGray,
  colorBlue,
  colorRed,
  colorYellow,
  colorGreen,
  colorOrange,
  trigramSap,
  trigramGem,
  trigramWid,
  trigramZof,
  trigramQuel,
  trigramRas,
  trigramBra,
  trigramBle,
  trigramPin,
  trigramCod,
  trigramTer,
  trigramNuk,
  wordEggs,
  wordWalnuts,
  wordDrill,
  wordPear,
  wordThyme,
  wordNut,
  wordApple,
  wordSaw,
  wordHam,
  wordHammer,
  wordMelon,
  wordLemon,
  toolRoller,
  toolWheelBarrow,
  toolBroom,
  toolHammer,
  toolHandSaw,
  toolPliers,
  toolTrowel,
  toolBrush,
  toolSaw,
  toolLadder,
  toolScissors,
  toolMeasurementTape
} from '../../assets';

import {I18NId, I18NStatic} from '../../i18n';
import {StageStatus} from './StageStatus';
import {StageRenderConfiguration} from './StageRenderConfiguration';

export class StageRenderer extends Phaser.Scene {

  constructor(configuration, status) {
    super();

    check.assert.instance(configuration, StageRenderConfiguration, 'configuration should be a StageRenderConfiguration instance');
    check.assert.instance(status, StageStatus, 'status should be a StageStatus instance');

    this._i18n = new I18NStatic(status.gameStatus.configuration.locale);
    this._configuration = configuration;
    this._status = status;
  }

  get configuration() {
    return this._configuration;
  }

  get status() {
    return this._status;
  }

  get worldWidth() {
    return this.cameras.main.width;
  }

  get worldHeight() {
    return this.cameras.main.height;
  }

  get worldHorizontalMiddle() {
    return this.worldWidth / 2;
  }

  get worldVerticalMiddle() {
    return this.worldHeight / 2;
  }

  preloadImages() {
    this.loadImage('letters-a', letterA);
    this.loadImage('letters-b', letterB);
    this.loadImage('letters-c', letterC);
    this.loadImage('letters-d', letterD);
    this.loadImage('letters-e', letterE);
    this.loadImage('letters-f', letterF);
    this.loadImage('letters-g', letterG);
    this.loadImage('letters-h', letterH);
    this.loadImage('letters-i', letterI);
    this.loadImage('letters-j', letterJ);
    this.loadImage('letters-k', letterK);
    this.loadImage('letters-l', letterL);

    this.loadImage('numbers-1', number1);
    this.loadImage('numbers-2', number2);
    this.loadImage('numbers-3', number3);
    this.loadImage('numbers-4', number4);
    this.loadImage('numbers-5', number5);
    this.loadImage('numbers-6', number6);
    this.loadImage('numbers-7', number7);
    this.loadImage('numbers-8', number8);
    this.loadImage('numbers-9', number9);
    this.loadImage('numbers-10', number10);
    this.loadImage('numbers-11', number11);
    this.loadImage('numbers-12', number12);

    this.loadImage('colors-pink', colorPink);
    this.loadImage('colors-light-blue', colorLightBlue);
    this.loadImage('colors-black', colorBlack);
    this.loadImage('colors-brown', colorBrown);
    this.loadImage('colors-purple', colorPurple);
    this.loadImage('colors-white', colorWhite);
    this.loadImage('colors-gray', colorGray);
    this.loadImage('colors-blue', colorBlue);
    this.loadImage('colors-red', colorRed);
    this.loadImage('colors-yellow', colorYellow);
    this.loadImage('colors-green', colorGreen);
    this.loadImage('colors-orange', colorOrange);

    this.loadImage('trigrams-sap', trigramSap);
    this.loadImage('trigrams-gem', trigramGem);
    this.loadImage('trigrams-wid', trigramWid);
    this.loadImage('trigrams-zof', trigramZof);
    this.loadImage('trigrams-quel', trigramQuel);
    this.loadImage('trigrams-ras', trigramRas);
    this.loadImage('trigrams-bra', trigramBra);
    this.loadImage('trigrams-ble', trigramBle);
    this.loadImage('trigrams-pin', trigramPin);
    this.loadImage('trigrams-cod', trigramCod);
    this.loadImage('trigrams-ter', trigramTer);
    this.loadImage('trigrams-nuk', trigramNuk);

    this.loadImage('words-eggs', wordEggs);
    this.loadImage('words-walnuts', wordWalnuts);
    this.loadImage('words-drill', wordDrill);
    this.loadImage('words-pear', wordPear);
    this.loadImage('words-thyme', wordThyme);
    this.loadImage('words-nut', wordNut);
    this.loadImage('words-apple', wordApple);
    this.loadImage('words-saw', wordSaw);
    this.loadImage('words-ham', wordHam);
    this.loadImage('words-hammer', wordHammer);
    this.loadImage('words-melon', wordMelon);
    this.loadImage('words-lemon', wordLemon);

    this.loadImage('tools-roller', toolRoller);
    this.loadImage('tools-wheel-barrow', toolWheelBarrow);
    this.loadImage('tools-broom', toolBroom);
    this.loadImage('tools-hammer-tools', toolHammer);
    this.loadImage('tools-hand-saw', toolHandSaw);
    this.loadImage('tools-pliers', toolPliers);
    this.loadImage('tools-trowel', toolTrowel);
    this.loadImage('tools-brush', toolBrush);
    this.loadImage('tools-saw-tools', toolSaw);
    this.loadImage('tools-ladder', toolLadder);
    this.loadImage('tools-scissors', toolScissors);
    this.loadImage('tools-measurement-tape', toolMeasurementTape);
  }

  loadImage(id, path) {
    check.assert.nonEmptyString(id, 'id should be a non empty string');
    check.assert.nonEmptyString(path, 'path should be a non empty string');

    this.load.image(id, path);
  }

  loadSpriteSheet(id, path, frameWidth, frameHeight) {
    check.assert.nonEmptyString(id, 'id should be a non empty string');
    check.assert.nonEmptyString(path, 'path should be a non empty string');
    check.assert.greaterOrEqual(frameWidth, 0, 'frameWidth should be positive');
    check.assert.greaterOrEqual(frameHeight, 0, 'frameHeight should be positive');

    this.load.spritesheet(id, path, {frameWidth, frameHeight});
  }

  loadAudio(id, path) {
    check.assert.nonEmptyString(id, 'id should be a non empty string');
    check.assert.nonEmptyString(path, 'path should be a non empty string');

    this.load.audio(id, path);
  }

  calculateCenteredX(elementWidth) {
    check.assert.greaterOrEqual(elementWidth, 0, 'elementWidth should be positive');

    return this.worldWidth - elementWidth / 2;
  }

  calculateCenteredY(elementHeight) {
    check.assert.greaterOrEqual(elementHeight, 0, 'elementHeight should be positive');

    return this.worldHeight - elementHeight / 2;
  }

  calculateDistance(x1, y1, x2, y2) {
    const dx = x1 - x2;
    const dy = y1 - y2;

    return Math.sqrt(dx * dx + dy * dy);
  }

  getRandomScrambleCoords() {
    const randX = Math.floor(Math.random() * (this.worldWidth - 75 - 75 + 1)) + 75;
    const randY = Math.floor(Math.random() * (this.worldHeight - 200 - 100 + 1)) + 100;

    return [randX, randY];
  }

  getGameTextId() {
    return I18NId.forGame(this.game.metadata.id);
  }

  getStandardGameText(id, callback = text => text) {
    check.assert.nonEmptyString(id, 'id should be a non empty string');

    return this.getText('game.standard.' + id, callback);
  }

  getText(id, callback = text => text) {
    check.assert.nonEmptyString(id, 'id should be a non empty string');
    check.assert.function(callback, 'callback should be a function');

    return callback(this._i18n.text(id));
  }

  setBackgroundColorFromHex(color) {
    this.cameras.main.setBackgroundColor(Phaser.Display.Color.HexStringToColor(color));
  }

  hideSprite(sprite) {
    sprite.setAlpha(0);
  }
}
