export interface CommandToken {
  inicio: number;
  fim: number;
  significado: string;
}

export interface CommandData {
  comando: string;
  tokens: CommandToken[];
  language: 'linux' | 'dockerfile';
}

export interface CharacterState {
  char: string;
  state: 'default' | 'correct' | 'incorrect' | 'current';
}

export interface TypingMetrics {
  startTime: number | null;
  endTime: number | null;
  errorCount: number;
  accuracy: number;
  totalTime: number;
}