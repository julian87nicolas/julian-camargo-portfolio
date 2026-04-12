import { Link } from "react-router-dom";
import { FaAward, FaCode, FaEnvelope, FaGears, FaGithub, FaUser, FaCertificate } from "react-icons/fa6";
import { useNavigation } from "./NavigationContext";

import "./styles/Header.css"

function Header() {
    const { activePanelIndex, goToPanel } = useNavigation();

    const tabs = [
        { label: "Home", icon: null, index: 0 },
        { label: "Highlights", icon: <FaAward className="fa-solid fa-award" />, index: 1 },
        { label: "Certifications", icon: <FaCertificate className="fa-solid fa-certificate" />, index: 2 },
        { label: "Projects", icon: <FaGears className="fa-solid fa-gears" />, index: 3 },
        { label: "Contact", icon: <FaEnvelope className="fa-solid fa-envelope" />, index: 4 },
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
                        <a href="./CV-Eng.pdf" target="_blank" rel="noopener noreferrer">
                            Resume <FaUser className="fa-solid fa-user" />
                        </a>
                    </li>
                    <li className="lang-switch">
                        <Link to="/es/">
                            <img src="images/spain.png" alt="Switch to Spanish" />
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Header;