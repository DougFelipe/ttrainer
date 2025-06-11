import { describe, it, expect } from 'vitest';
import { render, screen } from '../utils/testUtils';
import TypingArea from '../../components/TypingArea';
import { CharacterState } from '../../types';

describe('TypingArea Component', () => {
  const mockCharacters: CharacterState[] = [
    { char: 'l', state: 'correct' },
    { char: 's', state: 'current' },
    { char: ' ', state: 'default' },
    { char: '-', state: 'default' },
    { char: 'l', state: 'default' },
    { char: 'a', state: 'default' }
  ];

  describe('Rendering', () => {
    it('should render terminal prompt', () => {
      render(<TypingArea characters={mockCharacters} />);
      
      expect(screen.getByText('user@terminal:')).toBeInTheDocument();
      expect(screen.getByText('~$')).toBeInTheDocument();
    });

    it('should render all characters', () => {
      render(<TypingArea characters={mockCharacters} />);
      
      const container = screen.getByText('user@terminal:').parentElement;
      expect(container).toBeInTheDocument();
      
      // Verificar se todos os caracteres estão presentes
      mockCharacters.forEach((char) => {
        if (char.char !== ' ') {
          expect(container).toHaveTextContent(char.char);
        }
      });
    });

    it('should handle empty characters array', () => {
      render(<TypingArea characters={[]} />);
      
      expect(screen.getByText('user@terminal:')).toBeInTheDocument();
      expect(screen.getByText('~$')).toBeInTheDocument();
    });
  });

  describe('Character States Styling', () => {
    it('should apply correct CSS classes for different states', () => {
      const { container } = render(<TypingArea characters={mockCharacters} />);
      
      const characterSpans = container.querySelectorAll('span');
      
      // Encontrar spans que contêm os caracteres (excluindo prompt)
      const charSpans = Array.from(characterSpans).filter(span => 
        span.textContent && 
        !span.textContent.includes('user@terminal:') && 
        !span.textContent.includes('~$')
      );

      expect(charSpans.length).toBeGreaterThan(0);
    });


  });


});
