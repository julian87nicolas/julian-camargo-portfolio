import { Link } from "react-router-dom";
import { useNavigation } from "../NavigationContext";

import "./../styles/Header.css"

function Header() {
    const { activePanelIndex, goToPanel } = useNavigation();

    const tabs = [
        { label: "Inicio", index: 0 },
        { label: "Hitos", index: 1 },
        { label: "Proyectos", index: 2 },
        { label: "Contacto", index: 3 },
    ];

    return (
        <div id="header">
            <nav>
                <ul>
                    <li>
                        <h1>
                            <button className="nav-tab" onClick={() => goToPanel(0)}>
                                JC
                            </button>
                        </h1>
                    </li>
                    {tabs.map((tab) => (
                        <li key={tab.label}>
                            <button
                                className={`nav-tab${activePanelIndex === tab.index ? ' is-active' : ''}`}
                                onClick={() => goToPanel(tab.index)}
                            >
                                {tab.label}
                            </button>
                        </li>
                    ))}
                    <li className="nav-spacer" />
                    <li className="lang-switch">
                        <Link to="/">
                            <img src="images/united-states.png" alt="EN" />
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Header;