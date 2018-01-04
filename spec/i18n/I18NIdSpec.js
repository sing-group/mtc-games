/**
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
import I18NId from '../../lib/i18n/I18NId';

describe('i18n id builder tests', () => {
  it('creates the game id', () => {
    expect(I18NId.forGame('game1').id()).toBe('game.game1');
  });

  it('creates the game nameId id', () => {
    expect(I18NId.forGame('game1').name()).toBe('game.game1.name');
  });

  it('creates the game description id', () => {
    expect(I18NId.forGame('game1').description()).toBe('game.game1.description');
  });

  it('creates the game param id', () => {
    expect(I18NId.forGame('game1').param('param1').id()).toBe('game.game1.param.param1');
  });

  it('creates the game param nameId id', () => {
    expect(I18NId.forGame('game1').param('param1').name()).toBe('game.game1.param.param1.name');
  });

  it('creates the game param description id', () => {
    expect(I18NId.forGame('game1').param('param1').description()).toBe('game.game1.param.param1.description');
  });

  it('creates the param id', () => {
    expect(I18NId.forParam('param1').id()).toBe('param.param1');
  });

  it('creates the param nameId id', () => {
    expect(I18NId.forParam('param1').name()).toBe('param.param1.name');
  });

  it('creates the param description id', () => {
    expect(I18NId.forParam('param1').description()).toBe('param.param1.description');
  });
});
