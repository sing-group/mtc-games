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
import check from 'check-types';
import I18N from '../../lib/i18n/I18N';
import I18NStatic from '../../lib/i18n/I18NStatic';

const i18nMatchers = {
  toHaveI18NMessage(util, customEqualityTester) {
    return {
      compare(actual) {
        check.assert.string(actual, 'actual should be a string');

        const result = {
          pass: true,
          message: '\'' + actual + '\' has I18N messages'
        };

        const i18n = new I18NStatic();
        for (const locale of I18N.DEFAULT_LOCALES) {
          i18n.locale = locale;

          if (!i18n.has(actual)) {
            result.pass = false;
            result.message = '\'' + actual + '\' is missing in the locale ' + locale;
            break;
          }
        }

        return result;
      }
    };
  }
};

export default i18nMatchers;