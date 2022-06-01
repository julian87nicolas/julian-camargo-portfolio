import Contact from "./Contact"

function Footer() {
    return (
        <>
        <Contact />
        <footer>
        <h2>Julián Camargo - Advanced student</h2>
        <ul>
            <li>
                <a href="https://www.linkedin.com/in/julian-camargo/" target="_blank" rel="noreferrer">
                    <i className="fa-brands fa-linkedin"></i>
                    <span className="sr-only">Linkedin</span>
                </a>
            </li>
            <li>
                <a href="https://github.com/julian87nicolas" target="_blank" rel="noreferrer">
                    <i className="fa-brands fa-github"></i>
                    <span className="sr-only">Github</span>
                </a>
            </li>
            <li>
                <a href="mailto:julicmrgo@gmail.com" target="_blank" rel="noreferrer">
                    <i className="fa-solid fa-envelope"></i>
                    <span className="sr-only">mail</span>
                </a>
            </li>
        </ul>                
        </footer>
        <p class="rights"><small>© 2022 Julián Camargo. All rights reserved</small></p>
        </>
    )
}

export default Footer