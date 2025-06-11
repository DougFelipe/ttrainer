import React from 'react';
import TypingArea from './TypingArea';
import MetricsPanel from './MetricsPanel';
import CommandExplanation from './CommandExplanation';
import useTypingController from '../hooks/useTypingController';
import { CommandData } from '../types';

interface TerminalTrainerProps {
  commandData: CommandData;
}

const TerminalTrainer: React.FC<TerminalTrainerProps> = ({ commandData }) => {
  const { characters, isCompleted, metrics, resetTyping } = useTypingController(commandData);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <MetricsPanel metrics={metrics} isCompleted={isCompleted} />
      <TypingArea characters={characters} />
      
      <CommandExplanation commandData={commandData} />
      
      {isCompleted && (
        <div className="mt-6 text-center">
          <button
            onClick={resetTyping}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors font-medium"
          >
            Reiniciar Comando
          </button>
        </div>
      )}
    </div>
  );
};

export default TerminalTrainer;