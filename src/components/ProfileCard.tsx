"use client";
import Lanyard from './Lanyard';

export default function ProfileCard() {
  return (
    <div 
      className="terminal-sidebar h-full flex-shrink-0 flex-grow-0" 
      style={{ 
        border: '1px solid rgba(0, 255, 0, 0.3)', 
        borderRadius: '8px', 
        padding: '0',
        position: 'relative',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #0f0f0f 50%, #1a1a1a 100%)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '400px',
        minWidth: '400px',
        maxWidth: '400px'
      }}
    >
      <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
    </div>
  );
}
