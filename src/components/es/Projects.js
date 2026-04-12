import { useEffect, useState, useMemo } from "react";
import { useNavigation } from "../NavigationContext";
import FocusableItem from "../FocusableItem";
import listProjects from "./list-project.json"
import { FaLink } from "react-icons/fa6";
import "../styles/ProjectAbout.css"

function Projects () {
    const { setFocusCount, goBack } = useNavigation();
    const [selectedProject, setSelectedProject] = useState(null);

    const projects = useMemo(() => listProjects, []);

    useEffect(() => {
        if (selectedProject === null) {
            setFocusCount(projects.length);
        }
    }, [setFocusCount, projects.length, selectedProject]);

    if (selectedProject !== null) {
        const proj = projects[selectedProject];
        return (
            <section id="projects" className="screen">
                <button className="back-btn" onClick={() => setSelectedProject(null)}>
                    ← Volver a la lista
                </button>
                <div className="proj-detail" key={selectedProject}>
                    <h2 className="screen-title">{proj.name}</h2>
                    <p className="proj-detail-subtitle">{proj.title}</p>

                    <div className="proj-detail-media">
                        {proj.image && <img src={proj.image.url} alt={proj.image.alt} loading="lazy" />}
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
            </section>
        );
    }

    return (
        <section id="projects" className="screen">
            <button className="back-btn" onClick={goBack}>
                ← Volver
            </button>
            <h2 className="screen-title">Proyectos</h2>

            <nav className="proj-list" role="menu" aria-label="Lista de proyectos">
                {projects.map((proj, idx) => (
                    <FocusableItem key={idx} index={idx} onSelect={() => setSelectedProject(idx)}>
                        <span className="proj-item-name">{proj.name}</span>
                        <span className="proj-item-title">{proj.title}</span>
                    </FocusableItem>
                ))}
            </nav>

            <div className="screen-footer">
                <span className="key-badge">↑↓</span> Navegar
                <span className="key-badge">Enter</span> Abrir
                <span className="key-badge">Esc</span> Volver
            </div>
        </section>
    )
}

export default Projects;