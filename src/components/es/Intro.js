import "../styles/Intro.css"

function Intro () {
    return (
        <>
        <section id="intro">
            <p className="name">Hola, soy <span>Julián Camargo.</span></p>

            <h2>Desarrollador backend con foco en Java, cloud e integraciones IoT.</h2>

            <p>
            Desarrollador backend especializado en microservicios Java, infraestructura cloud e integración entre software y sistemas embebidos. Experiencia en proyectos de migración cloud, automatización de CI/CD y diseño de APIs para servicios escalables y confiables.
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