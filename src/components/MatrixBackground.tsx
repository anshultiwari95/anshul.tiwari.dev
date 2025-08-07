'use client';

interface MatrixBackgroundProps {
  showMatrix: boolean;
}

export default function MatrixBackground({ showMatrix }: MatrixBackgroundProps) {
  if (!showMatrix) return null;

  return (
    <div className="matrix-bg fixed inset-0 pointer-events-none z-0" style={{ zIndex: -1 }}>
      {Array.from({ length: 250 }).map((_, i) => (
        <div
          key={i}
          className="matrix-char"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${1.5 + Math.random() * 1}s`
          }}
        >
          {String.fromCharCode(65 + Math.random() * 26)}
        </div>
      ))}
    </div>
  );
} 