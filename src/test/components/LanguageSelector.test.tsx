import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../utils/testUtils';
import LanguageSelector from '../../components/LanguageSelector';

describe('LanguageSelector Component', () => {
  const mockOnLanguageChange = vi.fn();

  beforeEach(() => {
    mockOnLanguageChange.mockClear();
  });

  describe('Rendering', () => {
    it('should render both language buttons', () => {
      render(
        <LanguageSelector 
          currentLanguage="linux" 
          onLanguageChange={mockOnLanguageChange} 
        />
      );
      
      expect(screen.getByText('Linux')).toBeInTheDocument();
      expect(screen.getByText('Dockerfile')).toBeInTheDocument();
    });

    it('should render icons for both languages', () => {
      render(
        <LanguageSelector 
          currentLanguage="linux" 
          onLanguageChange={mockOnLanguageChange} 
        />
      );
      
      // Verificar se os ícones estão presentes (através das classes SVG)
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(2);
      
      buttons.forEach(button => {
        expect(button.querySelector('svg')).toBeInTheDocument();
      });
    });
  });

  describe('Active State', () => {
    it('should highlight linux button when linux is selected', () => {
      render(
        <LanguageSelector 
          currentLanguage="linux" 
          onLanguageChange={mockOnLanguageChange} 
        />
      );
      
      const linuxButton = screen.getByText('Linux').closest('button');
      const dockerfileButton = screen.getByText('Dockerfile').closest('button');
      
      expect(linuxButton).toHaveClass('bg-blue-600', 'text-white');
      expect(dockerfileButton).toHaveClass('bg-slate-700', 'text-slate-300');
    });

    it('should highlight dockerfile button when dockerfile is selected', () => {
      render(
        <LanguageSelector 
          currentLanguage="dockerfile" 
          onLanguageChange={mockOnLanguageChange} 
        />
      );
      
      const linuxButton = screen.getByText('Linux').closest('button');
      const dockerfileButton = screen.getByText('Dockerfile').closest('button');
      
      expect(dockerfileButton).toHaveClass('bg-blue-600', 'text-white');
      expect(linuxButton).toHaveClass('bg-slate-700', 'text-slate-300');
    });
  });

  describe('Interactions', () => {
    it('should call onLanguageChange with linux when linux button is clicked', () => {
      render(
        <LanguageSelector 
          currentLanguage="dockerfile" 
          onLanguageChange={mockOnLanguageChange} 
        />
      );
      
      const linuxButton = screen.getByText('Linux');
      fireEvent.click(linuxButton);
      
      expect(mockOnLanguageChange).toHaveBeenCalledWith('linux');
      expect(mockOnLanguageChange).toHaveBeenCalledTimes(1);
    });

    it('should call onLanguageChange with dockerfile when dockerfile button is clicked', () => {
      render(
        <LanguageSelector 
          currentLanguage="linux" 
          onLanguageChange={mockOnLanguageChange} 
        />
      );
      
      const dockerfileButton = screen.getByText('Dockerfile');
      fireEvent.click(dockerfileButton);
      
      expect(mockOnLanguageChange).toHaveBeenCalledWith('dockerfile');
      expect(mockOnLanguageChange).toHaveBeenCalledTimes(1);
    });

    it('should handle multiple clicks correctly', () => {
      render(
        <LanguageSelector 
          currentLanguage="linux" 
          onLanguageChange={mockOnLanguageChange} 
        />
      );
      
      const dockerfileButton = screen.getByText('Dockerfile');
      const linuxButton = screen.getByText('Linux');
      
      fireEvent.click(dockerfileButton);
      fireEvent.click(linuxButton);
      fireEvent.click(dockerfileButton);
      
      expect(mockOnLanguageChange).toHaveBeenCalledTimes(3);
      expect(mockOnLanguageChange).toHaveBeenNthCalledWith(1, 'dockerfile');
      expect(mockOnLanguageChange).toHaveBeenNthCalledWith(2, 'linux');
      expect(mockOnLanguageChange).toHaveBeenNthCalledWith(3, 'dockerfile');
    });
  });

  describe('Accessibility', () => {
    it('should have proper button roles', () => {
      render(
        <LanguageSelector 
          currentLanguage="linux" 
          onLanguageChange={mockOnLanguageChange} 
        />
      );
      
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(2);
    });


  });

  describe('Styling', () => {
    it('should have proper layout classes', () => {
      const { container } = render(
        <LanguageSelector 
          currentLanguage="linux" 
          onLanguageChange={mockOnLanguageChange} 
        />
      );
      
      expect(container.firstChild).toHaveClass('flex', 'gap-4', 'mb-6');
    });

    it('should have hover states for inactive buttons', () => {
      render(
        <LanguageSelector 
          currentLanguage="linux" 
          onLanguageChange={mockOnLanguageChange} 
        />
      );
      
      const dockerfileButton = screen.getByText('Dockerfile').closest('button');
      expect(dockerfileButton).toHaveClass('hover:bg-slate-600');
    });
  });
});
