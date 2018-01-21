/**
 * MultiTasking Cubes - Games
 * Copyright (C) 2017-2018 - Miguel Reboiro-Jato, Andrés Vieira Vázquez,
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
import GameConfig from '../../lib/game/GameConfig';
import GameMetadataStub from './metadata/GameMetadataStub';
import I18NStatic from '../../lib/i18n/I18NStatic';
import GameCallback from "../../lib/game/callback/GameCallback";
import GameCallbackStub from "./metadata/GameCallbackStub";
import StandardGameMetadata from "../../lib/game/metadata/StandardGameMetadata";

describe('Game config test', () => {
  let metadata;
  let config;

  beforeEach(() => {
    metadata = new GameMetadataStub();
    config = GameConfig.forMetadata(metadata, new GameCallbackStub());
  });

  afterEach(() => {
    metadata = null;
    config = null;
  });

  it('extracts the metadata properties', () => {
    for (const param of metadata.parameterIds()) {
      expect(config[param]).toBe(metadata.parameter(param).defaultValue);
    }
  });

  it('returns the complete list of parameter values', () => {
    const expectedParamValues = {
      param1: 5,
      param2: 1
    };

    const expectedValues = Object.assign({
      time: StandardGameMetadata.DEFAULTS.TIME,
      timerVisible: StandardGameMetadata.DEFAULTS.TIMER_VISIBLE,
      numberOfTries: StandardGameMetadata.DEFAULTS.NUMBER_OF_TRIES
    }, expectedParamValues);

    expect(config.parameterValues).toEqual(expectedValues);
  });

  it('changes the property values', () => {
    config.param1 = 10;
    config.param2 = 8;

    expect(config.param1).toBe(10);
    expect(config.param2).toBe(8);
  });

  it('validates the property values', () => {
    expect(() => config.param1 = 901).toThrowError(TypeError);
    expect(() => config.param2 = 11).toThrowError(TypeError);
  });

  it('has valid i18n ids', () => {
    const i18n = I18NStatic.COMMON_INSTANCE;

    expect(i18n.has(config.widthNameId)).toBeTruthy();
    expect(i18n.has(config.widthDescriptionId)).toBeTruthy();
    expect(i18n.has(config.heightNameId)).toBeTruthy();
    expect(i18n.has(config.heightDescriptionId)).toBeTruthy();
    expect(i18n.has(config.domIdNameId)).toBeTruthy();
    expect(i18n.has(config.domIdDescriptionId)).toBeTruthy();
    expect(i18n.has(config.localeNameId)).toBeTruthy();
    expect(i18n.has(config.localeDescriptionId)).toBeTruthy();
    expect(i18n.has(config.i18nNameId)).toBeTruthy();
    expect(i18n.has(config.i18nDescriptionId)).toBeTruthy();
  });

  it('checks callback type', () => {
    expect(() => config.gameCallback = new GameCallback()).toThrowError(TypeError);
  });
});
