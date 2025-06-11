import { useState, useEffect, useCallback } from 'react';
import { CharacterState, CommandData, TypingMetrics } from '../types';

const useTypingController = (commandData: CommandData) => {
  const [characters, setCharacters] = useState<CharacterState[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [metrics, setMetrics] = useState<TypingMetrics>({
    startTime: null,
    endTime: null,
    errorCount: 0,
    accuracy: 100,
    totalTime: 0
  });

  // Initialize characters array from command
  useEffect(() => {
    const chars = commandData.comando.split('').map((char) => ({
      char,
      state: 'default' as const
    }));
    
    if (chars.length > 0) {
      chars[0].state = 'current';
    }
    
    setCharacters(chars);
    setCurrentIndex(0);
    setIsCompleted(false);
    setMetrics({
      startTime: null,
      endTime: null,
      errorCount: 0,
      accuracy: 100,
      totalTime: 0
    });
  }, [commandData]);

  // Handle keyboard input
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (isCompleted) return;
    
    // Prevent default behavior for certain keys
    if (event.key === 'Backspace' || event.key === ' ') {
      event.preventDefault();
    }
    
    // Start timer on first keypress
    if (metrics.startTime === null) {
      setMetrics(prev => ({ ...prev, startTime: Date.now() }));
    }

    if (event.key === 'Backspace') {
      // Handle backspace logic
      if (currentIndex > 0) {
        setCharacters(prev => {
          const newChars = [...prev];
          newChars[currentIndex].state = 'default';
          newChars[currentIndex - 1].state = 'current';
          return newChars;
        });
        setCurrentIndex(prev => prev - 1);
      }
      return;
    }

    // Only process if it's a single character key (ignore special keys like Shift, Alt, etc.)
    if (event.key.length === 1) {
      const expectedChar = commandData.comando[currentIndex];
      
      // Strict character comparison - including spaces
      const isCorrect = event.key === expectedChar;
      
      setCharacters(prev => {
        const newChars = [...prev];
        newChars[currentIndex].state = isCorrect ? 'correct' : 'incorrect';
        
        // Mark next character as current if not at the end
        if (currentIndex < commandData.comando.length - 1) {
          newChars[currentIndex + 1].state = 'current';
        }
        
        return newChars;
      });
      
      // Update metrics if incorrect
      if (!isCorrect) {
        setMetrics(prev => ({
          ...prev,
          errorCount: prev.errorCount + 1,
        }));
      }
      
      // Move to next character or complete if at end
      if (currentIndex < commandData.comando.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        // Command completed
        const endTime = Date.now();
        const totalTime = (endTime - (metrics.startTime || endTime)) / 1000;
        const totalChars = commandData.comando.length;
        const accuracy = ((totalChars - metrics.errorCount) / totalChars) * 100;
        
        setMetrics(prev => ({
          ...prev,
          endTime,
          totalTime,
          accuracy: Math.max(0, accuracy)
        }));
        
        setIsCompleted(true);
      }
    }
  }, [currentIndex, commandData.comando, isCompleted, metrics.startTime, metrics.errorCount]);

  // Set up and clean up keyboard event listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  // Reset the typing exercise
  const resetTyping = useCallback(() => {
    const chars = commandData.comando.split('').map((char) => ({
      char,
      state: 'default' as const
    }));
    
    if (chars.length > 0) {
      chars[0].state = 'current';
    }
    
    setCharacters(chars);
    setCurrentIndex(0);
    setIsCompleted(false);
    setMetrics({
      startTime: null,
      endTime: null,
      errorCount: 0,
      accuracy: 100,
      totalTime: 0
    });
  }, [commandData]);

  return {
    characters,
    currentIndex,
    isCompleted,
    metrics,
    resetTyping
  };
};

export default useTypingController;