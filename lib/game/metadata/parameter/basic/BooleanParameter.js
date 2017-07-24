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
import Parameter from '../Parameter';
import check from 'check-types';

export default class BooleanParameter extends Parameter {
  constructor(id, name, description, defaultValue) {
    check.assert.boolean(defaultValue, 'defaultValue should be a boolean value');

    super(id, name, description, defaultValue);
  }

  isValid(value) {
    return check.boolean(value);
  }
}