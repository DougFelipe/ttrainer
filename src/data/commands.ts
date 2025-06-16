import { CommandData } from '../types';

// Linux Commands
const linuxCommands: CommandData[] = [
  {
    comando: "tar -czvf backup.tar.gz pasta/",
    tokens: [
      { inicio: 0, fim: 2, significado: "Utilitário para empacotar arquivos" },
      { inicio: 4, fim: 8, significado: "Flags: -c (create), -z (gzip), -v (verbose), -f (file)" },
      { inicio: 10, fim: 22, significado: "Nome do arquivo final compactado" },
      { inicio: 24, fim: 29, significado: "Diretório a ser compactado" }
    ],
    language: 'linux'
  },
  {
    comando: "find . -name '*.txt' -type f",
    tokens: [
      { inicio: 0, fim: 3, significado: "Comando para buscar arquivos e diretórios" },
      { inicio: 5, fim: 5, significado: "Diretório atual (ponto)" },
      { inicio: 7, fim: 18, significado: "Busca por arquivos com nome específico" },
      { inicio: 20, fim: 26, significado: "Filtra apenas por arquivos (não diretórios)" }
    ],
    language: 'linux'
  },
  {
    comando: "grep -r 'palavra' --include='*.js' .",
    tokens: [
      { inicio: 0, fim: 3, significado: "Comando para buscar texto em arquivos" },
      { inicio: 5, fim: 6, significado: "Flag recursiva (busca em subdiretórios)" },
      { inicio: 8, fim: 16, significado: "Texto a ser buscado" },
      { inicio: 17, fim: 32, significado: "Filtro para incluir apenas arquivos JavaScript" },
      { inicio: 34, fim: 35, significado: "Diretório atual (ponto)" }
    ],
    language: 'linux'
  },
  {
    comando: "chmod -R 755 /var/www/html/",
    tokens: [
      { inicio: 0, fim: 4, significado: "Comando para modificar permissões" },
      { inicio: 6, fim: 7, significado: "Flag recursiva (aplica em subdiretórios)" },
      { inicio: 9, fim: 11, significado: "Permissões em octal (rwxr-xr-x)" },
      { inicio: 13, fim: 26, significado: "Caminho do diretório web" }
    ],
    language: 'linux'
  }
];

// Dockerfile Commands
const dockerfileCommands: CommandData[] = [
  {
    comando: "FROM node:18-alpine AS builder",
    tokens: [
      { inicio: 0, fim: 3, significado: "Instrução para definir a imagem base" },
      { inicio: 5, fim: 18, significado: "Imagem Node.js Alpine" },
      { inicio: 19, fim: 29, significado: "Define um estágio de build" }
    ],
    language: 'dockerfile'
  },
  {
    comando: "COPY --chown=node:node . /app",
    tokens: [
      { inicio: 0, fim: 3, significado: "Instrução para copiar arquivos" },
      { inicio: 5, fim: 21, significado: "Define o proprietário dos arquivos" },
      { inicio: 23, fim: 23, significado: "Diretório atual (origem)" },
      { inicio: 25, fim: 28, significado: "Diretório de destino na imagem" }
    ],
    language: 'dockerfile'
  },
  {
    comando: "RUN npm ci && npm run build",
    tokens: [
      { inicio: 0, fim: 2, significado: "Instrução para executar comandos" },
      { inicio: 4, fim: 9, significado: "Instala dependências de forma limpa" },
      { inicio: 11, fim: 12, significado: "Operador lógico AND (executa se anterior for bem-sucedido)" },
      { inicio: 14, fim: 25, significado: "Compila a aplicação" }
    ],
    language: 'dockerfile'
  }
];

// Validate command tokens
const validateCommandTokens = (command: CommandData): CommandData => {
  const { comando, tokens } = command;
  
  return {
    ...command,
    tokens: tokens.map(token => ({
      ...token,
      significado: token.significado.trim(),
      inicio: token.inicio,
      fim: Math.min(token.fim, comando.length - 1)
    }))
  };
};

// Export validated commands
export const commandLibrary = [
  ...linuxCommands.map(validateCommandTokens),
  ...dockerfileCommands.map(validateCommandTokens)
];
