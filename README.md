# App de Receitas

App em React Native / Expo que lista receitas vindas da [Recipe API](https://recipeapi.io/)
e mostra os detalhes de cada uma.

## Como rodar

```bash
npm install
npx expo start
```

Depois é só ler o QR Code com o app **Expo Go** no celular.

## Estrutura

```
App.js                        navegação entre as duas telas (Stack Navigator)
data/recipes.json             resposta da Recipe API + a foto de cada receita
scripts/fetch-recipes.ps1     script que gera o recipes.json
src/theme.js                  cores, espaçamentos, raios e sombras
src/utils/format.js           formatação de tempo e de quantidade
src/components/Header.js      cabeçalho das duas telas (com ou sem botão voltar)
src/components/RecipeCard.js  item da lista da tela inicial
src/components/InfoBadge.js   cartão de ícone + valor (serve, tempo, calorias)
src/components/IngredientItem.js  linha da lista de ingredientes
src/screens/HomeScreen.js     tela inicial: cabeçalho + FlatList de receitas
src/screens/RecipeScreen.js   tela de receita: detalhes + FlatList de ingredientes
```

## Telas

**Tela inicial** — cabeçalho com o título e uma `FlatList` de receitas. Cada
cartão traz a foto, o nome, o tempo total e as calorias, e leva para a tela de
detalhes ao ser tocado.

**Tela de receita** — cabeçalho com botão voltar, foto, nome, descrição, três
indicadores com ícones (porções, tempo de preparo, calorias), o modo de preparo
numerado e a `FlatList` de ingredientes com nome e quantidade + unidade.

## Dados

O `data/recipes.json` é a resposta bruta do endpoint
`GET https://recipeapi.io/api/v1/recipes`, com um campo `image` acrescentado a
cada receita.

Para gerar o arquivo de novo (PowerShell, na pasta do projeto):

```powershell
.\scripts\fetch-recipes.ps1 -ApiKey "sk_live_..." -Ingredient "flank steak" -Page 1
```

O ingrediente usado foi `flank steak` (fraldinha), que devolve exatamente as
10 receitas da página 1.

Como a Recipe API não fornece imagens, o script busca uma foto para cada receita
na Wikipedia / Wikimedia Commons (licença livre), valida a URL e evita repetir a
mesma foto em duas receitas.

## Bibliotecas

- `@react-navigation/native` + `native-stack` — navegação entre as telas
- `phosphor-react-native` (+ `react-native-svg`) — ícones
- `react-native-safe-area-context` — respeitar o notch do iPhone
