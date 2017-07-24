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
import RecognitionGame from '../../../lib/game/recognition/RecognitionGame';
import RecognitionGameMetadata from '../../../lib/game/recognition/RecognitionGameMetadata';
import GameConfig from '../../../lib/game/GameConfig';

describe('Recognition game metadata test', () => {
  let game;

  beforeEach(() => {
    game = new RecognitionGame();
  });

  it('has the correct metadata', () => {
    expect(game.metadata).toEqual(jasmine.any(RecognitionGameMetadata));
  });

  it('has a configuration compatible with the metadata', () => {
    expect(game.metadata.isValid(game.config)).toBeTruthy();
  });

  it('rejects invalid game configurations', () => {
    expect(() => new RecognitionGame(new GameConfig())).toThrowError(TypeError);
  });
});