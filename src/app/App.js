import './App.css';
import React, { useEffect, useMemo, useState } from 'react';
import { CircuitBackdrop } from './components/circuitry/CircuitBackdrop';

const introLines = [
  'init --profile michael-baldwin',
  'load --focus senior-full-stack-product-engineering',
  'run --mode enterprise-and-product-impact',
];

const quickStats = [
  { label: 'Years Shipping Software', value: '7+' },
  { label: 'Assets Governed in VulnRx', value: '60,000+' },
  { label: 'Workflow Reduction at Citi', value: '2mo -> 2d' },
  { label: 'Shipped Product Surfaces', value: '5+' },
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
      'Built a Walt Disney Company telecom billing system integrated with FogLifter, ServiceNow, Tangoe, and Spok to track services, payments, invoices, and account balances as the source of truth for Orlando business units.',
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
    name: 'Myrivo',
    tag: 'Live Revenue Product',
    url: 'https://myrivo.app',
    image: '/project-media/myrivo-seller-workspace.jpg',
    imageAlt: 'Myrivo seller workspace dashboard',
    description:
      'Multi-tenant commerce platform for independent makers and small shops, combining branded storefronts, cart/checkout, inventory, orders, promotions, reviews, legal/privacy flows, and merchant operations.',
    proof:
      'Built Supabase/PostgreSQL data flows with row-level security, Stripe Connect-style seller/payment workflows, storefront analytics, customer/order workflows, email notifications, and route/component test coverage.',
    stack: 'Next.js, TypeScript, Supabase/PostgreSQL, RLS, Stripe Connect, Resend, Tailwind CSS, Vitest, Playwright',
  },
  {
    name: 'Curby',
    tag: 'Near-Launch Venture',
    url: 'https://getcurby.app',
    images: [
      { src: '/project-media/curby/armchair.png', alt: 'Curby armchair listing screen' },
      { src: '/project-media/curby/golf-clubs.png', alt: 'Curby golf clubs listing screen' },
      { src: '/project-media/curby/map.png', alt: 'Curby map view screen' },
      { src: '/project-media/curby/my-posts.png', alt: 'Curby my posts screen' },
    ],
    description:
      'A community-driven marketplace for free curbside items across mobile and web. Users can post in seconds, browse nearby finds, save items, navigate for pickup, and participate in a moderated reuse network.',
    proof:
      'Built the mobile app, public web/admin surfaces, Supabase-backed geospatial data flows, moderation workflows, notifications, rewards, and legal/business launch foundation.',
    stack:
      'React Native, Expo, Next.js, TypeScript, Supabase/PostgreSQL, RPC/functions, Redux Toolkit, TanStack Query, Sentry',
  },
  {
    name: 'Spark',
    tag: 'AI Product',
    url: 'https://spark-rm.com',
    images: [
      { src: '/project-media/spark/home.png', alt: 'Spark home streak screen' },
      { src: '/project-media/spark/today-check-ins.png', alt: 'Spark today check-ins screen' },
      { src: '/project-media/spark/contact-detail.png', alt: 'Spark contact detail screen' },
      {
        src: '/project-media/spark/steward-sheet-create-contact.png',
        alt: 'Spark AI contact creation screen',
      },
    ],
    description:
      'AI relationship manager that helps busy professionals remember who matters, see who to follow up with, and draft thoughtful messages from contact context.',
    proof:
      'Built contact memory, daily check-in suggestions, AI-assisted message drafting, privacy-conscious workflow boundaries, and subscription-tier product packaging.',
    stack: 'React, TypeScript, AI workflows, subscription product design, relationship data modeling',
  },
  {
    name: 'Carvd Studio',
    tag: 'Live Revenue Product',
    url: 'https://carvd-studio.com',
    image: '/project-media/carvd-studio-workspace.png',
    imageAlt: 'Carvd Studio 3D furniture design workspace',
    description:
      'Cross-platform desktop application for furniture and cabinet design, including real-time 3D editing, reusable assemblies, stock libraries, optimized cut-list generation, and PDF exports.',
    proof:
      'Shipped publicly with a marketing/docs site, 14-day trial, Lemon Squeezy license activation, offline license cache, auto-update/release packaging, and initial paid sales.',
    stack: 'Electron, React, TypeScript, Three.js, Zustand, Vitest, Playwright, electron-builder, Lemon Squeezy',
  },
  {
    name: 'Baldwin Listings Co.',
    tag: 'Live Managed-Service Platform',
    url: 'https://baldwinlistingsco.com',
    previewUrl: 'https://baldwinlistingsco.com',
    previewTitle: 'Baldwin Listings Co. homepage preview',
    description:
      'Managed seller-lead generation platform for real estate agents, covering branded landing pages, instant home-value estimates, lead capture, verification, nurture, billing, client portals, and internal operations.',
    proof:
      'Built property-provider integrations, lead scoring, ZeroBounce/Twilio/NumVerify verification, Resend email workflows, Vercel domain provisioning, admin workspaces, and campaign/reporting architecture.',
    stack: 'Next.js, TypeScript, Neon Postgres, Resend, Stripe, Vercel APIs, Twilio, Google AI, Vitest, Playwright',
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
    value: 'Supabase Auth, Azure, MSAL, Microsoft Graph, OAuth2, JWT, role-based access patterns',
  },
];

const commandSections = [
  { id: 'impact', command: 'cat /impact/highlights.log', title: 'Selected Impact' },
  { id: 'experience', command: 'ls /career/timeline', title: 'Professional Experience' },
  { id: 'projects', command: 'open /projects/product-portfolio', title: 'Product Portfolio' },
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
            <p className="hero-subtitle">Senior Full-Stack / Product Engineer</p>
            <p className="hero-description">
              Building enterprise workflow platforms and shipped product software across React, TypeScript, Node.js,
              Supabase/Postgres, mobile, and AI-enabled workflows.
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
              <a
                href="/Michael_Baldwin_Senior_Full_Stack_Product_Engineer_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="terminal-btn"
              >
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
                <a href="https://github.com/mdbaldwin1" target="_blank" rel="noreferrer">
                  github.com/mdbaldwin1
                </a>
              </li>
              <li>
                <a href="mailto:michaeldonaldbaldwin@gmail.com">michaeldonaldbaldwin@gmail.com</a>
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
            <h2>Product Portfolio</h2>
            <div className="project-grid">
              {projects.map((project) => (
                <article key={project.name} className="project-card">
                  {project.images ? (
                    <a
                      className="project-media-link project-media-link-gallery"
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open ${project.name}`}
                    >
                      <div className="project-gallery" aria-label={`${project.name} screenshots`}>
                        {project.images.map((image) => (
                          <img
                            key={image.src}
                            className="project-gallery-image"
                            src={image.src}
                            alt={image.alt}
                            loading="lazy"
                          />
                        ))}
                      </div>
                      <span className="project-media-overlay">open {project.name.toLowerCase()} ↗</span>
                    </a>
                  ) : project.image ? (
                    <a
                      className="project-media-link"
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open ${project.name}`}
                    >
                      <img className="project-image" src={project.image} alt={project.imageAlt} loading="lazy" />
                      <span className="project-media-overlay">open {project.name.toLowerCase()} ↗</span>
                    </a>
                  ) : project.previewUrl ? (
                    <a
                      className="project-media-link"
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open ${project.name}`}
                    >
                      <iframe
                        className="project-preview-frame"
                        src={project.previewUrl}
                        title={project.previewTitle}
                        loading="lazy"
                        tabIndex="-1"
                      />
                      <span className="project-media-overlay">open {project.name.toLowerCase()} ↗</span>
                    </a>
                  ) : null}
                  <p className="project-tag">[{project.tag}]</p>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <p className="project-proof">{project.proof}</p>
                  <p className="project-stack">{project.stack}</p>
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
            $ echo Open to senior full-stack, product engineering, and platform roles
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
