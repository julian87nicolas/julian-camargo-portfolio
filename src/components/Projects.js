import { useCallback, useMemo, useState } from "react";
import listProjects from "./list-project.json"
import { FaLink } from "react-icons/fa6";
import "./styles/ProjectAbout.css"

const PROJECT_FILTERS = [
    { key: "all", label: "All projects" },
    { key: "web", label: "Websites" },
    { key: "engineering", label: "Engineering" }
];

const categorizeProject = (project) => {
    const text = `${project.title} ${project.name} ${project.tech.join(" ")}`.toLowerCase();

    if (text.includes("electronic") || text.includes("iot") || text.includes("lora") || text.includes("microcontroller") || text.includes("esp")) {
        return "engineering";
    }

    if (text.includes("react") || text.includes("web") || text.includes("website") || text.includes("html") || text.includes("css") || text.includes("bootstrap")) {
        return "web";
    }

    return "app";
};

function ProjectCard({ proj }) {
    const handleMouseMove = useCallback((e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    }, []);

    const mediaClass = `project-media${proj.embed ? " project-media--embed" : proj.image.url.includes("odontointegral-cover") ? " project-media--left-crop" : ""}`;

    return (
        <article
            className="project-card"
            role="listitem"
            onMouseMove={handleMouseMove}
        >
            <div className="project-card-glow" aria-hidden="true" />

            <a
                className="project-media-wrap"
                href={proj.demo || proj.repo}
                target="_blank"
                rel="noreferrer"
                aria-label={proj.name}
            >
                <div className={mediaClass}>
                    {proj.embed
                        ? <iframe src={proj.embed} title={proj.name} scrolling="no" loading="lazy" sandbox="allow-scripts allow-same-origin" />
                        : <img src={proj.image.url} alt={proj.image.alt} loading="lazy" />
                    }
                </div>
            </a>

            <div className="project-body">
                <div className="project-header">
                    <span className="project-category-badge">{proj.category}</span>
                    <h3 className="project-name">{proj.name}</h3>
                    <p className="project-subtitle">{proj.title}</p>
                </div>

                {proj.description && (
                    <p className="project-description">{proj.description}</p>
                )}

                <ul className="project-tech-list" aria-label="Technologies">
                    {proj.tech.map((tag) => (
                        <li key={tag} className="project-tech-tag">{tag}</li>
                    ))}
                </ul>

                <div className="project-links">
                    <a href={proj.repo} target="_blank" rel="noreferrer"><FaLink /> Repo</a>
                    {proj.demo && <a href={proj.demo} target="_blank" rel="noreferrer"><FaLink /> Live</a>}
                </div>
            </div>
        </article>
    );
}

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
                <h2>Projects I'm proud of</h2>
                <p className="projects-intro">Selected work across web, apps and engineering systems.</p>

                <div className="projects-filters" role="tablist" aria-label="Project categories">
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
                    {visibleProjects.map((proj, idx) => (
                        <ProjectCard key={`${proj.name}-${idx}`} proj={proj} />
                    ))}
                </div>
            </section>
            <div className="border-gradient"></div>
        </div>
    );
}

export default Projects;