import { useEffect, useState, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

const TIPS = [
  {
    text: "try opening the terminal — run neofetch or help or doom.sh(BEWARE)"
  },

  {
    text: "explore projects in the file manager"
  },
  {
    text: "check the devlog → ",
    link: { text: "devlog website", href: "https://devlog-app-beta.vercel.app/" }
  },
  {
    text: "put on some lofi while you browse in the music player"
  }
];

export default function NotificationToast() {
  const [currentTipIndex, setCurrentTipIndex] = useState(-1);
  const [isVisible, setIsVisible] = useState(false);
  const autoDismissTimerRef = useRef(null);
  const nextTipTimerRef = useRef(null);

  // Check sessionStorage on mount
  const hasSeenTips = typeof window !== 'undefined' && sessionStorage.getItem('portfolio_tips_seen') === 'true';

  useEffect(() => {
    if (hasSeenTips) return;

    // Start showing the first tip after 1.5 seconds on desktop entry
    const initialDelay = setTimeout(() => {
      setCurrentTipIndex(0);
      setIsVisible(true);
    }, 1500);

    return () => {
      clearTimeout(initialDelay);
      if (autoDismissTimerRef.current) clearTimeout(autoDismissTimerRef.current);
      if (nextTipTimerRef.current) clearTimeout(nextTipTimerRef.current);
    };
  }, [hasSeenTips]);

  const handleDismiss = () => {
    setIsVisible(false);

    if (autoDismissTimerRef.current) {
      clearTimeout(autoDismissTimerRef.current);
    }

    if (currentTipIndex === TIPS.length - 1) {
      sessionStorage.setItem('portfolio_tips_seen', 'true');
    } else {
      // Start 8-second delay before showing next tip
      if (nextTipTimerRef.current) {
        clearTimeout(nextTipTimerRef.current);
      }

      nextTipTimerRef.current = setTimeout(() => {
        setCurrentTipIndex(prev => prev + 1);
        setIsVisible(true);
      }, 8000);
    }
  };

  // Handle auto-dismissal when a tip becomes visible
  useEffect(() => {
    if (isVisible && currentTipIndex !== -1) {
      if (autoDismissTimerRef.current) {
        clearTimeout(autoDismissTimerRef.current);
      }

      autoDismissTimerRef.current = setTimeout(() => {
        handleDismiss();
      }, 5000);
    }

    return () => {
      if (autoDismissTimerRef.current) {
        clearTimeout(autoDismissTimerRef.current);
      }
    };
  }, [isVisible, currentTipIndex]);

  if (hasSeenTips || currentTipIndex === -1) {
    return null;
  }

  const currentTip = TIPS[currentTipIndex];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 350, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 350, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
          className="fixed bottom-6 right-6 z-[9999] w-[300px] backdrop-blur-md border border-surface1 rounded-r-lg p-4 font-mono text-[12px] text-text shadow-2xl flex items-start justify-between gap-3 pointer-events-auto"
          style={{
            backgroundColor: 'rgba(30, 30, 46, 0.85)',
            borderLeft: '2px solid var(--color-mauve)'
          }}
        >
          <div className="flex-1 pr-2 leading-relaxed select-text font-mono text-[12px] text-text">
            <span>
              {currentTip.text}
              {currentTip.link && (
                <a
                  href={currentTip.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-mauve hover:text-pink transition-colors font-bold cursor-pointer"
                >
                  {currentTip.link.text}
                </a>
              )}
            </span>
          </div>
          <button
            onClick={handleDismiss}
            className="text-subtext0 hover:text-red transition-colors cursor-pointer text-base leading-none select-none font-bold outline-none border-none bg-transparent"
            aria-label="Close tip"
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
