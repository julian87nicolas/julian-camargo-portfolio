import listProjects from "./list-project.json"
import "../styles/ProjectAbout.css"

function Projects () {
    return (
    <div className="section-blue">
        <section id="projects">
        <h2>Proyectos realizados</h2>
        
            {listProjects.map( (proj, idx) =>
                    <> 
                    <article className={ idx % 2 === 0 ? "reverse" : "" }>
                        <div class="text">
                            
                            <h4>{proj.title}</h4>
                            <h3>{proj.name}</h3>
                                <p class="blackbox">
                                    {proj.description}
                                </p>
                                <h4><a href={proj.repo} target="_blank" rel="noreferrer"><i class="fa-solid fa-link"></i> Link al repositorio!</a></h4>
                                { proj.demo && <h4><a href={proj.demo} target="_blank" rel="noreferrer"><i class="fa-solid fa-link"></i> Link al sitio web!</a></h4> }
                                <h4>Tecnologías usadas:</h4>
                                <ul>
                                {proj.tech.map( t => <li>{t}</li>)}
                                </ul>
                        </div>
                        <img src={proj.image.url} alt={proj.image.alt} />
                    </article>
                    </>
            )}
        </section>
        <div class="border-gradient"></div>
        </div>
    )
}

export default Projects;