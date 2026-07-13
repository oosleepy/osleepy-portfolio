import React, { useState, useEffect } from 'react';
import BootScreen from './BootScreen';
import { playBootHum, playClick } from '../utils/sfx';

export default function WakeUpSequence({ onComplete }) {
  const [phase, setPhase] = useState('black');
  const [bootFinished, setBootFinished] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (phase === 'black') {
      const t = setTimeout(() => setPhase('text1'), 400);
      return () => clearTimeout(t);
    }
    if (phase === 'text1') {
      const t = setTimeout(() => setPhase('text2'), 500);
      return () => clearTimeout(t);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'text1' || phase === 'text2') {
      const handleKey = () => {
        playClick();
        setPhase('fadeout');
      };
      window.addEventListener('keydown', handleKey);
      window.addEventListener('mousedown', handleKey);
      return () => {
        window.removeEventListener('keydown', handleKey);
        window.removeEventListener('mousedown', handleKey);
      };
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'fadeout') {
      const t = setTimeout(() => {
        setPhase('blinkOpen');
      }, 300);
      return () => clearTimeout(t);
    }
    if (phase === 'blinkOpen') {
      const t = setTimeout(() => {
        setPhase('blinkClose');
      }, 150);
      return () => clearTimeout(t);
    }
    if (phase === 'blinkClose') {
      const t = setTimeout(() => {
        setPhase('eyeOpen');
        playBootHum();
      }, 200);
      return () => clearTimeout(t);
    }
    if (phase === 'eyeOpen') {
      const t = setTimeout(() => {
        setPhase('done');
      }, 800);
      return () => clearTimeout(t);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'done' && bootFinished) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsExiting(true);
      const t = setTimeout(() => {
        onComplete();
      }, 1200); // smooth 1.2s fade to black before unmounting
      return () => clearTimeout(t);
    }
  }, [phase, bootFinished, onComplete]);

  return (
    <>
      {/* Final Fade Out Overlay */}
      <div 
        className="fixed inset-0 bg-black pointer-events-none z-[100000]"
        style={{
          opacity: isExiting ? 1 : 0,
          transition: 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      />
      <style>
        {`
          @keyframes slowPulse {
            0% { opacity: 0.8; text-shadow: 0 0 15px rgba(255, 255, 255, 0.7); }
            100% { opacity: 1.0; text-shadow: 0 0 30px rgba(255, 255, 255, 1); }
          }
          @keyframes slowBlink {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.8; }
          }
          
          @keyframes bubbleUp {
            0% { transform: translateY(10px) scale(0.5); opacity: 0; }
            20% { opacity: 0.8; }
            80% { opacity: 0.8; }
            100% { transform: translateY(-40px) scale(1.2); opacity: 0; }
          }
          
          @property --inner {
            syntax: '<percentage>';
            inherits: false;
            initial-value: 0%;
          }
          @property --outer {
            syntax: '<percentage>';
            inherits: false;
            initial-value: 40%;
          }
          
          .vignette-overlay {
            --inner: 0%;
            --outer: 40%;
            background: radial-gradient(circle, transparent var(--inner), black var(--outer));
            transition: --inner 0.8s cubic-bezier(0.4, 0, 0.2, 1), --outer 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .vignette-overlay.blink-open {
            --inner: 30%;
            --outer: 70%;
            transition: --inner 0.15s ease-out, --outer 0.15s ease-out;
          }
          .vignette-overlay.blink-close {
            --inner: 0%;
            --outer: 20%;
            transition: --inner 0.15s ease-in, --outer 0.15s ease-in;
          }
          
          .vignette-overlay.waking {
            --inner: 120%;
            --outer: 160%;
          }

          @keyframes wall-portal-spin {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
          }
          @keyframes wall-portal-spin-reverse {
            from { transform: rotate(360deg); }
            to { transform: rotate(0deg); }
          }
          @keyframes portal-breathe {
            0%, 100% { opacity: 0.07; filter: blur(0px); }
            50% { opacity: 0.14; filter: blur(1px); }
          }
          @keyframes neon-breathe {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
          }
          @keyframes monitor-glow-pulse {
            0%, 100% { box-shadow: 0 0 60px rgba(137,180,250,0.15), 0 0 120px rgba(203,166,247,0.08); }
            50% { box-shadow: 0 0 80px rgba(137,180,250,0.25), 0 0 160px rgba(203,166,247,0.15); }
          }
          @keyframes float-poster {
            0%, 100% { transform: rotate(-3deg) translateY(0px); }
            50% { transform: rotate(-3deg) translateY(-4px); }
          }
        `}
      </style>

      {/* The Room Scene (Simplified to just the terminal) */}
      <div className="fixed inset-0 z-[10] overflow-hidden" style={{ background: 'rgba(6, 6, 16, 0.75)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
        
        {/* Full-screen terminal */}
        <BootScreen 
          onComplete={() => setBootFinished(true)} 
          embedded={false} 
          start={phase === 'fadeout' || phase === 'blinkOpen' || phase === 'blinkClose' || phase === 'eyeOpen' || phase === 'done'} 
        />
        
        {/* Scanlines and RGB overlay */}
        <div className="absolute inset-0 pointer-events-none z-20" style={{ background: 'linear-gradient(transparent 50%, rgba(0, 0, 0, 0.12) 50%)', backgroundSize: '100% 4px' }} />
        <div className="absolute inset-0 pointer-events-none z-20 mix-blend-overlay opacity-20" style={{ background: 'linear-gradient(90deg, rgba(255,0,0,0.05), rgba(0,255,0,0.02), rgba(0,0,255,0.05))', backgroundSize: '3px 100%' }} />

        {/* Film grain */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-[50] opacity-[0.04]">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* Blur Layer */}
      {phase !== 'done' && (
        <div
          className="fixed inset-0 z-[9998] pointer-events-none"
          style={{
            backdropFilter: phase === 'eyeOpen' ? 'blur(0px)' : 'blur(12px)',
            WebkitBackdropFilter: phase === 'eyeOpen' ? 'blur(0px)' : 'blur(12px)',
            transition: 'backdrop-filter 0.8s ease-out, -webkit-backdrop-filter 0.8s ease-out',
          }}
        />
      )}

      {/* Vignette Overlay & Text */}
      {phase !== 'done' && (
        <div
          className={`vignette-overlay fixed inset-0 z-[9999] pointer-events-none flex flex-col 
            ${phase === 'blinkOpen' ? 'blink-open' : ''}
            ${phase === 'blinkClose' ? 'blink-close' : ''}
            ${phase === 'eyeOpen' ? 'waking' : ''}`}
        >
          {/* Text Container */}
          <div className="absolute inset-0 flex flex-col items-center justify-center font-mono text-center z-20">
            <div
              style={{
                color: '#ffffff',
                opacity: phase === 'text1' || phase === 'text2' ? 1 : 0,
                transition: 'opacity 0.3s ease-out',
                fontSize: '13px',
                letterSpacing: '0.4em',
                animation: (phase === 'text1' || phase === 'text2') ? 'slowPulse 4s infinite alternate' : 'none',
              }}
            >
              w a k e &nbsp; u p .
            </div>

            <div
              style={{
                color: '#bac2de', // subtext1 color
                opacity: phase === 'text2' ? 1 : 0,
                transition: 'opacity 0.3s ease-out',
                fontSize: '10px',
                letterSpacing: '0.2em',
                marginTop: '24px',
                animation: phase === 'text2' ? 'slowBlink 3s infinite' : 'none',
              }}
            >
              [ press any key ]
            </div>
          </div>
        </div>
      )}

      {/* Skip Button */}
      {phase !== 'done' && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onComplete();
          }}
          className="fixed bottom-8 right-8 z-[10000] text-[#bac2de] hover:text-[#cba6f7] font-mono text-xs opacity-80 hover:opacity-100 transition-all cursor-pointer uppercase tracking-widest border border-[#313244] hover:border-[#cba6f7]/50 bg-[#11111b]/80 px-3 py-1.5 rounded-lg"
        >
          [ skip to desktop ]
        </button>
      )}
    </>
  );
}
