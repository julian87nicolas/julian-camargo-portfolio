import "../styles/Intro.css"

function Intro () {
    return (
        <>
        <section id="intro">
            <p className="name">Hola, mi nombre es <span>Julián Camargo.</span></p>

            <h2>Estoy especializándome en desarrollo FrontEnd y Machine Learning.</h2>    
            
            <p>
            Soy un estudiante de ingeniería electrónica, especializándome en HTML, CSS, Js, Python, C. Actualmente, estoy haciendo un cambio de carrera desde ingeniería electrónica a desarrollo web y machine learning, 
            estudiando en <a href="https://www.frontendmasters.com" target="_blank" rel="noreferrer">FrontEndMaster</a>, <a href="https://www.freecodecamp.org" target="_blank" rel="noreferrer">FreeCodeCamp</a> y <a href="https://www.kaggle.com" target="_blank" rel="noreferrer">Kaggle</a>.    
            </p> 
        </section>

        <div className="border-gradient"></div>
        </>
    )
}

export default Intro