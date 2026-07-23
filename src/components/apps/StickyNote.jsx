import { memo } from 'react';
import { Mail, CodeXml, ExternalLink, Download } from 'lucide-react';

function StickyNote() {
  return (
    <div
      className="h-full w-full flex flex-col p-5 gap-5 relative overflow-hidden"
      style={{ background: '#f9e2af', color: '#11111b', fontFamily: 'Inter, system-ui, sans-serif' }}
    >
      {/* Gravity Falls Journal Watermark */}
      <div className="absolute top-[-20px] right-[-20px] opacity-10 rotate-12 select-none pointer-events-none font-serif text-[180px] font-black" style={{ color: '#881111' }}>
        3
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

      {/* Footer caption */}
      <div
        className="text-[10px] font-medium text-center italic opacity-60 mt-2 tracking-wide"
        style={{ color: '#11111b' }}
      >
        * strictly not interested in tutorial projects
      </div>
    </div>
  );
}

export default memo(StickyNote);
