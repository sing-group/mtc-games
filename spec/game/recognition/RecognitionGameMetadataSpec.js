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
import RecognitionGameMetadata from '../../../lib/game/recognition/RecognitionGameMetadata';
import SecondsParameter from "../../../lib/game/metadata/parameter/time/SecondsParameter";
import IntegerParameter from "../../../lib/game/metadata/parameter/basic/IntegerParameter";
import GameTestBuilder from '../GameTestBuilder';

describe('Recognition game metadata test', GameTestBuilder.build({
  metadataConstructor: RecognitionGameMetadata,
  paramTypes: {
    'diceShowTime': SecondsParameter,
    'numOfStimuli': IntegerParameter,
    'maxRepetitions': IntegerParameter
  }
}));