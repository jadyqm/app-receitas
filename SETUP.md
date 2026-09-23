# Rodando o projeto em outro computador

Passo a passo para colocar o app no ar numa máquina nova (faculdade, laboratório,
notebook emprestado). O tropeço mais comum está no passo 3 — não pule.

## 0. Conferir o que a máquina já tem

```bash
node -v && npm -v && git --version
```

Combinação testada e funcionando: **Node v24.15.0**, npm 11.12.1, git 2.54.

Se o Node não existir ou for antigo demais, é preciso instalar — e em PC de
instituição isso esbarra em permissão de administrador. Sem admin, a versão
portátil (`.zip`) do Node resolve. Vale testar isso antes do dia da entrega.

## 1. Clonar o repositório

```bash
git clone https://github.com/jadyqm/app-receitas.git
cd app-receitas
```

## 2. Instalar as dependências

```bash
npm install
```

O `node_modules` não vai versionado, então esse passo é obrigatório e leva alguns
minutos. Precisa do registry do npm liberado na rede.

## 3. Logar no Expo com a conta certa

A conta do **Expo CLI** precisa ser a mesma do **Expo Go** no celular. Se forem
diferentes — ou se uma estiver logada e a outra não — o Expo Go recusa o projeto
com *"There was a problem running the requested project"*.

```bash
npx expo login
```

Use a conta `jadyqm`, a mesma do celular. Para conferir:

```bash
npx expo whoami
```

Se aparecer outra conta, `npx expo logout` e logue de novo.

> Alternativa: deslogar o Expo Go no celular (Perfil → Log out). Com os dois
> lados sem conta também funciona — mas o modo túnel do passo 6 exige login.

## 4. Subir o servidor

```bash
npx expo start
```

Se a porta 8081 estiver ocupada, ele pergunta e sugere outra — aceitar é
inofensivo. Para escolher direto:

```bash
npx expo start --port 8082
```

## 5. Abrir no celular

Escaneie o QR Code com a câmera. O celular precisa estar **no mesmo Wi-Fi do
PC**; no 4G o modo padrão não enxerga o servidor.

## 6. Se o celular não achar o PC

Redes de instituição costumam isolar os dispositivos entre si, e aí o modo padrão
não conecta. Para esses casos existe o modo túnel, que passa pelos servidores do
Expo e funciona até com o celular no 4G:

```bash
npx expo start --tunnel
```

O `@expo/ngrok` já está nas devDependencies para isso. É mais lento, e exige
estar logado (passo 3).

## 7. Antes de sair da máquina

Não deixe o trabalho preso no PC:

```bash
git add -A
git commit -m "descricao do que foi feito"
git push
```

Se for o primeiro commit naquela máquina, o git pede a identidade:

```bash
git config --global user.name "Jady"
git config --global user.email "seu@email.com"
```

O `push` vai pedir autenticação do GitHub. **Em PC compartilhado, deslogue do
GitHub depois.**
