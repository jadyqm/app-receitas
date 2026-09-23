// A Recipe API só devolve conteúdo em inglês, francês e espanhol, e os idiomas
// além do inglês exigem plano pago. Como não há português, os rótulos que o app
// exibe são traduzidos aqui.

const UNIDADES = {
  tbsp: { uma: 'col. sopa', varias: 'col. sopa' },
  tsp: { uma: 'col. chá', varias: 'col. chá' },
  cup: { uma: 'xícara', varias: 'xícaras' },
  clove: { uma: 'dente', varias: 'dentes' },
  pinch: { uma: 'pitada', varias: 'pitadas' },
  piece: { uma: 'un.', varias: 'un.' },
  bunch: { uma: 'maço', varias: 'maços' },
  slice: { uma: 'fatia', varias: 'fatias' },
};

const DIFICULDADES = {
  easy: 'Fácil',
  medium: 'Médio',
  hard: 'Difícil',
};

const COZINHAS = {
  american: 'Americana',
  french: 'Francesa',
  mexican: 'Mexicana',
  spanish: 'Espanhola',
  chinese: 'Chinesa',
  italian: 'Italiana',
  japanese: 'Japonesa',
  indian: 'Indiana',
  thai: 'Tailandesa',
  brazilian: 'Brasileira',
};

// Unidades métricas (ml, g, kg) não têm tradução e passam direto.
export function traduzirUnidade(unidade, quantidade = 1) {
  const traducao = UNIDADES[unidade];
  if (!traducao) return unidade;

  return quantidade > 1 ? traducao.varias : traducao.uma;
}

export function traduzirDificuldade(dificuldade) {
  return DIFICULDADES[dificuldade] ?? dificuldade;
}

export function traduzirCozinha(cozinha) {
  return COZINHAS[cozinha] ?? cozinha;
}
