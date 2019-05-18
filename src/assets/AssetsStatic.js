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

import {Assets} from './Assets';
import {AssetsResources} from './AssetsResources';
import {
  colorBlack,
  colorBlue,
  colorBrown,
  colorGray,
  colorGreen,
  colorLightBlue,
  colorOrange,
  colorPink,
  colorPurple,
  colorRed,
  colorWhite,
  colorYellow,
  ImageAssets,
  ImageDiceAssets,
  ImageDiceColorAssets,
  ImageDiceLetterAssets,
  ImageDiceNumberAssets,
  ImageDiceToolAssets,
  ImageDiceTrigramAssets,
  ImageDiceWordAssets,
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
  number10,
  number11,
  number12,
  number2,
  number3,
  number4,
  number5,
  number6,
  number7,
  number8,
  number9,
  toolBroom,
  toolBrush,
  toolHammer,
  toolHandSaw,
  toolLadder,
  toolMeasurementTape,
  toolPliers,
  toolRoller,
  toolSaw,
  toolScissors,
  toolTrowel,
  toolWheelBarrow,
  trigramBle,
  trigramBra,
  trigramCod,
  trigramGem,
  trigramNuk,
  trigramPin,
  trigramQuel,
  trigramRas,
  trigramSab,
  trigramTer,
  trigramWid,
  trigramZof,
  wordAppleEnglish,
  wordAppleGalician,
  wordApplePortuguese,
  wordAppleSpanish,
  wordDrillEnglish,
  wordDrillGalician,
  wordDrillPortuguese,
  wordDrillSpanish,
  wordEggsEnglish,
  wordEggsGalician,
  wordEggsPortuguese,
  wordEggsSpanish,
  wordHamEnglish,
  wordHamGalician,
  wordHammerEnglish,
  wordHammerGalician,
  wordHammerPortuguese,
  wordHammerSpanish,
  wordHamPortuguese,
  wordHamSpanish,
  wordLemonEnglish,
  wordLemonGalician,
  wordLemonPortuguese,
  wordLemonSpanish,
  wordMelonEnglish,
  wordMelonGalician,
  wordMelonPortuguese,
  wordMelonSpanish,
  wordNutsEnglish,
  wordNutsGalician,
  wordNutsPortuguese,
  wordNutsSpanish,
  wordPearEnglish,
  wordPearGalician,
  wordPearPortuguese,
  wordPearSpanish,
  wordSawEnglish,
  wordSawGalician,
  wordSawPortuguese,
  wordSawSpanish,
  wordThymeEnglish,
  wordThymeGalician,
  wordThymePortuguese,
  wordThymeSpanish,
  wordWalnutsEnglish,
  wordWalnutsGalician,
  wordWalnutsPortuguese,
  wordWalnutsSpanish
} from './image';

import {
  AudioAssets,
  AudioDiceAssets,
  AudioDiceColorAssets,
  AudioDiceLetterAssets,
  AudioDiceNumberAssets,
  AudioDiceToolAssets,
  AudioDiceTrigramAssets,
  AudioDiceWordAssets,
  colorBlackSound,
  colorBlueSound,
  colorBrownSound,
  colorGraySound,
  colorGreenSound,
  colorLightBlueSound,
  colorOrangeSound,
  colorPinkSound,
  colorPurpleSound,
  colorRedSound,
  colorWhiteSound,
  colorYellowSound,
  letterASound,
  letterBSound,
  letterCSound,
  letterDSound,
  letterESound,
  letterFSound,
  letterGSound,
  letterHSound,
  letterISound,
  letterJSound,
  letterKSound,
  letterLSound,
  number10Sound,
  number11Sound,
  number12Sound,
  number1Sound,
  number2Sound,
  number3Sound,
  number4Sound,
  number5Sound,
  number6Sound,
  number7Sound,
  number8Sound,
  number9Sound,
  toolBroomSound,
  toolBrushSound,
  toolHammerSound,
  toolHandSawSound,
  toolLadderSound,
  toolMeasurementTapeSound,
  toolPliersSound,
  toolRollerSound,
  toolSawSound,
  toolScissorsSound,
  toolTrowelSound,
  toolWheelBarrowSound,
  trigramBleSound,
  trigramBraSound,
  trigramCodSound,
  trigramGemSound,
  trigramNukSound,
  trigramPinSound,
  trigramQuelSound,
  trigramRasSound,
  trigramSabSound,
  trigramTerSound,
  trigramWidSound,
  trigramZofSound,
  wordAppleSound,
  wordDrillSound,
  wordEggsSound,
  wordHammerSound,
  wordHamSound,
  wordLemonSound,
  wordMelonSound,
  wordNutsSound,
  wordPearSound,
  wordSawSound,
  wordThymeSound,
  wordWalnutsSound,
} from './audio';

const DEFAULT_LOCALES = Symbol();

export class AssetsStatic {

  static get DEFAULT_LOCALE() {
    return 'es_ES';
  }

  static get DEFAULT_LOCALES() {
    if (!Assets[DEFAULT_LOCALES]) {
      Assets[DEFAULT_LOCALES] = ['es_ES', 'gl_ES', 'en_US', 'pt_PT'];

      Object.freeze(Assets[DEFAULT_LOCALES]);
    }

    return Assets[DEFAULT_LOCALES];
  }

  static get en_US() {
    return new AssetsResources(
      new AudioAssets(
        new AudioDiceAssets(
          new AudioDiceColorAssets(
            colorBlackSound, colorBlueSound, colorBrownSound, colorGraySound, colorGreenSound, colorLightBlueSound,
            colorOrangeSound, colorPinkSound, colorPurpleSound, colorRedSound, colorWhiteSound, colorYellowSound
          )
        ),
        new AudioDiceAssets(
          new AudioDiceLetterAssets(
            letterASound, letterBSound, letterCSound, letterDSound, letterESound, letterFSound,
            letterGSound, letterHSound, letterISound, letterJSound, letterKSound, letterLSound
          )
        ),
        new AudioDiceAssets(
          new AudioDiceNumberAssets(
            number1Sound, number2Sound, number3Sound, number4Sound, number5Sound, number6Sound,
            number7Sound, number8Sound, number9Sound, number10Sound, number11Sound, number12Sound
          )
        ),
        new AudioDiceAssets(
          new AudioDiceToolAssets(
            toolBroomSound, toolBrushSound, toolHammerSound, toolHandSawSound, toolLadderSound, toolMeasurementTapeSound,
            toolPliersSound, toolRollerSound, toolSawSound, toolScissorsSound, toolTrowelSound, toolWheelBarrowSound
          )
        ),
        new AudioDiceAssets(
          new AudioDiceTrigramAssets(
            trigramBleSound, trigramBraSound, trigramCodSound, trigramGemSound, trigramNukSound, trigramPinSound,
            trigramQuelSound, trigramRasSound, trigramSabSound, trigramTerSound, trigramWidSound, trigramZofSound
          )
        ),
        new AudioDiceAssets(
          new AudioDiceWordAssets(
            wordAppleSound, wordDrillSound, wordEggsSound, wordHamSound, wordHammerSound, wordLemonSound,
            wordMelonSound, wordNutsSound, wordPearSound, wordSawSound, wordThymeSound, wordWalnutsSound
          )
        )
      ),
      new ImageAssets(
        new ImageDiceAssets(
          new ImageDiceColorAssets(
            colorBlack, colorBlue, colorBrown, colorGray, colorGreen, colorLightBlue,
            colorOrange, colorPink, colorPurple, colorRed, colorWhite, colorYellow
          )
        ),
        new ImageDiceAssets(
          new ImageDiceLetterAssets(
            letterA, letterB, letterC, letterD, letterE, letterF,
            letterG, letterH, letterI, letterJ, letterK, letterL
          )
        ),
        new ImageDiceAssets(
          new ImageDiceNumberAssets(
            number1, number2, number3, number4, number5, number6,
            number7, number8, number9, number10, number11, number12
          )
        ),
        new ImageDiceAssets(
          new ImageDiceToolAssets(
            toolBroom, toolBrush, toolHammer, toolHandSaw, toolLadder, toolMeasurementTape,
            toolPliers, toolRoller, toolSaw, toolScissors, toolTrowel, toolWheelBarrow
          )
        ),
        new ImageDiceAssets(
          new ImageDiceTrigramAssets(
            trigramBle, trigramBra, trigramCod, trigramGem, trigramNuk, trigramPin,
            trigramQuel, trigramRas, trigramSab, trigramTer, trigramWid, trigramZof
          )
        ),
        new ImageDiceAssets(
          new ImageDiceWordAssets(
            wordAppleEnglish, wordDrillEnglish, wordEggsEnglish, wordHamEnglish, wordHammerEnglish, wordLemonEnglish,
            wordMelonEnglish, wordNutsEnglish, wordPearEnglish, wordSawEnglish, wordThymeEnglish, wordWalnutsEnglish
          )
        )
      )
    );
  }

  static get es_ES() {
    return new AssetsResources(
      new AudioAssets(
        new AudioDiceAssets(
          new AudioDiceColorAssets(
            colorBlackSound, colorBlueSound, colorBrownSound, colorGraySound, colorGreenSound, colorLightBlueSound,
            colorOrangeSound, colorPinkSound, colorPurpleSound, colorRedSound, colorWhiteSound, colorYellowSound
          )
        ),
        new AudioDiceAssets(
          new AudioDiceLetterAssets(
            letterASound, letterBSound, letterCSound, letterDSound, letterESound, letterFSound,
            letterGSound, letterHSound, letterISound, letterJSound, letterKSound, letterLSound
          )
        ),
        new AudioDiceAssets(
          new AudioDiceNumberAssets(
            number1Sound, number2Sound, number3Sound, number4Sound, number5Sound, number6Sound,
            number7Sound, number8Sound, number9Sound, number10Sound, number11Sound, number12Sound
          )
        ),
        new AudioDiceAssets(
          new AudioDiceToolAssets(
            toolBroomSound, toolBrushSound, toolHammerSound, toolHandSawSound, toolLadderSound, toolMeasurementTapeSound,
            toolPliersSound, toolRollerSound, toolSawSound, toolScissorsSound, toolTrowelSound, toolWheelBarrowSound
          )
        ),
        new AudioDiceAssets(
          new AudioDiceTrigramAssets(
            trigramBleSound, trigramBraSound, trigramCodSound, trigramGemSound, trigramNukSound, trigramPinSound,
            trigramQuelSound, trigramRasSound, trigramSabSound, trigramTerSound, trigramWidSound, trigramZofSound
          )
        ),
        new AudioDiceAssets(
          new AudioDiceWordAssets(
            wordAppleSound, wordDrillSound, wordEggsSound, wordHamSound, wordHammerSound, wordLemonSound,
            wordMelonSound, wordNutsSound, wordPearSound, wordSawSound, wordThymeSound, wordWalnutsSound
          )
        )
      ),
      new ImageAssets(
        new ImageDiceAssets(
          new ImageDiceColorAssets(
            colorBlack, colorBlue, colorBrown, colorGray, colorGreen, colorLightBlue,
            colorOrange, colorPink, colorPurple, colorRed, colorWhite, colorYellow
          )
        ),
        new ImageDiceAssets(
          new ImageDiceLetterAssets(
            letterA, letterB, letterC, letterD, letterE, letterF,
            letterG, letterH, letterI, letterJ, letterK, letterL
          )
        ),
        new ImageDiceAssets(
          new ImageDiceNumberAssets(
            number1, number2, number3, number4, number5, number6,
            number7, number8, number9, number10, number11, number12
          )
        ),
        new ImageDiceAssets(
          new ImageDiceToolAssets(
            toolBroom, toolBrush, toolHammer, toolHandSaw, toolLadder, toolMeasurementTape,
            toolPliers, toolRoller, toolSaw, toolScissors, toolTrowel, toolWheelBarrow
          )
        ),
        new ImageDiceAssets(
          new ImageDiceTrigramAssets(
            trigramBle, trigramBra, trigramCod, trigramGem, trigramNuk, trigramPin,
            trigramQuel, trigramRas, trigramSab, trigramTer, trigramWid, trigramZof
          )
        ),
        new ImageDiceAssets(
          new ImageDiceWordAssets(
            wordAppleSpanish, wordDrillSpanish, wordEggsSpanish, wordHamSpanish, wordHammerSpanish, wordLemonSpanish,
            wordMelonSpanish, wordNutsSpanish, wordPearSpanish, wordSawSpanish, wordThymeSpanish, wordWalnutsSpanish
          )
        )
      )
    );
  }

  static get gl_ES() {
    return new AssetsResources(
      new AudioAssets(
        new AudioDiceAssets(
          new AudioDiceColorAssets(
            colorBlackSound, colorBlueSound, colorBrownSound, colorGraySound, colorGreenSound, colorLightBlueSound,
            colorOrangeSound, colorPinkSound, colorPurpleSound, colorRedSound, colorWhiteSound, colorYellowSound
          )
        ),
        new AudioDiceAssets(
          new AudioDiceLetterAssets(
            letterASound, letterBSound, letterCSound, letterDSound, letterESound, letterFSound,
            letterGSound, letterHSound, letterISound, letterJSound, letterKSound, letterLSound
          )
        ),
        new AudioDiceAssets(
          new AudioDiceNumberAssets(
            number1Sound, number2Sound, number3Sound, number4Sound, number5Sound, number6Sound,
            number7Sound, number8Sound, number9Sound, number10Sound, number11Sound, number12Sound
          )
        ),
        new AudioDiceAssets(
          new AudioDiceToolAssets(
            toolBroomSound, toolBrushSound, toolHammerSound, toolHandSawSound, toolLadderSound, toolMeasurementTapeSound,
            toolPliersSound, toolRollerSound, toolSawSound, toolScissorsSound, toolTrowelSound, toolWheelBarrowSound
          )
        ),
        new AudioDiceAssets(
          new AudioDiceTrigramAssets(
            trigramBleSound, trigramBraSound, trigramCodSound, trigramGemSound, trigramNukSound, trigramPinSound,
            trigramQuelSound, trigramRasSound, trigramSabSound, trigramTerSound, trigramWidSound, trigramZofSound
          )
        ),
        new AudioDiceAssets(
          new AudioDiceWordAssets(
            wordAppleSound, wordDrillSound, wordEggsSound, wordHamSound, wordHammerSound, wordLemonSound,
            wordMelonSound, wordNutsSound, wordPearSound, wordSawSound, wordThymeSound, wordWalnutsSound
          )
        )
      ),
      new ImageAssets(
        new ImageDiceAssets(
          new ImageDiceColorAssets(
            colorBlack, colorBlue, colorBrown, colorGray, colorGreen, colorLightBlue,
            colorOrange, colorPink, colorPurple, colorRed, colorWhite, colorYellow
          )
        ),
        new ImageDiceAssets(
          new ImageDiceLetterAssets(
            letterA, letterB, letterC, letterD, letterE, letterF,
            letterG, letterH, letterI, letterJ, letterK, letterL
          )
        ),
        new ImageDiceAssets(
          new ImageDiceNumberAssets(
            number1, number2, number3, number4, number5, number6,
            number7, number8, number9, number10, number11, number12
          )
        ),
        new ImageDiceAssets(
          new ImageDiceToolAssets(
            toolBroom, toolBrush, toolHammer, toolHandSaw, toolLadder, toolMeasurementTape,
            toolPliers, toolRoller, toolSaw, toolScissors, toolTrowel, toolWheelBarrow
          )
        ),
        new ImageDiceAssets(
          new ImageDiceTrigramAssets(
            trigramBle, trigramBra, trigramCod, trigramGem, trigramNuk, trigramPin,
            trigramQuel, trigramRas, trigramSab, trigramTer, trigramWid, trigramZof
          )
        ),
        new ImageDiceAssets(
          new ImageDiceWordAssets(
            wordAppleGalician, wordDrillGalician, wordEggsGalician, wordHamGalician, wordHammerGalician, wordLemonGalician,
            wordMelonGalician, wordNutsGalician, wordPearGalician, wordSawGalician, wordThymeGalician, wordWalnutsGalician
          )
        )
      )
    );
  }

  static get pt_PT() {
    return new AssetsResources(
      new AudioAssets(
        new AudioDiceAssets(
          new AudioDiceColorAssets(
            colorBlackSound, colorBlueSound, colorBrownSound, colorGraySound, colorGreenSound, colorLightBlueSound,
            colorOrangeSound, colorPinkSound, colorPurpleSound, colorRedSound, colorWhiteSound, colorYellowSound
          )
        ),
        new AudioDiceAssets(
          new AudioDiceLetterAssets(
            letterASound, letterBSound, letterCSound, letterDSound, letterESound, letterFSound,
            letterGSound, letterHSound, letterISound, letterJSound, letterKSound, letterLSound
          )
        ),
        new AudioDiceAssets(
          new AudioDiceNumberAssets(
            number1Sound, number2Sound, number3Sound, number4Sound, number5Sound, number6Sound,
            number7Sound, number8Sound, number9Sound, number10Sound, number11Sound, number12Sound
          )
        ),
        new AudioDiceAssets(
          new AudioDiceToolAssets(
            toolBroomSound, toolBrushSound, toolHammerSound, toolHandSawSound, toolLadderSound, toolMeasurementTapeSound,
            toolPliersSound, toolRollerSound, toolSawSound, toolScissorsSound, toolTrowelSound, toolWheelBarrowSound
          )
        ),
        new AudioDiceAssets(
          new AudioDiceTrigramAssets(
            trigramBleSound, trigramBraSound, trigramCodSound, trigramGemSound, trigramNukSound, trigramPinSound,
            trigramQuelSound, trigramRasSound, trigramSabSound, trigramTerSound, trigramWidSound, trigramZofSound
          )
        ),
        new AudioDiceAssets(
          new AudioDiceWordAssets(
            wordAppleSound, wordDrillSound, wordEggsSound, wordHamSound, wordHammerSound, wordLemonSound,
            wordMelonSound, wordNutsSound, wordPearSound, wordSawSound, wordThymeSound, wordWalnutsSound
          )
        )
      ),
      new ImageAssets(
        new ImageDiceAssets(
          new ImageDiceColorAssets(
            colorBlack, colorBlue, colorBrown, colorGray, colorGreen, colorLightBlue,
            colorOrange, colorPink, colorPurple, colorRed, colorWhite, colorYellow
          )
        ),
        new ImageDiceAssets(
          new ImageDiceLetterAssets(
            letterA, letterB, letterC, letterD, letterE, letterF,
            letterG, letterH, letterI, letterJ, letterK, letterL
          )
        ),
        new ImageDiceAssets(
          new ImageDiceNumberAssets(
            number1, number2, number3, number4, number5, number6,
            number7, number8, number9, number10, number11, number12
          )
        ),
        new ImageDiceAssets(
          new ImageDiceToolAssets(
            toolBroom, toolBrush, toolHammer, toolHandSaw, toolLadder, toolMeasurementTape,
            toolPliers, toolRoller, toolSaw, toolScissors, toolTrowel, toolWheelBarrow
          )
        ),
        new ImageDiceAssets(
          new ImageDiceTrigramAssets(
            trigramBle, trigramBra, trigramCod, trigramGem, trigramNuk, trigramPin,
            trigramQuel, trigramRas, trigramSab, trigramTer, trigramWid, trigramZof
          )
        ),
        new ImageDiceAssets(
          new ImageDiceWordAssets(
            wordApplePortuguese, wordDrillPortuguese, wordEggsPortuguese, wordHamPortuguese, wordHammerPortuguese, wordLemonPortuguese,
            wordMelonPortuguese, wordNutsPortuguese, wordPearPortuguese, wordSawPortuguese, wordThymePortuguese, wordWalnutsPortuguese
          )
        )
      )
    );
  }

  constructor(locale = Assets.DEFAULT_LOCALE, locales = {
    en_US: AssetsStatic.en_US,
    es_ES: AssetsStatic.es_ES,
    gl_ES: AssetsStatic.gl_ES,
    pt_PT: AssetsStatic.pt_PT
  }) {

    this._locales = locales;
    this.locale = locale;

    Object.freeze(this._locales);
  }

  set locale(locale) {
    check.assert.nonEmptyString(locale, 'locale can not be empty');
    check.assert.object(this._locales[locale]);

    this._locale = locale;
    this._assets = this._locales[locale];
  }

  get locale() {
    return this._locale;
  }

  get assets() {
    return this._assets;
  }

  get audioAssets() {
    return this.assets.audioAssets;
  }

  get imageAssets() {
    return this.assets.imageAssets;
  }

  get audioResourceList() {
    return this.assets.audioResourceList;
  }

  get imageResourceList() {
    return this.assets.imageResourceList;
  }
}
