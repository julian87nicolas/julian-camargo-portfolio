import "./styles/Intro.css"

function Intro () {
    return (
        <>
        <section id="intro">
            <p className="name">Hi, I am <span>Julián Camargo.</span></p>

            <h2>I build reliable backend systems for products that need to scale.</h2>

            <p>
            Backend and Software/Firmware Developer, currently working at <a href="https://www.sitrack.com" target="_blank" rel="noreferrer">Sitrack</a> and advanced electronics engineering student. Focused on clean architecture, resilient microservices and continuous learning.
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