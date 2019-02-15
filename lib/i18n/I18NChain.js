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
import I18N from './I18N';
import check from 'check-types';

export default class I18NChain extends I18N {
  constructor(i18ns, locale = I18N.DEFAULT_LOCALE) {
    super(locale);

    check.assert.array.of.instance(i18ns, I18N);

    this._chain = i18ns.slice();
    this.locale = locale; // Triggers chain update.
  }

  static chain(...i18ns) {
    return new I18NChain(i18ns)
  }

  _preLocaleChange(locale) {
    this._chain.forEach(i18n => i18n.locale = locale);
  }

  text(id) {
    for (const i18n of this._chain) {
      try {
        return i18n.text(id);
      } catch (e) {} // eslint-disable-line no-empty
    }

    throw new Error('invalid message id: ' + id);
  }
}
