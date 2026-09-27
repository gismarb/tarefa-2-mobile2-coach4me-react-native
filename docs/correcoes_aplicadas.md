# Correções aplicadas — Coach4Me

Este documento registra os problemas encontrados durante a preparação e os testes da atividade, as correções realizadas e os commits correspondentes. A funcionalidade solicitada pelo professor — exibir os horários dos coaches — está descrita em `requisitos_resumidos.md`.

---

## 1. Endereço da API

O aplicativo mobile apontava para um endereço de rede que não correspondia ao ambiente utilizado nos testes. Por isso, as requisições à API não completavam.

O endereço em `mobile/src/services/api.ts` foi ajustado para `192.168.1.52:3333`.

**Commit:** `56e5c80` — `fix: ajusta endereco da API para a rede local`.

**Observação:** esse IP pertence à rede usada nos testes. Em outra rede, é necessário configurá-lo novamente.

---

## 2. Navegação da tela inicial na execução web

Os botões **Estudar** e **Dar aulas** não respondiam aos cliques na execução web do aplicativo mobile.

Os controles desses botões foram substituídos por `TouchableOpacity`, permitindo a navegação no ambiente testado.

**Commit:** `e5eacfc` — `fix: habilita navegacao da tela inicial na web`.

---

## 3. Filtros da lista na execução web

O ícone de filtro e o botão **Filtrar** não respondiam corretamente aos cliques.

Os controles foram substituídos por `TouchableOpacity`. Depois da correção, foi possível abrir o formulário e consultar a API com os filtros informados.

**Commit:** `a579a5f` — `fix: habilita filtros da lista de coaches na web`.

---

## 4. Caminho do favicon

A execução web procurava `mobile/assets/favicon.png`, mas o arquivo estava em `mobile/src/assets/favicon.png`. Isso gerava uma mensagem de arquivo não encontrado.

O caminho foi corrigido em `mobile/app.json`.

**Commit:** `0d53afa` — `fix: corrige caminho do favicon na web`.

---

## 5. Recarregamento contínuo na lista de coaches

Após salvar um favorito, a lista podia entrar em um ciclo de renderização e deixar de responder.

A função passada a `useFocusEffect` foi estabilizada com `React.useCallback`.

**Commit:** `5894413` — `fix: evita recarregamento continuo dos favoritos na lista`.

---

## 6. Botões e ícones do card

Os botões do card apresentavam problemas de interação na execução web e os ícones de favorito e WhatsApp não apareciam corretamente.

Os botões passaram a utilizar `TouchableOpacity`, e os ícones receberam dimensões definidas nos estilos. A marcação de favorito foi testada após atualizar a página.

**Commit:** `cbe4551` — `fix: exibe icones e habilita botoes do card na web`.

---

## 7. Recarregamento contínuo na tela de Favoritos

A tela de Favoritos utilizava o mesmo padrão de `useFocusEffect` que havia causado o ciclo na lista de coaches.

A função passada ao hook foi estabilizada com `React.useCallback`. O coach salvo e seus horários foram conferidos nessa tela após atualizar a página.

**Commit:** `e7ac349` — `fix: evita recarregamento continuo na tela de favoritos`.

---

## Melhoria complementar

Quando a busca não encontrava coaches, a lista ficava vazia sem explicar o resultado. Foi acrescentada uma mensagem específica para esse caso.

**Commit:** `192318d` — `feat: informa quando o filtro nao encontra coaches`.

---

## Limitações observadas

- O projeto utiliza uma versão antiga do Expo, que não foi atualizada nesta atividade. A demonstração foi validada na execução web do aplicativo mobile.
- A execução web ainda pode apresentar um aviso de compatibilidade entre dependências de navegação e `react-native-screens`. Esse aviso não foi tratado como uma correção concluída.
- A instalação apresenta avisos de pacotes descontinuados e vulnerabilidades em dependências. Não foram feitas atualizações amplas sem análise de compatibilidade.
