import "../styles/Intro.css"

function Intro () {
    return (
        <>
        <section id="intro">
            <p className="name">Hola, mi nombre es <span>Julián Camargo.</span></p>

            <h2>Desarrollador Backend, estudiante avanzado de ingeniería electrónica y autodidacta en Machine Learning.</h2>    
            
            <p>
            Desarrollador de Software/Firmware, actualmente trabajando como Desarrollador Backend en <a href="https://www.sitrack.com" target="_blank" rel="noreferrer">Sitrack</a> y estudiante avanzado de ingeniería electrónica
            en la Universidad Tecnológica Nacional. Interesado y en constante capacitación en tecnologías relacionadas al desarrollo backend, firmware y machine learning.
            </p> 
        </section>

        <div className="border-gradient"></div>
        </>
    )
}

export default Intro