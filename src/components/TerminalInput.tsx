'use client';

import { useRef, useEffect } from 'react';

interface TerminalInputProps {
  currentCommand: string;
  onCommandChange: (command: string) => void;
  onCommandSubmit: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  disabled?: boolean;
}

export default function TerminalInput({ 
  currentCommand, 
  onCommandChange, 
  onCommandSubmit, 
  onKeyPress,
  disabled = false
}: TerminalInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex items-center gap-2 terminal-input-container" style={{ padding: '0.5rem 1.5rem' }}>
      <span className="text-lg terminal-prompt" style={{ color: '#818cf8', textShadow: '0 0 3px #818cf8', fontWeight: 'bold' }}>anshul@portfolio:~$</span>
      <div className="flex-1 relative">
        <input
          ref={inputRef}
          type="text"
          value={currentCommand}
          onChange={(e) => {
            onCommandChange(e.target.value);
          }}
          onKeyPress={onKeyPress}
          disabled={disabled}
          className={`w-full bg-transparent text-lg outline-none terminal-input ${disabled ? 'opacity-50' : ''}`}
          style={{ 
            fontFamily: 'Source Code Pro, monospace',
            fontSize: '1rem',
            caretColor: 'transparent',
            cursor: disabled ? 'not-allowed' : 'text'
          }}
          placeholder=""
        />
        <span 
          className="absolute top-0 cursor-blink" 
          style={{ 
            left: `${currentCommand.length * 0.6}rem`,
            backgroundColor: '#00ff00',
            width: '8px',
            height: '1.2em',
            display: 'inline-block',
            verticalAlign: 'text-bottom'
          }}
        ></span>
      </div>
    </div>
  );
} 