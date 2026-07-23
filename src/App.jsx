import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import TopMenuBar from './components/TopMenuBar';
import Dock from './components/Dock';
import WindowFrame from './components/WindowFrame';
import Terminal from './components/apps/Terminal';
import MusicPlayer from './components/apps/MusicPlayer';
import FileManager from './components/apps/FileManager';
import StickyNote from './components/apps/StickyNote';
import TextEditor from './components/apps/TextEditor';
import WakeUpSequence from './components/WakeUpSequence';
import BootScreen from './components/BootScreen';
import MobileView from './components/MobileView';
import { playClick } from './utils/sfx';

import NotificationToast from './components/NotificationToast';

const APPS = {
  terminal: { title: 'osleepy@cachyos: ~', icon: '💻', component: Terminal, pos: { x: 40, y: 50 }, size: { w: 580, h: 440 } },
  music: { title: 'Music Player', icon: '🎵', component: MusicPlayer, pos: { x: 660, y: 50 }, size: { w: 300, h: 500 } },
  files: { title: '~/projects', icon: '📂', component: FileManager, pos: { x: 80, y: 70 }, size: { w: 820, h: 540 } },
  sticky: { title: 'Notes', icon: '📝', component: StickyNote, pos: { x: 1540, y: 70 }, size: { w: 300, h: 380 } },
  editor: { title: 'profile.json — VSC', icon: '⌨️', component: TextEditor, pos: { x: 740, y: 120 }, size: { w: 780, h: 520 } },
  devlog: { title: 'Devlog', icon: '📰', isExternal: true, url: 'https://devlog-app-beta.vercel.app/' }
};

export default function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [appState, setAppState] = useState('wakeup'); // wakeup -> desktop
  const [isDoomed, setIsDoomed] = useState(false);
  const [doomStage, setDoomStage] = useState(0);
  const [showShutdownModal, setShowShutdownModal] = useState(false);

  // Pre-calculate random properties for multiversal dust particles
  const [dustParticles] = useState(() => {
    return Array.from({ length: 25 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 3 + 1}px`,
      color: ['#a6e3a1', '#89b4fa', '#cba6f7'][Math.floor(Math.random() * 3)],
      duration: `${Math.random() * 5 + 4}s`,
      delay: `${Math.random() * 5}s`
    }));
  });

  const [cryptograms] = useState(() => {
    const symbols = ['Δ', '👁', 'Σ', 'Ω', 'λ', '⚚', '∇', '∞', '⊗', '⨁', '⏣', '⎈'];
    return Array.from({ length: 30 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 40 + 20}px`,
      duration: `${Math.random() * 1.5 + 1.5}s`,
      delay: `${Math.random() * 2}s`,
      symbol: symbols[Math.floor(Math.random() * symbols.length)]
    }));
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Listen for doom trigger from Terminal
  useEffect(() => {
    const handleDoom = () => {
      setIsDoomed(true);
      setDoomStage(1);
      setTimeout(() => { setDoomStage(2); }, 3000);  // screen glitch + Bill triangle
      setTimeout(() => { setDoomStage(3); }, 5500);  // intensify
      setTimeout(() => { setDoomStage(4); }, 7500);  // tv off
      setTimeout(() => { setDoomStage(5); }, 8100);  // kernel panic
    };
    const handleShutdownRequest = () => {
      setShowShutdownModal(true);
    };
    window.addEventListener('osleepy:doom', handleDoom);
    window.addEventListener('osleepy:request_shutdown', handleShutdownRequest);
    return () => {
      window.removeEventListener('osleepy:doom', handleDoom);
      window.removeEventListener('osleepy:request_shutdown', handleShutdownRequest);
    };
  }, []);
  const [openWindows, setOpenWindows] = useState({
    terminal: false,
    music: false,
    files: true,
    sticky: true,
    editor: true
  });

  const [showDevlogIntro, setShowDevlogIntro] = useState(() => {
    return !localStorage.getItem('devlog_intro_seen');
  });

  const [windowStack, setWindowStack] = useState(() => {
    const hasIntro = !localStorage.getItem('devlog_intro_seen');
    const baseStack = ['editor', 'sticky', 'files'];
    return hasIntro ? [...baseStack, 'devlogIntro'] : baseStack;
  });
  const activeWindow = windowStack[windowStack.length - 1];

  const focusWindow = (id) => {
    setWindowStack(prev => {
      const filtered = prev.filter(w => w !== id);
      return [...filtered, id];
    });
  };

  const toggleWindow = (id, forceState) => {
    playClick();
    setOpenWindows(prev => ({
      ...prev,
      [id]: forceState !== undefined ? forceState : !prev[id]
    }));
    if (forceState !== false) {
      focusWindow(id);
    }
  };

  const closeWindow = (id) => {
    playClick();
    setOpenWindows(prev => ({ ...prev, [id]: false }));
  };

  if (isMobile) {
    return <MobileView />;
  }

  if (appState === 'wakeup') {
    return <WakeUpSequence onComplete={() => setAppState('desktop')} />;
  }

  return (
    <>
      {isDoomed && (
        <style>{`
          @keyframes cinematic-shake {
            0% { transform: translate(0px, 0px) rotate(0deg); }
            20% { transform: translate(-1px, 2px) rotate(-0.2deg); }
            40% { transform: translate(1px, -1px) rotate(0.2deg); }
            60% { transform: translate(-2px, 0px) rotate(-0.1deg); }
            80% { transform: translate(1px, 1px) rotate(0.1deg); }
            100% { transform: translate(0px, 0px) rotate(0deg); }
          }
          @keyframes tv-off {
            0% { transform: scale(1, 1); opacity: 1; filter: brightness(1); }
            40% { transform: scale(1, 0.01); opacity: 1; filter: brightness(3); }
            70% { transform: scale(0, 0.01); opacity: 0.8; filter: brightness(10); }
            100% { transform: scale(0, 0); opacity: 0; }
          }
          @keyframes chromatic-pulse {
            0% { filter: drop-shadow(0 0 0 rgba(255,0,0,0)); transform: scale(1); }
            50% { filter: drop-shadow(-2px 0 8px rgba(255,0,0,0.4)) drop-shadow(2px 0 8px rgba(0,255,255,0.4)); transform: scale(1.01); }
            100% { filter: drop-shadow(0 0 0 rgba(255,0,0,0)); transform: scale(1); }
          }
          .animate-shake { animation: cinematic-shake 4s ease-in-out infinite; }
          .animate-glitch { animation: chromatic-pulse 2.5s ease-in-out infinite; }
          .animate-tv-off { animation: tv-off 0.6s forwards cubic-bezier(0.8, 0, 1, 1); }
          @keyframes float-cryptogram {
            0% { transform: translateY(0) scale(1) rotate(0deg); opacity: 0; filter: blur(4px); }
            20% { opacity: 0.8; filter: blur(0px); }
            80% { opacity: 0.8; filter: blur(0px); }
            100% { transform: translateY(-50px) scale(1.5) rotate(45deg); opacity: 0; filter: blur(4px); }
          }
          @keyframes creeping-darkness {
            0% { box-shadow: inset 0 0 0vw 0vw rgba(0,0,0,0); }
            100% { box-shadow: inset 0 0 40vw 40vw rgba(0,0,0,1); }
          }
          .animate-darkness { animation: creeping-darkness 4.5s forwards ease-in; }
          @keyframes desktopFadeIn {
            0% { transform: scale(1.05); filter: blur(10px) brightness(3); opacity: 0; }
            100% { transform: scale(1); filter: blur(0px) brightness(1); opacity: 1; }
          }
        `}</style>
      )}

      {/* CRT Scanline overlay during doom */}
      {isDoomed && doomStage < 5 && (
        <div className="absolute inset-0 z-[9999] pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-50 mix-blend-overlay"></div>
      )}

      {/* Creeping Darkness */}
      {isDoomed && doomStage >= 2 && doomStage < 5 && (
        <div className="absolute inset-0 z-[9998] pointer-events-none animate-darkness"></div>
      )}

      {/* Floating Cryptograms */}
      {isDoomed && doomStage >= 2 && doomStage < 5 && (
        <div className="absolute inset-0 z-[9997] pointer-events-none overflow-hidden">
          {cryptograms.map((crypto, i) => (
            <div 
              key={i} 
              className="absolute font-bold opacity-0 text-[#f38ba8]"
              style={{
                left: crypto.left,
                top: crypto.top,
                fontSize: crypto.size,
                animation: `float-cryptogram ${crypto.duration} infinite ${crypto.delay}`,
                textShadow: '0 0 12px #f38ba8, 0 0 24px #f38ba8'
              }}
            >
              {crypto.symbol}
            </div>
          ))}
        </div>
      )}

      {doomStage >= 5 && (
        <div className="absolute inset-0 z-[99999] bg-black text-[#cba6f7] font-mono p-8 text-[13px] whitespace-pre-wrap overflow-hidden leading-snug">
          <div className="animate-pulse">
{`[    0.000000] Kernel panic - not syncing: Fatal exception in interrupt
[    0.000000] CPU: 0 PID: 1 Comm: init Not tainted 6.8.0-osleepy #1
[    0.000000] Hardware name: Portfolio/Desktop, BIOS 1.0.0
[    0.000000] Call Trace:
[    0.000000]  <IRQ>
[    0.000000]  dump_stack+0x5c/0x80
[    0.000000]  panic+0x111/0x2b0
[    0.000000]  do_trap+0x8a/0x100
[    0.000000]  do_error_trap+0x65/0x80
[    0.000000]  exc_invalid_op+0x42/0x60
[    0.000000]  asm_exc_invalid_op+0x16/0x20
[    0.000000] RIP: 0010:weirdmageddon_init+0x666/0x666
[    0.000000] Code: FF FF FF FF 48 8B 05 DE AD BE EF 48 85 C0 74 05 E8 4B 3A 00 00 48 89 DF
[    0.000000] RSP: 0018:ffffa0a680003e88 EFLAGS: 00010246
[    0.000000] RAX: 0000000000000000 RBX: ffff8d8504000000 RCX: 0000000000000000
[    0.000000] Kernel Offset: 0x1f000000 from 0xffffffff81000000
[    0.000000] ---[ end Kernel panic - not syncing: Fatal exception in interrupt ]---
[    0.000000] 
[    0.000000] REALITY COMPROMISED. PLEASE REBOOT UNIVERSE.`}
          </div>
        </div>
      )}

      <div className={`relative h-screen w-full overflow-hidden select-none pt-7 transition-[filter,transform,opacity] duration-[2000ms] ease-in-out animate-[desktopFadeIn_1.5s_ease-out]
        ${doomStage >= 1 && doomStage < 4 ? 'animate-shake' : ''}
        ${doomStage >= 2 && doomStage < 4 ? 'invert hue-rotate-180 contrast-[120%] grayscale-[0.2]' : ''}
        ${doomStage >= 3 && doomStage < 4 ? 'animate-glitch' : ''}
        ${doomStage === 4 ? 'animate-tv-off' : ''}
        ${doomStage >= 5 ? 'hidden' : ''}
      `}>
        <TopMenuBar />

        {/* Desktop Area */}
        <div className="absolute inset-0 z-0 pt-7">
          {/* Wallpaper — Minimal Dark */}
          <div className="absolute inset-0 z-[-2] overflow-hidden pointer-events-none" style={{ background: '#05050d' }}>

            {/* Color node 1 — mauve, top-left, barely there */}
            <div className="absolute" style={{
              top: '-20%', left: '-15%',
              width: '75vw', height: '75vw',
              background: 'radial-gradient(circle, rgba(203,166,247,0.09) 0%, transparent 65%)',
              filter: 'blur(100px)'
            }} />

            {/* Color node 2 — blue, bottom-right */}
            <div className="absolute" style={{
              bottom: '-25%', right: '-15%',
              width: '70vw', height: '70vw',
              background: 'radial-gradient(circle, rgba(137,180,250,0.07) 0%, transparent 65%)',
              filter: 'blur(120px)'
            }} />

            {/* Film grain — the only texture */}
            <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.12, mixBlendMode: 'soft-light' }}>
              <filter id="dark-grain">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="1" stitchTiles="stitch" />
                <feColorMatrix type="saturate" values="0" />
              </filter>
              <rect width="100%" height="100%" filter="url(#dark-grain)" />
            </svg>

            {/* Edge vignette */}
            <div className="absolute inset-0" style={{
              background: 'radial-gradient(ellipse 85% 80% at 50% 45%, transparent 35%, rgba(2,2,8,0.9) 100%)'
            }} />
          </div>


          {/* Desktop Shortcut Icons (Linux Desktop Shell Feel) */}
          <div className="absolute left-6 top-16 flex flex-col gap-5 z-0">
            {Object.entries(APPS).map(([id, config]) => {
              const labels = {
                terminal: 'terminal',
                music: 'lofi_player',
                files: 'projects',
                sticky: 'notes.txt',
                editor: 'profile.json',
                devlog: 'devlog'
              };
              return (
                <div
                  key={id}
                  onClick={() => {
                    if (config.isExternal) {
                      window.open(config.url, '_blank');
                    } else {
                      toggleWindow(id, true);
                    }
                  }}
                  className="flex flex-col items-center justify-center w-24 h-28 rounded-2xl cursor-pointer bg-white/[0.04] border border-white/5 hover:bg-white/[0.08] hover:border-white/10 active:scale-95 transition-all gap-3 group text-center select-none shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
                >
                  <div className="text-4xl flex items-center justify-center w-12 h-12 filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)] group-hover:-translate-y-1 group-hover:scale-110 transition-transform duration-300">
                    {config.icon}
                  </div>
                  <div className="text-[10px] font-bold text-[#bac2de] group-hover:text-[#cba6f7] transition-colors truncate w-full px-2 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-mono uppercase tracking-widest">
                    {labels[id] || id}
                  </div>
                </div>
              );
            })}
          </div>

          <AnimatePresence>
            {Object.entries(APPS).map(([id, config]) => {
              if (!openWindows[id] || config.isExternal) return null;

              const Content = config.component;
              return (
                <WindowFrame
                  key={id}
                  id={id}
                  title={config.title}
                  active={activeWindow === id}
                  zIndex={windowStack.indexOf(id) + 10}
                  onFocus={() => focusWindow(id)}
                  onClose={closeWindow}
                  initialPos={config.pos}
                  defaultSize={config.size}
                >
                  <Content />
                </WindowFrame>
              );
            })}
          </AnimatePresence>

          {showDevlogIntro && (
            <WindowFrame
              id="devlogIntro"
              title="about-devlog.txt"
              active={activeWindow === 'devlogIntro'}
              zIndex={windowStack.indexOf('devlogIntro') !== -1 ? windowStack.indexOf('devlogIntro') + 10 : 99}
              onFocus={() => focusWindow('devlogIntro')}
              onClose={() => {
                playClick();
                setShowDevlogIntro(false);
                localStorage.setItem('devlog_intro_seen', 'true');
                setWindowStack(prev => prev.filter(w => w !== 'devlogIntro'));
              }}
              initialPos={{ x: 960, y: 150 }}
              defaultSize={{ w: 380, h: 220 }}
            >
              <div className="flex flex-col h-full p-5 font-mono text-xs text-text justify-between">
                <div className="space-y-3">
                  <div className="text-mauve font-bold">/** blog: ... */ comments</div>
                  <p className="text-subtext0 leading-relaxed">
                    This portfolio integrates a live devlog that parses custom JSDoc-style comments directly from my codebase in real-time.
                  </p>
                  <p className="text-subtext1 leading-relaxed">
                    Every commit containing updates inside codeblocks marked with these comments automatically updates devlog.shaarav.dev.
                  </p>
                </div>
                <button
                  onClick={() => {
                    playClick();
                    setShowDevlogIntro(false);
                    localStorage.setItem('devlog_intro_seen', 'true');
                    setWindowStack(prev => prev.filter(w => w !== 'devlogIntro'));
                  }}
                  className="mt-4 w-full py-2 bg-mauve/10 border border-mauve/30 text-mauve hover:bg-mauve/20 rounded-lg font-bold transition-all active:scale-95 cursor-pointer text-center"
                >
                  Dismiss
                </button>
              </div>
            </WindowFrame>
          )}
        </div>

        <Dock
          apps={APPS}
          openWindows={openWindows}
          onToggle={toggleWindow}
          activeWindow={activeWindow}
        />

        <NotificationToast />

        {/* Shutdown Confirmation Modal */}
        <AnimatePresence>
          {showShutdownModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.95, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 10 }}
                className="bg-[#1e1e2e] border border-surface1 rounded-2xl p-6 shadow-2xl max-w-sm w-full mx-4 flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mb-4 border border-red-500/20">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f38ba8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                    <line x1="12" y1="2" x2="12" y2="12"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-text mb-2">Power Off System?</h3>
                <p className="text-subtext0 text-sm mb-6 leading-relaxed">
                  This will unmount the filesystem and initiate the shutdown sequence. Are you sure you want to proceed?
                </p>
                <div className="flex gap-3 justify-center w-full">
                  <button
                    onClick={() => setShowShutdownModal(false)}
                    className="flex-1 py-2.5 rounded-xl font-bold text-subtext0 bg-surface0 hover:bg-surface1 border border-surface1 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setShowShutdownModal(false);
                      window.dispatchEvent(new CustomEvent('osleepy:doom'));
                    }}
                    className="flex-1 py-2.5 rounded-xl font-bold text-[#11111b] bg-red-400 hover:bg-red-500 transition-colors shadow-lg shadow-red-500/20"
                  >
                    Power Off
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {doomStage >= 2 && doomStage < 4 && (
        <div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center opacity-80 mix-blend-difference">
          <pre className="text-red-500 font-mono text-[10px] md:text-[14px] leading-tight text-center animate-pulse filter drop-shadow-[0_0_30px_rgba(255,0,0,1)]">
{`          /\\
         /  \\
        /____\\
       / \\  / \\
      /   \\/   \\
     /  /\\  /\\  \\
    /  /  \\/  \\  \\
   /__/________\\__\\`}
          </pre>
        </div>
      )}

      {doomStage >= 4 && (
        <div className="fixed inset-0 z-[99999] bg-black text-[#f38ba8] font-mono flex flex-col items-center justify-center text-center p-6">
          <div className="text-4xl md:text-6xl font-black mb-6 tracking-widest drop-shadow-[0_0_15px_rgba(243,139,168,0.8)]">SYSTEM TERMINATED</div>
          <div className="text-sm md:text-lg opacity-80">REALITY IS AN ILLUSION.</div>
          <div className="text-sm md:text-lg opacity-80">THE UNIVERSE IS A HOLOGRAM.</div>
          <div className="text-sm md:text-lg opacity-80 mt-2">BUY GOLD. BYE!</div>
        </div>
      )}
    </>
  );
}
