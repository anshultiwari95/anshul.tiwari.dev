'use client';

import { useState, useEffect } from 'react';

interface TerminalOutputProps {
  commandHistory: string[];
  terminalOutputs: string[];
  onTypewriterComplete: (isComplete: boolean) => void;
  useTypewriter?: boolean;
}

interface TypewriterTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
}

function TypewriterText({ text, speed = 50, onComplete }: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else {
      onComplete?.();
    }
  }, [currentIndex, text, speed, onComplete]);

  return <span>{displayText}</span>;
}

export default function TerminalOutput({ commandHistory, terminalOutputs, onTypewriterComplete, useTypewriter = false }: TerminalOutputProps) {
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [typewriterIndex, setTypewriterIndex] = useState(-1);

  useEffect(() => {
    if (terminalOutputs.length > 0 && useTypewriter) {
      setTypewriterIndex(terminalOutputs.length - 1);
      setShowTypewriter(true);
    } else {
      onTypewriterComplete(true);
    }
  }, [terminalOutputs, useTypewriter, onTypewriterComplete]);

  const handleTypewriterComplete = () => {
    setShowTypewriter(false);
    onTypewriterComplete(true);
  };

  return (
    <div className="h-full p-6 rounded-lg terminal-output" style={{ minHeight: '200px' }}>
      <div className="flex-1 overflow-y-auto" style={{ minHeight: '200px' }}>
        {commandHistory.map((command, index) => (
          <div key={index} className="mb-4" style={{ padding: '0.5rem 1.5rem' }}>
            <span className="text-lg" style={{ color: '#818cf8', textShadow: '0 0 3px #818cf8', fontWeight: 'bold', fontFamily: 'Source Code Pro, monospace' }}>anshul@portfolio:~$</span> <span className="text-lg" style={{ color: '#00ff00', textShadow: '0 0 3px #00ff00', fontFamily: 'Source Code Pro, monospace' }}>{command}</span>
            {terminalOutputs[index] && (
              <div className="whitespace-pre-line mt-2 text-lg leading-relaxed" style={{ color: '#ffffff', textShadow: '0 0 1px #ffffff', fontFamily: 'Source Code Pro, monospace' }}>
                {useTypewriter && showTypewriter && index === typewriterIndex ? (
                  <TypewriterText 
                    text={terminalOutputs[index]} 
                    speed={30} 
                    onComplete={handleTypewriterComplete}
                  />
                ) : (
                  terminalOutputs[index]
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 