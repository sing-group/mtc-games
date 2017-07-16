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

describe('I18N static tests', () => {
  const en_US = {
    message1: 'Message 1',
    firstMessage: 'First Message'
  };

  const es_ES = {
    message1: 'Mensaje 1',
    firstMessage: 'First mensaje'
  };

  const gl_ES = {
    message1: 'Mensaxe 1',
    firstMessage: 'First mesaxe'
  };

  const locale = 'en_US';
  const i18n = new I18NStatic(locale, { en_US, es_ES, gl_ES });

  it('loads default locale', () => {
    expect(i18n.locale).toBe(locale);

    expect(i18n.text('message1')).toBe(en_US.message1);
    expect(i18n.text('firstMessage')).toBe(en_US.firstMessage);
  });

  it('changes locale', () => {
    i18n.locale = 'es_ES';

    expect(i18n.locale).toBe('es_ES');
    expect(i18n.text('message1')).toBe(es_ES.message1);
    expect(i18n.text('firstMessage')).toBe(es_ES.firstMessage);
  });

  it('does not allow invalid locale change', () => {
    expect(() => i18n.locale = 'bad_locale').toThrowError();
  });

  it('does not allow invalid message translation', () => {
    expect(() => i18n.text('bad_id')).toThrowError();
  });
});
