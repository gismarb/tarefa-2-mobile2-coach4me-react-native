# Requisitos resumidos do projeto — Coach4Me

Este documento resume a atividade avaliativa de **Desenvolvimento de Aplicações Móveis II**. O projeto parte do Coach4Me disponibilizado pelo Prof. Flávio Augusto de Freitas.

Os identificadores RF e RNF organizam os requisitos para facilitar sua relação com a implementação e os testes.

---

## Requisitos funcionais da atividade

### RF001 — Retornar os horários disponíveis dos coaches

A listagem de aulas deverá trazer, junto aos dados de cada coach, seus dias e horários disponíveis registrados na tabela `class_schedule`.

#### RF001.1 — Associar horários à aula

Cada horário retornado deverá pertencer à aula do coach correspondente.

#### RF001.2 — Considerar múltiplos horários

Quando uma aula tiver mais de um horário cadastrado, todos deverão estar disponíveis na resposta da API.

### RF002 — Exibir os horários na listagem mobile

O card do coach deverá apresentar os dias da semana e os intervalos de horário disponíveis logo abaixo da biografia.

---

## Funcionalidades da base preservadas

### RF003 — Filtrar coaches

A listagem permite filtrar coaches por matéria, dia da semana e horário.

### RF004 — Gerenciar favoritos

O usuário pode marcar coaches como favoritos e consultá-los na tela de Favoritos.

### RF005 — Cadastrar aulas e horários

A base oferece o cadastro de coaches com diferentes horários disponíveis para suas aulas.

---

## Requisitos não funcionais e entrega

### RNF001 — Tecnologia

A interface da atividade utiliza React Native com Expo, conforme o projeto-base.

### RNF002 — Persistência dos horários

Os horários são mantidos no banco SQLite utilizado pela API do projeto.

### RNF003 — Entrega

A entrega solicitada pelo professor consiste em um link para o repositório GitHub e um vídeo curto demonstrando a funcionalidade.

---

## Ajustes complementares realizados

Para permitir os testes da versão web do aplicativo mobile, foram ajustados controles de navegação, filtros, ícones e carregamento de Favoritos. A listagem também informa quando a busca não encontra coaches.

Esses ajustes apoiam a demonstração da atividade; o requisito central é a exibição dos horários disponíveis no card.

## Observações

- O banco SQLite com registros locais de teste não é versionado.
- A execução, a preparação do banco e os testes serão descritos nos demais arquivos de `docs/`.
- As correções feitas sobre o projeto-base serão relacionadas em `docs/correcoes_aplicadas.md`.

---

## Limites desta entrega

O projeto mantém a base e as versões de dependências fornecidas pelo professor (ver no repositório [react-native-coarch4me](https://github.com/zz4fff/react-native-coach4me) do GitHub [zz4ffff](https://github.com/zz4fff)). O banco SQLite local com dados de teste não é incluído no Git; as instruções para preparar o banco e cadastrar dados ficarão no manual de execução.