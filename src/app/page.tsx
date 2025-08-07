'use client';

import { useState } from 'react';
import Header from '../components/Header';
import ProfileCard from '../components/ProfileCard';
import Terminal from '../components/Terminal';
import MatrixBackground from '../components/MatrixBackground';

export default function Portfolio() {
  const [showMatrix, setShowMatrix] = useState(false);
  const [sudoMode, setSudoMode] = useState(false);

  return (
    <div className="h-screen bg-black text-green-400 relative overflow-hidden">
      <MatrixBackground showMatrix={showMatrix} />

      <div className="relative z-10 max-w-6xl mx-auto p-0 h-full flex flex-col terminal-container">
        <Header />

        <div className="flex-1 flex gap-0 terminal-layout">
          <ProfileCard />

          <div className="flex-1 min-w-0">
            <Terminal 
              showMatrix={showMatrix} 
              sudoMode={sudoMode}
              setShowMatrix={setShowMatrix}
              setSudoMode={setSudoMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 