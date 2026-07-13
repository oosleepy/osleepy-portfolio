import { useState, useEffect } from 'react';
import { Wifi, BatteryFull, Search, Power } from 'lucide-react';

export default function TopMenuBar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-7 bg-mantle/70 backdrop-blur-md border-b border-surface0 flex items-center justify-between px-4 z-[2000] text-xs font-medium text-text select-none">
      <div className="flex items-center gap-4">
        <span className="font-bold cursor-pointer hover:text-mauve transition-colors flex items-center gap-2">
          <span className="text-[11px] font-black tracking-[-0.1em] opacity-80">(●—●)</span> Osleepy
        </span>
        <span className="cursor-pointer hover:bg-surface0 px-2 py-0.5 rounded transition-colors font-bold">File</span>
        <span className="cursor-pointer hover:bg-surface0 px-2 py-0.5 rounded transition-colors hidden sm:block">Edit</span>
        <span className="cursor-pointer hover:bg-surface0 px-2 py-0.5 rounded transition-colors hidden sm:block">View</span>
        <span className="cursor-pointer hover:bg-surface0 px-2 py-0.5 rounded transition-colors hidden md:block">Terminal</span>
        <span className="cursor-pointer hover:bg-surface0 px-2 py-0.5 rounded transition-colors">Help</span>
      </div>

      <div className="flex items-center gap-4">
        <Search size={14} className="cursor-pointer hover:text-mauve transition-colors" />
        <Wifi size={14} className="cursor-pointer hover:text-mauve transition-colors" />
        <BatteryFull size={14} className="cursor-pointer hover:text-mauve transition-colors" />
        <span className="cursor-pointer font-mono font-bold tracking-tight">
          {time.toLocaleTimeString([], { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
        </span>
        <div 
          className="flex items-center justify-center bg-[#f38ba8]/10 border border-[#f38ba8]/30 hover:bg-[#f38ba8]/20 hover:border-[#f38ba8]/60 rounded-md px-2 py-0.5 ml-2 cursor-pointer transition-all duration-300 hover:scale-105 group shadow-[0_0_8px_rgba(243,139,168,0.2)] hover:shadow-[0_0_15px_rgba(243,139,168,0.5)]"
          onClick={() => window.dispatchEvent(new CustomEvent('osleepy:request_shutdown'))}
          title="Shutdown"
        >
          <Power 
            size={13} 
            className="text-[#f38ba8] group-hover:text-[#ff99b3] drop-shadow-[0_0_4px_rgba(243,139,168,0.8)] group-hover:animate-pulse" 
          />
        </div>
      </div>
    </div>
  );
}
