import listProjects from "./list-project.json"
import { FaLink } from "react-icons/fa6";
import "./styles/ProjectAbout.css"

function Projects () {
    return (
    <div className="section-blue">
        <section id="projects">
        <h2>Projects I'm proud of</h2>
        
                {listProjects.map( (proj, idx) =>
                    <article className={ idx % 2 === 0 ? "reverse" : "" } key={`${proj.name}-${idx}`}>
                        <div className="text">
                            
                            <h4>{proj.title}</h4>
                            <h3>{proj.name}</h3>
                                <p className="blackbox">
                                    {proj.description}
                                </p>
                                <h4><a href={proj.repo} target="_blank" rel="noreferrer"><FaLink className="fa-solid fa-link" /> Link to the repo!</a></h4>
                                { proj.demo && <h4><a href={proj.demo} target="_blank" rel="noreferrer"><FaLink className="fa-solid fa-link" /> Link to the Website!</a></h4> }
                                <h4>Technologies:</h4>
                                <ul>
                                {proj.tech.map((t, techIdx) => <li key={`${proj.name}-${t}-${techIdx}`}>{t}</li>)}
                                </ul>
                        </div>
                        <img src={proj.image.url} alt={proj.image.alt} />
                    </article>
            )}
        </section>
        <div className="border-gradient"></div>
        </div>
    )
}

export default Projects;