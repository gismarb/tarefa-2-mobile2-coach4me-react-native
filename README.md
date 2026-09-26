# Coach4me

### Um app completo com back-end, front-end e versão mobile, desenvolvido na Especialização em Desenvolvimento Web e Mobile do [Instituto Federal de Educação, Ciência e Tecnologia do Sudeste de Minas Gerais - Campus Rio Pomba](https://www.ifsudestemg.edu.br/riopomba).

## Tecnologias envolvidas:
- Axios
- Expo
- Figma
- Imnsonia
- Next.JS
- Node.JS
- React
- React-native
- SQLite
- Visual Studio Code
- Yarn

## Projeto no Figma

A versão do projeto Web no Figma pode ser acessado clicando [aqui](https://www.figma.com/file/d4ky2gqo1qg2VCWK8iyrya/Coach-4-Me-Web?node-id=0%3A1) e a versão Mobile pode ser acessada clicando [aqui](https://www.figma.com/file/P2oCrdJyOlt4J7zz12CktZ/Coach-4-Me-Mobile).

## Execução do projeto

Tenha a certeza de ter instalado o Node.JS e o Yarn no seu computador. Para verificar, digite no terminal ```node -v``` e ```yarn -v```. Se não tiver, instale o Node.JS (recomendamos a versão 20.x.x) e o Yarn seguindo as instruções do site [Node.JS](https://nodejs.org/en/download/) e [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable).

### Versão Back-end (Server)

Para executar o projeto Back-end, basta abrir um novo terminal no VS Code e acessar o diretório server e digitar no terminal ```npm start```. O servidor executará em segundo plano.

### Versão Web

Para executar o projeto Web, basta abrir um novo terminal no VS Code e acessar o diretório web e digitar no terminal ```npm start```. O app deverá executará automaticamente no navegador padrão.

### Versão Mobile

Para executar o projeto Mobile, basta abrir um novo terminal no VS Code e acessar o diretório mobile e digitar no terminal ```npm start```. O terminal responderá com um QR Code e opções para executar o app no Android ou na web. Para executar no Android, execute antes o emulador do Android Studio e depois escolha a opção `a`. Para executar na web, escolha a opção `w`. A melhor opção é instalar o [Expo](https://expo.dev/) no smartphone e executar o projeto Mobile diretamente no seu celular lendo o QR Code gerado.

## Solução de problemas para versões antigas do Node.JS

### Versões incorretas dos pacotes usados

No início dos vídeos é mostrada a versão dos pacotes que devem ser instalados. Quando os vídeos foram gravados as versões eram outras, mas pode acontecer de você estar acompanhando essas vídeo-aulas e as versões atuais dos pacotes apresentarem erros e inconsistências. Se precisar fazer downgrade do NPM digitar no terminal

```
npm install -g npm@3.10.10
```

por exemplo, instalará essa versão específica. Mas só faça isso se tudo o mais não funcionar. Veja antes a versão que está instalada digitando no terminal

```
npm -v
```

e, caso necessário, tente fazer o downgrade.

### O app não abre no smartphone ao ler o QR Code no Expo

Verifique a versão atual da SDK do Yarn e atualize-a para a versão 45.0.0 digitando no terminal ```expo upgrade``` ou para uma mais atual, caso esteja disponível.

### Após atualizar a versão da SDK do Yarn podem aparecer novos erros

Confira o IP do server no arquivo de configuração do axios. Em seguida reinicie o server. Alguns warnings podem continuar aparecendo, mas o app deve executar normalmente.

### Mensagens de erro do VS Code em tags de HTML

Experimente desabilitar o ESLint.


