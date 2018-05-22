/*
 * MultiTasking Cubes - Games
 * Copyright (C) 2017-2018 - Miguel Reboiro-Jato, Andrés Vieira Vázquez,
 * Adolfo Piñón Blanco, Hugo López-Fernández, Rosalía Laza Fidalgo,
 * Reyes Pavón Rial, Francisco Otero Lamas, Adrián Varela Pomar,
 * Carlos Spuch Calvar, and Tania Rivera Baltanás
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

import Phaser from 'phaser-ce';

import check from 'check-types';

import letterA from '../assets/image/dice/letter/a.png';
import letterB from '../assets/image/dice/letter/b.png';
import letterC from '../assets/image/dice/letter/c.png';
import letterD from '../assets/image/dice/letter/d.png';
import letterE from '../assets/image/dice/letter/e.png';
import letterF from '../assets/image/dice/letter/f.png';
import letterG from '../assets/image/dice/letter/g.png';
import letterH from '../assets/image/dice/letter/h.png';
import letterI from '../assets/image/dice/letter/i.png';
import letterJ from '../assets/image/dice/letter/j.png';
import letterK from '../assets/image/dice/letter/k.png';
import letterL from '../assets/image/dice/letter/l.png';

import number1 from '../assets/image/dice/number/1.png';
import number2 from '../assets/image/dice/number/2.png';
import number3 from '../assets/image/dice/number/3.png';
import number4 from '../assets/image/dice/number/4.png';
import number5 from '../assets/image/dice/number/5.png';
import number6 from '../assets/image/dice/number/6.png';
import number7 from '../assets/image/dice/number/7.png';
import number8 from '../assets/image/dice/number/8.png';
import number9 from '../assets/image/dice/number/9.png';
import number10 from '../assets/image/dice/number/10.png';
import number11 from '../assets/image/dice/number/11.png';
import number12 from '../assets/image/dice/number/12.png';

import colorPink from '../assets/image/dice/color/pink.png';
import colorLightBlue from '../assets/image/dice/color/light-blue.png';
import colorBlack from '../assets/image/dice/color/black.png';
import colorBrown from '../assets/image/dice/color/brown.png';
import colorPurple from '../assets/image/dice/color/purple.png';
import colorWhite from '../assets/image/dice/color/white.png';
import colorGray from '../assets/image/dice/color/gray.png';
import colorBlue from '../assets/image/dice/color/blue.png';
import colorRed from '../assets/image/dice/color/red.png';
import colorYellow from '../assets/image/dice/color/yellow.png';
import colorGreen from '../assets/image/dice/color/green.png';
import colorOrange from '../assets/image/dice/color/orange.png';

import syllableSap from '../assets/image/dice/trigram/sap.png';
import syllableGem from '../assets/image/dice/trigram/gem.png';
import syllableWid from '../assets/image/dice/trigram/wid.png';
import syllableZof from '../assets/image/dice/trigram/zof.png';
import syllableQuel from '../assets/image/dice/trigram/quel.png';
import syllableRas from '../assets/image/dice/trigram/ras.png';
import syllableBra from '../assets/image/dice/trigram/bra.png';
import syllableBle from '../assets/image/dice/trigram/ble.png';
import syllablePin from '../assets/image/dice/trigram/pin.png';
import syllableCod from '../assets/image/dice/trigram/cod.png';
import syllableTer from '../assets/image/dice/trigram/ter.png';
import syllableNuk from '../assets/image/dice/trigram/nuk.png';

import wordEggs from '../assets/image/dice/word/eggs.png';
import wordWalnuts from '../assets/image/dice/word/walnuts.png';
import wordDrill from '../assets/image/dice/word/drill.png';
import wordPear from '../assets/image/dice/word/pear.png';
import wordThyme from '../assets/image/dice/word/thyme.png';
import wordNut from '../assets/image/dice/word/nut.png';
import wordApple from '../assets/image/dice/word/apple.png';
import wordSaw from '../assets/image/dice/word/saw.png';
import wordHam from '../assets/image/dice/word/ham.png';
import wordHammer from '../assets/image/dice/word/hammer.png';
import wordMelon from '../assets/image/dice/word/melon.png';
import wordLemon from '../assets/image/dice/word/lemon.png';

import toolRoller from '../assets/image/dice/tool/roller.png';
import toolWheelBarrow from '../assets/image/dice/tool/wheel-barrow.png';
import toolBroom from '../assets/image/dice/tool/broom.png';
import toolHammer from '../assets/image/dice/tool/hammer-tool.png';
import toolHandSaw from '../assets/image/dice/tool/hand-saw.png';
import toolPliers from '../assets/image/dice/tool/pliers.png';
import toolTrowel from '../assets/image/dice/tool/trowel.png';
import toolBrush from '../assets/image/dice/tool/brush.png';
import toolSaw from '../assets/image/dice/tool/saw-tool.png';
import toolLadder from '../assets/image/dice/tool/ladder.png';
import toolScissors from '../assets/image/dice/tool/scissors.png';
import toolMeasurementTape from '../assets/image/dice/tool/measurement-tape.png';
import I18NId from '../i18n/I18NId';
import StageRenderConfiguration from './StageRenderConfiguration';
import StageStatus from './StageStatus';

export default class StageRenderer extends Phaser.State {

    constructor(configuration, status) {
        super();
        
        check.assert.instance(configuration, StageRenderConfiguration);
        check.assert.instance(status, StageStatus);

        this._configuration = configuration;
        this._status = status;
    }

    get configuration() {
        return this._configuration;
    }

    get status() {
        return this._status;
    }

    preloadImages() {
        this.loadImage("letter-a", letterA);
        this.loadImage("letter-b", letterB);
        this.loadImage("letter-c", letterC);
        this.loadImage("letter-d", letterD);
        this.loadImage("letter-e", letterE);
        this.loadImage("letter-f", letterF);
        this.loadImage("letter-g", letterG);
        this.loadImage("letter-h", letterH);
        this.loadImage("letter-i", letterI);
        this.loadImage("letter-j", letterJ);
        this.loadImage("letter-k", letterK);
        this.loadImage("letter-l", letterL);

        this.loadImage("number-1", number1);
        this.loadImage("number-2", number2);
        this.loadImage("number-3", number3);
        this.loadImage("number-4", number4);
        this.loadImage("number-5", number5);
        this.loadImage("number-6", number6);
        this.loadImage("number-7", number7);
        this.loadImage("number-8", number8);
        this.loadImage("number-9", number9);
        this.loadImage("number-10", number10);
        this.loadImage("number-11", number11);
        this.loadImage("number-12", number12);

        this.loadImage("color-pink", colorPink);
        this.loadImage("color-light-blue", colorLightBlue);
        this.loadImage("color-black", colorBlack);
        this.loadImage("color-brown", colorBrown);
        this.loadImage("color-purple", colorPurple);
        this.loadImage("color-white", colorWhite);
        this.loadImage("color-gray", colorGray);
        this.loadImage("color-blue", colorBlue);
        this.loadImage("color-red", colorRed);
        this.loadImage("color-yellow", colorYellow);
        this.loadImage("color-green", colorGreen);
        this.loadImage("color-orange", colorOrange);

        this.loadImage("trigram-sap", syllableSap);
        this.loadImage("trigram-gem", syllableGem);
        this.loadImage("trigram-wid", syllableWid);
        this.loadImage("trigram-zof", syllableZof);
        this.loadImage("trigram-quel", syllableQuel);
        this.loadImage("trigram-ras", syllableRas);
        this.loadImage("trigram-bra", syllableBra);
        this.loadImage("trigram-ble", syllableBle);
        this.loadImage("trigram-pin", syllablePin);
        this.loadImage("trigram-cod", syllableCod);
        this.loadImage("trigram-ter", syllableTer);
        this.loadImage("trigram-nuk", syllableNuk);

        this.loadImage("word-eggs", wordEggs);
        this.loadImage("word-walnuts", wordWalnuts);
        this.loadImage("word-drill", wordDrill);
        this.loadImage("word-pear", wordPear);
        this.loadImage("word-thyme", wordThyme);
        this.loadImage("word-nut", wordNut);
        this.loadImage("word-apple", wordApple);
        this.loadImage("word-saw", wordSaw);
        this.loadImage("word-ham", wordHam);
        this.loadImage("word-hammer", wordHammer);
        this.loadImage("word-melon", wordMelon);
        this.loadImage("word-lemon", wordLemon);

        this.loadImage("tool-roller", toolRoller);
        this.loadImage("tool-wheel-barrow", toolWheelBarrow);
        this.loadImage("tool-broom", toolBroom);
        this.loadImage("tool-hammer-tool", toolHammer);
        this.loadImage("tool-hand-saw", toolHandSaw);
        this.loadImage("tool-pliers", toolPliers);
        this.loadImage("tool-trowel", toolTrowel);
        this.loadImage("tool-brush", toolBrush);
        this.loadImage("tool-saw-tool", toolSaw);
        this.loadImage("tool-ladder", toolLadder);
        this.loadImage("tool-scissors", toolScissors);
        this.loadImage("tool-measurement-tape", toolMeasurementTape);
    }

    preload() {

    }

    create() {

    }

    update() {

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