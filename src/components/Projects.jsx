import "bootstrap-icons/font/bootstrap-icons.css";
import "./Projects.css";

const PROJECTS = [
  {
    title: "EV Care",
    image: "/images/ev_care.png",
    alt: "EV Care Project",
    github: "https://github.com/soby7736/EV_Care",
    description:
      "Smart EV maintenance & diagnostics tracker for electric vehicle owners.",
    stack: ["Python", "Django", "sql","html","css","JavaScript"],
  },
  {
    title: "Diet Lens",
    image: "/images/dietlens.png",
    alt: "Diet Lens Project",
    github: "https://github.com/soby7736/Diet_lens",
    description:
      "AI-powered food recognition web application that instantly logs nutritional information from uploaded photos.",
    stack: ["Python", "Django", "sql","html","css","JavaScript"],
  },
  {
    title: "Expense Tracker",
    image: "/images/expense_traker.png",
    alt: "Expense Tracker Project",
    github: "https://github.com/soby7736/Expense_tracker",
    description:
      "Visual personal finance tool to track, categorise and analyse spending.",
    stack: ["Python", "Django", "sql","html","css"],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="projects-section">
      <div className="container">
        
        {/* Header */}
        <div className="text-center projects-header">
          <p className="projects-subtitle">My Recent</p>
          <h2 className="projects-title">Projects</h2>
          <div className="projects-divider"></div>
        </div>

        {/* Grid */}
        <div className="projects-grid">
          {PROJECTS.map((project, i) => (
            <div className="project-card" key={i}>
              
              <div className="project-img-wrap">
                <img
                  src={project.image}
                  alt={project.alt}
                  className="project-img"
                />

                {/* Overlay */}
                <div className="project-overlay">
                  <div className="project-overlay-content">
                    
                    <p className="overlay-desc">{project.description}</p>

                    <div className="overlay-stack">
                      {project.stack.map((tech) => (
                        <span className="overlay-tag" key={tech}>
                          {tech}
                        </span>
                      ))}
                    </div>

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-overlay-btn"
                    >
                      <i className="bi bi-github me-2"></i>
                      View on GitHub
                    </a>

                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="project-footer">
                <h4 className="project-title">{project.title}</h4>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  <i className="bi bi-box-arrow-up-right me-1"></i>
                  GitHub
                </a>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}