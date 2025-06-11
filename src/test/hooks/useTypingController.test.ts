import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useTypingController from '../../hooks/useTypingController';
import { CommandData } from '../../types';

const mockCommand: CommandData = {
  comando: 'ls -la',
  tokens: [
    { inicio: 0, fim: 1, significado: 'List command' },
    { inicio: 3, fim: 5, significado: 'Long format with hidden files' }
  ],
  language: 'linux'
};

describe('useTypingController Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock Date.now para testes consistentes
    vi.spyOn(Date, 'now').mockReturnValue(1000);
  });

  describe('Initialization', () => {
    it('should initialize with correct default state', () => {
      const { result } = renderHook(() => useTypingController(mockCommand));
      
      expect(result.current.characters).toHaveLength(mockCommand.comando.length);
      expect(result.current.isCompleted).toBe(false);
      expect(result.current.metrics.startTime).toBeNull();
      expect(result.current.metrics.errorCount).toBe(0);
      expect(result.current.metrics.accuracy).toBe(100);
    });

    it('should set first character as current', () => {
      const { result } = renderHook(() => useTypingController(mockCommand));
      
      expect(result.current.characters[0].state).toBe('current');
      expect(result.current.characters[0].char).toBe('l');
    });
  });

  describe('Character States', () => {
    it('should create character array from command', () => {
      const { result } = renderHook(() => useTypingController(mockCommand));
      
      const expectedChars = ['l', 's', ' ', '-', 'l', 'a'];
      result.current.characters.forEach((char, index) => {
        expect(char.char).toBe(expectedChars[index]);
      });
    });

    it('should handle spaces correctly', () => {
      const { result } = renderHook(() => useTypingController(mockCommand));
      
      const spaceChar = result.current.characters[2];
      expect(spaceChar.char).toBe(' ');
      expect(spaceChar.state).toBe('default');
    });
  });

  describe('Metrics Calculation', () => {
    it('should start timer on first keypress', () => {
      const { result } = renderHook(() => useTypingController(mockCommand));
      
      act(() => {
        // Simular primeiro keypress
        const event = new KeyboardEvent('keydown', { key: 'l' });
        window.dispatchEvent(event);
      });
      
      expect(result.current.metrics.startTime).toBe(1000);
    });

    it('should calculate accuracy correctly', () => {
      const { result } = renderHook(() => useTypingController(mockCommand));
      
      // Simular digitação com erro
      act(() => {
        const event1 = new KeyboardEvent('keydown', { key: 'x' }); // erro
        window.dispatchEvent(event1);
      });
      
      expect(result.current.metrics.errorCount).toBe(1);
    });
  });

  describe('Reset Functionality', () => {
    it('should reset to initial state', () => {
      const { result } = renderHook(() => useTypingController(mockCommand));
      
      // Simular alguma digitação
      act(() => {
        const event = new KeyboardEvent('keydown', { key: 'l' });
        window.dispatchEvent(event);
      });
      
      // Reset
      act(() => {
        result.current.resetTyping();
      });
      
      expect(result.current.characters[0].state).toBe('current');
      expect(result.current.isCompleted).toBe(false);
      expect(result.current.metrics.startTime).toBeNull();
      expect(result.current.metrics.errorCount).toBe(0);
    });
  });


});
