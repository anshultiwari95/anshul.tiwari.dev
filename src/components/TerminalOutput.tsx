'use client';

import { useState, useEffect, useRef } from 'react';

interface TerminalOutputProps {
  commandHistory: string[];
  terminalOutputs: string[];
  onTypewriterComplete: (isComplete: boolean) => void;
  useTypewriter?: boolean;
  pendingOutput?: string | null;
  onPendingOutputComplete?: () => void;
}

interface TypewriterTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  onTextUpdate?: () => void;
}

function TypewriterText({ text, speed = 50, onComplete, onTextUpdate }: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
        onTextUpdate?.(); // Trigger scroll update
      }, speed);
      return () => clearTimeout(timer);
    } else {
      onComplete?.();
    }
  }, [currentIndex, text, speed, onComplete, onTextUpdate]);

  return <span>{displayText}</span>;
}

export default function TerminalOutput({ commandHistory, terminalOutputs, onTypewriterComplete, useTypewriter = false, pendingOutput, onPendingOutputComplete }: TerminalOutputProps) {
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [typewriterIndex, setTypewriterIndex] = useState(-1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const typewriterRunningRef = useRef(false);

  useEffect(() => {
    if (pendingOutput && useTypewriter && !showTypewriter && !typewriterRunningRef.current) {
      // Set the typewriter index immediately but delay showing the typewriter
      setTypewriterIndex(terminalOutputs.length - 1);
      typewriterRunningRef.current = true;
      const timer = setTimeout(() => {
        setShowTypewriter(true);
      }, 100);
      return () => clearTimeout(timer);
    } else if (!useTypewriter) {
      setShowTypewriter(false);
      setTypewriterIndex(-1);
      typewriterRunningRef.current = false;
      onTypewriterComplete(true);
    }
  }, [pendingOutput, useTypewriter, onTypewriterComplete, showTypewriter, terminalOutputs.length]);

  // Auto-scroll to bottom when new content is added
  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [terminalOutputs, commandHistory]);

  const handleTypewriterComplete = () => {
    setShowTypewriter(false);
    typewriterRunningRef.current = false;
    if (pendingOutput && onPendingOutputComplete) {
      onPendingOutputComplete();
    }
    onTypewriterComplete(true);
  };

  return (
    <div className="h-full p-6 rounded-lg terminal-output" style={{ minHeight: '200px' }}>
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto" style={{ minHeight: '200px' }}>
        {commandHistory.map((command, index) => (
          <div key={index} className="mb-4" style={{ padding: '0.5rem 1.5rem' }}>
            <span className="text-lg" style={{ color: '#818cf8', textShadow: '0 0 3px #818cf8', fontWeight: 'bold', fontFamily: 'Source Code Pro, monospace' }}>anshul@portfolio:~$</span> <span className="text-lg" style={{ color: '#00ff00', textShadow: '0 0 3px #00ff00', fontFamily: 'Source Code Pro, monospace' }}>{command}</span>
            {(terminalOutputs[index] || (pendingOutput && index === terminalOutputs.length - 1)) && (
              <div className="whitespace-pre-line mt-2 text-lg leading-relaxed" style={{ color: '#ffffff', textShadow: '0 0 1px #ffffff', fontFamily: 'Source Code Pro, monospace' }}>
                {useTypewriter && showTypewriter && index === typewriterIndex && pendingOutput ? (
                  <TypewriterText 
                    text={pendingOutput} 
                    speed={30} 
                    onComplete={handleTypewriterComplete}
                    onTextUpdate={scrollToBottom}
                  />
                ) : useTypewriter && showTypewriter && index === typewriterIndex && terminalOutputs[index] ? (
                  <TypewriterText 
                    text={terminalOutputs[index]} 
                    speed={30} 
                    onComplete={handleTypewriterComplete}
                    onTextUpdate={scrollToBottom}
                  />
                ) : useTypewriter && index === typewriterIndex ? (
                  <span style={{ visibility: 'hidden' }}>{pendingOutput || terminalOutputs[index]}</span>
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