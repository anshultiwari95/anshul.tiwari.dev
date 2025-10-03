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
  const [welcomeMessage] = useState('\nHi, I\'m Anshul Tiwari, a Software Engineer & AI Enthusiast.\n\nWelcome to my interactive hacker terminal portfolio! 🚀\n\nType \'help\' to see all available commands\nQuick commands: matrix, sudo, whoami, date, ls, pwd');
  const [isTypewriterComplete, setIsTypewriterComplete] = useState(true);
  const [useTypewriter, setUseTypewriter] = useState(false);
  const [pendingOutput, setPendingOutput] = useState<string | null>(null);

  const handleCommand = (command: string) => {
    if (command.trim()) {
      setCommandHistory(prev => [...prev, command]);
      setCurrentCommand('');
      
      const cmd = command.toLowerCase();
      
      // Disable typewriter effect and mark as incomplete to prevent flicker
      setUseTypewriter(false);
      setIsTypewriterComplete(false);
      
      // Process command after a brief delay
      setTimeout(() => {
        let output = '';
        switch (cmd) {
        case 'matrix':
          setShowMatrix(!showMatrix);
          if (!showMatrix) {
            output = `Matrix mode activated!]
Welcome to the digital realm...
Type 'matrix' again to disable.`;
          } else {
            output = `Matrix mode disabled. Welcome back to reality.`;
          }
          break;
        case 'sudo':
          setSudoMode(!sudoMode);
          if (!sudoMode) {
            output = `[sudo] password for anshul: ********
anshul is not in the sudoers file. This incident will be reported.
Just kidding! Admin mode activated. You now have root access!`;
          } else {
            output = `Admin mode disabled. Back to regular user privileges.`;
          }
          break;
        case 'clear':
          setTerminalOutputs([welcomeMessage]);
          setCommandHistory(['welcome']);
          setShowMatrix(false);
          setIsTypewriterComplete(true);
          setUseTypewriter(false);
          setPendingOutput(null);
          return; // Exit early for clear command
        case 'resume':
          const downloadResume = async () => {
            try {
              // Show downloading message
              setPendingOutput('Downloading resume...');
              setTerminalOutputs(prev => [...prev, '']);
              setUseTypewriter(true);
              
              // Create download link
              const link = document.createElement('a');
              link.href = '/Anshul_Tiwari_Resume.pdf'; // Correct path to public folder
              link.download = 'Anshul_Tiwari_Resume.pdf';
              link.target = '_blank';
              
              // Add link to DOM temporarily
              document.body.appendChild(link);
              
              // Trigger download
              link.click();
              
              // Clean up
              document.body.removeChild(link);
              
              // Show success message
              setTerminalOutputs(prev => [...prev.slice(0, -1), '✅ Resume downloaded successfully!']);
              setPendingOutput(null);
            } catch (error) {
              // Show error message if download fails
              setTerminalOutputs(prev => [...prev.slice(0, -1), '❌ Failed to download resume. Please try again.']);
              setPendingOutput(null);
              console.error('Resume download error:', error);
            }
          };
          
          downloadResume();
          return;
        default:
          output = commandOutputs[cmd] || `Command '${command}' not found. Type 'help' for available commands.`;
        }
        
        // Store the output and enable typewriter
        setPendingOutput(output);
        setTerminalOutputs(prev => [...prev, '']);
        // Only enable typewriter if not already enabled
        if (!useTypewriter) {
          setUseTypewriter(true);
        }
      }, 100);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
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
              pendingOutput={pendingOutput}
              onPendingOutputComplete={() => {
                if (pendingOutput) {
                  setTerminalOutputs(prev => [...prev.slice(0, -1), pendingOutput]);
                  setPendingOutput(null);
                  setUseTypewriter(false);
                }
              }}
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