import { useEffect, useState, useMemo } from "react";
import { useNavigation } from "../NavigationContext";
import FocusableItem from "../FocusableItem";
import listProjects from "./list-project.json"
import { FaLink } from "react-icons/fa6";
import "../styles/ProjectAbout.css"

function Projects () {
    const { setFocusCount, contentOpen, openContent, closeContent } = useNavigation();
    const [selectedProject, setSelectedProject] = useState(null);

    const projects = useMemo(() => listProjects, []);

    useEffect(() => {
        setFocusCount(contentOpen ? projects.length : 0);
    }, [setFocusCount, projects.length, contentOpen]);

    // Reset detail when content closes
    useEffect(() => {
        if (!contentOpen) setSelectedProject(null);
    }, [contentOpen]);

    const proj = selectedProject !== null ? projects[selectedProject] : null;

    if (!contentOpen) {
        return (
            <section id="projects" className="screen panel-preview">
                <h2 className="screen-title preview-title" onClick={openContent}>Proyectos</h2>
                <p className="preview-hint">Presiona Enter o haz click para abrir</p>
            </section>
        );
    }

    return (
        <section id="projects" className="screen">
            <button className="back-btn" onClick={selectedProject !== null ? () => setSelectedProject(null) : closeContent}>
                ← Volver
            </button>
            <h2 className="screen-title">Proyectos</h2>

            <div className={`proj-layout${selectedProject !== null ? ' has-detail' : ''}`}>
                <nav className="proj-list" role="menu" aria-label="Lista de proyectos">
                    {projects.map((p, idx) => (
                        <FocusableItem key={idx} index={idx} onSelect={() => setSelectedProject(idx)}>
                            <span className="proj-item-name">{p.name}</span>
                            <span className="proj-item-title">{p.title}</span>
                        </FocusableItem>
                    ))}
                </nav>

                {proj && (
                    <div className="proj-detail" key={selectedProject}>
                        <h3 className="proj-detail-name">{proj.name}</h3>
                        <p className="proj-detail-subtitle">{proj.title}</p>

                        <div className="proj-detail-media">
                            {proj.embed
                                ? <iframe src={proj.embed} title={proj.name} className="proj-iframe" sandbox="allow-scripts allow-same-origin" />
                                : proj.image && <img src={proj.image.url} alt={proj.image.alt} loading="lazy" />
                            }
                        </div>

                        <p className="proj-detail-desc">{proj.description}</p>

                        <div className="proj-detail-tech">
                            {proj.tech.map((t, i) => (
                                <span key={i} className="tech-tag">{t}</span>
                            ))}
                        </div>

                        <div className="proj-detail-links">
                            <a href={proj.repo} target="_blank" rel="noreferrer"><FaLink /> Repositorio</a>
                            {proj.demo && <a href={proj.demo} target="_blank" rel="noreferrer"><FaLink /> Demo</a>}
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Projects;