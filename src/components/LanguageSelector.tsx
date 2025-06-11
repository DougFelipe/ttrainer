import React from 'react';
import { CommandData } from '../types';
import { Terminal, FileCode } from 'lucide-react';

interface LanguageSelectorProps {
  currentLanguage: 'linux' | 'dockerfile';
  onLanguageChange: (language: 'linux' | 'dockerfile') => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange
}) => {
  return (
    <div className="flex gap-4 mb-6">
      <button
        onClick={() => onLanguageChange('linux')}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
          currentLanguage === 'linux'
            ? 'bg-blue-600 text-white'
            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
        }`}
      >
        <Terminal size={18} />
        <span>Linux</span>
      </button>
      <button
        onClick={() => onLanguageChange('dockerfile')}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
          currentLanguage === 'dockerfile'
            ? 'bg-blue-600 text-white'
            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
        }`}
      >
        <FileCode size={18} />
        <span>Dockerfile</span>
      </button>
    </div>
  );
};

export default LanguageSelector