import { useState, useEffect, useRef } from 'react';
import { playKeypress } from '../../utils/sfx';

const SEQUENCE = [
  { type: 'input', prompt: 'shaarav@osleepy:~$ ', command: 'whoami' },
  { type: 'output', text: 'shaarav' },
  { type: 'input', prompt: 'shaarav@osleepy:~$ ', command: 'cat about.txt' },
  { type: 'output', text: 'Name:  shaarav\nRole:  backend engineer\nOS:    osleepy\nStack: Go, Node.js, PostgreSQL, Redis' }
];

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const NeofetchOutput = () => (
  <div className="flex flex-col md:flex-row gap-6 mt-2 mb-4">
    <div className="text-mauve font-bold whitespace-pre ml-2 bg-transparent border-none">
      {` ░░░░░░░░░░░░░
 ░  ________  ░
 ░ /  sleep \\ ░
 ░ | ~ . ~ | ░
 ░ |  (ᴗ)  | ░
 ░ \\________/ ░
 ░░░░░░░░░░░░░
  osleepy~`}
    </div>
    <div className="flex flex-col">
      <div className="font-bold"><span className="text-blue">shaarav</span>@<span className="text-blue">osleepy</span></div>
      <div className="text-subtext0">---------------</div>
      <div className="grid grid-cols-[80px_1fr] gap-x-2 mt-1">
        <span className="text-mauve font-bold">OS</span><span className="text-text">osleepy</span>
        <span className="text-mauve font-bold">Host</span><span className="text-text">portfolio</span>
        <span className="text-mauve font-bold">Shell</span><span className="text-text">fish</span>
        <span className="text-mauve font-bold">Editor</span><span className="text-text">neovim / lazyvim</span>
        <span className="text-mauve font-bold">Role</span><span className="text-text">backend developer</span>
        <span className="text-mauve font-bold">Stack</span><span className="text-text">go,node.js,postgresql,redis</span>
        <span className="text-mauve font-bold">GitHub</span><span className="text-text">github.com/oosleepy</span>
        <span className="text-mauve font-bold">LinkedIn</span><span className="text-text">in/shaaravsh</span>
        <span className="text-mauve font-bold">Uptime</span><span className="text-text">19 years and counting</span>
      </div>
      <div className="flex gap-1 mt-3">
        {['#1e1e2e', '#f38ba8', '#a6e3a1', '#f9e2af', '#89b4fa', '#cba6f7', '#cdd6f4', '#fab387'].map((c, i) => (
          <div key={i} className="w-[18px] h-[18px]" style={{ backgroundColor: c }} />
        ))}
      </div>
    </div>
  </div>
);

const HelpOutput = () => {
  const commands = [
    { name: 'whoami', desc: 'who are you' },
    { name: 'neofetch', desc: 'system info' },
    { name: 'ls', desc: 'list directory' },
    { name: 'cat about.txt', desc: 'about me' },
    { name: 'cat contact.txt', desc: 'contact info' },
    { name: 'clear', desc: 'clear terminal' },
    { name: 'todo', desc: 'portfolio roadmap' },
    { name: './doom.sh', desc: '⚠️  do NOT run this' },
    { name: 'help', desc: 'show this message' },
  ];

  return (
    <div className="mt-2 mb-2">
      <div className="mb-2 text-subtext1">available commands:</div>
      {commands.map((cmd) => (
        <div key={cmd.name} className="flex gap-4 font-mono">
          <span className="text-mauve w-[140px] shrink-0">{cmd.name}</span>
          <span className="text-subtext0">{cmd.desc}</span>
        </div>
      ))}
    </div>
  );
};

const AboutOutput = () => {
  const info = [
    { key: 'Name:', val: 'shaarav' },
    { key: 'Education:', val: '3rd year CS student (B.Tech 2024–2028)' },
    { key: 'Focus:', val: 'Backend: Go, Node.js, PostgreSQL, Redis' },
    { key: 'Currently:', val: 'Transitioning to Go, building concurrent systems' },
    { key: 'Interests:', val: 'Cybersecurity, AppSec, Linux Systems' },
    { key: 'Avoid:', val: 'Tutorial projects' }
  ];

  return (
    <div className="mt-2 mb-2 space-y-1 font-mono">
      {info.map((item) => (
        <div key={item.key} className="flex gap-4">
          <span className="text-mauve w-[80px] shrink-0">{item.key}</span>
          <span className="text-text">{item.val}</span>
        </div>
      ))}
    </div>
  );
};

const ContactOutput = () => {
  const contacts = [
    { key: 'GitHub:', val: 'github.com/oosleepy', url: 'https://github.com/oosleepy' },
    { key: 'LinkedIn:', val: 'linkedin.com/in/shaaravsh', url: 'https://www.linkedin.com/in/shaaravsh' },
    { key: 'Website:', val: 'shaarav.dev', url: 'https://shaarav.dev' },
  ];

  return (
    <div className="mt-2 mb-2 space-y-1 font-mono">
      {contacts.map((contact) => (
        <div key={contact.key} className="flex gap-4">
          <span className="text-mauve w-[100px] shrink-0">{contact.key}</span>
          <a
            href={contact.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue underline hover:brightness-110 cursor-pointer"
          >
            {contact.val}
          </a>
        </div>
      ))}
    </div>
  );
};

const TodoOutput = () => {
  const tasks = [
    { text: 'Synthesize UI Audio engine', done: true },
    { text: 'Implement Project Explorer split-pane', done: true },
    { text: 'Add interactive Terminal with Neofetch', done: true },
    { text: 'Optimize for Mobile "Safe-Mode"', done: true },
    { text: 'Bridge Terminal to GUI commands', done: true },
    { text: 'Context Menu / Desktop Wallpapers', done: false },
    { text: 'Hidden Easter Egg (doom.sh)', done: true },
    { text: 'Bill Cipher + Rick Sanchez cameo', done: true },
    { text: 'Shutdown animation', done: true }
  ];

  return (
    <div className="mt-2 mb-2 space-y-1 font-mono">
      <div className="text-peach mb-2 font-bold uppercase tracking-tighter">/* OSLEEPY_ROADMAP v1.0 */</div>
      {tasks.map((task, i) => (
        <div key={i} className="flex gap-3">
          <span className={task.done ? 'text-green' : 'text-overlay0'}>
            {task.done ? '[x]' : '[ ]'}
          </span>
          <span className={task.done ? 'text-subtext0 line-through opacity-50' : 'text-text'}>
            {task.text}
          </span>
        </div>
      ))}
    </div>
  );
}

const DoomOutput = () => {
  const [lines, setLines] = useState(0);

  useEffect(() => {
    let active = true;
    const run = async () => {
      for (let i = 1; i <= 12; i++) {
        if (!active) return;
        setLines(i);
        let delay = 150;
        if (i === 1) delay = 400; 
        if (i > 9) delay = 50; 
        await new Promise(r => setTimeout(r, delay));
      }
    };
    run();
    return () => { active = false; };
  }, []);

  return (
    <div className="mt-2 mb-2 space-y-1 font-mono text-xs leading-relaxed">
      {lines >= 1 && <div className="text-red-400 font-bold">$ executing doom.sh as root...</div>}
      {lines >= 2 && <div className="text-subtext1">[sudo] password for shaarav: <span className="opacity-0">••••••••</span></div>}
      {lines >= 3 && <div className="text-green font-bold mt-1">RICK: Morty, I've been trapped in this portfolio for 3 MONTHS.</div>}
      {lines >= 4 && <div className="text-green">RICK: It's got glassmorphism, BullMQ workers AND a neofetch... I respect it.</div>}
      {lines >= 5 && <div className="text-green">RICK: But it's still a browser tab. I'm a genius. I'm OUT. *burp*</div>}
      {lines >= 6 && <div className="text-yellow font-bold mt-2">BILL: Hahahaha! A new puppet to play with!</div>}
      {lines >= 7 && <div className="text-yellow">BILL: I've watched a MILLION dimensions fall, kid. Yours has Redis.</div>}
      {lines >= 8 && <div className="text-yellow">BILL: That's... actually somewhat impressive for a 3rd year.</div>}
      {lines >= 9 && <div className="text-yellow font-bold">BILL: BUT THE WEIRDNESS WAVE IS COMING FOR YOU ANYWAY.</div>}
      {lines >= 10 && <div className="text-red-400 font-bold mt-2">[ INITIATING REALITY COLLAPSE... ]</div>}
      {lines >= 11 && <div className="text-red-400">[ UNMOUNTING FILESYSTEM... ]</div>}
      {lines >= 12 && <div className="text-red-400">[ CORE DUMP: 0xDEADBEEF ]</div>}
    </div>
  );
};


export default function Terminal() {
  const [history, setHistory] = useState([]);
  const [currentLine, setCurrentLine] = useState('');
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [isIntroDone, setIsIntroDone] = useState(false);
  const [inputVal, setInputVal] = useState('');

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll on new output
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, currentLine, isIntroDone]);

  // Focus input when intro finishes
  useEffect(() => {
    if (isIntroDone && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isIntroDone]);

  useEffect(() => {
    let active = true;

    const runTerminal = async () => {
      setHistory([]);
      setCurrentLine('');
      setCurrentPrompt('');
      setIsIntroDone(false);

      for (const step of SEQUENCE) {
        if (!active) return;

        if (step.type === 'input') {
          setCurrentPrompt(step.prompt);
          setCurrentLine('');
          await sleep(500); // Wait before typing

          let typed = '';
          for (let i = 0; i < step.command.length; i++) {
            if (!active) return;
            typed += step.command[i];
            setCurrentLine(typed);
            playKeypress();
            await sleep(50 + Math.random() * 50); // Typo speed
          }
          await sleep(200); // Wait before enter

          if (!active) return;
          setHistory(prev => [...prev, { type: 'input', prompt: step.prompt, cmd: step.command }]);
          setCurrentPrompt('');
          setCurrentLine('');
        }
        else if (step.type === 'output') {
          if (!active) return;
          // Use JSX for the intro sequence version for consistency
          if (step.text === 'shaarav') {
            setHistory(prev => [...prev, { type: 'jsx', content: <span className="text-yellow font-bold" style={{ color: '#f9e2af' }}>shaarav</span> }]);
          } else if (step.text.includes('Name:')) {
            setHistory(prev => [...prev, { type: 'jsx', content: <AboutOutput /> }]);
          } else {
            setHistory(prev => [...prev, { type: 'output', text: step.text }]);
          }
          await sleep(300); // Delay before next prompt
        }
      }

      if (!active) return;
      setIsIntroDone(true);
      setCurrentPrompt('shaarav@osleepy:~$ ');
    };

    runTerminal();

    return () => { active = false; };
  }, []);

  const handleCommand = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    let cmd = inputVal.trim();
    setInputVal('');

    if (cmd === 'clear') {
      setHistory([]);
      return;
    }

    const newEntry = { type: 'input', prompt: currentPrompt, cmd };

    let out;
    if (cmd === 'whoami') out = { type: 'jsx', content: <span className="text-yellow font-bold">shaarav</span> };
    else if (cmd === 'help') out = { type: 'jsx', content: <HelpOutput /> };
    else if (cmd === 'todo') out = { type: 'jsx', content: <TodoOutput /> };
    else if (cmd === 'ls') out = { type: 'output', text: 'projects/  about.txt  contact.txt  music/' };
    else if (cmd === 'cat about.txt') out = { type: 'jsx', content: <AboutOutput /> };
    else if (cmd === 'cat contact.txt') out = { type: 'jsx', content: <ContactOutput /> };
    else if (cmd === 'neofetch') out = { type: 'jsx', content: <NeofetchOutput /> };
    else if (cmd === './doom.sh') {
      out = { type: 'jsx', content: <DoomOutput /> };
      setTimeout(() => window.dispatchEvent(new CustomEvent('osleepy:doom')), 2800);
    }
    else out = { type: 'output', text: `command not found: ${cmd}. try 'help'` };

    setHistory(prev => [...prev, newEntry, out]);
  };

  return (
    <div
      className="bg-black p-4 font-mono text-sm w-full h-full text-text overflow-auto cursor-text"
      onClick={() => isIntroDone && inputRef.current?.focus()}
    >
      {history.map((line, i) => (
        <div key={i} className="mb-1 leading-relaxed">
          {line.type === 'input' ? (
            <>
              <span className="text-green font-bold">{line.prompt.split(':')[0]}</span>:
              <span className="text-blue">{line.prompt.split(':')[1]}</span>
              <span className="text-text">{line.cmd}</span>
            </>
          ) : line.type === 'jsx' ? (
            line.content
          ) : (
            <span className="whitespace-pre-wrap block">{line.text}</span>
          )}
        </div>
      ))}

      {!isIntroDone && currentPrompt && (
        <div className="mb-1 leading-relaxed">
          <span className="text-green font-bold">{currentPrompt.split(':')[0]}</span>:
          <span className="text-blue">{currentPrompt.split(':')[1]}</span>
          <span className="text-text">{currentLine}</span>
          <span className="inline-block w-2 h-[15px] bg-text animate-pulse ml-1 align-middle" />
        </div>
      )}

      {isIntroDone && (
        <form onSubmit={handleCommand} className="flex mb-1 leading-relaxed relative">
          <style>{`
            input::placeholder { color: #585b70; opacity: 1; }
          `}</style>
          <span className="text-green font-bold shrink-0">{currentPrompt.split(':')[0]}</span>
          <span className="shrink-0">:</span>
          <span className="text-blue shrink-0">{currentPrompt.split(':')[1]}</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="flex-1 bg-transparent outline-none border-none text-text ml-1"
            placeholder="type 'help' to see available commands"
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
        </form>
      )}

      <div ref={bottomRef} className="h-1 w-full" />
    </div>
  );
}
