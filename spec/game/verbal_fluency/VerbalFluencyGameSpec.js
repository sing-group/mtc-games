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
import VerbalFluencyGame from '../../../lib/game/verbal_fluency/VerbalFluencyGame';
import VerbalFluencyGameMetadata from '../../../lib/game/verbal_fluency/VerbalFluencyGameMetadata';
import GameConfig from '../../../lib/game/GameConfig';
import GameMetadataStub from '../metadata/GameMetadataStub';

describe('Verbal fluency game metadata test', () => {
  let game;

  beforeEach(() => {
    game = new VerbalFluencyGame();
  });

  it('has the correct metadata', () => {
    expect(game.metadata).toEqual(jasmine.any(VerbalFluencyGameMetadata));
  });

  it('has a configuration compatible with the metadata', () => {
    expect(game.metadata.isValid(game.config)).toBeTruthy();
  });

  it('rejects invalid game configurations', () => {
    expect(() => new VerbalFluencyGame(GameConfig.forMetadata(new GameMetadataStub())))
      .toThrowError(TypeError);
  });
});