import { describe, it, expect } from 'vitest';
import { render, screen } from '../utils/testUtils';
import CommandExplanation from '../../components/CommandExplanation';
import { CommandData } from '../../types';

describe('CommandExplanation Component', () => {
  const mockCommand: CommandData = {
    comando: 'tar -czvf backup.tar.gz pasta/',
    tokens: [
      { inicio: 0, fim: 2, significado: 'Utilitário para empacotar arquivos' },
      { inicio: 4, fim: 8, significado: 'Flags: -c (create), -z (gzip), -v (verbose), -f (file)' },
      { inicio: 10, fim: 22, significado: 'Nome do arquivo final compactado' },
      { inicio: 24, fim: 29, significado: 'Diretório a ser compactado' }
    ],
    language: 'linux'
  };

  describe('Rendering', () => {
    it('should render explanation title', () => {
      render(<CommandExplanation commandData={mockCommand} />);
      
      expect(screen.getByText('Explicação do Comando')).toBeInTheDocument();
    });

    it('should display the full command', () => {
      render(<CommandExplanation commandData={mockCommand} />);
      
      expect(screen.getByText(mockCommand.comando)).toBeInTheDocument();
    });

    it('should render all token explanations', () => {
      render(<CommandExplanation commandData={mockCommand} />);
      
      mockCommand.tokens.forEach((token) => {
        expect(screen.getByText(token.significado)).toBeInTheDocument();
      });
    });
  });

  describe('Token Extraction', () => {
    it('should correctly extract command parts from tokens', () => {
      render(<CommandExplanation commandData={mockCommand} />);
      
      // Verificar se as partes do comando são extraídas corretamente
      expect(screen.getByText('tar')).toBeInTheDocument();
      expect(screen.getByText('-czvf')).toBeInTheDocument();
      expect(screen.getByText('backup.tar.gz')).toBeInTheDocument();
      expect(screen.getByText('pasta/')).toBeInTheDocument();
    });

    it('should handle tokens with spaces', () => {
      const commandWithSpaces: CommandData = {
        comando: 'ls -la /home',
        tokens: [
          { inicio: 0, fim: 1, significado: 'List command' },
          { inicio: 3, fim: 5, significado: 'Long format with hidden files' },
          { inicio: 7, fim: 11, significado: 'Home directory path' }
        ],
        language: 'linux'
      };

      render(<CommandExplanation commandData={commandWithSpaces} />);
      
      expect(screen.getByText('ls')).toBeInTheDocument();
      expect(screen.getByText('-la')).toBeInTheDocument();
      expect(screen.getByText('/home')).toBeInTheDocument();
    });
  });

  describe('Styling and Layout', () => {
    it('should have proper CSS classes for layout', () => {
      const { container } = render(<CommandExplanation commandData={mockCommand} />);
      
      expect(container.firstChild).toHaveClass('mt-6', 'bg-slate-800', 'p-4', 'rounded-md');
    });



    it('should use proper color classes', () => {
      render(<CommandExplanation commandData={mockCommand} />);
      
      const title = screen.getByText('Explicação do Comando');
      expect(title).toHaveClass('text-slate-200');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty tokens array', () => {
      const emptyTokensCommand: CommandData = {
        comando: 'pwd',
        tokens: [],
        language: 'linux'
      };

      render(<CommandExplanation commandData={emptyTokensCommand} />);
      
      expect(screen.getByText('Explicação do Comando')).toBeInTheDocument();
      expect(screen.getByText('pwd')).toBeInTheDocument();
    });



    it('should handle special characters in commands', () => {
      const specialCharCommand: CommandData = {
        comando: 'grep "test" file.txt',
        tokens: [
          { inicio: 0, fim: 3, significado: 'Search command' },
          { inicio: 5, fim: 10, significado: 'Search pattern' },
          { inicio: 12, fim: 19, significado: 'Target file' }
        ],
        language: 'linux'
      };

      render(<CommandExplanation commandData={specialCharCommand} />);
      
      expect(screen.getByText('grep')).toBeInTheDocument();
      expect(screen.getByText('"test"')).toBeInTheDocument();
      expect(screen.getByText('file.txt')).toBeInTheDocument();
    });
  });
});
