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
import GameMetadata from '../metadata/GameMetadata';
import Parameter from '../metadata/parameter/Parameter';
import SecondsParameter from '../metadata/parameter/time/SecondsParameter';
import IntegerParameter from '../metadata/parameter/basic/IntegerParameter';
import MtcDiceFace from '../../dice/MtcDiceFace';

export default class RecognitionGameMetadata extends GameMetadata {
  static get ID() {
    return 'recognition';
  }

  constructor() {
    super(
      RecognitionGameMetadata.ID,
      [
        Parameter.build(SecondsParameter, RecognitionGameMetadata.ID, 'diceShowTime', 5),
        Parameter.build(IntegerParameter, RecognitionGameMetadata.ID, 'numOfStimuli',
          Math.floor(MtcDiceFace.COUNT_VALUES / 2), 1, MtcDiceFace.COUNT_VALUES
        ),
        Parameter.build(IntegerParameter, RecognitionGameMetadata.ID, 'maxRepetitions', 1, 1, 5)
      ]
    );
  }
}