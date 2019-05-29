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
import {VerbalFluencyGameMetadata} from '../../games/verbal_fluency';
import {RecognitionGameMetadata} from '../../games/recognition';
import {CentralExecutiveGameMetadata} from '../../games/central_executive';
import {PlaybackHearingGameMetadata} from '../../games/playback_hearing';
import {AssociatedPairsGameMetadata} from '../../games/associated_pairs';
import {RecognitionSternbergGameMetadata} from '../../games/recognition_sternberg';
import {CalculusGameMetadata} from '../../games/calculus';
import {AttentionalSpanGameMetadata} from '../../games/attentional_span';


export class GameMetadataBuilder {
  static gameIds() {
    return [
      VerbalFluencyGameMetadata.ID,
      RecognitionGameMetadata.ID,
      CentralExecutiveGameMetadata.ID,
      PlaybackHearingGameMetadata.ID,
      AssociatedPairsGameMetadata.ID,
      RecognitionSternbergGameMetadata.ID,
      CalculusGameMetadata.ID,
      AttentionalSpanGameMetadata.ID
    ];
  }

  static gameMetadataForId(id) {
    switch (id) {
      case VerbalFluencyGameMetadata.ID:
        return VerbalFluencyGameMetadata;
      case RecognitionGameMetadata.ID:
        return RecognitionGameMetadata;
      case CentralExecutiveGameMetadata.ID:
        return CentralExecutiveGameMetadata;
      case PlaybackHearingGameMetadata.ID:
        return PlaybackHearingGameMetadata;
      case AssociatedPairsGameMetadata.ID:
        return AssociatedPairsGameMetadata;
      case RecognitionSternbergGameMetadata.ID:
        return RecognitionSternbergGameMetadata;
      case CalculusGameMetadata.ID:
        return CalculusGameMetadata;
      case AttentionalSpanGameMetadata.ID:
        return AttentionalSpanGameMetadata;
      default:
        throw new Error('Unrecognized game metadata id: ' + id);
    }
  }

  buildGameMetadata(id) {
    const metadata = GameMetadataBuilder.gameMetadataForId(id);

    return new metadata();
  }
}
