import { describe, it, expect } from 'vitest';
import { commandLibrary } from '../../data/commands';
import { CommandData } from '../../types';

describe('Commands Data', () => {
  describe('Command Library Structure', () => {
    it('should have commands available', () => {
      expect(commandLibrary).toBeDefined();
      expect(commandLibrary.length).toBeGreaterThan(0);
    });

    it('should have both linux and dockerfile commands', () => {
      const linuxCommands = commandLibrary.filter(cmd => cmd.language === 'linux');
      const dockerfileCommands = commandLibrary.filter(cmd => cmd.language === 'dockerfile');
      
      expect(linuxCommands.length).toBeGreaterThan(0);
      expect(dockerfileCommands.length).toBeGreaterThan(0);
    });

    it('should have valid command structure', () => {
      commandLibrary.forEach((command: CommandData) => {
        expect(command).toHaveProperty('comando');
        expect(command).toHaveProperty('tokens');
        expect(command).toHaveProperty('language');
        
        expect(typeof command.comando).toBe('string');
        expect(command.comando.length).toBeGreaterThan(0);
        expect(Array.isArray(command.tokens)).toBe(true);
        expect(['linux', 'dockerfile']).toContain(command.language);
      });
    });
  });


  describe('Specific Commands', () => {
    it('should have tar command with correct structure', () => {
      const tarCommand = commandLibrary.find(cmd => 
        cmd.comando.includes('tar') && cmd.language === 'linux'
      );
      
      expect(tarCommand).toBeDefined();
      expect(tarCommand?.comando).toContain('tar');
      expect(tarCommand?.tokens.length).toBeGreaterThan(0);
    });

    it('should have dockerfile FROM command', () => {
      const fromCommand = commandLibrary.find(cmd => 
        cmd.comando.startsWith('FROM') && cmd.language === 'dockerfile'
      );
      
      expect(fromCommand).toBeDefined();
      expect(fromCommand?.comando).toMatch(/^FROM/);
      expect(fromCommand?.tokens.length).toBeGreaterThan(0);
    });
  });
});
