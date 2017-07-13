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
import I18N from '../../lib/i18n/I18NStatic';

describe('Game metadata tests', function() {
  const en_US = {
    message1: 'Message 1',
    secondMessage: 'Second Message'
  };

  const es_ES = {
    message1: 'Mensaje 1',
    secondMessage: 'Segundo mensaje'
  };

  const gl_ES = {
    message1: 'Mensaxe 1',
    secondMessage: 'Segunda mesaxe'
  };

  it('loads english message', () => {
    const i18n = new I18N('en_US', { en_US, es_ES, gl_ES });

    expect(i18n.text('message1')).toBe(en_US.message1);
  });

  it('changes locale', () => {
    const i18n = new I18N('en_US', { en_US, es_ES, gl_ES });

    i18n.locale = 'es_ES';

    expect(i18n.text('message1')).toBe(es_ES.message1);
  });
});
