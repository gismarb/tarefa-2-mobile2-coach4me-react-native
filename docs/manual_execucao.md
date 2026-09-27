# Manual de Execução — Coach4Me

Este documento apresenta os passos para instalar, iniciar e testar a API e a execução web do aplicativo mobile Coach4Me. O projeto foi desenvolvido para a atividade de **Desenvolvimento de Aplicações Móveis II** com base no repositório do Prof. Flávio Augusto de Freitas.

---

## 1. Componentes utilizados

- `server/`: API em Node.js, Express, TypeScript, Knex e SQLite;
- `mobile/`: aplicativo React Native com Expo;
- `web/`: aplicação web separada, incluída no projeto-base.

A funcionalidade solicitada nesta atividade foi implementada na API e em `mobile/`. Os comandos abaixo demonstram essa versão mobile no navegador; não é necessário iniciar `web/` para realizar os testes descritos aqui.

---

## 2. Pré-requisitos

- Git;
- Node.js 20 e Node.js 16 gerenciados pelo `nvm`;
- npm;
- navegador moderno;
- terminal para manter API e aplicativo em execução simultaneamente.

Essas são as versões de Node usadas na validação desta entrega. Caso ainda não estejam instaladas pelo `nvm`, execute `nvm install 20` e `nvm install 16` antes de prosseguir.

---

## 3. Obter o projeto

```bash
git clone https://github.com/gismarb/tarefa-2-mobile2-coach4me-react-native.git
cd tarefa-2-mobile2-coach4me-react-native
```

Se recebeu os arquivos compactados, extraia-os e abra um terminal na raiz do projeto.

Não copie diretórios `node_modules/` de outro computador: a dependência nativa do SQLite precisa ser instalada no sistema em que a API será executada.

---

## 4. Preparar o servidor e o banco

Em um terminal, a partir da raiz do projeto:

```bash
cd server
nvm use 20
npm ci
npm run knex:migrate
npm start
```

O servidor escuta na porta `3333`. Em uma instalação nova, a migração cria as tabelas do banco SQLite local, mas **não cadastra coaches de exemplo**. O arquivo `server/src/database/database.sqlite` não é enviado ao GitHub.

Mantenha o terminal aberto. Em outro terminal, confira a resposta da API:

```bash
curl http://localhost:3333/connections
```

O resultado deverá conter o campo `total`. O número de conexões depende dos dados do banco local.

---

## 5. Cadastrar uma aula com vários horários

Para testar uma instalação sem dados, use a rota `POST /classes`. Com o servidor ativo, execute em outro terminal:

```bash
curl -i -X POST 'http://localhost:3333/classes' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Coach de exemplo",
    "avatar": "https://github.com/zz4fff.png",
    "whatsapp": "31999999999",
    "bio": "Cadastro de exemplo para testar os horários.",
    "subject": "Matemática",
    "cost": 80,
    "schedule": [
      {"week_day": 1, "from": "08:00", "to": "10:00"},
      {"week_day": 3, "from": "10:00", "to": "12:00"}
    ]
  }'
```

Uma resposta HTTP `201` indica que o cadastro foi aceito. Evite executar o cadastro repetidamente se não quiser criar registros duplicados. O número de WhatsApp e os demais dados acima são apenas exemplos; não é necessário entrar em contato durante os testes.

Para confirmar os horários associados à aula:

```bash
curl -sS -G 'http://localhost:3333/classes' \
  --data-urlencode 'subject=Matemática' \
  --data-urlencode 'week_day=1' \
  --data-urlencode 'time=08:30'
```

A resposta deverá conter o coach cadastrado e a lista `schedule` com os dois horários, inclusive o da quarta-feira. O filtro seleciona os coaches disponíveis naquele momento; o card exibe os horários cadastrados para a aula.

---

## 6. Ajustar o endereço da API no aplicativo

Verifique `mobile/src/services/api.ts`. O projeto usado nos testes aponta para `http://192.168.1.52:3333`, um endereço da rede local de desenvolvimento.

Se o computador estiver em outra rede, substitua esse IP pelo IPv4 atual do computador que executa a API. É possível conferir os endereços locais com:

```bash
hostname -I
```

Para testar somente no navegador do mesmo computador, também é possível usar `http://localhost:3333`. Se futuramente usar um dispositivo físico, `localhost` nesse dispositivo indicará o próprio aparelho; nesse caso, configure o IP acessível do computador. Salve a alteração antes de iniciar ou recarregar o aplicativo.

---

## 7. Preparar e iniciar o aplicativo mobile no navegador

Em outro terminal, a partir da raiz do projeto:

```bash
cd mobile
nvm use 20
npm ci
nvm use 16
npx --yes --package=expo-cli@4.13.0 expo start -c
```

Após o Expo iniciar, pressione `w` no terminal para abrir a execução web. No ambiente testado, ela foi disponibilizada em `http://localhost:19006`.

Mantenha o terminal do Expo aberto. A interface necessita que a API continue ativa no outro terminal.

Neste projeto, as dependências mobile foram instaladas com Node 20 e a execução do Expo CLI antigo foi realizada com Node 16. O comando `npm start` do projeto-base solicita uma instalação global do Expo CLI nesse ambiente; o comando acima foi o utilizado para iniciar o projeto sem alterar as dependências versionadas.

---

## 8. Utilizar o aplicativo

1. Na tela inicial, selecione **Estudar**.
2. Abra o filtro e informe `Matemática`, `1` e `08:30`.
3. Selecione **Filtrar** e confira os horários abaixo da biografia do coach.
4. Se desejar, favorite um coach e consulte a aba **Favoritos**.
5. Filtre uma matéria sem coaches para conferir a mensagem de ausência de resultados.

No filtro, o dia é informado pelo número da semana: `0` para domingo, `1` para segunda-feira, até `6` para sábado. A matéria deve ser informada com a mesma grafia usada no cadastro, incluindo o acento de `Matemática`.

Os favoritos são armazenados localmente pelo aplicativo. Já os cadastros de coaches e os horários ficam no SQLite da API.

---

## 9. Verificações de código

Para verificar os tipos, execute `npx tsc --noEmit` separadamente em `server/` e `mobile/`, usando as versões de Node indicadas acima.

Este projeto-base não define um comando `npm run build` para essas duas pastas. A validação realizada nesta atividade inclui a execução da API, o empacotamento em desenvolvimento da versão web do mobile, a conferência manual e a checagem de TypeScript. Não foi gerado um APK nesta entrega.

O roteiro dos testes de interface e da API está em `docs/roteiro_testes.md`.

---

## 10. Avisos e limitações conhecidos

- A versão do Expo do projeto-base é antiga e não abre diretamente no Expo Go atual do celular. A demonstração desta entrega foi feita na execução web do projeto mobile.
- A versão web pode mostrar um aviso de compatibilidade entre `@react-navigation/bottom-tabs` e `react-native-screens`. Os fluxos documentados funcionaram durante os testes, mas o aviso não foi eliminado.
- A instalação pode apresentar avisos de pacotes descontinuados e vulnerabilidades. As dependências foram mantidas para evitar uma migração ampla sem análise de compatibilidade.
- Um banco SQLite recém-criado não possui os registros usados nas capturas locais. Cadastre ao menos uma aula com horários para reproduzir a listagem.

---

## 11. Solução de problemas

### A API não responde

Confira se `npm start` permanece ativo em `server/` e se `http://localhost:3333/connections` responde. Se o banco for novo, confirme que `npm run knex:migrate` terminou sem erro.

### A lista não encontra coaches

Confira se existe uma aula cadastrada e informe a matéria com a grafia exata, o número do dia e um horário dentro do intervalo cadastrado. A consulta distingue `Matemática` de `Matematica`.

### O navegador informa erro de rede ao consultar a API

Compare o endereço em `mobile/src/services/api.ts` com o IP atual do computador que executa o servidor. Depois recarregue a página.

### Dependência nativa do SQLite apresenta erro

Confirme que executou `npm ci` dentro de `server/` no próprio sistema operacional e com o Node 20 selecionado. Não reaproveite `node_modules/` copiado de outro sistema.

---

## 12. Documentação complementar

- `docs/requisitos_resumidos.md`: requisitos da atividade e escopo adotado;
- `docs/roteiro_testes.md`: procedimentos e resultados esperados dos testes;
- `docs/correcoes_aplicadas.md`: correções feitas sobre o código-base e limitações observadas.
