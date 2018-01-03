/*
 * MultiTasking Cubes - Games
 * Copyright (C) 2017 - Miguel Reboiro-Jato, Andrés Vieira Vázquez,
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

import Phaser from 'phaser';

import letterA from '../assets/image/dice/letter/a.jpg';
import letterB from '../assets/image/dice/letter/b.jpg';
import letterC from '../assets/image/dice/letter/c.jpg';
import letterD from '../assets/image/dice/letter/d.jpg';
import letterE from '../assets/image/dice/letter/e.jpg';
import letterF from '../assets/image/dice/letter/f.jpg';
import letterG from '../assets/image/dice/letter/g.jpg';
import letterH from '../assets/image/dice/letter/h.jpg';
import letterI from '../assets/image/dice/letter/i.jpg';
import letterJ from '../assets/image/dice/letter/j.jpg';
import letterK from '../assets/image/dice/letter/k.jpg';
import letterL from '../assets/image/dice/letter/l.jpg';

import number1 from '../assets/image/dice/number/1.jpg';
import number2 from '../assets/image/dice/number/2.jpg';
import number3 from '../assets/image/dice/number/3.jpg';
import number4 from '../assets/image/dice/number/4.jpg';
import number5 from '../assets/image/dice/number/5.jpg';
import number6 from '../assets/image/dice/number/6.jpg';
import number7 from '../assets/image/dice/number/7.jpg';
import number8 from '../assets/image/dice/number/8.jpg';
import number9 from '../assets/image/dice/number/9.jpg';
import number10 from '../assets/image/dice/number/10.jpg';
import number11 from '../assets/image/dice/number/11.jpg';
import number12 from '../assets/image/dice/number/12.jpg';

import colorPink from '../assets/image/dice/color/pink.jpg';
import colorLightBlue from '../assets/image/dice/color/light-blue.jpg';
import colorBlack from '../assets/image/dice/color/black.jpg';
import colorBrown from '../assets/image/dice/color/brown.jpg';
import colorPurple from '../assets/image/dice/color/purple.jpg';
import colorWhite from '../assets/image/dice/color/white.jpg';
import colorGray from '../assets/image/dice/color/gray.jpg';
import colorBlue from '../assets/image/dice/color/blue.jpg';
import colorRed from '../assets/image/dice/color/red.jpg';
import colorYellow from '../assets/image/dice/color/yellow.jpg';
import colorGreen from '../assets/image/dice/color/green.jpg';
import colorOrange from '../assets/image/dice/color/orange.jpg';

import syllableSap from '../assets/image/dice/trigram/sap.jpg';
import syllableGem from '../assets/image/dice/trigram/gem.jpg';
import syllableWid from '../assets/image/dice/trigram/wid.jpg';
import syllableZof from '../assets/image/dice/trigram/zof.jpg';
import syllableQuel from '../assets/image/dice/trigram/quel.jpg';
import syllableRas from '../assets/image/dice/trigram/ras.jpg';
import syllableBra from '../assets/image/dice/trigram/bra.jpg';
import syllableBle from '../assets/image/dice/trigram/ble.jpg';
import syllablePin from '../assets/image/dice/trigram/pin.jpg';
import syllableCod from '../assets/image/dice/trigram/cod.jpg';
import syllableTer from '../assets/image/dice/trigram/ter.jpg';
import syllableNuk from '../assets/image/dice/trigram/nuk.jpg';

import wordEggs from '../assets/image/dice/word/eggs.jpg';
import wordWalnuts from '../assets/image/dice/word/walnuts.jpg';
import wordDrill from '../assets/image/dice/word/drill.jpg';
import wordPear from '../assets/image/dice/word/pear.jpg';
import wordThyme from '../assets/image/dice/word/thyme.jpg';
import wordNut from '../assets/image/dice/word/nut.jpg';
import wordApple from '../assets/image/dice/word/apple.jpg';
import wordSaw from '../assets/image/dice/word/saw.jpg';
import wordHam from '../assets/image/dice/word/ham.jpg';
import wordHammer from '../assets/image/dice/word/hammer.jpg';
import wordMelon from '../assets/image/dice/word/melon.jpg';
import wordLemon from '../assets/image/dice/word/lemon.jpg';

import toolRoller from '../assets/image/dice/tool/roller.jpg';
import toolWheelBarrow from '../assets/image/dice/tool/wheel-barrow.jpg';
import toolBroom from '../assets/image/dice/tool/broom.jpg';
import toolHammer from '../assets/image/dice/tool/hammer-tool.jpg';
import toolHandSaw from '../assets/image/dice/tool/hand-saw.jpg';
import toolPliers from '../assets/image/dice/tool/pliers.jpg';
import toolTrowel from '../assets/image/dice/tool/trowel.jpg';
import toolBrush from '../assets/image/dice/tool/brush.jpg';
import toolSaw from '../assets/image/dice/tool/saw-tool.jpg';
import toolLadder from '../assets/image/dice/tool/ladder.jpg';
import toolScissors from '../assets/image/dice/tool/scissors.jpg';
import toolMeasurementTape from '../assets/image/dice/tool/measurement-tape.jpg';

export default class GameState extends Phaser.State {

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