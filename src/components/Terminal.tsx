'use client';

import { useState } from 'react';
import CommandMenu from './CommandMenu';
import TerminalOutput from './TerminalOutput';
import TerminalInput from './TerminalInput';
import commandOutputs from './CommandOutputs';

interface TerminalProps {
  showMatrix: boolean;
  sudoMode: boolean;
  setShowMatrix: (show: boolean) => void;
  setSudoMode: (sudo: boolean) => void;
}

export default function Terminal({ showMatrix, sudoMode, setShowMatrix, setSudoMode }: TerminalProps) {
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>(['welcome']);
  const [terminalOutputs, setTerminalOutputs] = useState<string[]>(['\nHi, I\'m Anshul Tiwari, a Software Engineer & AI Enthusiast.\n\nWelcome to my interactive hacker terminal portfolio! 🚀\n\nType \'help\' to see all available commands\nQuick commands: matrix, sudo, whoami, date, ls, pwd']);
  const [isTypewriterComplete, setIsTypewriterComplete] = useState(true);
  const [useTypewriter, setUseTypewriter] = useState(false);

  const handleCommand = (command: string) => {
    if (command.trim()) {
      setCommandHistory(prev => [...prev, command]);
      setCurrentCommand('');
      
      const cmd = command.toLowerCase();
      
      setIsTypewriterComplete(true);
      
      switch (cmd) {
        case 'matrix':
          setShowMatrix(!showMatrix);
          if (!showMatrix) {
            setTerminalOutputs(prev => [...prev, `Matrix mode activated!]
Welcome to the digital realm...
Type 'matrix' again to disable.`]);
          } else {
            setTerminalOutputs(prev => [...prev, `Matrix mode disabled. Welcome back to reality.`]);
          }
          break;
        case 'sudo':
          setSudoMode(!sudoMode);
          if (!sudoMode) {
            setTerminalOutputs(prev => [...prev, `[sudo] password for anshul: ********
anshul is not in the sudoers file. This incident will be reported.
Just kidding! Admin mode activated. You now have root access!`]);
          } else {
            setTerminalOutputs(prev => [...prev, `Admin mode disabled. Back to regular user privileges.`]);
          }
          break;
        case 'clear':
          setTerminalOutputs([]);
          setCommandHistory([]);
          setShowMatrix(false);
          setIsTypewriterComplete(true);
          break;
        case 'resume':
          const downloadResume = async () => {
            const messages = ['Downloading resume...', 'Downloading resume.', 'Downloading resume..', 'Downloading resume...'];
            for (let i = 0; i < messages.length; i++) {
              setTerminalOutputs(prev => [...prev.slice(0, -1), messages[i]]);
              await new Promise(resolve => setTimeout(resolve, 500));
            }
            const link = document.createElement('a');
            link.href = '/resume.pdf';
            link.download = 'Anshul_Tiwari_Resume.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setTerminalOutputs(prev => [...prev.slice(0, -1), 'Resume downloaded successfully!']);
          };
          setTerminalOutputs(prev => [...prev, 'Downloading resume...']);
          downloadResume();
          break;
        default:
          const response = commandOutputs[cmd] || `Command '${command}' not found. Type 'help' for available commands.`;
          setTerminalOutputs(prev => [...prev, response]);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setUseTypewriter(true);
      handleCommand(currentCommand);
    }
  };

  return (
    <div className="w-full h-full terminal-main">
      <div 
        className="h-full rounded-lg p-8 flex flex-col terminal-glow" 
        style={{
          border: '1px solid rgba(0, 255, 0, 0.3)',
          borderRadius: '8px'
        }}
      >
        <div className="flex items-center gap-3 mb-8 px-2 flex-shrink-0">
          <div className="w-4 h-4 bg-red-500 rounded-full terminal-controls"></div>
          <div className="w-4 h-4 bg-yellow-500 rounded-full terminal-controls"></div>
          <div className="w-4 h-4 bg-green-500 rounded-full terminal-controls"></div>
          {sudoMode && <span className="ml-auto text-red-400 text-sm">[ROOT]</span>}
        </div>

        <div className="mb-8 flex-shrink-0">
          <CommandMenu onCommand={(command) => {
            setUseTypewriter(true);
            setCurrentCommand(command);
            handleCommand(command);
          }} />
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto" style={{ minHeight: '200px', maxHeight: 'calc(100vh - 300px)' }}>
            <TerminalOutput 
              commandHistory={commandHistory}
              terminalOutputs={terminalOutputs}
              onTypewriterComplete={setIsTypewriterComplete}
              useTypewriter={useTypewriter}
            />
          </div>
          
          <div 
            className="mt-2 flex-shrink-0 bg-black" 
            style={{ borderTop: '1px solid rgba(0, 255, 0, 0.3)' }}
            onClick={() => {
              const input = document.querySelector('.terminal-input') as HTMLInputElement;
              if (input && isTypewriterComplete) {
                input.focus();
              }
            }}
          >
            <TerminalInput
              currentCommand={currentCommand}
              onCommandChange={setCurrentCommand}
              onKeyPress={handleKeyPress}
              disabled={!isTypewriterComplete}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 