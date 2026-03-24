import { useMemo, useState } from "react";
import listProjects from "./list-project.json"
import { FaLink } from "react-icons/fa6";
import "../styles/ProjectAbout.css"

const PROJECT_FILTERS = [
    { key: "all", label: "Todos" },
    { key: "web", label: "Sitios web" },
    { key: "engineering", label: "Ingenieria" }
];

const categorizeProject = (project) => {
    const text = `${project.title} ${project.name} ${project.tech.join(" ")}`.toLowerCase();

    if (text.includes("ingenier") || text.includes("iot") || text.includes("lora") || text.includes("microcontroller") || text.includes("microcontrolador") || text.includes("esp")) {
        return "engineering";
    }

    if (text.includes("react") || text.includes("web") || text.includes("sitio") || text.includes("html") || text.includes("css") || text.includes("bootstrap")) {
        return "web";
    }

    return "app";
};

function Projects () {
    const [activeFilter, setActiveFilter] = useState("all");

    const projectsWithCategory = useMemo(
        () => listProjects.map((project) => ({ ...project, category: categorizeProject(project) })),
        []
    );

    const visibleProjects = useMemo(
        () => projectsWithCategory.filter((project) => activeFilter === "all" || project.category === activeFilter),
        [activeFilter, projectsWithCategory]
    );

    return (
    <div className="section-blue">
        <section id="projects" className="projects-section">
        <h2>Proyectos personales</h2>
        <p className="projects-intro">Seleccion de trabajos en web, aplicaciones y sistemas de ingenieria.</p>

                <div className="projects-filters" role="tablist" aria-label="Categorias de proyectos">
                    {PROJECT_FILTERS.map((filter) => (
                        <button
                            key={filter.key}
                            type="button"
                            className={`projects-filter-btn${activeFilter === filter.key ? " is-active" : ""}`}
                            onClick={() => setActiveFilter(filter.key)}
                            role="tab"
                            aria-selected={activeFilter === filter.key}
                        >
                            <span>{filter.label}</span>
                        </button>
                    ))}
                </div>

                <div className="projects-grid" role="list">
                    {visibleProjects.map((proj, idx) =>
                        <article className="project-card" key={`${proj.name}-${idx}`} role="listitem">
                            <a className="project-card-link" href={proj.demo || proj.repo} target="_blank" rel="noreferrer" aria-label={proj.name}>
                            <div className={`project-media${proj.embed ? " project-media--embed" : proj.image.url.includes("odontointegral-cover") ? " project-media--left-crop" : ""}`}>
                                {proj.embed
                                    ? <iframe src={proj.embed} title={proj.name} scrolling="no" loading="lazy" sandbox="allow-scripts allow-same-origin" />
                                    : <img src={proj.image.url} alt={proj.image.alt} loading="lazy" />
                                }
                            </div>

                            <div className="project-info">
                                <p className="project-caption"><b>{proj.name}</b> - {proj.title}</p>
                            </div>
                            </a>

                            <div className="project-links">
                                <a href={proj.repo} target="_blank" rel="noreferrer"><FaLink /> Repo</a>
                                {proj.demo && <a href={proj.demo} target="_blank" rel="noreferrer"><FaLink /> Demo</a>}
                            </div>
                        </article>
                    )}
                </div>
        </section>
        <div className="border-gradient"></div>
        </div>
    )
}

export default Projects;