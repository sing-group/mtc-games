﻿'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
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

const pt_PT = {
  'yes': 'Si',
  'no': 'No',
  'pink': 'Rosa',
  'light-blue': 'Celeste',
  'black': 'Preto',
  'brown': 'Marrom',
  'purple': 'Roxo',
  'white': 'Branco',
  'gray': 'Cinza',
  'blue': 'Azul',
  'red': 'Vermelho',
  'yellow': 'Amarelo',
  'green': 'Verde',
  'orange': 'Laranja',
  'sap': 'Sap',
  'gem': 'Gem',
  'wid': 'Wid',
  'zof': 'Zof',
  'quel': 'Quel',
  'ras': 'Ras',
  'bra': 'Bra',
  'ble': 'Ble',
  'pin': 'Pin',
  'cod': 'Cod',
  'ter': 'Ter',
  'nuk': 'Nuk',
  'eggs': 'Ovos',
  'walnuts': 'Nozes',
  'drill': 'Broca',
  'pear': 'Pêra',
  'thyme': 'Tomilho',
  'nuts': 'Porca',
  'apple': 'Maçã',
  'saw': 'Serra',
  'ham': 'Presunto',
  'hammer': 'Martelo',
  'melon': 'Melão',
  'lemon': 'Limão',
  'tool roller': 'Rolete',
  'tool wheel barrow': 'Carriola',
  'tool broom': 'Vassoura',
  'tool hammer': 'Martelo',
  'tool hand saw': 'Serrote',
  'tool pliers': 'Alicates',
  'tool trowel': 'Picolé',
  'tool brush': 'Brocha',
  'tool saw': 'Serrote',
  'tool ladder': 'Escada',
  'tool scissors': 'Tesoura',
  'tool measurement tape': 'Fita métrica',
  'game.config.param.width.name': 'Largo',
  'game.config.param.width.description': 'Define a largura (resolución del eje X en píxels).',
  'game.config.param.height.name': 'Alto',
  'game.config.param.height.description': 'Define o alto (resolución del eje Y en píxels).',
  'game.config.param.domId.name': 'HTML DOM Id',
  'game.config.param.domId.description': 'Distintivo do HTML de elemento onde o jogo será incrustado.',
  'game.config.param.locale.name': 'Posição',
  'game.config.param.locale.description': 'Posição da aplicação.',
  'game.config.param.i18n.name': 'I18N',
  'game.config.param.i18n.description': 'Objecto I18N usado para a internacionalização.',
  'game.standard.time': 'Tempo',
  'game.standard.timeIsUp': 'Tempo esgotado',
  'game.standard.param.time.name': 'Tempo',
  'game.standard.param.time.description': 'Tempo total do jogo.',
  'game.standard.param.timerVisible.name': 'Temporizador visível',
  'game.standard.param.timerVisible.description': 'O tempo de jogo deveria ser mostrado?',
  'game.standard.param.numberOfTries.name': 'Repetições',
  'game.standard.param.numberOfTries.description': 'Número de tempos que podem repetir o jogo.',
  'game.task.freeMemory': 'Recordo livre',
  'game.task.recognition': 'Reconhecimento',
  'game.task.playbackHearing': 'Reprodução audível',
  'game.task.verbalFluency': 'Fluência verbal',
  'game.task.attentionalSpan': 'Span atencional',
  'game.task.centralExecutive': 'Executivo central',
  'game.task.calculus': 'Cálculo',
  'game.task.associatedPairs': 'Pares de sócio',
  'game.verbalFluency.name': 'Fluência verbal',
  'game.verbalFluency.description': 'Neste jogo você criará palavras válidas que usam as cartas da face de ' +
    'cartas de todos os dados.',
  'game.verbalFluency.result.attempts.name': 'Tentativas',
  'game.verbalFluency.result.guessedWords.name': 'Palavras adivinhadas',
  'game.verbalFluency.result.failedWords.name': 'Palavras erradas',
  'game.verbalFluency.result.repeatedWords.name': 'Palavras repetidas',
  'game.recognition.name': 'Reconhecimento',
  'game.recognition.description': 'No princípio deste jogo serão mostrados vários valores de um tipo de face dos dados durante alguns poucos segundos. ' +
    'Logo, são mostrados todos os valores do mesmo tipo de face e você terá que selecionar os mostrados no princípio.',
  'game.recognition.param.timePerElement.name': 'Tempo de reconhecimento',
  'game.recognition.param.timePerElement.description': 'Número de segundos que cada grupo de dados é mostrado.',
  'game.recognition.param.numberOfElements.name': 'Número de dados',
  'game.recognition.param.numberOfElements.description': 'Número de dados mostrados.',
  'game.recognition.param.responseIntroduction.name': 'Introdução dá resposta',
  'game.recognition.param.responseIntroduction.description': 'Tipo de introdução da resposta (NORMAL o STERNBERG).',
  'game.recognition.result.gameCompleted.name': 'Jogo completado',
  'game.recognition.result.totalTries.name': 'Tentativas totais',
  'game.recognition.result.guessedStimulus.name': 'Estímulos adivinhados',
  'game.recognition.result.failedStimulus.name': 'Estímulos errados'
};

export default pt_PT;