import './App.css';
import React, { useEffect, useMemo, useState } from 'react';
import { CircuitBackdrop } from './components/circuitry/CircuitBackdrop';

const introLines = [
  'init --profile michael-baldwin',
  'load --focus full-stack-engineering',
  'run --mode enterprise-and-product-impact',
];

const quickStats = [
  { label: 'Years Shipping Software', value: '7+' },
  { label: 'Enterprise Accounts Delivered', value: '10+' },
  { label: 'Assets Governed in VulnRx', value: '60,000+' },
  { label: 'Current Focus', value: 'Senior SWE / Product Teams' },
];

const experience = [
  {
    company: 'VSO, LLC',
    role: 'Full Stack Software Engineer',
    period: 'Dec 2021 - Present',
    summary:
      'Architecting and delivering configurable enterprise automation products, from data contracts through UI and release support.',
    highlights: [
      'Built FogLifter, a configurable platform that ingests, transforms, and processes customer data into report-ready outputs.',
      'Led Pipeline Builder: visual drag-and-drop workflow authoring with versioning and validation that replaced handwritten JSON configs.',
      'Delivered client automation for Kaiser Permanente, Kyndryl, Raytheon, and Disney across ingestion, transformation, and invoice rollups.',
      'Developed FogLifter VulnRx policy and attestation workflows supporting maintenance windows and exemptions across 60,000+ assets.',
    ],
  },
  {
    company: 'Citigroup, Inc.',
    role: 'Full Stack Software Engineer (Contract to FTE)',
    period: 'Jul 2019 - Dec 2021',
    summary:
      'Built workflow and case-management automation using IBM BPM/BAW, Java, and MSSQL to reduce operational latency and manual review overhead.',
    highlights: [
      'Reduced account opening time from up to 2 months down to roughly 2 days through automated orchestration.',
      'Converted from contractor to direct hire after sustained delivery impact.',
    ],
  },
];

const projects = [
  {
    name: 'Curby',
    tag: 'Live Product',
    url: 'https://getcurby.app',
    repo: '~/Curby/curby + ~/Curby/curby-web',
    description:
      'A community-driven marketplace for free curbside items: post in seconds, discover nearby finds, and navigate for pickup without messaging or scheduling overhead. Built to reduce landfill waste while making neighborhood reuse simple and fast across mobile and web.',
    stack:
      'React Native, Expo, Next.js, TypeScript, Supabase/PostgreSQL, Redux Toolkit, TanStack React Query, moderation and notification workflows',
  },
  {
    name: 'Carvd Studio',
    tag: 'Live Product',
    url: 'https://carvd-studio.com',
    repo: '~/Carvd/carvd-studio',
    description:
      'Cross-platform desktop application for furniture and cabinet design, including 3D editing, cut-list generation, and PDF exports.',
    stack: 'Electron, React, TypeScript, Three.js, shadcn/ui, Radix UI, Vite',
  },
  {
    name: 'Realtime Chat Platform',
    tag: 'Personal Build',
    url: '',
    repo: 'private repo',
    description:
      'Socket-based chat application built to deeply understand real-time bidirectional communication patterns and reliability concerns.',
    stack: 'Node.js, WebSockets, React, Express',
  },
  {
    name: 'Browser Game Experiment',
    tag: 'Personal Build',
    url: '',
    repo: 'private repo',
    description:
      'Custom game mechanics and animation loop prototype used to sharpen front-end rendering and interaction design skills.',
    stack: 'JavaScript, HTML5 Canvas, CSS',
  },
];

const skills = [
  {
    title: 'Languages',
    value: 'JavaScript, TypeScript, Java, SQL, HTML5, CSS3, SCSS',
  },
  {
    title: 'Frameworks',
    value: 'React, Next.js, React Native, Expo, Electron, Node.js, Express, NestJS, Material UI, shadcn/ui',
  },
  {
    title: 'Data Layer',
    value: 'PostgreSQL, MongoDB, MySQL, SQL Server, Oracle, Supabase, Snowflake, DuckDB, SQLite',
  },
  {
    title: 'Delivery',
    value: 'GitHub Actions, Docker, Kustomize, OpenAPI, Webpack, Vite, Rollup, SWC',
  },
  {
    title: 'Testing',
    value: 'Jest, React Testing Library, Vitest, Playwright, Supertest, Jasmine, Karma',
  },
  {
    title: 'Auth + Cloud',
    value: 'Azure, MSAL, Microsoft Graph, OAuth2, JWT',
  },
];

const commandSections = [
  { id: 'impact', command: 'cat /impact/highlights.log', title: 'Selected Impact' },
  { id: 'experience', command: 'ls /career/timeline', title: 'Professional Experience' },
  { id: 'projects', command: 'open /projects/personal', title: 'Personal Projects' },
  { id: 'skills', command: 'printenv TECH_STACK', title: 'Technical Skills' },
  { id: 'education', command: 'cat /credentials.txt', title: 'Education + Certification' },
];

function App() {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const typedLine = useMemo(() => {
    const activeLine = introLines[lineIndex] || '';
    return activeLine.slice(0, charIndex);
  }, [lineIndex, charIndex]);

  useEffect(() => {
    if (lineIndex >= introLines.length) {
      return undefined;
    }

    const activeLine = introLines[lineIndex];
    const hasMoreChars = charIndex < activeLine.length;
    const delay = hasMoreChars ? 38 : 820;

    const timer = setTimeout(() => {
      if (hasMoreChars) {
        setCharIndex((prev) => prev + 1);
        return;
      }

      setLineIndex((prev) => prev + 1);
      setCharIndex(0);
    }, delay);

    return () => clearTimeout(timer);
  }, [lineIndex, charIndex]);

  const isTypingComplete = lineIndex >= introLines.length;

  return (
    <div className="portfolio-shell" id="top">
      <div className="ambient-grid" aria-hidden="true" />
      <div className="ambient-noise" aria-hidden="true" />
      <CircuitBackdrop />
      <div className="shell-scroll">
        <header className="terminal-window">
          <div className="window-chrome">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
            <p className="window-title">michael@portfolio:~</p>
          </div>

          <div className="hero-block">
            <img className="hero-logo" src="/MB-Logo/MB-Logo-NoText-Dark.png" alt="Michael Baldwin logo" />
            <p className="hero-label">$ whoami</p>
            <h1>Michael Baldwin</h1>
            <p className="hero-subtitle">Full-Stack Software Engineer</p>
            <p className="hero-description">
              Building enterprise-grade automation and product software that turns complex workflow problems into
              reliable systems.
            </p>

            <div className="typed-terminal" aria-live="polite">
              {introLines.slice(0, lineIndex).map((line) => (
                <p key={line}>
                  <span className="prompt">mb@host:~$</span> {line}
                </p>
              ))}

              {!isTypingComplete && (
                <p>
                  <span className="prompt">mb@host:~$</span> {typedLine}
                  <span className="cursor" aria-hidden="true" />
                </p>
              )}

              {isTypingComplete && (
                <p>
                  <span className="prompt">mb@host:~$</span> ready
                  <span className="cursor" aria-hidden="true" />
                </p>
              )}
            </div>

            <div className="hero-actions">
              <a href="#projects" className="terminal-btn primary">
                ./view-projects
              </a>
              <a href="/Baldwin_Michael_Resume_20FEB2026.pdf" target="_blank" rel="noreferrer" className="terminal-btn">
                ./download-resume
              </a>
              <a href="mailto:michaeldonaldbaldwin@gmail.com" className="terminal-btn">
                ./contact
              </a>
            </div>

            <ul className="hero-links">
              <li>
                <a href="https://www.linkedin.com/in/michael-baldwin-161324174/" target="_blank" rel="noreferrer">
                  linkedin.com/in/michael-baldwin-161324174
                </a>
              </li>
              <li>
                <a href="tel:+19133535414">+1 (913) 353-5414</a>
              </li>
              <li>Norfolk, VA</li>
            </ul>
          </div>
        </header>

        <main className="terminal-content">
          <nav className="section-nav" aria-label="Section navigation">
            {commandSections.map((section) => (
              <a key={section.id} href={`#${section.id}`}>
                {section.command}
              </a>
            ))}
          </nav>

          <section className="terminal-panel" id="impact">
            <div className="panel-command">$ cat /impact/highlights.log</div>
            <h2>Selected Impact</h2>
            <div className="stats-grid">
              {quickStats.map((item) => (
                <article key={item.label}>
                  <p className="stat-value">{item.value}</p>
                  <p className="stat-label">{item.label}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="terminal-panel" id="experience">
            <div className="panel-command">$ ls /career/timeline</div>
            <h2>Professional Experience</h2>
            {experience.map((job) => (
              <article key={job.company} className="experience-entry">
                <div className="experience-head">
                  <h3>{job.role}</h3>
                  <p>{job.period}</p>
                </div>
                <p className="experience-meta">{job.company}</p>
                <p className="experience-summary">{job.summary}</p>
                <ul>
                  {job.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </article>
            ))}
          </section>

          <section className="terminal-panel" id="projects">
            <div className="panel-command">$ open /projects/personal</div>
            <h2>Personal Projects</h2>
            <div className="project-grid">
              {projects.map((project) => (
                <article key={project.name} className="project-card">
                  <p className="project-tag">[{project.tag}]</p>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <p className="project-stack">{project.stack}</p>
                  <p className="project-repo">repo: {project.repo}</p>
                  {project.url ? (
                    <a href={project.url} target="_blank" rel="noreferrer">
                      launch {project.name.toLowerCase()} ↗
                    </a>
                  ) : (
                    <p className="private-note">launch unavailable (private)</p>
                  )}
                </article>
              ))}
            </div>
          </section>

          <section className="terminal-panel" id="skills">
            <div className="panel-command">$ printenv TECH_STACK</div>
            <h2>Technical Skills</h2>
            <div className="skills-grid">
              {skills.map((skill) => (
                <article key={skill.title}>
                  <h3>{skill.title}</h3>
                  <p>{skill.value}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="terminal-panel" id="education">
            <div className="panel-command">$ cat /credentials.txt</div>
            <h2>Education + Certification</h2>
            <ul>
              <li>B.S. Mathematics, Benedictine College (2014 - 2018)</li>
              <li>Certified Scrum Master, Scrum Alliance (2023)</li>
            </ul>
          </section>
        </main>

        <footer className="terminal-footer">
          <p>
            $ echo Open to senior software engineering roles and product-focused teams
            <span className="cursor" aria-hidden="true" />
          </p>
          <div className="footer-links">
            <a href="/privacy.html">privacy</a>
            <a href="#top">cd ~</a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
