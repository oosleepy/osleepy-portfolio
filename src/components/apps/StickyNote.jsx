import { Mail, CodeXml, ExternalLink, Download } from 'lucide-react';

export default function StickyNote() {
  return (
    <div
      className="h-full w-full flex flex-col p-5 gap-5 relative overflow-hidden"
      style={{ background: '#f9e2af', color: '#11111b', fontFamily: 'Inter, system-ui, sans-serif' }}
    >
      {/* Gravity Falls Journal Watermark */}
      <div className="absolute top-[-20px] right-[-20px] opacity-10 rotate-12 select-none pointer-events-none font-serif text-[180px] font-black" style={{ color: '#881111' }}>
        3
      </div>
      <div className="absolute bottom-4 right-4 opacity-[0.05] rotate-[-15deg] select-none pointer-events-none">
         {/* Six-fingered hand SVG */}
         <svg width="80" height="100" viewBox="0 0 100 120" fill="none" stroke="#881111" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            {/* Palm */}
            <path d="M30 110 C 10 110, 10 70, 20 50" />
            <path d="M70 110 C 90 110, 90 70, 80 50" />
            {/* 6 Fingers */}
            <path d="M20 50 L 10 20 A 5 5 0 0 1 20 20 L 30 50" />
            <path d="M30 50 L 25 10 A 5 5 0 0 1 35 10 L 45 50" />
            <path d="M45 50 L 45 5 A 5 5 0 0 1 55 5 L 55 50" />
            <path d="M55 50 L 65 10 A 5 5 0 0 1 75 10 L 65 50" />
            <path d="M65 50 L 80 20 A 5 5 0 0 1 90 25 L 75 55" />
            <path d="M75 55 L 95 40 A 5 5 0 0 1 100 50 L 80 70" />
         </svg>
      </div>

      {/* Header */}
      <div className="border-b border-[#11111b]/15 pb-3">
        <div className="text-[11px] font-semibold uppercase tracking-[0.15em] opacity-50 mb-1">pinned</div>
        <div className="text-lg font-bold leading-tight">shaarav</div>
        <div className="text-sm opacity-60 mt-0.5">3rd year CS · backend systems</div>
      </div>

      {/* Contact Links */}
      <div className="flex flex-col gap-3 flex-1">
        <a
          href="mailto:shaaravvvv@gmail.com"
          className="flex items-center gap-3 group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#11111b]/10 flex items-center justify-center shrink-0 group-hover:bg-[#11111b]/20 transition-colors">
            <Mail size={15} />
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider opacity-50">Email</div>
            <div className="text-sm font-semibold leading-tight">shaaravvvv@gmail.com</div>
          </div>
        </a>

        <a
          href="https://github.com/oosleepy"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#11111b]/10 flex items-center justify-center shrink-0 group-hover:bg-[#11111b]/20 transition-colors">
            <CodeXml size={15} />
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider opacity-50">GitHub</div>
            <div className="text-sm font-semibold leading-tight underline underline-offset-2">github.com/oosleepy</div>
          </div>
        </a>

        <a
          href="https://linkedin.com/in/shaaravsh"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#11111b]/10 flex items-center justify-center shrink-0 group-hover:bg-[#11111b]/20 transition-colors">
            <ExternalLink size={15} />
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider opacity-50">LinkedIn</div>
            <div className="text-sm font-semibold leading-tight underline underline-offset-2">in/shaaravsh</div>
          </div>
        </a>

        <a
          href="/resume.pdf"
          download="Shaarav_Resume.pdf"
          className="flex items-center gap-3 group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#11111b]/10 flex items-center justify-center shrink-0 group-hover:bg-[#11111b]/20 transition-colors">
            <Download size={15} />
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider opacity-50">Resume</div>
            <div className="text-sm font-semibold leading-tight underline underline-offset-2">Download PDF</div>
          </div>
        </a>
      </div>

      {/* Footer tag */}
      <div
        className="text-[10px] font-bold text-center py-1.5 px-3 rounded-lg border border-[#11111b]/20"
        style={{ background: '#11111b0d', color: '#11111b' }}
      >
        ✦ not interested in tutorial projects
      </div>
    </div>
  );
}
