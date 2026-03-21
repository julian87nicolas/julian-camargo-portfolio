import "../styles/Intro.css"

function Intro () {
    return (
        <>
        <section id="intro">
            <p className="name">Hola, soy <span>Julián Camargo.</span></p>

            <h2>Construyo sistemas backend confiables para productos que necesitan escalar.</h2>

            <p>
            Desarrollador Backend y de Software/Firmware, actualmente en <a href="https://www.sitrack.com" target="_blank" rel="noreferrer">Sitrack</a> y estudiante avanzado de ingeniería electrónica. Enfocado en arquitectura limpia, microservicios resilientes y aprendizaje continuo.
            </p>

            <div className="intro-actions">
                <a href="/es/#projects" className="btn-primary">Ver Proyectos</a>
                <a href="/es/#contact" className="btn-secondary">Hablemos</a>
            </div>
        </section>

        <div className="border-gradient"></div>
        </>
    )
}

export default Intro