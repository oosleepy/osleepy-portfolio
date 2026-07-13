import React, { useState, useEffect } from 'react';
import { playKeypress } from '../utils/sfx';

const BOOT_LINES = [
  { time: '0.000000', status: 'info', text: 'Multiverse OS v1.0.4-c137 (osleepy@arch)' },
  { time: '0.021034', status: 'ok', text: 'Central Finite Curve: Bypassed.' },
  { time: '0.104231', status: 'warn', text: 'GRAVITY_FALLS_API: Weirdness wave detected in Sector 8' },
  { time: '0.420112', status: 'starting', text: 'calibrating portal fluid mechanics...' },
  { time: '0.621000', status: 'ok', text: 'portal gun initialized' },
  { time: '0.812313', status: 'starting', text: 'mounting multidimensional filesystems...' },
  { time: '0.999120', status: 'ok', text: 'tmpfs/dimension_35 ready' },
  { time: '1.102341', status: 'starting', text: 'spawning sleep daemons...' },
  { time: '1.450122', status: 'ok', text: 'snooze.service active' },
  { time: '1.710293', status: 'starting', text: 'initializing quantum hardware...' },
  { time: '1.923412', status: 'warn', text: 'CPU: Temporal desync detected. Correcting...' },
  { time: '2.102451', status: 'starting', text: 'loading display drivers...' },
  { time: '2.402123', status: 'ok', text: 'drm configured' },
  { time: '2.610214', status: 'starting', text: 'waking display manager...' },
  { time: '2.842104', status: 'ok', text: 'booting into reality...' },
];

export default function BootScreen({ onComplete, embedded = false, start = true }) {
  const [step, setStep] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    if (!start) return;
    
    let timer;
    if (step < BOOT_LINES.length) {
      const delay = Math.random() > 0.8 ? 400 : 120 + Math.random() * 100;
      timer = setTimeout(() => {
        setStep(s => s + 1);
        playKeypress(); // acts like a mechanical hard drive clicking
      }, delay);
    } else if (step === BOOT_LINES.length && !isDone) {
      // Pause before pushing the done line
      timer = setTimeout(() => {
        setIsDone(true);
      }, 300);
    } else if (isDone && !fadingOut) {
      // 600ms pause after completion before fading
      timer = setTimeout(() => {
        setFadingOut(true);
      }, 600);
    } else if (fadingOut) {
      // Wait for the opacity transition to finish before unmounting
      timer = setTimeout(() => {
        onComplete();
      }, 500); // 500ms CSS transition
    }

    return () => clearTimeout(timer);
  }, [step, isDone, fadingOut, onComplete, start]);

  // Progress logic: 92% until done, then 100%
  const progressPercent = isDone ? 100 : (step / BOOT_LINES.length) * 92;

  return (
    <div
      className={`${embedded ? 'relative w-full h-full overflow-hidden' : 'fixed inset-0'} z-50 flex flex-col items-center justify-center pointer-events-none`}
      style={{
        backgroundColor: 'transparent',
        opacity: fadingOut ? 0 : (mounted ? 1 : 0),
        transition: fadingOut ? 'opacity 0.5s ease-out' : 'opacity 0.4s ease-out',
        fontFamily: "'JetBrains Mono', monospace"
      }}
    >
      <style>
        {`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          @keyframes glitch-title {
            0% { transform: translate(0); text-shadow: 0 0 10px rgba(203,166,247,0.3); }
            2% { transform: translate(-2px, 1px); text-shadow: -2px 0 red, 2px 0 cyan; }
            4% { transform: translate(2px, -1px); text-shadow: -2px 0 red, 2px 0 cyan; }
            6% { transform: translate(0); text-shadow: 0 0 10px rgba(203,166,247,0.3); }
            100% { transform: translate(0); text-shadow: 0 0 10px rgba(203,166,247,0.3); }
          }
        `}
      </style>
      
      {/* HUD Corners */}
      <div className="absolute top-4 right-4 text-[9px] font-mono text-[#f9e2af] opacity-50 tracking-widest">DIM: C-137</div>
      <div className="absolute bottom-4 left-4 text-[9px] font-mono text-[#f38ba8] opacity-50 tracking-widest">MEM: 0xDEADBEEF</div>
      
      <div 
        className="flex flex-col items-center justify-center w-full h-full"
        style={{ transform: embedded ? 'scale(0.75)' : 'none', transformOrigin: 'center center' }}
      >
        {/* OS Branding */}
        <div className="mb-8 text-center flex flex-col items-center">
          <pre className="text-[#f9e2af] font-bold text-xs leading-[1.2] mb-3 text-center drop-shadow-[0_0_8px_rgba(249,226,175,0.4)]">
{`    /\\    
   /  \\   
  / 👁  \\  
 /______\\ 
//  |   \\\\`}
          </pre>
          <h1
            className="text-3xl font-bold mb-1 tracking-[0.2em]"
            style={{ color: '#cba6f7', textTransform: 'lowercase', animation: 'glitch-title 4s infinite' }}
          >
            osleepy
          </h1>
          <p style={{ color: '#a6adc8', fontSize: '11px', letterSpacing: '0.1em' }}>
            based on arch · multiversal engineering · half asleep
          </p>
        </div>

        {/* Progress Bar */}
        <div style={{ width: 260, height: 3, backgroundColor: '#313244', marginBottom: 32 }}>
          <div
            style={{
              height: '100%',
              width: progressPercent + '%',
              backgroundColor: '#cba6f7',
              transition: 'width 0.2s ease-out'
            }}
          />
        </div>

        {/* Boot Log */}
        <div style={{ width: 440, fontSize: 12, color: '#bac2de', lineHeight: 1.6 }} className="drop-shadow-[0_0_2px_rgba(186,194,222,0.3)]">
          {BOOT_LINES.slice(0, step).map((line, idx) => (
            <div key={idx} className="flex">
              <span className="text-[#585b70] mr-3 w-[75px] shrink-0">[{line.time}]</span>
              <span className="mr-3 font-bold shrink-0 w-[50px] text-center">
                {line.status === 'starting' && <span style={{ color: '#89b4fa' }}>[ ** ]</span>}
                {line.status === 'ok' && <span style={{ color: '#a6e3a1' }}>[ OK ]</span>}
                {line.status === 'info' && <span style={{ color: '#cba6f7' }}>[INFO]</span>}
                {line.status === 'warn' && <span style={{ color: '#f9e2af' }}>[WARN]</span>}
              </span>
              <span className={`break-words ${line.status === 'warn' ? 'text-[#f9e2af]' : ''}`}>{line.text}</span>
            </div>
          ))}

          {/* Blinking Cursor moves down automatically with flex-col flow */}
          {!isDone && (
            <div className="flex pt-[2px]">
              <div
                style={{
                  width: 7,
                  height: 12,
                  backgroundColor: '#cba6f7',
                  animation: 'blink 1s steps(1) infinite',
                }}
              />
            </div>
          )}

          {/* Final Welcome Line */}
          {isDone && (
            <div className="flex">
              <span className="mr-2 whitespace-pre">
                <span style={{ color: '#cba6f7' }}>[  done    ]</span>
              </span>
              <span>welcome, shaarav.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
