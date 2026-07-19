import CardSwap, { Card } from './CardSwap';
import './Projects.css';

const projects = [
  {
    title: 'Scoot',
    description:
      'A multi-page React + Tailwind CSS application featuring advanced responsive layouts, dynamic SVG asset positioning, and a fully reusable component architecture. Built with a mobile-first approach ensuring pixel-perfect rendering across all screen sizes.',
    tags: ['React', 'Tailwind CSS', 'Responsive', 'Multi-page'],
    repo: 'https://github.com/MEPHiSTO126/Scoot',
    live: 'https://scoot-lilac.vercel.app/',
    image: '/projects/scoot-ss.png',
  },
  {
    title: 'Anikronos — URL Shortener',
    description:
      'A single-page React/Vite URL shortener application with sleek UI interactions including shake-on-error animations, real-time input validation, and clipboard integration for shortened links. Designed for speed and simplicity.',
    tags: ['React', 'Vite', 'REST API', 'Animations'],
    repo: 'https://github.com/MEPHiSTO126/URLshortener',
    live: 'https://chrono-url.vercel.app/',
    image: '/projects/url-ss.png',
  },
  {
    title: 'Chess',
    description:
      'A fully-featured browser-based chess game built with zero libraries — pure HTML, CSS, and JavaScript. Implements the complete rule set including castling, en passant, pawn promotion, and check/checkmate/stalemate detection, with a premium dark glassmorphism UI and animated gold-gradient board.',
    tags: ['JavaScript', 'HTML5', 'CSS', 'Vanilla JS'],
    repo: 'https://github.com/MEPHiSTO126/Chess',
    live: 'https://mephisto126.github.io/Chess',
    image: '/projects/chess-ss.png',
  },
  {
    title: 'Dynamic Weather Dashboard',
    description:
      'A responsive weather dashboard leveraging the OpenWeatherMap REST API with async/await data fetching patterns. Features dynamic DOM updates, geolocation support, and weather-adaptive UI theming for an immersive experience.',
    tags: ['JavaScript', 'REST API', 'Async/Await', 'DOM'],
    repo: 'https://github.com/MEPHiSTO126/Weather',
    live: 'https://mephisto126.github.io/Weather/',
    image: '/projects/weather-ss.png',
  },
];

export default function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="container">
        <div className="projects-header reveal">
          <p className="section-label" style={{ justifyContent: 'center' }}>
            <span className="label-tag-open">&lt;</span>
            Projects
            <span className="label-tag-close">/&gt;</span>
          </p>
          <h2>Things I've Built</h2>
          <p>A selection of projects that showcase my skills in frontend development, API integration, and responsive design.</p>
        </div>

        <div className="projects-card-swap">
          <CardSwap
            width={520}
            height={420}
            cardDistance={40}
            verticalDistance={50}
            delay={5000}
            pauseOnHover={true}
            skewAmount={5}
            easing="linear"
          >
            {projects.map((project) => (
              <Card key={project.title}>
                <div className="project-card-inner">
                  <div
                    className={`project-card-image-bg ${!project.image ? 'fallback-gradient' : ''}`}
                    style={project.image ? { backgroundImage: `url(${project.image})` } : undefined}
                  />
                  <div className="project-card-header">
                    <svg className="folder-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                    </svg>
                    <div className="project-card-actions">
                      <a className="link-btn" href={project.repo} target="_blank" rel="noopener noreferrer" aria-label="View source code" title="Source Code">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                      {project.live && (
                        <a className="link-btn" href={project.live} target="_blank" rel="noopener noreferrer" aria-label="Open live demo" title="Live demo">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                            <polyline points="15 3 21 3 21 9"/>
                            <line x1="10" y1="14" x2="21" y2="3"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>

                  <h3>{project.title}</h3>
                  <p>{project.description}</p>

                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span className="project-tag" key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </CardSwap>
        </div>
      </div>
    </section>
  );
}
