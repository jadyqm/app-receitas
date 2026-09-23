// Funções de formatação usadas pelas telas.

import { traduzirUnidade } from './traducoes';

// 95 -> "1h 35min" | 40 -> "40 min"
export function formatTime(minutes) {
  if (!minutes) return '—';

  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;

  if (hours && rest) return `${hours}h ${rest}min`;
  if (hours) return `${hours}h`;
  return `${rest} min`;
}

// Em receita, "½ xícara" se lê muito melhor que "0,5 xícara".
const FRACOES = [
  { valor: 0.125, texto: '⅛' },
  { valor: 0.25, texto: '¼' },
  { valor: 1 / 3, texto: '⅓' },
  { valor: 0.5, texto: '½' },
  { valor: 2 / 3, texto: '⅔' },
  { valor: 0.75, texto: '¾' },
];

// Tolerância generosa porque a API arredonda (manda 0.13 para um oitavo).
const TOLERANCIA = 0.02;

function formatarQuantidade(quantidade) {
  if (Number.isInteger(quantidade)) return String(quantidade);

  const inteiro = Math.floor(quantidade);
  const resto = quantidade - inteiro;

  const fracao = FRACOES.find((f) => Math.abs(resto - f.valor) <= TOLERANCIA);
  if (fracao) return inteiro ? `${inteiro}${fracao.texto}` : fracao.texto;

  // Sem fração equivalente, cai na vírgula decimal mesmo.
  return String(quantidade).replace('.', ',');
}

// { quantity: 2, unit: "cup" } -> "2 xícaras"
// { quantity: 0.5, unit: "cup" } -> "½ xícara"
export function formatAmount({ quantity, unit }) {
  if (quantity === null || quantity === undefined) {
    return traduzirUnidade(unit) || 'a gosto';
  }

  const unidade = traduzirUnidade(unit, quantity);
  const valor = formatarQuantidade(quantity);

  return unidade ? `${valor} ${unidade}` : valor;
}
