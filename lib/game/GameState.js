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

import Phaser from '../../node_modules/phaser/build/phaser.js'
import MtcDiceFace from '../dice/MtcDiceFace';


export default class GameState extends Phaser.State {

    preload_load_images() {        
        // Preloading all the image assets for letters
        for (let i = 0, len = MtcDiceFace.LETTERS_FACE_VALUES.length; i < len; i++) {
            this.game.load.image("letter-" + MtcDiceFace.LETTERS_FACE_VALUES[i].toLowerCase(), "assets/img/letra_" + MtcDiceFace.LETTERS_FACE_VALUES[i].toUpperCase() + ".jpg");
        }

        // Preloading all the image assets for numbers
        for (let i = 0, len = MtcDiceFace.NUMBERS_FACE_VALUES.length; i < len; i++) {
            this.game.load.image("number-" + String(MtcDiceFace.NUMBERS_FACE_VALUES[i]), "assets/img/numero_" + String(MtcDiceFace.NUMBERS_FACE_VALUES[i]) + ".jpg");
        }

        // Preloading all the image assets for colors
        for (let i = 0, len = MtcDiceFace.COLORS_FACE_VALUES.length; i < len; i++) {
            this.game.load.image("color-" + MtcDiceFace.COLORS_FACE_VALUES[i].toLowerCase(), "assets/img/color_" + String(MtcDiceFace.COLORS_FACE_VALUES[i]).toLowerCase() + ".jpg");
        }

        // Preloading all the image assets for syllables
        for (let i = 0, len = MtcDiceFace.SYLLABLES_FACE_VALUES.length; i < len; i++) {
            this.game.load.image("syllable-" + MtcDiceFace.SYLLABLES_FACE_VALUES[i].toLowerCase(), "assets/img/trigrama_" + String(MtcDiceFace.SYLLABLES_FACE_VALUES[i]).toLowerCase() + ".jpg");
        }

        // Preloading all the image assets for words
        for (let i = 0, len = MtcDiceFace.WORDS_FACE_VALUES.length; i < len; i++) {
            this.game.load.image("word-" + MtcDiceFace.WORDS_FACE_VALUES[i].toLowerCase(), "assets/img/palabra_" + String(MtcDiceFace.WORDS_FACE_VALUES[i]).toLowerCase() + ".jpg");
        }

        // Preloading all the image assets for tools
        for (let i = 0, len = MtcDiceFace.TOOLS_FACE_VALUES.length; i < len; i++) {
            this.game.load.image("tool-" + MtcDiceFace.TOOLS_FACE_VALUES[i].toLowerCase(), "assets/img/herramientas_" + String(MtcDiceFace.TOOLS_FACE_VALUES[i]).toLowerCase() + ".jpg");
        }
    }

    preload() {

    }

    create() {

    }

    update() {

    }

}