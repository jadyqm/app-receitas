// Funções de formatação usadas pelas telas.

// 95 -> "1h 35min" | 40 -> "40 min"
export function formatTime(minutes) {
  if (!minutes) return '—';

  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;

  if (hours && rest) return `${hours}h ${rest}min`;
  if (hours) return `${hours}h`;
  return `${rest} min`;
}

// { quantity: 1.5, unit: "tsp" } -> "1,5 tsp"
export function formatAmount({ quantity, unit }) {
  if (quantity === null || quantity === undefined) return unit || 'a gosto';

  const value = Number.isInteger(quantity)
    ? String(quantity)
    : String(quantity).replace('.', ',');

  return unit ? `${value} ${unit}` : value;
}
