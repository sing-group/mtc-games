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

import {I18N} from './I18N';
import {en_US} from './en_US';
import {es_ES} from './es_ES';
import {gl_ES} from './gl_ES';
import {pt_PT} from './pt_PT';

const INSTANCE = Symbol();

export class I18NStatic extends I18N {
  static get COMMON_INSTANCE() {
    if (!I18NStatic[INSTANCE]) {
      I18NStatic[INSTANCE] = new I18NStatic();

      Object.freeze(I18NStatic[INSTANCE]);
    }

    return I18NStatic[INSTANCE];
  }

  constructor(locale = I18N.DEFAULT_LOCALE, locales = {en_US, es_ES, gl_ES, pt_PT}) {
    super(locale);

    check.assert.object(locales, 'locales should be an object with an attribute for each locale');

    const localeValues = Object.values(locales);
    for (let i = 0; i < localeValues.length - 1; i++) {
      for (let j = i + 1; j < localeValues.length; j++) {
        check.assert.like(localeValues[i], localeValues[j], 'locales should have the same attributes');
      }
    }

    this._locales = locales;
    this.locale = locale;

    Object.freeze(this._locales);
  }

  set locale(locale) {
    check.assert.nonEmptyString(locale, 'locale can not be empty');

    check.assert.object(this._locales[locale]);

    this._locale = locale;
    this._messages = this._locales[locale];
  }

  _preLocaleChange(locale) {
    check.assert.object(this._locales[locale]);

    this._locale = locale;
    this._messages = this._locales[locale];
  }

  get locale() {
    return this._locale;
  }

  has(id) {
    return this._messages[id] !== undefined;
  }

  text(id) {
    check.assert.nonEmptyString(id, 'id can not be empty');

    if (this._messages[id]) {
      return this._messages[id];
    } else {
      throw new Error('invalid message id: ' + id);
    }
  }
}
