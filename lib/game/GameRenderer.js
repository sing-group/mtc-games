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

export default class GameRenderer extends Phaser.State {

    preload_load_images() {
        this.game.load.image("letter-a", letterA);
        this.game.load.image("letter-b", letterB);
        this.game.load.image("letter-c", letterC);
        this.game.load.image("letter-d", letterD);
        this.game.load.image("letter-e", letterE);
        this.game.load.image("letter-f", letterF);
        this.game.load.image("letter-g", letterG);
        this.game.load.image("letter-h", letterH);
        this.game.load.image("letter-i", letterI);
        this.game.load.image("letter-j", letterJ);
        this.game.load.image("letter-k", letterK);
        this.game.load.image("letter-l", letterL);

        this.game.load.image("number-1", number1);
        this.game.load.image("number-2", number2);
        this.game.load.image("number-3", number3);
        this.game.load.image("number-4", number4);
        this.game.load.image("number-5", number5);
        this.game.load.image("number-6", number6);
        this.game.load.image("number-7", number7);
        this.game.load.image("number-8", number8);
        this.game.load.image("number-9", number9);
        this.game.load.image("number-10", number10);
        this.game.load.image("number-11", number11);
        this.game.load.image("number-12", number12);

        this.game.load.image("color-pink", colorPink);
        this.game.load.image("color-light-blue", colorLightBlue);
        this.game.load.image("color-black", colorBlack);
        this.game.load.image("color-brown", colorBrown);
        this.game.load.image("color-purple", colorPurple);
        this.game.load.image("color-white", colorWhite);
        this.game.load.image("color-gray", colorGray);
        this.game.load.image("color-blue", colorBlue);
        this.game.load.image("color-red", colorRed);
        this.game.load.image("color-yellow", colorYellow);
        this.game.load.image("color-green", colorGreen);
        this.game.load.image("color-orange", colorOrange);

        this.game.load.image("trigram-sap", syllableSap);
        this.game.load.image("trigram-gem", syllableGem);
        this.game.load.image("trigram-wid", syllableWid);
        this.game.load.image("trigram-zof", syllableZof);
        this.game.load.image("trigram-quel", syllableQuel);
        this.game.load.image("trigram-ras", syllableRas);
        this.game.load.image("trigram-bra", syllableBra);
        this.game.load.image("trigram-ble", syllableBle);
        this.game.load.image("trigram-pin", syllablePin);
        this.game.load.image("trigram-cod", syllableCod);
        this.game.load.image("trigram-ter", syllableTer);
        this.game.load.image("trigram-nuk", syllableNuk);

        this.game.load.image("word-eggs", wordEggs);
        this.game.load.image("word-walnuts", wordWalnuts);
        this.game.load.image("word-drill", wordDrill);
        this.game.load.image("word-pear", wordPear);
        this.game.load.image("word-thyme", wordThyme);
        this.game.load.image("word-nut", wordNut);
        this.game.load.image("word-apple", wordApple);
        this.game.load.image("word-saw", wordSaw);
        this.game.load.image("word-ham", wordHam);
        this.game.load.image("word-hammer", wordHammer);
        this.game.load.image("word-melon", wordMelon);
        this.game.load.image("word-lemon", wordLemon);

        this.game.load.image("tool-roller", toolRoller);
        this.game.load.image("tool-wheel-barrow", toolWheelBarrow);
        this.game.load.image("tool-broom", toolBroom);
        this.game.load.image("tool-hammer-tool", toolHammer);
        this.game.load.image("tool-hand-saw", toolHandSaw);
        this.game.load.image("tool-pliers", toolPliers);
        this.game.load.image("tool-trowel", toolTrowel);
        this.game.load.image("tool-brush", toolBrush);
        this.game.load.image("tool-saw-tool", toolSaw);
        this.game.load.image("tool-ladder", toolLadder);
        this.game.load.image("tool-scissors", toolScissors);
        this.game.load.image("tool-measurement-tape", toolMeasurementTape);
    }

    preload() {

    }

    create() {

    }

    update() {

    }

}