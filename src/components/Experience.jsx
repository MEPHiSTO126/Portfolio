import './Experience.css';

const experiences = [
  {
    date: 'SIWES Internship',
    role: 'Network & IT Operations Intern',
    company: 'Huawei / Airtel Nigeria',
    description:
      'Worked on GSM network infrastructure and enterprise IT operations. Gained hands-on experience with telecommunications systems, network monitoring, and hardware diagnostics. Presented a full network simulation project demonstrating GSM authentication and billing workflows.',
    tags: ['GSM Networks', 'IT Operations', 'Telecom', 'Network Simulation'],
  },
  {
    date: 'SIWES Internship',
    role: 'IT Support & Networking Intern',
    company: 'SQI College of ICT',
    description:
      'Hands-on experience with network troubleshooting, software installation and updates, and end-user technical support. Assisted in maintaining campus network infrastructure and resolved connectivity issues across multiple departments.',
    tags: ['Network Troubleshooting', 'IT Support', 'Software Updates', 'Infrastructure'],
  },
];

export default function Experience() {
  return (
    <section className="experience" id="experience">
      <div className="container">
        <div className="experience-header reveal">
          <p className="section-label" style={{ justifyContent: 'center' }}>Experience</p>
          <h2>Where I've Worked</h2>
          <p>Professional experience in telecommunications, networking, and IT operations.</p>
        </div>

        <div className="timeline">
          {experiences.map((exp, index) => (
            <div className={`timeline-item reveal reveal-delay-${index + 1}`} key={exp.company}>
              <div className="timeline-dot"></div>
              <div className="timeline-card">
                <span className="timeline-date">{exp.date}</span>
                <h3>{exp.role}</h3>
                <p className="timeline-company">{exp.company}</p>
                <p>{exp.description}</p>
                <div className="timeline-tags">
                  {exp.tags.map((tag) => (
                    <span className="timeline-tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
