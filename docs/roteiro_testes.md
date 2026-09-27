# Roteiro de Testes — Coach4Me

Este documento orienta a validação manual da funcionalidade solicitada na atividade: exibir os horários disponíveis de cada coach na listagem do aplicativo React Native.

Os exemplos usam os registros locais utilizados durante o desenvolvimento. Em outro banco de dados, cadastre coaches e horários antes de executar os testes. Consulte `manual_execucao.md` para preparar e iniciar o ambiente.

---

## 1. Preparação do ambiente

### Procedimento

1. Iniciar a API na pasta `server/`.
2. Iniciar o projeto da pasta `mobile/` e abrir sua execução web no navegador.
3. Confirmar que `http://localhost:3333/connections` responde com um objeto contendo `total`.

### Resultado esperado

A tela inicial do aplicativo deverá abrir e a API deverá responder. O servidor e o aplicativo devem continuar em execução em terminais separados.

---

## 2. Consulta dos horários na API

### Teste 01 — Listar coaches e horários

#### Entrada

```text
Matéria: Matemática
Dia da semana: 1 (segunda-feira)
Horário: 08:30
```

#### Procedimento

No terminal, executar:

```bash
curl -sS -G 'http://localhost:3333/classes' \
  --data-urlencode 'subject=Matemática' \
  --data-urlencode 'week_day=1' \
  --data-urlencode 'time=08:30'
```

#### Resultado esperado

A resposta deverá conter os coaches que atendem ao filtro. Cada registro deverá incluir seus dados e uma lista `schedule` com os dias e horários associados à sua aula. No banco local utilizado nos testes, essa consulta retornou dois coaches.

---

## 3. Listagem no aplicativo

### Teste 02 — Exibir os horários no card

#### Procedimento

1. Na tela inicial, selecionar **Estudar**.
2. Abrir o filtro.
3. Informar `Matemática`, `1` e `08:30`.
4. Selecionar **Filtrar**.
5. Examinar os horários abaixo da biografia de cada coach.

#### Resultado esperado

Os cards deverão exibir os coaches encontrados e todos os seus horários disponíveis, com o nome do dia da semana e o intervalo de início e fim. A lista de horários de um coach pode incluir dias além daquele usado no filtro.

---

### Teste 03 — Filtro sem resultados

#### Entrada

Informar uma matéria que não possui coaches cadastrados no banco local.

#### Procedimento

Abrir o filtro, informar uma matéria inexistente e selecionar **Filtrar**.

#### Resultado esperado

A lista não deverá apresentar cards e deverá exibir a mensagem **Nenhum coach encontrado para os filtros informados.**

---

## 4. Favoritos

### Teste 04 — Persistência e exibição dos horários

#### Procedimento

1. Refazer a busca por `Matemática`, `1` e `08:30`.
2. Escolher um coach que ainda não esteja favoritado e marcá-lo como favorito.
3. Atualizar a página com **F5**.
4. Selecionar **Estudar** e abrir a aba **Favoritos**.
5. Retornar à lista e abrir **Favoritos** novamente.

#### Resultado esperado

O coach favoritado deverá permanecer na lista de Favoritos, com nome, matéria, horários e ícones visíveis. A navegação entre as abas deverá continuar respondendo.

---

## 5. Verificações técnicas

### Teste 05 — Tipagem

#### Procedimento

Nas pastas `server/` e `mobile/`, executar separadamente:

```bash
npx tsc --noEmit
```

#### Resultado esperado

Ambos os comandos deverão terminar sem erros de TypeScript.

### Teste 06 — Estado do repositório

#### Procedimento

Na raiz do projeto, após registrar os commits planejados, executar:

```bash
git status
```

#### Resultado esperado

O Git deverá informar que não existem alterações pendentes.

---

## 6. Observações da validação

- O projeto mobile foi validado no navegador pela execução web do Expo antigo. O Expo Go atual não foi usado para validar esta versão do aplicativo.
- O banco SQLite local de teste não é enviado ao GitHub; a quantidade de coaches em outras instalações depende dos cadastros realizados.
- A execução web pode exibir o aviso de compatibilidade de `react-native-screens` com a navegação. Esse aviso não impediu os fluxos acima nos testes realizados.
