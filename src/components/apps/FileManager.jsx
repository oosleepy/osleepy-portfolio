import { useState, memo } from "react";
import {
  Folder,
  ChevronRight,
  FileCode,
  X,
  Code,
  ExternalLink,
  ScrollText,
} from "lucide-react";

import { projects } from "../../data/projects";

function FileManager() {
  const sortedProjects = [...projects].sort((a, b) => a.id - b.id);
  const [selectedProject, setSelectedProject] = useState(sortedProjects[0]);

  return (
    <div className="flex h-full w-full bg-[#1e1e2e]/40 overflow-hidden font-sans antialiased">
      {/* Left List Pane */}
      <div
        className={`${selectedProject ? "w-[40%] border-r border-surface1" : "w-full"} h-full flex flex-col p-4 transition-[width] duration-200 overflow-y-auto`}
      >
        <div className="flex items-center gap-2 mb-4 text-[10px] font-bold text-subtext1 uppercase tracking-widest border-b border-surface1 pb-2 shrink-0 font-mono">
          <span className="opacity-50">root</span>
          <ChevronRight size={10} />
          <span>projects</span>
        </div>

        <div className="space-y-1">
          {sortedProjects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => setSelectedProject(proj)}
              className={`group flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all active:scale-[0.98] ${selectedProject?.id === proj.id
                  ? "bg-[#313244]"
                  : "hover:bg-surface0"
                }`}
            >
              <Folder
                size={18}
                className={`${selectedProject?.id === proj.id ? "text-mauve" : "text-blue"} group-hover:scale-110 transition-transform`}
              />
              <span
                className={`text-sm font-semibold truncate ${selectedProject?.id === proj.id ? "text-text" : "text-subtext1"}`}
              >
                {proj.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Preview Pane */}
      {selectedProject && (
        <div className="w-[60%] h-full bg-[#181825]/60 flex flex-col p-6 animate-in fade-in slide-in-from-right-4 duration-300 relative">
          <button
            onClick={() => setSelectedProject(null)}
            className="absolute top-4 right-4 p-1 hover:bg-[#313244] rounded-md text-subtext1 hover:text-red transition-colors"
          >
            <X size={16} />
          </button>

          <h2 className="text-[#cba6f7] text-lg font-medium mb-4 pr-8">
            {selectedProject.name}
          </h2>

          <div className="flex flex-wrap gap-1.5 mb-6">
            {selectedProject.tags.map((tag) => (
              <span
                key={tag}
                className="bg-[#313244] text-[#cdd6f4] text-[11px] font-mono px-2 py-0.5 rounded border border-surface1/50"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex-grow overflow-y-auto pr-2 mb-6 space-y-6">
            <p className="text-[#a6adc8] text-[15px] leading-loose">
              {selectedProject.description}
            </p>

            <div>
              <h3 className="text-[#cba6f7] text-[10px] font-bold uppercase tracking-wider mb-3">
                /* Architectural Highlights */
              </h3>
              <ul className="space-y-2">
                {selectedProject.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex gap-3 text-[14px] text-[#cdd6f4] leading-relaxed">
                    <span className="text-[#cba6f7] select-none shrink-0 font-bold">→</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex gap-3 mt-auto pt-4 border-t border-surface1 shrink-0">
            <a
              href={selectedProject.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#313244] text-[#cdd6f4] hover:text-[#cba6f7] text-xs font-bold rounded-lg transition-all active:scale-95"
            >
              <Code size={14} />
              GitHub
            </a>
            {selectedProject.hasLiveDemo && selectedProject.liveDemoUrl && (
              <a
                href={selectedProject.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[#313244] text-[#cdd6f4] hover:text-[#cba6f7] text-xs font-bold rounded-lg transition-all active:scale-95"
              >
                <ExternalLink size={14} />
                Live Demo
              </a>
            )}
            {selectedProject.hasDevlog && selectedProject.devlogUrl && (
              <a
                href={selectedProject.devlogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[#313244] text-[#cba6f7] hover:text-[#cdd6f4] border border-[#cba6f7]/20 hover:border-[#cba6f7]/50 hover:bg-[#cba6f7]/10 text-xs font-bold rounded-lg transition-all duration-300 active:scale-95 shadow-[0_0_10px_rgba(203,166,247,0.05)] hover:shadow-[0_0_15px_rgba(203,166,247,0.25)]"
              >
                <ScrollText size={14} />
                Devlog
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(FileManager);
