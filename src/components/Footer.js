import Contact from "./Contact"
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa6";
import "./styles/Footer.css"

function Footer() {
    return (
        <div>
            <Contact />
            <footer>
                <h2>Julián Camargo - Software/Firmware Developer</h2>
                <ul>
                    <li>
                        <a href="https://www.linkedin.com/in/julian-camargo/" target="_blank" rel="noreferrer">
                            <FaLinkedin className="fa-brands fa-linkedin" />
                            <span className="sr-only">Linkedin</span>
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/julian87nicolas" target="_blank" rel="noreferrer">
                            <FaGithub className="fa-brands fa-github" />
                            <span className="sr-only">Github</span>
                        </a>
                    </li>
                    <li>
                        <a href="mailto:julicmrgo@gmail.com" target="_blank" rel="noreferrer">
                            <FaEnvelope className="fa-solid fa-envelope" />
                            <span className="sr-only">mail</span>
                        </a>
                    </li>
                </ul>                
            </footer>
            <p className="rights"><small>© 2022 Julián Camargo. All rights reserved</small></p>
        </div>
    )
}

export default Footer