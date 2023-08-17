import "./styles/Intro.css"

function Intro () {
    return (
        <>
        <section id="intro">
            <p className="name">Hi, my name is <span>Julián Camargo.</span></p>

            <h2>I'm specializing in frontend dev and machine learning.</h2>    
            
            <p>
            Software/Firmware Developer, currently working as Backend Developer at <a href="https://www.sitrack.com" target="_blank" rel="noreferrer">Sitrack</a> and advanced student of electronic engineering
            at the National Technological University. Interested and in constant training in technologies related to backend development, firmware and machine learning.    
            </p> 
        </section>

        <div className="border-gradient"></div>
        </>
    )
}

export default Intro