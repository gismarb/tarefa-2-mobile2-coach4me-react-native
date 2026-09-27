# Requisitos resumidos — Coach4Me

## Solicitação da atividade

Exibir, na listagem de coaches do aplicativo React Native, os dias e horários disponíveis de cada coach logo abaixo da biografia. Os horários devem vir da tabela `class_schedule` junto aos dados das aulas e dos coaches.

A entrega solicitada é um link para o repositório GitHub e um vídeo curto demonstrando a funcionalidade.

## Implementação

- A API retorna os horários associados a cada aula na resposta de `GET /classes`.
- O card do coach mostra os dias da semana e os intervalos de horário disponíveis.
- O filtro por matéria, dia e horário continua funcionando.
- Os horários também aparecem quando o coach é exibido em Favoritos.

## Ajustes de uso feitos durante os testes

- Botões e filtros adaptados para responder aos cliques na execução web do aplicativo mobile.
- Ícones do card exibidos corretamente.
- Carregamento de Favoritos estabilizado.
- Mensagem exibida quando o filtro não encontra coaches.

## Limites desta entrega

O projeto mantém a base e as versões de dependências fornecidas pelo professor (ver no repositório [react-native-coarch4me](https://github.com/zz4fff/react-native-coach4me) do GitHub [zz4ffff](https://github.com/zz4fff)). O banco SQLite local com dados de teste não é incluído no Git; as instruções para preparar o banco e cadastrar dados ficarão no manual de execução.