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
import I18NStatic from '../../lib/i18n/I18NStatic';
import I18NChain from '../../lib/i18n/I18NChain';

describe('I18N chain tests', () => {
  const en_US1 = {
    message1: 'Message 1',
    firstMessage: 'First Message'
  };

  const es_ES1 = {
    message1: 'Mensaje 1',
    firstMessage: 'First mensaje'
  };

  const gl_ES1 = {
    message1: 'Mensaxe 1',
    firstMessage: 'First mesaxe'
  };

  const en_US2 = {
    message2: 'Message 2',
    secondMessage: 'Second Message'
  };

  const es_ES2 = {
    message2: 'Mensaje 2',
    secondMessage: 'Segundo mensaje'
  };

  const gl_ES2 = {
    message2: 'Mensaxe 2',
    secondMessage: 'Segunda mesaxe'
  };

  const defaultLocale = 'en_US';
  const i18n = new I18NChain(
    [
      new I18NStatic(defaultLocale, { en_US: en_US1, es_ES: es_ES1, gl_ES: gl_ES1 }),
      new I18NStatic(defaultLocale, { en_US: en_US2, es_ES: es_ES2, gl_ES: gl_ES2 })
    ],
    defaultLocale
  );

  it('loads default locale', () => {
    expect(i18n.locale).toBe(defaultLocale);

    expect(i18n.text('message1')).toBe(en_US1.message1);
    expect(i18n.text('firstMessage')).toBe(en_US1.firstMessage);
    expect(i18n.text('message2')).toBe(en_US2.message2);
    expect(i18n.text('secondMessage')).toBe(en_US2.secondMessage);
  });

  it('changes locale', () => {
    i18n.locale = 'es_ES';

    expect(i18n.text('message1')).toBe(es_ES1.message1);
    expect(i18n.text('firstMessage')).toBe(es_ES1.firstMessage);
    expect(i18n.text('message2')).toBe(es_ES2.message2);
    expect(i18n.text('secondMessage')).toBe(es_ES2.secondMessage);
  });

  it('does not allow invalid locale change', () => {
    expect(() => i18n.locale = 'bad_locale').toThrowError();
  });

  it('does not allow invalid message translation', () => {
    expect(() => i18n.text('bad_id')).toThrowError();
  });
});
