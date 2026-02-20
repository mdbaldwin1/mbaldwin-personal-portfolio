import './App.css';
import React from 'react';

const coreImpact = [
  'Built FogLifter, a configurable enterprise platform that ingests, transforms, and processes customer data into report-ready outputs.',
  'Led the drag-and-drop Pipeline Builder initiative, replacing handwritten JSON config files with visual workflows, versioning, and validation.',
  'Delivered client-specific automation for Kaiser Permanente, Kyndryl, Raytheon, and Disney across ingestion, transformation, report generation, and invoice rollups.',
  'Developed FogLifter VulnRx to automate policy enforcement, maintenance windows, patch exemptions, and attestation workflows across 60,000+ assets.',
  'Built a telecom billing system for Walt Disney Company integrated with FogLifter and ServiceNow to track and invoice internal and external Orlando business units.',
];

const experience = [
  {
    role: 'Full Stack Software Engineer',
    company: 'VSO, LLC',
    location: 'Remote',
    range: 'December 2021 - Present',
    points: [
      'Architect and deliver configurable full-stack automation systems for enterprise customers.',
      'Translate stakeholder requirements into maintainable, policy-driven workflow products.',
      'Own features end-to-end from data contracts and APIs to UI, validation, and release support.',
    ],
  },
  {
    role: 'Full Stack Software Engineer (Contract and Direct Hire)',
    company: 'Citigroup, Inc.',
    location: 'Tampa, FL',
    range: 'July 2019 - December 2021',
    points: [
      'Developed IBM BPM/BAW + Java + MSSQL automations that reduced account-opening time from up to 2 months to 2 days.',
      'Converted from contractor to direct hire after sustained delivery impact.',
    ],
  },
];

const projects = [
  {
    name: 'Carvd Studio',
    url: 'https://carvd-studio.com',
    label: 'Personal Product',
    description:
      'Cross-platform desktop application for furniture and cabinet design with 3D editing, cut-list generation, and PDF exports.',
    stack: 'Electron, React, TypeScript, Three.js, shadcn/ui, Radix UI, Vite',
  },
  {
    name: 'Curby',
    url: 'https://getcurby.app',
    label: 'Personal Product',
    description:
      'Mobile and web product surfaces built on shared domain logic with Supabase-backed authentication and data workflows.',
    stack: 'React Native, Expo, Next.js, Supabase/PostgreSQL, Redux Toolkit, TanStack React Query',
  },
];

const skills = [
  {
    heading: 'Languages',
    content: 'JavaScript, TypeScript, Java, SQL, HTML5, CSS3, SCSS',
  },
  {
    heading: 'Frameworks and Libraries',
    content:
      'React, Next.js, React Native, Expo, Electron, Node.js, Express.js, NestJS, Mongoose, Prisma, RxJS, Passport.js, Material UI, Angular Material, shadcn/ui, Radix UI, Tailwind CSS',
  },
  {
    heading: 'Databases and Data',
    content: 'PostgreSQL, MongoDB, MySQL, Microsoft SQL Server, Oracle, Snowflake, DuckDB, SQLite, Supabase, Firebase',
  },
  {
    heading: 'Cloud and Auth',
    content: 'Azure (MSAL, Microsoft Graph), OAuth2, JWT',
  },
  {
    heading: 'CI/CD and Dev Tools',
    content:
      'Git, Docker, GitHub Actions, GitHub Container Registry, Kustomize, Webpack, Rollup, SWC, Swagger/OpenAPI, Postman, Bruno, Pino, Vite',
  },
  {
    heading: 'Testing',
    content: 'Jest, Supertest, React Testing Library, Vitest, Playwright, Jasmine, Karma',
  },
];

function App() {
  return (
    <div className="portfolio-app">
      <header className="hero" id="top">
        <div className="hero-inner">
          <img className="hero-logo" src="/MB-Logo-Transparent.png" alt="Michael Baldwin logo" />
          <p className="eyebrow">Michael Baldwin</p>
          <h1>Full-Stack Software Engineer</h1>
          <p className="intro">
            I build enterprise and product software that turns complex workflows into reliable, configurable systems.
          </p>
          <div className="cta-row">
            <a className="button primary" href="#experience">
              View Experience
            </a>
            <a
              className="button secondary"
              href="/Baldwin_Michael_Resume_20FEB2026.docx"
              target="_blank"
              rel="noreferrer"
            >
              Download Resume
            </a>
          </div>
          <ul className="quick-links">
            <li>
              <a href="mailto:michaeldonaldbaldwin@gmail.com">michaeldonaldbaldwin@gmail.com</a>
            </li>
            <li>
              <a href="tel:+19133535414">(913) 353-5414</a>
            </li>
            <li>Norfolk, VA</li>
            <li>
              <a href="https://www.linkedin.com/in/michael-baldwin-161324174/" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </header>

      <main className="content">
        <section className="panel" id="impact">
          <h2>Selected Impact</h2>
          <ul>
            {coreImpact.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="panel" id="experience">
          <h2>Professional Experience</h2>
          {experience.map((job) => (
            <article className="role" key={`${job.company}-${job.range}`}>
              <div className="role-header">
                <h3>{job.role}</h3>
                <p>{job.range}</p>
              </div>
              <p className="meta">
                {job.company} | {job.location}
              </p>
              <ul>
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="panel" id="projects">
          <h2>Selected Projects</h2>
          <div className="project-grid">
            {projects.map((project) => (
              <article className="project" key={project.name}>
                <p className="project-type">{project.label}</p>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <p className="stack">{project.stack}</p>
                <a href={project.url} target="_blank" rel="noreferrer">
                  Visit {project.name}
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="panel" id="skills">
          <h2>Technical Skills</h2>
          <div className="skills-grid">
            {skills.map((skill) => (
              <article key={skill.heading}>
                <h3>{skill.heading}</h3>
                <p>{skill.content}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel" id="education">
          <h2>Education and Certification</h2>
          <ul>
            <li>B.S. Mathematics, Benedictine College (2014 - 2018)</li>
            <li>Certified Scrum Master, Scrum Alliance (2023)</li>
          </ul>
        </section>
      </main>

      <footer className="site-footer">
        <p>Open to senior software engineering opportunities and product-focused teams.</p>
        <a href="#top">Back to top</a>
      </footer>
    </div>
  );
}

export default App;
