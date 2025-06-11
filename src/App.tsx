import React, { useState, useCallback } from 'react';
import TerminalTrainer from './components/TerminalTrainer';
import LanguageSelector from './components/LanguageSelector';
import { commandLibrary } from './data/commands';

function App() {
  const [currentLanguage, setCurrentLanguage] = useState<'linux' | 'dockerfile'>('linux');
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);

  const filteredCommands = commandLibrary.filter(cmd => cmd.language === currentLanguage);

  const handleLanguageChange = useCallback((language: 'linux' | 'dockerfile') => {
    setCurrentLanguage(language);
    setCurrentCommandIndex(0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-200 mb-2">Terminal Trainer</h1>
          <p className="text-slate-400 text-lg">
            Digite o comando exatamente como mostrado. Pressione as teclas para começar.
          </p>
        </div>

        <LanguageSelector
          currentLanguage={currentLanguage}
          onLanguageChange={handleLanguageChange}
        />

        <TerminalTrainer commandData={filteredCommands[currentCommandIndex]} />
        
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-3 bg-slate-800 p-3 rounded-lg">
            <label className="text-slate-300 font-medium">Comando:</label>
            <select 
              className="bg-slate-700 text-slate-200 p-2 rounded-md border border-slate-600 focus:border-blue-500 focus:outline-none"
              value={currentCommandIndex}
              onChange={(e) => setCurrentCommandIndex(Number(e.target.value))}
            >
              {filteredCommands.map((cmd, index) => (
                <option key={index} value={index}>
                  {cmd.comando}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <footer className="mt-12 text-slate-500 text-sm">
        <p>Terminal Trainer © 2025 • Inspirado por Monkeytype</p>
      </footer>
    </div>
  );
}

export default App