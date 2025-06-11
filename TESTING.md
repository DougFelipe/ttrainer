# Terminal Trainer - Documentação de Testes

Este documento descreve a estrutura de testes unitários do Terminal Trainer, incluindo configuração, execução e cobertura.

##  Índice

- [Terminal Trainer - Documentação de Testes](#terminal-trainer---documentação-de-testes)
  - [Índice](#índice)
  - [⚙️ Configuração](#️-configuração)
    - [Ferramentas Utilizadas](#ferramentas-utilizadas)
    - [Arquivos de Configuração](#arquivos-de-configuração)
  - [Estrutura dos Testes](#estrutura-dos-testes)
  - [Como Executar](#como-executar)
    - [Comandos Disponíveis](#comandos-disponíveis)
    - [Executar Testes Específicos](#executar-testes-específicos)
  - [Cobertura de Testes](#cobertura-de-testes)
    - [Visualizar Relatório de Cobertura](#visualizar-relatório-de-cobertura)

## ⚙️ Configuração

### Ferramentas Utilizadas

- **Vitest**: Framework de testes rápido e moderno
- **@testing-library/react**: Utilitários para testar componentes React
- **@testing-library/jest-dom**: Matchers customizados para DOM
- **@testing-library/user-event**: Simulação de interações do usuário
- **jsdom**: Ambiente DOM para Node.js

### Arquivos de Configuração

- `vitest.config.ts`: Configuração principal do Vitest
- `src/test/setup.ts`: Configuração global dos testes
- `src/test/utils/testUtils.tsx`: Utilitários customizados para testes

##  Estrutura dos Testes

```
src/test/
├── setup.ts                    # Configuração global
├── utils/
│   └── testUtils.tsx           # Utilitários de teste
├── components/                 # Testes de componentes
│   ├── CommandExplanation.test.tsx
│   ├── LanguageSelector.test.tsx
│   ├── MetricsPanel.test.tsx
│   └── TypingArea.test.tsx
├── hooks/                      # Testes de hooks
│   └── useTypingController.test.ts
└── data/                       # Testes de dados
    └── commands.test.ts
```

##  Como Executar

### Comandos Disponíveis

```bash
# Executar todos os testes
npm run test

# Executar testes em modo watch (reexecuta quando arquivos mudam)
npm run test

# Executar testes uma única vez
npm run test:run

# Executar testes com interface gráfica
npm run test:ui

# Executar testes com relatório de cobertura
npm run test:coverage
```

### Executar Testes Específicos

```bash
# Executar testes de um arquivo específico
npm run test -- src/test/hooks/useTypingController.test.ts

# Executar testes que correspondem a um padrão
npm run test -- --grep "TypingArea"

# Executar testes em modo debug
npm run test -- --reporter=verbose
```

##  Cobertura de Testes

### Visualizar Relatório de Cobertura

```bash
npm run test:coverage
```

O relatório será gerado em:
- **Terminal**: Resumo da cobertura
- **HTML**: `coverage/index.html` (abra no navegador)
- **JSON**: `coverage/coverage-final.json`
