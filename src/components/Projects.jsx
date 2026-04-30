import ProjectCard from './ProjectCard';
import './Projects.css';

const projects = [
  {
    title: 'Scoot',
    description:
      'A multi-page React + Tailwind CSS application featuring advanced responsive layouts, dynamic SVG asset positioning, and a fully reusable component architecture. Built with a mobile-first approach ensuring pixel-perfect rendering across all screen sizes.',
    tags: ['React', 'Tailwind CSS', 'Responsive', 'Multi-page'],
    repo: 'https://github.com/MEPHiSTO126/Scoot',
    live: 'https://scoot-lilac.vercel.app/',
  },
  {
    title: 'Anikronos — URL Shortener',
    description:
      'A single-page React/Vite URL shortener application with sleek UI interactions including shake-on-error animations, real-time input validation, and clipboard integration for shortened links. Designed for speed and simplicity.',
    tags: ['React', 'Vite', 'REST API', 'Animations'],
    repo: 'https://github.com/MEPHiSTO126/URLshortener',
    live: 'https://chrono-url.vercel.app/',
  },
  {
    title: 'HLR Network Simulator',
    description:
      'A GSM network simulation platform implementing complex challenge-response authentication protocols and CDR billing logic. Features a dark NOC-style dashboard for real-time subscriber management and call flow visualization.',
    tags: ['JavaScript', 'GSM', 'Authentication', 'Simulation'],
    repo: 'https://github.com/MEPHiSTO126/HLR-Network-Simulator',
    live: 'https://hlr-sim.vercel.app/',
  },
  {
    title: 'Dynamic Weather Dashboard',
    description:
      'A responsive weather dashboard leveraging the OpenWeatherMap REST API with async/await data fetching patterns. Features dynamic DOM updates, geolocation support, and weather-adaptive UI theming for an immersive experience.',
    tags: ['JavaScript', 'REST API', 'Async/Await', 'DOM'],
    repo: 'https://github.com/MEPHiSTO126/Weather',
    live: 'https://mephisto126.github.io/Weather/',
  },
];

export default function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="container">
        <div className="projects-header reveal">
          <p className="section-label" style={{ justifyContent: 'center' }}>Projects</p>
          <h2>Things I've Built</h2>
          <p>A selection of projects that showcase my skills in frontend development, API integration, and responsive design.</p>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div className={`reveal reveal-delay-${index + 1}`} key={project.title}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
