// Tokens de design do app: cores, espaçamentos, raios e sombras.
// Centralizar aqui evita "números mágicos" espalhados pelos componentes.

export const colors = {
  background: '#FFF9F4',
  surface: '#FFFFFF',
  primary: '#D9480F',
  primarySoft: '#FFEFE4',
  text: '#2A1F17',
  textMuted: '#8C7A6B',
  border: '#F1E4D8',
  shadow: '#2A1F17',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const radius = {
  sm: 10,
  md: 16,
  lg: 24,
  pill: 999,
};

export const shadows = {
  // Sombra ampla e discreta: dá profundidade ao cartão sem o efeito "caixa
  // flutuando", que é o que costuma deixar um layout com cara de amador.
  card: {
    shadowColor: colors.shadow,
    shadowOpacity: 0.06,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
};
