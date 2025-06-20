# Terminal Trainer

Um simulador de digitação interativo para comandos Linux e sintaxe Dockerfile, inspirado no Monkeytype.

## 🎯 Sobre o Projeto

O Terminal Trainer é uma aplicação web que ajuda desenvolvedores a praticar a digitação de comandos técnicos com precisão e velocidade. A aplicação oferece uma interface similar a um terminal real, onde os usuários podem alternar entre diferentes linguagens de comando e receber feedback em tempo real sobre sua performance de digitação. 

## Pipeline de CI/CD com GitLab

Este projeto utiliza um pipeline de **Integração Contínua e Entrega Contínua (CI/CD)** definido no arquivo `.gitlab-ci.yml`, que automatiza desde a verificação do código até a publicação da imagem Docker no GitLab Container Registry.

### Visão Geral das Etapas

O pipeline está organizado nas seguintes fases:

| Estágio | Descrição |
|--------|-----------|
| `lint` | Executa o ESLint para verificar problemas de estilo e qualidade no código. |
| `test` | Executa os testes automatizados com `Vitest`, incluindo relatório de cobertura. |
| `build` | Gera o build de produção da aplicação com `Vite`, salvando os artefatos em `/dist`. |
| `deploy` | Realiza o build da imagem Docker e publica no GitLab Container Registry. |

### Dockerfile Multi-Stage

O `Dockerfile` utiliza duas etapas:

1. **Builder**: Usa `node:20-alpine` para instalar dependências e gerar a build da aplicação (`npm run build`).
2. **Runtime**: Usa `nginx:alpine` para servir os arquivos gerados (`/dist`) em produção.

```Dockerfile
FROM node:20-alpine as builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### .dockerignore

O arquivo `.dockerignore` impede que arquivos e diretórios desnecessários sejam incluídos no contexto do Docker build, otimizando tempo e espaço:

```
node_modules
.git
.gitlab
.vscode
coverage
dist
*.log
*.tsbuildinfo
```

> O diretório `dist` **é gerado dentro da imagem Docker**, então não precisa estar presente localmente para o build funcionar.

### Publicação da Imagem

A imagem gerada é publicada com a tag `II-Unidade` em:

```
registry.gitlab.com/dougfelipe/ttrainer
```

Para testar localmente:

```bash
docker pull registry.gitlab.com/dougfelipe/ttrainer:latest
docker run -d --name ttrainer -p 8080:80 registry.gitlab.com/dougfelipe/ttrainer:latest
```

Abra no navegador: [http://localhost:8080](http://localhost:8080)

## ✨ Funcionalidades

- **Dois modos de treinamento**: Comandos Linux e sintaxe Dockerfile
- **Interface terminal realística** com prompt `user@terminal: ~$`
- **Feedback visual em tempo real** com cores para caracteres corretos/incorretos
- **Métricas de performance** incluindo WPM e precisão
- **Seleção de comandos** através de dropdown interativo
- **Design responsivo** otimizado para diferentes tamanhos de tela

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| React | 18.3.1 | Framework frontend |
| TypeScript | 5.5.3 | Sistema de tipos |
| Vite | 5.4.2 | Build system |
| Tailwind CSS | 3.4.1 | Estilização |
| Vitest | 1.0.4 | Framework de testes |
| Lucide React | 0.344.0 | Ícones | 

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/DougFelipe/ttrainer.git

ou

git clone https://gitlab.com/DougFelipe/ttrainer.git

# Entre no diretório
cd ttrainer

# Instale as dependências
npm install

# Execute em modo de desenvolvimento
npm run dev
```

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev


# Preview da build
npm run preview

# Executar testes
npm run test

# Testes com cobertura
npm run test:coverage

# Interface gráfica dos testes
npm run test:ui

# Linting
npm run lint
``` 

## 🏗️ Arquitetura

### Estrutura de Componentes

```
src/
├── components/
│   ├── TerminalTrainer.tsx     # Componente principal do treinador
│   ├── TypingArea.tsx          # Área de digitação com terminal
│   ├── LanguageSelector.tsx    # Seletor de linguagem
│   ├── MetricsPanel.tsx        # Painel de métricas
│   └── CommandExplanation.tsx  # Explicação dos comandos
├── hooks/
│   └── useTypingController.ts  # Hook para controle de digitação
├── data/
│   └── commands.ts             # Biblioteca de comandos
└── types/
    └── index.ts                # Definições de tipos
```

### Fluxo de Dados

O componente `App` gerencia o estado global da aplicação, incluindo a linguagem atual e o índice do comando selecionado.  Os comandos são filtrados com base na linguagem selecionada [6](#0-5)  e passados para o `TerminalTrainer`.

## 🧪 Testes

O projeto utiliza uma infraestrutura de testes abrangente com Vitest e React Testing Library.

### Executar Testes

```bash
# Todos os testes
npm run test

# Testes específicos
npm run test -- src/test/hooks/useTypingController.test.ts

# Com cobertura
npm run test:coverage
```

### Estrutura de Testes 

## 🎨 Interface do Usuário

A aplicação utiliza um tema escuro otimizado para a experiência de terminal, com:

- **Fonte**: JetBrains Mono para melhor legibilidade de código
- **Cores**: Esquema baseado em Slate (cinza) com acentos em verde/azul/vermelho
- **Layout**: Centralizado e responsivo com breakpoints para mobile

### Estados Visuais dos Caracteres 

- **Padrão**: Texto cinza claro para caracteres não digitados
- **Correto**: Verde para caracteres digitados corretamente  
- **Incorreto**: Vermelho com fundo para caracteres errados
- **Atual**: Cinza com fundo pulsante para o próximo caractere

## 📝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🙏 Agradecimentos

- Inspirado pelo [Monkeytype](https://monkeytype.com/)
