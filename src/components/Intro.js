import "./styles/Intro.css"

function Intro () {
    return (
        <>
        <section id="intro">
            <p className="name">Hi, my name is <span>Julián Camargo.</span></p>

            <h2>I'm specializing in frontend dev and machine learning.</h2>    
            
            <p>
                I'm a student of electronic Engineering specializing in HTML, CSS, Js, Python, C.
                
                Currently, I'm making a career switch from electronic engineer to web development
                and machine learning development, studying at <a href="https://www.frontendmasters.com" target="_blank" rel="noreferrer">FrontEndMaster</a>, <a href="https://www.freecodecamp.org" target="_blank" rel="noreferrer">FreeCodeCamp</a> and <a href="https://www.kaggle.com" target="_blank" rel="noreferrer">Kaggle</a>.    
            </p> 
        </section>

        <div className="border-gradient"></div>
        </>
    )
}

export default Intro