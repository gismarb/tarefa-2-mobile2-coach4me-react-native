# Coach4Me — Horários disponíveis dos coaches

Projeto desenvolvido para a atividade avaliativa da disciplina **Desenvolvimento de Aplicações Móveis II**, com **React Native e Expo**. Esta entrega parte do [Coach4Me disponibilizado pelo Prof. Flávio Augusto de Freitas](https://github.com/zz4fff/react-native-coach4me).

O objetivo da atividade é mostrar, na listagem mobile de coaches, os **dias da semana e horários disponíveis de cada um logo abaixo da biografia**. Para isso, a API associa os registros de `class_schedule` às aulas retornadas na busca, e o aplicativo apresenta todos os horários correspondentes no card.

## Visão geral

O projeto-base contém uma API (`server/`), um aplicativo React Native (`mobile/`) e uma aplicação web separada (`web/`). A atividade foi implementada na **API e no aplicativo mobile**. A versão web executada pelo Expo no navegador pertence a `mobile/`; ela não é a aplicação da pasta `web/`.

No fluxo demonstrado, o usuário pode:

- abrir a listagem de coaches;
- filtrar por matéria, dia da semana e horário;
- consultar os horários disponíveis de cada coach encontrado;
- marcar coaches como favoritos e consultar os cards na aba Favoritos;
- ver uma mensagem quando a busca não encontra coaches.

## Funcionalidade implementada para a atividade

### Horários na resposta da API

A consulta `GET /classes` continua recebendo os filtros `subject`, `week_day` e `time`. Além dos dados da aula e do coach, a resposta inclui `schedule`, com os horários cadastrados para a respectiva aula.

O filtro seleciona coaches disponíveis no dia e horário pesquisados; o card apresenta **todos os horários cadastrados** daquela aula. Por exemplo, uma busca por segunda-feira às `08:30` pode exibir no card horários de segunda e quarta-feira.

### Horários no card mobile

Cada card apresenta os dias da semana e os intervalos de início e fim após a biografia do coach. Os horários também ficam visíveis no card salvo em Favoritos.

## Ajustes complementares

Durante os testes da execução web do aplicativo mobile, foram corrigidos controles de navegação, filtros, carregamento dos favoritos, exibição dos ícones e caminho do favicon. Também foi adicionada uma mensagem para buscas sem resultados.

O histórico desses ajustes e os avisos que continuam presentes estão em [Correções aplicadas](docs/correcoes_aplicadas.md). O escopo foi mantido próximo da proposta original, sem migração ampla de dependências.

## Estrutura do projeto

```text
tarefa-2-mobile2-coach4me-react-native/
├── docs/
│   ├── correcoes_aplicadas.md
│   ├── manual_execucao.md
│   ├── requisitos_resumidos.md
│   └── roteiro_testes.md
├── mobile/
│   ├── src/
│   │   ├── components/CoachItem/
│   │   ├── pages/CoachList/
│   │   ├── pages/Favorites/
│   │   └── services/api.ts
│   ├── app.json
│   └── package.json
├── server/
│   ├── src/
│   │   ├── controllers/ClassesController.ts
│   │   └── database/migrations/
│   └── package.json
├── web/
├── LICENSE
└── README.md
```

## Principais arquivos

| Arquivo | Responsabilidade |
| --- | --- |
| `server/src/controllers/ClassesController.ts` | Consulta coaches e seus horários; cadastra aulas com múltiplos horários. |
| `server/src/database/migrations/` | Cria as tabelas usadas pela API, inclusive `class_schedule`. |
| `mobile/src/components/CoachItem/index.tsx` | Exibe os dados, os horários e as ações do card. |
| `mobile/src/components/CoachItem/styles.ts` | Define o layout dos horários, botões e ícones do card. |
| `mobile/src/pages/CoachList/index.tsx` | Filtra e lista os coaches, inclusive o estado sem resultados. |
| `mobile/src/pages/Favorites/index.tsx` | Exibe os coaches armazenados em Favoritos. |
| `mobile/src/services/api.ts` | Configura o endereço da API utilizado pelo aplicativo. |

## Documentação

- [Requisitos resumidos](docs/requisitos_resumidos.md): requisitos da atividade, funcionalidades preservadas e limites da entrega;
- [Roteiro de testes](docs/roteiro_testes.md): entradas, procedimentos e resultados esperados;
- [Manual de execução](docs/manual_execucao.md): instalação, migrações, cadastro de exemplo, execução e solução de problemas;
- [Correções aplicadas](docs/correcoes_aplicadas.md): consertos realizados e respectivos commits.

## Tecnologias utilizadas

- React Native e Expo SDK 40 no aplicativo mobile;
- React Navigation e AsyncStorage no aplicativo;
- Node.js, Express, TypeScript, Knex e SQLite na API;
- React na aplicação `web/` original;
- npm e Git para instalação e versionamento.

## Requisitos de ambiente

A validação desta entrega utilizou **Node.js 20** para instalar as dependências e executar a API e **Node.js 16** para iniciar o Expo CLI antigo. É recomendável usar `nvm` para selecionar as versões sem alterar a instalação de Node de outros projetos.

Para instruções completas e uma instalação sem banco de exemplo, consulte o [manual de execução](docs/manual_execucao.md). O arquivo SQLite local não é versionado; após clonar o projeto, é preciso criar as tabelas e cadastrar ao menos um coach com horários.

## Instalação e execução resumidas

Após clonar o repositório, mantenha **dois terminais** abertos. No primeiro, prepare e inicie a API:

```bash
cd server
nvm use 20
npm ci
npm run knex:migrate
npm start
```

No segundo, prepare e inicie o aplicativo mobile no navegador:

```bash
cd mobile
nvm use 20
npm ci
nvm use 16
npx --yes --package=expo-cli@4.13.0 expo start -c
```

Quando o Expo iniciar, pressione `w` para abrir o navegador. No ambiente utilizado nos testes, o aplicativo ficou disponível em `http://localhost:19006`, com a API em `http://localhost:3333`.

**Antes de testar em outra rede**, confira o endereço da API em `mobile/src/services/api.ts`: o IP `192.168.1.52` pertence ao ambiente de desenvolvimento usado nesta entrega. Ajuste-o para o IP do computador que executa a API; para acesso somente pelo navegador desse computador, pode ser usado `localhost`.

O cadastro de exemplo e os comandos para verificar a resposta da API estão no manual de execução.

## Exemplo de uso

1. Na tela inicial, selecionar **Estudar**.
2. Abrir o filtro e informar `Matemática`, dia `1` (segunda-feira) e `08:30`.
3. Selecionar **Filtrar** e observar os horários abaixo da biografia dos coaches.
4. Marcar um coach como favorito, atualizar a página e consultar a aba **Favoritos**.

No banco local usado durante a validação, esse filtro apresentou dois coaches. Em uma instalação nova, os resultados dependem dos registros cadastrados.

## Dados e persistência

Os dados de coaches, aulas e horários ficam no SQLite da API. Os favoritos são armazenados localmente pelo aplicativo por meio do AsyncStorage.

O banco de teste `server/src/database/database.sqlite` está excluído do versionamento. A migração cria as tabelas; ela não preenche registros de exemplo automaticamente.

## Validação e limitações

A implementação foi verificada com `npx tsc --noEmit` em `server/` e `mobile/`, consulta à API e testes manuais na execução web do aplicativo mobile. Essas pastas não possuem script `npm run build`; **não foi gerado APK** nesta entrega.

O projeto-base utiliza uma versão antiga do Expo, incompatível com o Expo Go atual usado nos testes. A execução web pode exibir um aviso de compatibilidade entre dependências de navegação e `react-native-screens`, sem impedir os fluxos demonstrados. A instalação também apresenta avisos de dependências descontinuadas e vulnerabilidades, que não foram ocultados nem tratados com atualizações amplas sem análise de compatibilidade.

## Referências e documentação das tecnologias

### Projeto-base e materiais do professor

- [Repositório original Coach4Me](https://github.com/zz4fff/react-native-coach4me), de autoria do Prof. Flávio Augusto de Freitas;
- [Playlist de aulas do projeto](https://www.youtube.com/playlist?list=PLwPOCQ4HHXZ-u192B8cV54Al4huzVnoEE);
- [Layout mobile no Figma](https://www.figma.com/file/P2oCrdJyOlt4J7zz12CktZ/Coach-4-Me-Mobile) e [layout web no Figma](https://www.figma.com/file/d4ky2gqo1qg2VCWK8iyrya/Coach-4-Me-Web?node-id=0%3A1), indicados no repositório original.

### Aplicativo mobile

- [React — fundamentos](https://react.dev/learn);
- [React Native — documentação](https://reactnative.dev/docs/getting-started);
- [Expo — documentação e referência do SDK](https://docs.expo.dev/);
- [React Navigation 5.x — início](https://reactnavigation.org/docs/5.x/getting-started/);
- [AsyncStorage — armazenamento local](https://react-native-async-storage.github.io/);
- [Axios — requisições HTTP](https://axios-http.com/docs/intro).

### API e banco de dados

- [Node.js — documentação introdutória](https://nodejs.org/learn);
- [Express 4.x — referência da API](https://expressjs.com/en/4x/api/);
- [TypeScript — documentação](https://www.typescriptlang.org/docs/);
- [Knex — consultas e migrações](https://knexjs.org/guide/);
- [SQLite — documentação](https://www.sqlite.org/docs.html).

### Ferramentas

- [npm — documentação](https://docs.npmjs.com/);
- [Git — documentação](https://git-scm.com/docs).

O Expo, o React Native e outras bibliotecas têm documentação que acompanha as versões atuais. Como este projeto utiliza o Expo SDK 40 e React Navigation 5, confira a versão indicada antes de aplicar instruções recentes ao código-base.

Esta entrega mantém a base disponibilizada pelo professor e acrescenta a funcionalidade solicitada na atividade, as correções necessárias à execução testada e a documentação correspondente. O histórico Git identifica essas alterações.

## Licença

O projeto contém a [licença MIT](LICENSE) do código-base, com a atribuição original preservada.
