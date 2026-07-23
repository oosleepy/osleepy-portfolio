import { memo } from 'react';

const profileData = `{
  "engineer": {
    "name": "Shaarav",
    "role": "Backend Systems Engineer",
    "education": "3rd Year CS",
    "domain": "Distributed Systems & High-Performance APIs"
  },

  "technical_arsenal": {
    "languages": ["Go", "Node.js", "C", "SQL", "TypeScript"],
    "infrastructure": ["Docker", "Linux", "Redis", "PostgreSQL", "Nginx"],
    "environment": "Neovim on CachyOS (Hyprland)"
  },

  "engineering_philosophy": {
    "architecture": "Simplicity scales. Understand the problem before reaching for abstractions.",
    "performance": "Measure first, optimize second. Avoid premature optimization.",
    "concurrency": "Concurrency is not parallelism. Structure over raw threads.",
    "maintainability": "Readability is a core feature. Write code for the next engineer."
  },

  "current_focus": {
    "building": [
      "Real-time auction engine (WebSockets + Redis Pub/Sub)",
      "Scalable authentication services"
    ],
    "deep_diving": [
      "Go runtime internals & garbage collection",
      "Advanced PostgreSQL indexing",
      "Systems programming in C"
    ]
  },

  "contact": {
    "email": "shaaravvvv@gmail.com",
    "github": "github.com/oosleepy",
    "linkedin": "linkedin.com/in/shaaravsh"
  },

  "status": "404 - Not interested in tutorial projects."
}`;

const SyntaxHighlightedJSON = ({ jsonString }) => {
  // Escape HTML
  let html = jsonString
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    
  // Single pass tokenization to prevent replacing characters inside HTML tags
  html = html.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?|[[\]{}]|,)/g, (match) => {
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        // Key
        const key = match.replace(/\s*:$/, '');
        return `<span class="text-[#89b4fa] font-semibold">${key}</span><span class="text-[#9399b2]">:</span>`;
      } else {
        // String
        return `<span class="text-[#a6e3a1]">${match}</span>`;
      }
    } else if (/true|false/.test(match)) {
      return `<span class="text-[#fab387]">${match}</span>`; // Boolean
    } else if (/null/.test(match)) {
      return `<span class="text-[#f38ba8]">${match}</span>`; // Null
    } else if (/^[0-9.-]/.test(match)) {
      return `<span class="text-[#fab387]">${match}</span>`; // Number
    } else if (/[[\]{}]/.test(match)) {
      return `<span class="text-[#f5c2e7]">${match}</span>`; // Brackets
    } else if (match === ',') {
      return `<span class="text-[#9399b2]">${match}</span>`; // Comma
    }
    return match;
  });

  return <code dangerouslySetInnerHTML={{ __html: html }} className="text-[#bac2de]" />;
};

function TextEditor() {
  return (
    <div className="bg-[#1e1e2e] p-6 w-full font-mono text-[14px] leading-loose antialiased overflow-hidden flex h-full">
      <div className="text-[#6c7086] pr-4 border-r border-[#313244] text-right select-none opacity-50">
        {Array.from({ length: 66 }, (_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </div>
      <div className="pl-6 flex-grow text-text whitespace-pre overflow-auto scrollbar-hide">
        <SyntaxHighlightedJSON jsonString={profileData} />
      </div>
    </div>
  );
}

export default memo(TextEditor);
