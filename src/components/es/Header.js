import { Link } from "react-router-dom";
import { FaAward, FaCertificate, FaCode, FaEnvelope, FaGears, FaGithub, FaUser } from "react-icons/fa6";
import { useNavigation } from "../NavigationContext";

import "./../styles/Header.css"

function Header() {
    const { activePanelIndex, goToPanel } = useNavigation();

    const tabs = [
        { label: "Inicio", icon: null, index: 0 },
        { label: "Hitos", icon: <FaAward className="fa-solid fa-award" />, index: 1 },
        { label: "Certificaciones", icon: <FaCertificate className="fa-solid fa-certificate" />, index: 2 },
        { label: "Proyectos", icon: <FaGears className="fa-solid fa-gears" />, index: 3 },
        { label: "Contacto", icon: <FaEnvelope className="fa-solid fa-envelope" />, index: 4 },
    ];

    return (
        <div id="header">
            <nav>
                <ul>
                    <li>
                        <h1>
                            <button className="nav-tab" onClick={() => goToPanel(0)}>
                                <FaCode className="fa-solid fa-code" /> Julián Camargo
                            </button>
                        </h1>
                    </li>
                    {tabs.slice(1).map((tab) => (
                        <li key={tab.label}>
                            <button
                                className={`nav-tab${activePanelIndex === tab.index ? ' is-active' : ''}`}
                                onClick={() => goToPanel(tab.index)}
                            >
                                {tab.label} {tab.icon}
                            </button>
                        </li>
                    ))}
                    <li>
                        <a href="https://github.com/julian87nicolas" target="_blank" rel="noreferrer">
                            GitHub <FaGithub className="fa-brands fa-github" />
                        </a>
                    </li>
                    <li className="resume">
                        <a href="./CV.pdf" target="_blank" rel="noopener noreferrer">
                            Curriculum <FaUser className="fa-solid fa-user" />
                        </a>
                    </li>
                    <li className="lang-switch">
                        <Link to="/">
                            <img src="images/united-states.png" alt="Switch to English" />
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Header;