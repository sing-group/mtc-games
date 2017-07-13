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
import I18N from '../i18n/I18N';
import I18NStatic from '../i18n/I18NStatic';

export default class GameMetadata {
  static get DEFAULTS() {
    return {
      I18N: I18NStatic.COMMON_INSTANCE
    };
  }


  constructor(
    id,
    i18n = GameMetadata.DEFAULTS.I18N,
    nameId = 'game.' + id + '.id',
    descriptionId = 'game.' + id + '.description'
  ) {
    check.assert.nonEmptyString(id, 'id must be a non empty string');
    check.assert.nonEmptyString(nameId, 'nameId must be a string');
    check.assert.nonEmptyString(descriptionId, 'descriptionId must be a string');
    check.assert.instance(i18n, I18N, 'i18n should be an instance of I18N')

    this._id = id;
    this._nameId = nameId;
    this._descriptionId = descriptionId;
    this._i18n = i18n;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._i18n.text(this._nameId);
  }

  get description() {
    return this._i18n.text(this._descriptionId);
  }
}
