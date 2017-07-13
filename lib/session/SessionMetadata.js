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

export default class SessionMetadata {
  constructor(nameId, descriptionId, games, i18n = I18N.COMMON_INSTANCE) {
    check.assert.array.of.instance(games, 'games can only contain Game instances');

    this._games = games;
    this._nameId = nameId;
    this._descriptionId = descriptionId;
    this._i18n = i18n;
  }

  get games() {
    return this._games;
  }
}
