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

import Phaser from 'phaser-ce';

import check from 'check-types';

import letterA from '../../assets/image/dice/letters/a.png';
import letterB from '../../assets/image/dice/letters/b.png';
import letterC from '../../assets/image/dice/letters/c.png';
import letterD from '../../assets/image/dice/letters/d.png';
import letterE from '../../assets/image/dice/letters/e.png';
import letterF from '../../assets/image/dice/letters/f.png';
import letterG from '../../assets/image/dice/letters/g.png';
import letterH from '../../assets/image/dice/letters/h.png';
import letterI from '../../assets/image/dice/letters/i.png';
import letterJ from '../../assets/image/dice/letters/j.png';
import letterK from '../../assets/image/dice/letters/k.png';
import letterL from '../../assets/image/dice/letters/l.png';

import number1 from '../../assets/image/dice/numbers/1.png';
import number2 from '../../assets/image/dice/numbers/2.png';
import number3 from '../../assets/image/dice/numbers/3.png';
import number4 from '../../assets/image/dice/numbers/4.png';
import number5 from '../../assets/image/dice/numbers/5.png';
import number6 from '../../assets/image/dice/numbers/6.png';
import number7 from '../../assets/image/dice/numbers/7.png';
import number8 from '../../assets/image/dice/numbers/8.png';
import number9 from '../../assets/image/dice/numbers/9.png';
import number10 from '../../assets/image/dice/numbers/10.png';
import number11 from '../../assets/image/dice/numbers/11.png';
import number12 from '../../assets/image/dice/numbers/12.png';

import colorPink from '../../assets/image/dice/colors/pink.png';
import colorLightBlue from '../../assets/image/dice/colors/light-blue.png';
import colorBlack from '../../assets/image/dice/colors/black.png';
import colorBrown from '../../assets/image/dice/colors/brown.png';
import colorPurple from '../../assets/image/dice/colors/purple.png';
import colorWhite from '../../assets/image/dice/colors/white.png';
import colorGray from '../../assets/image/dice/colors/gray.png';
import colorBlue from '../../assets/image/dice/colors/blue.png';
import colorRed from '../../assets/image/dice/colors/red.png';
import colorYellow from '../../assets/image/dice/colors/yellow.png';
import colorGreen from '../../assets/image/dice/colors/green.png';
import colorOrange from '../../assets/image/dice/colors/orange.png';

import syllableSap from '../../assets/image/dice/trigrams/sap.png';
import syllableGem from '../../assets/image/dice/trigrams/gem.png';
import syllableWid from '../../assets/image/dice/trigrams/wid.png';
import syllableZof from '../../assets/image/dice/trigrams/zof.png';
import syllableQuel from '../../assets/image/dice/trigrams/quel.png';
import syllableRas from '../../assets/image/dice/trigrams/ras.png';
import syllableBra from '../../assets/image/dice/trigrams/bra.png';
import syllableBle from '../../assets/image/dice/trigrams/ble.png';
import syllablePin from '../../assets/image/dice/trigrams/pin.png';
import syllableCod from '../../assets/image/dice/trigrams/cod.png';
import syllableTer from '../../assets/image/dice/trigrams/ter.png';
import syllableNuk from '../../assets/image/dice/trigrams/nuk.png';

import wordEggs from '../../assets/image/dice/words/eggs.png';
import wordWalnuts from '../../assets/image/dice/words/walnuts.png';
import wordDrill from '../../assets/image/dice/words/drill.png';
import wordPear from '../../assets/image/dice/words/pear.png';
import wordThyme from '../../assets/image/dice/words/thyme.png';
import wordNut from '../../assets/image/dice/words/nut.png';
import wordApple from '../../assets/image/dice/words/apple.png';
import wordSaw from '../../assets/image/dice/words/saw.png';
import wordHam from '../../assets/image/dice/words/ham.png';
import wordHammer from '../../assets/image/dice/words/hammer.png';
import wordMelon from '../../assets/image/dice/words/melon.png';
import wordLemon from '../../assets/image/dice/words/lemon.png';

import toolRoller from '../../assets/image/dice/tools/roller.png';
import toolWheelBarrow from '../../assets/image/dice/tools/wheel-barrow.png';
import toolBroom from '../../assets/image/dice/tools/broom.png';
import toolHammer from '../../assets/image/dice/tools/hammer-tool.png';
import toolHandSaw from '../../assets/image/dice/tools/hand-saw.png';
import toolPliers from '../../assets/image/dice/tools/pliers.png';
import toolTrowel from '../../assets/image/dice/tools/trowel.png';
import toolBrush from '../../assets/image/dice/tools/brush.png';
import toolSaw from '../../assets/image/dice/tools/saw-tool.png';
import toolLadder from '../../assets/image/dice/tools/ladder.png';
import toolScissors from '../../assets/image/dice/tools/scissors.png';
import toolMeasurementTape from '../../assets/image/dice/tools/measurement-tape.png';
import I18NId from '../../i18n/I18NId';
import StageRenderConfiguration from './StageRenderConfiguration';
import StageStatus from './StageStatus';

export default class StageRenderer extends Phaser.State {

  constructor(configuration, status) {
    super();

    check.assert.instance(configuration, StageRenderConfiguration, 'configuration should be a StageRenderConfiguration instance');
    check.assert.instance(status, StageStatus, 'status should be a StageStatus instance');

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
    return this.game.world.width;
  }

  get worldHeight() {
    return this.game.world.height;
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

    this.loadImage('trigrams-sap', syllableSap);
    this.loadImage('trigrams-gem', syllableGem);
    this.loadImage('trigrams-wid', syllableWid);
    this.loadImage('trigrams-zof', syllableZof);
    this.loadImage('trigrams-quel', syllableQuel);
    this.loadImage('trigrams-ras', syllableRas);
    this.loadImage('trigrams-bra', syllableBra);
    this.loadImage('trigrams-ble', syllableBle);
    this.loadImage('trigrams-pin', syllablePin);
    this.loadImage('trigrams-cod', syllableCod);
    this.loadImage('trigrams-ter', syllableTer);
    this.loadImage('trigrams-nuk', syllableNuk);

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

    this.game.load.image(id, path);
  }

  loadSpritesheet(id, path, frameWidth, frameHeight) {
    check.assert.nonEmptyString(id, 'id should be a non empty string');
    check.assert.nonEmptyString(path, 'path should be a non empty string');
    check.assert.greaterOrEqual(frameWidth, 0, 'frameWidth should be positive');
    check.assert.greaterOrEqual(frameHeight, 0, 'frameHeight should be positive');

    this.game.load.spritesheet(id, path, frameWidth, frameHeight);
  }

  loadAudio(id, path) {
    check.assert.nonEmptyString(id, 'id should be a non empty string');
    check.assert.nonEmptyString(path, 'path should be a non empty string');

    this.game.load.audio(id, path);
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

    return callback(this.game.i18n.text(id));
  }
}
