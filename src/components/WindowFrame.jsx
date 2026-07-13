import { Rnd } from 'react-rnd';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

export default function WindowFrame({
  id,
  title,
  children,
  active,
  zIndex,
  onFocus,
  onClose,
  className,
  defaultSize = { w: 300, h: 'auto' },
  initialPos = { x: 100, y: 100 }
}) {
  return (
    <Rnd
      default={{
        x: initialPos.x,
        y: initialPos.y,
        width: defaultSize.w,
        height: defaultSize.h
      }}
      minWidth={250}
      minHeight={150}
      bounds="parent"
      dragHandleClassName="title-bar"
      onMouseDownCapture={onFocus}
      style={{ zIndex, display: 'flex' }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 6 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 6 }}
        transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
        className={clsx(
          "window-glass rounded-2xl overflow-hidden flex flex-col w-full h-full transition-all duration-300 ease-out",
          active 
            ? "border-[rgba(203,166,247,0.4)] shadow-[0_30px_60px_rgba(0,0,0,0.7),0_0_20px_rgba(203,166,247,0.15)] opacity-100 scale-100" 
            : "border-white/[0.08] shadow-lg opacity-[0.6] scale-[0.98] grayscale-[0.3]"
        )}
      >
        <div className="title-bar h-10 bg-transparent flex items-center px-4 cursor-move border-b border-white/[0.05] shrink-0">
          <div className="dots flex gap-2">
            <div
              onClick={(e) => { e.stopPropagation(); onClose(id); }}
              className="w-3 h-3 rounded-full bg-red hover:brightness-110 cursor-pointer"
            />
            <div className="w-3 h-3 rounded-full bg-yellow hover:brightness-110 cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-green hover:brightness-110 cursor-pointer" />
          </div>
          <div className="window-title flex-grow text-center text-xs font-bold text-subtext1 pr-10 uppercase tracking-widest">
            {title}
          </div>
        </div>
        <div className="window-content flex-grow overflow-auto flex flex-col">
          {children}
        </div>
      </motion.div>
    </Rnd>
  );
}
