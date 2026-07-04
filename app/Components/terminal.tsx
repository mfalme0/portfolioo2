'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

interface TerminalProps {
  onBuildComplete: () => void;
  onExit: () => void;
  onThemeChange: (theme: 'sketch' | 'dark') => void;
}

type LineType = 'input' | 'output' | 'system' | 'error' | 'success' | 'ascii' | 'highlight' | 'info';

interface Line {
  text: string;
  type: LineType;
  id: number;
}

const BANNER = `╔══════════════════════════════════════════╗
║     JOSEPH GITAU :: PORTFOLIO v2.0     ║
║     Full-Stack Engineer / Sys Architect ║
╚══════════════════════════════════════════╝

Type 'help' for available commands`;

const COMMAND_LIST = [
  { cmd: 'help', desc: 'Show available commands' },
  { cmd: 'npm run dev', desc: 'Build portfolio in dark mode' },
  { cmd: 'about', desc: 'About Joseph Gitau' },
  { cmd: 'projects', desc: 'View projects' },
  { cmd: 'skills', desc: 'Tech stack & skills' },
  { cmd: 'contact', desc: 'Contact information' },
  { cmd: 'whoami', desc: 'Display current user' },
  { cmd: 'ls', desc: 'List portfolio sections' },
  { cmd: 'cat <section>', desc: 'View section content' },
  { cmd: 'clear', desc: 'Clear terminal' },
  { cmd: 'exit / quit', desc: 'Return to sketch mode' },
  { cmd: 'theme <sketch|dark>', desc: 'Switch display theme' },
  { cmd: 'neofetch', desc: 'Display system info' },
  { cmd: 'date', desc: 'Show current date/time' },
  { cmd: 'banner', desc: 'Show welcome banner' },
  { cmd: 'echo <text>', desc: 'Echo text' },
  { cmd: 'uptime', desc: 'Show terminal uptime' },
  { cmd: 'repo / github', desc: 'Open GitHub repository' },
  { cmd: 'sudo', desc: 'Elevate privileges' },
];

const ABOUT_TEXT = `Joseph Gitau — Full-Stack Engineer
================================================

  Location:  Nairobi, Kenya
  Focus:     React, Next.js, Node.js, C#, Cloud
  Experience: 3+ years engineering production software

  I architect complete systems — from pixel-perfect React
  interfaces to containerised backend services deployed on
  self-hosted infrastructure. Every layer is intentional.

  Domains:
    • Frontend Engineering  — React, Next.js, Tailwind, TS
    • Backend Systems       — Node.js, C#, .NET, Python
    • Mobile & Cross-Platform — Kotlin, Flutter, React Native
    • Infrastructure & DevOps — Docker, Proxmox, Cloud, CI/CD`;

const PROJECTS_TEXT = `Projects
========

  1. Better Farm — AI-Powered Agriculture
     AI farming assistant with neural-chat architecture.
     → github.com/mfalme0/betterFarm

  2. Ganji — Financial Ledger System
     Expense tracking and asset management platform.
     → github.com/mfalme0/ganji

  3. Ndai — Vehicle Management
     Fleet tracking, maintenance scheduling, analytics.
     → github.com/mfalme0/ndai.com

  4. Archie — Secure File Archival
     Encrypted file archival with distributed retrieval.
     → github.com/mfalme0/Archiewebapp`;

const SKILLS_TEXT = `Tech Stack & Environment
=========================

  Platforms:   MacOS · iOS · Android · Linux
  Cloud:       AWS · Firebase · Docker
  Languages:   TypeScript · JavaScript · Python · C# · Kotlin · Dart
  Frontend:    React · Next.js · Tailwind · Framer Motion
  Backend:     Node.js · .NET · Prisma · GraphQL
  Mobile:      React Native · Flutter · Kotlin
  Data:        PostgreSQL · MongoDB
  Infra:       Proxmox · Docker · Linux · CI/CD
  Design:      Figma`;

const CONTACT_TEXT = `Contact Information
=====================

  Email:    josephgitauc@gmail.com
  GitHub:   github.com/mfalme0
  LinkedIn: linkedin.com/in/joseph-g-471678208/
  X:        x.com/joemfalme001
  Location: Nairobi, Kenya

  Or use the contact form on the portfolio page.`;

const SECTIONS = [
  'hero', 'about-me', 'experience', 'techstack',
  'languages', 'projects', 'testimonials', 'github', 'end',
];

const SECTION_CONTENT: Record<string, string> = {
  hero: 'Hero — Joseph Gitau\n  Full-Stack Engineer & Systems Architect\n  Stats: 3+ years, 20+ projects shipped',
  'about-me': 'About Me\n  Engineering at Every Layer\n  4 domains: Frontend, Backend, Mobile, DevOps',
  experience: 'Experience\n  Work history and professional experience',
  techstack: 'Tech Stack\n  10 technologies across Platform, Mobile, Cloud, Data, DevOps, Design',
  languages: 'Programming Languages\n  TypeScript, JavaScript, Python, C#, Kotlin, Dart, Swift',
  projects: 'Projects\n  4 featured projects: Better Farm, Ganji, Ndai, Archie',
  testimonials: 'Testimonials\n  What clients and collaborators say',
  github: 'GitHub\n  GitHub contribution calendar and activity',
  end: 'End / Contact\n  Get in touch — deployment is connection',
};

export default function Terminal({ onBuildComplete, onExit, onThemeChange }: TerminalProps) {
  const [lines, setLines] = useState<Line[]>([
    { text: BANNER, type: 'ascii', id: 0 },
    { text: '', type: 'output', id: 1 },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [building, setBuilding] = useState(false);
  const [buildProgress, setBuildProgress] = useState(0);
  const [showError, setShowError] = useState(false);
  const [startTime] = useState(Date.now());
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(2);

  const addLine = useCallback((text: string, type: LineType) => {
    setLines(prev => [...prev, { text, type, id: nextId.current++ }]);
  }, []);

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      if (outputRef.current) {
        outputRef.current.scrollTop = outputRef.current.scrollHeight;
      }
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [lines]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const runBuild = useCallback(() => {
    if (building) return;
    setBuilding(true);
    setBuildProgress(0);
    setShowError(false);

    const simulateError = Math.random() < 0.15;

    const steps = [
      { progress: 5, delay: 300, text: '> portfolioo@0.1.0 dev' },
      { progress: 10, delay: 600, text: '> next dev' },
      { progress: 15, delay: 900, text: '' },
      { progress: 20, delay: 1100, text: '  ▲ Next.js 16.0.10' },
      { progress: 25, delay: 1300, text: '  - Local: http://localhost:3000' },
      { progress: 30, delay: 1600, text: '' },
      { progress: 35, delay: 1900, text: simulateError ? '✗ Failed to compile in 2.1s' : '✓ Ready in 2.3s', type: simulateError ? 'error' as const : 'success' as const },
      { progress: 40, delay: 2200, text: simulateError ? '✗ Module not found: ./app/page.tsx' : '✓ Compiled successfully in 487ms', type: simulateError ? 'error' as const : 'success' as const },
    ];

    if (!simulateError) {
      steps.push(
        { progress: 45, delay: 2600, text: '' },
        { progress: 50, delay: 2900, text: 'Building sections...' },
        { progress: 55, delay: 3300, text: '  ✓ Hero (3 modules)' },
        { progress: 60, delay: 3700, text: '  ✓ About Me (5 modules)' },
        { progress: 65, delay: 4100, text: '  ✓ Experience (4 modules)' },
        { progress: 70, delay: 4500, text: '  ✓ Tech Stack (2 modules)' },
        { progress: 75, delay: 4900, text: '  ✓ Languages (1 module)' },
        { progress: 80, delay: 5300, text: '  ✓ Projects (6 modules)' },
        { progress: 85, delay: 5700, text: '  ✓ Testimonials (2 modules)' },
        { progress: 90, delay: 6100, text: '  ✓ GitHub (3 modules)' },
        { progress: 95, delay: 6500, text: '  ✓ End / Contact (4 modules)' },
        { progress: 100, delay: 7000, text: '' },
      );
    }

    steps.forEach((step) => {
      setTimeout(() => {
        setBuildProgress(step.progress);
        if (step.text) {
          const type: LineType = step.type ?? (step.text.startsWith('✓') ? 'success' : step.text.startsWith('✗') ? 'error' : 'output');
          addLine(step.text, type);
        }
      }, step.delay);
    });

    if (simulateError) {
      setTimeout(() => {
        addLine('', 'output');
        addLine('╔══════════════════════════════════════════╗', 'error');
        addLine('║  BUILD FAILED                           ║', 'error');
        addLine('║  Check the terminal output for errors.  ║', 'error');
        addLine('║  Run npm run dev again to retry.        ║', 'error');
        addLine('╚══════════════════════════════════════════╝', 'error');
        addLine('', 'output');
        addLine('Process exited with code 1', 'error');
        setBuilding(false);
        setShowError(true);
      }, 2500);
    } else {
      setTimeout(() => {
        addLine('✓ All sections compiled successfully (2048 modules)', 'success');
        addLine('', 'output');
        addLine('⚡ Opening portfolio in dark mode...', 'highlight');
        setTimeout(() => {
          setBuilding(false);
          onBuildComplete();
        }, 800);
      }, 7300);
    }
  }, [building, addLine, onBuildComplete]);

  const handleCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim();
    const parts = trimmed.split(/\s+/);
    const main = parts[0]?.toLowerCase() || '';
    const args = parts.slice(1);

    setHistory(prev => [trimmed, ...prev]);
    setHistoryIdx(-1);
    addLine(`$ ${trimmed}`, 'input');

    if (!trimmed) return;

    switch (main) {
      case 'help':
        addLine('', 'output');
        addLine('Available Commands:', 'highlight');
        addLine('─'.repeat(50), 'output');
        COMMAND_LIST.forEach(({ cmd, desc }) => {
          addLine(`  ${cmd.padEnd(20)} ${desc}`, 'output');
        });
        break;

      case 'npm':
        if (args[0] === 'run' && args[1] === 'dev') {
          runBuild();
        } else {
          addLine(`npm: unknown command '${args.join(' ')}'`, 'error');
        }
        break;

      case 'about':
        addLine('', 'output');
        ABOUT_TEXT.split('\n').forEach(line => addLine(line, 'output'));
        break;

      case 'projects':
        addLine('', 'output');
        PROJECTS_TEXT.split('\n').forEach(line => addLine(line, 'output'));
        break;

      case 'skills':
        addLine('', 'output');
        SKILLS_TEXT.split('\n').forEach(line => addLine(line, 'output'));
        break;

      case 'contact':
        addLine('', 'output');
        CONTACT_TEXT.split('\n').forEach(line => addLine(line, 'output'));
        break;

      case 'whoami':
        addLine('visitor', 'output');
        addLine('You are browsing Joseph Gitau\'s portfolio.', 'output');
        break;

      case 'ls':
        addLine('', 'output');
        addLine('Portfolio Sections:', 'highlight');
        SECTIONS.forEach((s, i) => addLine(`  ${i + 1}. ${s.replace(/-/g, ' ')}`, 'output'));
        break;

      case 'cat':
        if (args.length === 0) {
          addLine('Usage: cat <section>', 'error');
          addLine('Sections: ' + SECTIONS.join(', '), 'system');
        } else {
          const sectionName = args.join('-').toLowerCase().replace(/\s+/g, '-');
          const found = SECTIONS.find(s => s.includes(sectionName) || sectionName.includes(s));
          if (found) {
            addLine('', 'output');
            SECTION_CONTENT[found].split('\n').forEach(line => addLine(line, 'output'));
          } else {
            addLine(`cat: ${args.join(' ')}: section not found`, 'error');
            addLine('Try: ls', 'system');
          }
        }
        break;

      case 'clear':
        setLines([]);
        break;

      case 'exit':
      case 'quit':
        addLine('Returning to sketch mode...', 'system');
        setTimeout(() => onExit(), 300);
        break;

      case 'theme':
        if (args[0] === 'sketch') {
          addLine('Switching to sketch mode...', 'system');
          setTimeout(() => onThemeChange('sketch'), 300);
        } else if (args[0] === 'dark') {
          addLine('Switching to dark mode...', 'system');
          setTimeout(() => onThemeChange('dark'), 300);
        } else {
          addLine('Usage: theme <sketch|dark>', 'error');
        }
        break;

      case 'neofetch': {
        const uptimeMs = Date.now() - startTime;
        const uptimeMin = Math.floor(uptimeMs / 60000);
        const uptimeSec = Math.floor((uptimeMs % 60000) / 1000);
        addLine('', 'output');
        addLine(`         _.--------._`, 'ascii');
        addLine(`      .-'            '-.`, 'ascii');
        addLine(`    .'                  '.`, 'ascii');
        addLine(`   /   JOSEPH GITAU      \\`, 'ascii');
        addLine(`  :    Terminal v2.0      :`, 'ascii');
        addLine(`  |    Full-Stack Eng.    |`, 'ascii');
        addLine(`  :                      :`, 'ascii');
        addLine(`   \\    .--------------.  /`, 'ascii');
        addLine(`    \\( |  Nairobi, KE  | )/`, 'ascii');
        addLine(`     '  '--------------' '`, 'ascii');
        addLine('', 'output');
        addLine(`  OS:      PortfolioOS v2.0`, 'output');
        addLine(`  Host:    visitor@josephgitauc`, 'output');
        addLine(`  Kernel:  React 19.2.0 / Next.js 16`, 'output');
        addLine(`  Uptime:  ${uptimeMin}m ${uptimeSec}s`, 'output');
        addLine(`  Shell:   opencode`, 'output');
        addLine(`  Theme:   sketch`, 'output');
        addLine(`  Memory:  ∞ (unlimited)`, 'output');
        break;
      }

      case 'date':
        addLine(new Date().toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZoneName: 'short',
        }), 'output');
        break;

      case 'banner':
        addLine('', 'output');
        BANNER.split('\n').forEach(line => addLine(line, 'ascii'));
        break;

      case 'echo':
        addLine(args.join(' '), 'output');
        break;

      case 'uptime': {
        const uptimeMs = Date.now() - startTime;
        const uptimeMin = Math.floor(uptimeMs / 60000);
        const uptimeSec = Math.floor((uptimeMs % 60000) / 1000);
        addLine(`Terminal uptime: ${uptimeMin}m ${uptimeSec}s`, 'output');
        break;
      }

      case 'repo':
      case 'github':
        addLine('Opening GitHub repository...', 'system');
        window.open('https://github.com/mfalme0', '_blank');
        break;

      case 'sudo':
        addLine('', 'output');
        addLine('  ╔══════════════════════════════════════╗', 'ascii');
        addLine('  ║   YOU HAVE SUPERUSER PRIVILEGES      ║', 'ascii');
        addLine('  ║   ...in your own life. Go build      ║', 'ascii');
        addLine('  ║   something awesome today.           ║', 'ascii');
        addLine('  ╚══════════════════════════════════════╝', 'ascii');
        addLine('', 'output');
        addLine('(nice try though)', 'system');
        break;

      default:
        addLine(`command not found: ${main}`, 'error');
        addLine(`Type 'help' for available commands`, 'system');
    }
  }, [addLine, onExit, onThemeChange, runBuild, startTime]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIdx = historyIdx === -1 ? 0 : Math.min(historyIdx + 1, history.length - 1);
        setHistoryIdx(newIdx);
        setInput(history[newIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        const newIdx = historyIdx - 1;
        setHistoryIdx(newIdx);
        setInput(history[newIdx]);
      } else {
        setHistoryIdx(-1);
        setInput('');
      }
    }
  };

  const formatTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour12: false });
  };

  return (
    <motion.div
      className="terminal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center justify-between px-5 py-2 border-b border-[rgba(51,255,51,0.08)] bg-[#0d0d0d] select-none shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#ff5f5680]" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#ffbd2e80]" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#27c93f80]" />
        </div>
        <span className="text-[11px] text-[rgba(51,255,51,0.3)] font-mono tracking-wider">
          visitor@josephgitauc:~/portfolio
        </span>
        <span className="text-[11px] text-[rgba(51,255,51,0.2)] font-mono">{formatTime()}</span>
      </div>

      <div ref={outputRef} className="terminal-output">
        {lines.map((line) => (
          <div
            key={line.id}
            className={`terminal-line terminal-line-${line.type}`}
          >
            {line.text || '\u00A0'}
          </div>
        ))}
        {building && (
          <div className="mt-2">
            <div className="terminal-build-bar">
              <motion.div
                className="terminal-build-bar-fill"
                initial={{ width: '0%' }}
                animate={{ width: `${buildProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <span className="text-[11px] text-[rgba(51,255,51,0.4)] font-mono">
              Building... {buildProgress}%
            </span>
          </div>
        )}
        {!building && showError && (
          <div className="mt-4 flex items-center gap-3">
            <span className="text-[11px] text-[#ff4444] font-mono">Build failed.</span>
            <button
              onClick={runBuild}
              className="text-[11px] px-3 py-1 rounded font-mono border border-[rgba(255,68,68,0.3)] text-[#ff4444] hover:bg-[rgba(255,68,68,0.1)] transition-all"
            >
              Retry build
            </button>
          </div>
        )}
      </div>

      <div className="terminal-input-line">
        <span className="terminal-prompt text-sm">
          visitor@josephgitauc:~$
        </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="terminal-input"
          placeholder="Type a command..."
          disabled={building}
          spellCheck={false}
          autoComplete="off"
          autoFocus
        />
      </div>
    </motion.div>
  );
}
