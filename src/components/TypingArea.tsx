import React from 'react';
import { CharacterState } from '../types';

interface TypingAreaProps {
  characters: CharacterState[];
}

const TypingArea: React.FC<TypingAreaProps> = ({ characters }) => {
  return (
    <div className="font-mono bg-slate-800 p-4 rounded-md text-left w-full overflow-x-auto">
      <div className="flex items-center">
        <span className="text-green-400 mr-2">user@terminal:</span>
        <span className="text-blue-400 mr-2">~$</span>
        <span className="mr-1"></span>
        <div className="flex">
          {characters.map((char, index) => (
            <span
              key={index}
              className={`${
                char.state === 'default' ? 'text-slate-300' :
                char.state === 'correct' ? 'text-green-400' :
                char.state === 'incorrect' ? 'text-red-400 bg-red-900/30' :
                'text-slate-300 bg-slate-600 animate-pulse'
              } ${char.char === ' ' ? 'min-w-[0.5rem]' : ''}`}
            >
              {char.char === ' ' ? '\u00A0' : char.char}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TypingArea;