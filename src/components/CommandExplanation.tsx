import React from 'react';
import { CommandData } from '../types';

interface CommandExplanationProps {
  commandData: CommandData;
}

const CommandExplanation: React.FC<CommandExplanationProps> = ({ commandData }) => {
  return (
    <div className="mt-6 bg-slate-800 p-4 rounded-md">
      <h2 className="text-xl font-semibold text-slate-200 mb-3">Explicação do Comando</h2>
      
      <div className="mb-4">
        <div className="font-mono bg-slate-900 p-3 rounded-md text-slate-300">
          {commandData.comando}
        </div>
      </div>

      <div className="space-y-3">
        {commandData.tokens.map((token, index) => {
          const commandPart = commandData.comando.substring(token.inicio, token.fim + 1);
          
          return (
            <div key={index} className="flex flex-col sm:flex-row sm:items-start gap-2 p-3 border-l-4 border-blue-500 pl-4 bg-slate-700/50 rounded-r-md">
              <div className="font-mono text-amber-400 whitespace-nowrap min-w-fit">
                <span className="bg-slate-900 px-2 py-1 rounded text-sm">
                  {commandPart}
                </span>
              </div>
              <div className="text-slate-200 leading-relaxed">
                {token.significado}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommandExplanation