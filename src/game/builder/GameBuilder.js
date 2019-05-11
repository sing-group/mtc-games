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
import {GameConfig} from '../GameConfig';
import {VerbalFluencyGame, VerbalFluencyGameMetadata} from '../../games/verbal_fluency';
import {RecognitionGame, RecognitionGameMetadata} from '../../games/recognition';
import {CentralExecutiveGame, CentralExecutiveGameMetadata} from '../../games/central_executive';
import {PlaybackHearingGame, PlaybackHearingGameMetadata} from '../../games/playback_hearing';
import {AssociatedPairsGame, AssociatedPairsGameMetadata} from '../../games/associated_pairs';
import {RecognitionSternbergGame, RecognitionSternbergGameMetadata} from '../../games/recognition_sternberg';
import {CalculusGame, CalculusGameMetadata} from '../../games/calculus';

export class GameBuilder {
  static gameForId(id) {
    switch (id) {
      case VerbalFluencyGameMetadata.ID:
        return VerbalFluencyGame;
      case RecognitionGameMetadata.ID:
        return RecognitionGame;
      case CentralExecutiveGameMetadata.ID:
        return CentralExecutiveGame;
      case PlaybackHearingGameMetadata.ID:
        return PlaybackHearingGame;
      case AssociatedPairsGameMetadata.ID:
        return AssociatedPairsGame;
      case RecognitionSternbergGameMetadata.ID:
        return RecognitionSternbergGame;
      case CalculusGameMetadata.ID:
        return CalculusGame;
      default:
        throw new Error('Unrecognized game id: ' + id);
    }
  }

  buildGame(gameConfig) {
    check.assert.instance(gameConfig, GameConfig, 'gameConfig should be an instance of GameConfig');

    const metadata = gameConfig.metadata;
    const game = GameBuilder.gameForId(metadata.id);

    return new game(gameConfig);
  }
}
