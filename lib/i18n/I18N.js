/*
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
import check from 'check-types';

const DEFAULT_LOCALES = Symbol();

export default class I18N {
  static get DEFAULT_LOCALE() {
    return 'es_ES';
  }

  static get DEFAULT_LOCALES() {
    if (!I18N[DEFAULT_LOCALES]) {
      I18N[DEFAULT_LOCALES] = [ 'es_ES', 'gl_ES', 'en_US', 'pt_PT' ];

      Object.freeze(I18N[DEFAULT_LOCALES]);
    }

    return I18N[DEFAULT_LOCALES];
  }

  constructor(locale = I18N.DEFAULT_LOCALE) {
    check.assert.nonEmptyString(locale, 'locale can not be empty');

    this._locale = locale;
  }

  set locale(locale) {
    check.assert.nonEmptyString(locale, 'locale can not be empty');

    this._preLocaleChange(locale);

    this._locale = locale;
  }

  _preLocaleChange(locale) {} // eslint-disable-line no-unused-vars

  get locale() {
    return this._locale;
  }

  has(id) {
    return this.text(id) !== undefined;
  }

  text(id) { // eslint-disable-line no-unused-vars
    throw new TypeError('this method should be implemented by the subclasses');
  }
}
