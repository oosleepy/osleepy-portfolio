import { useState } from 'react';
import { Mail, CodeXml, ExternalLink, ChevronDown, ChevronUp, Download, ScrollText } from 'lucide-react';

import { projects } from "../data/projects";

export default function MobileView() {
  const [expandedProject, setExpandedProject] = useState(0);

  return (
    <div className="min-h-screen bg-[#0a0a14] text-text font-sans p-6 pb-20 flex flex-col gap-6 overflow-y-auto">
      {/* Profile Header */}
      <div className="bg-[#1e1e2e]/60 border border-surface1 rounded-2xl p-5 backdrop-blur-xl shadow-lg flex flex-col gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-mauve font-bold">portfolio</span>
          <h1 className="text-3xl font-extrabold tracking-tight mt-1">shaarav</h1>
          <p className="text-sm text-subtext0 mt-0.5">3rd year CS @ B.Tech (2024–2028)</p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {["Go", "Node.js", "PostgreSQL", "Redis", "AppSec", "Distributed Systems"].map(t => (
            <span key={t} className="bg-surface0 border border-surface1 px-2 py-0.5 rounded-lg text-xs font-semibold text-text/90">
              {t}
            </span>
          ))}
        </div>

        <div className="text-xs text-subtext0/90 leading-relaxed border-t border-surface1 pt-3">
          <span className="text-mauve font-bold">Mission:</span> building highly concurrent, reliable systems that don't fall over under heavy loads.
        </div>
      </div>

      {/* Philosophy Callout */}
      <div className="border border-[#f9e2af]/20 bg-[#f9e2af]/5 rounded-xl p-4 flex flex-col gap-1 select-none">
        <span className="text-[10px] uppercase tracking-wider text-[#f9e2af] font-bold">Philosophy Stance</span>
        <span className="text-sm font-semibold text-[#f9e2af]/90">✦ Strict avoid: copy-paste tutorial projects</span>
      </div>

      {/* Projects Accordion */}
      <div className="flex flex-col gap-3">
        <h2 className="text-base font-bold uppercase tracking-wider text-subtext1 px-1">Projects Showcase</h2>

        <div className="flex flex-col gap-2.5">
          {[...projects].sort((a, b) => a.id - b.id).map((proj, idx) => {
            const isExpanded = expandedProject === idx;
            return (
              <div
                key={proj.name}
                className={`bg-[#1e1e2e]/40 border rounded-xl overflow-hidden transition-all duration-300 ${isExpanded ? 'border-mauve bg-[#1e1e2e]/60 shadow-md shadow-mauve/5' : 'border-surface1'}`}
              >
                {/* Header Row */}
                <div
                  onClick={() => setExpandedProject(isExpanded ? null : idx)}
                  className="flex items-center justify-between p-4 cursor-pointer select-none"
                >
                  <div>
                    <h3 className="font-bold text-sm tracking-wide text-text">{proj.name}</h3>
                    <div className="flex gap-1.5 mt-1">
                      {proj.tags.slice(0, 3).map(t => (
                        <span key={t} className="text-[9px] bg-surface0 px-1.5 py-0.5 rounded font-mono text-text/60">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-subtext0">
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 border-t border-surface1/50 flex flex-col gap-4 bg-[#1e1e2e]/20">
                    <p className="text-xs text-subtext0 leading-relaxed font-sans">{proj.description}</p>

                    <div className="flex flex-col gap-2 bg-[#0a0a14]/40 p-3 rounded-lg border border-surface1/30">
                      <span className="text-[10px] uppercase tracking-wider text-mauve font-bold">Architectural Highlights</span>
                      <ul className="flex flex-col gap-2">
                        {proj.highlights.map((h, i) => (
                          <li key={i} className="text-[11px] text-subtext1 leading-relaxed flex gap-2">
                            <span className="text-mauve shrink-0">✦</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2 w-full">
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-[#313244] hover:bg-[#45475a] text-[#cdd6f4] hover:text-[#cba6f7] font-bold text-xs py-2 px-4 rounded-lg transition-colors cursor-pointer text-center"
                      >
                        <CodeXml size={14} />
                        <span>GitHub</span>
                      </a>
                      {proj.hasDevlog && proj.devlogUrl && (
                        <a
                          href={proj.devlogUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 bg-[#313244] text-[#cba6f7] hover:text-[#cdd6f4] border border-[#cba6f7]/20 hover:border-[#cba6f7]/50 hover:bg-[#cba6f7]/10 font-bold text-xs py-2 px-4 rounded-lg transition-all duration-300 cursor-pointer text-center shadow-[0_0_10px_rgba(203,166,247,0.05)] hover:shadow-[0_0_15px_rgba(203,166,247,0.25)]"
                        >
                          <ScrollText size={14} />
                          <span>Devlog</span>
                        </a>
                      )}
                      {proj.hasLiveDemo && proj.liveDemoUrl && (
                        <a
                          href={proj.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 bg-[#313244] hover:bg-[#45475a] text-[#cdd6f4] hover:text-[#cba6f7] font-bold text-xs py-2 px-4 rounded-lg transition-colors cursor-pointer text-center"
                        >
                          <ExternalLink size={14} />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Connect Card */}
      <div className="bg-[#1e1e2e]/80 border border-surface1 rounded-2xl p-5 flex flex-col gap-4 mt-auto">
        <h2 className="text-base font-bold uppercase tracking-wider text-subtext1">Get In Touch</h2>

        <div className="flex flex-col gap-2.5">
          <a
            href="mailto:shaaravvvv@gmail.com"
            className="flex items-center gap-3 p-3 rounded-xl bg-surface0/60 border border-surface1 hover:border-mauve transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-mauve/15 flex items-center justify-center text-mauve shrink-0">
              <Mail size={14} />
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-wider text-subtext0 font-semibold">Email</div>
              <div className="text-xs font-bold text-text">shaaravvvv@gmail.com</div>
            </div>
          </a>

          <a
            href="https://github.com/oosleepy"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-xl bg-surface0/60 border border-surface1 hover:border-mauve transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-mauve/15 flex items-center justify-center text-mauve shrink-0">
              <CodeXml size={14} />
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-wider text-subtext0 font-semibold">GitHub</div>
              <div className="text-xs font-bold text-text underline">github.com/oosleepy</div>
            </div>
          </a>

          <a
            href="https://linkedin.com/in/shaaravsh"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-xl bg-surface0/60 border border-surface1 hover:border-mauve transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-mauve/15 flex items-center justify-center text-mauve shrink-0">
              <ExternalLink size={14} />
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-wider text-subtext0 font-semibold">LinkedIn</div>
              <div className="text-xs font-bold text-text underline">linkedin.com/in/shaaravsh</div>
            </div>
          </a>

          <a
            href="https://shaarav.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-xl bg-surface0/60 border border-surface1 hover:border-mauve transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-mauve/15 flex items-center justify-center text-mauve shrink-0">
              <ExternalLink size={14} />
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-wider text-subtext0 font-semibold">Website</div>
              <div className="text-xs font-bold text-text underline">shaarav.dev</div>
            </div>
          </a>

          <a
            href="/resume.pdf"
            download="Shaarav_Resume.pdf"
            className="flex items-center gap-3 p-3 rounded-xl bg-surface0/60 border border-surface1 hover:border-mauve transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-mauve/15 flex items-center justify-center text-mauve shrink-0">
              <Download size={14} />
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-wider text-subtext0 font-semibold">Resume</div>
              <div className="text-xs font-bold text-text underline">Download PDF</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
