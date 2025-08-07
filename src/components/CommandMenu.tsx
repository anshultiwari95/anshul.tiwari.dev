'use client';

interface CommandMenuProps {
  onCommand: (command: string) => void;
}

export default function CommandMenu({ onCommand }: CommandMenuProps) {
  const commands = [
    { name: 'help', color: '#00ff00' },
    { name: 'about', color: '#00ffff' },
    { name: 'skills', color: '#00ff00' },
    { name: 'projects', color: '#00ffff' },
    { name: 'experience', color: '#00ff00' },
    { name: 'certs', color: '#00ffff' },
    { name: 'contact', color: '#00ff00' },
    { name: 'resume', color: '#00ffff' },
    { name: 'whoami', color: '#00ff00' },
    { name: 'date', color: '#00ffff' },
    { name: 'ls', color: '#00ff00' },
    { name: 'pwd', color: '#00ffff' },
    { name: 'matrix', color: '#00ff00' },
    { name: 'sudo', color: '#00ffff' },
    { name: 'clear', color: '#00ff00' }
  ];

  return (
    <div 
      className="mb-6 rounded-lg" 
      style={{ 
        padding: '1.5rem',
        border: '1px solid rgba(0, 255, 0, 0.3)',
        borderRadius: '8px'
      }}
    >
      <div className="text-green-400 text-sm flex flex-wrap w-full command-menu" style={{ gap: '1rem' }}>
        {commands.map((command, index) => (
          <span key={command.name}>
            <span 
              className="command-hover" 
              style={{ color: command.color }} 
              onClick={() => onCommand(command.name)}
            >
              {command.name}
            </span>
            {index < commands.length - 1 && <span className="text-green-400">|</span>}
          </span>
        ))}
      </div>
    </div>
  );
} 