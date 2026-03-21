import "./styles/Intro.css"

function Intro () {
    return (
        <>
        <section id="intro">
            <p className="name">Hi, I am <span>Julián Camargo.</span></p>

            <h2>Backend developer focused on Java, cloud and IoT integrations.</h2>

            <p>
            Backend developer specialized in Java microservices, cloud infrastructure, and integration between software and embedded systems. Experience in cloud migration projects, CI/CD automation, and API design for scalable and reliable services.
            </p>

            <div className="intro-actions">
                <a href="/#projects" className="btn-primary">View Projects</a>
                <a href="/#contact" className="btn-secondary">Let&apos;s Talk</a>
            </div>
        </section>

        <div className="border-gradient"></div>
        </>
    )
}

export default Intro