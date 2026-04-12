import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigation } from "./NavigationContext";

import "./styles/Header.css"

function Header() {
    const { activePanelIndex, goToPanel } = useNavigation();
    const ulRef = useRef(null);
    const activeRef = useRef(null);

    const tabs = [
        { label: "Home", index: 0 },
        { label: "Highlights", index: 1 },
        { label: "Projects", index: 2 },
        { label: "Contact", index: 3 },
    ];

    useEffect(() => {
        if (activeRef.current && ulRef.current) {
            const ul = ulRef.current;
            const btn = activeRef.current;
            const ulRect = ul.parentElement.getBoundingClientRect();
            const btnRect = btn.getBoundingClientRect();
            const offset = btnRect.left + btnRect.width / 2 - ulRect.left - ulRect.width / 2;
            ul.style.transform = `translateX(${-offset}px)`;
        }
    }, [activePanelIndex]);

    return (
        <div id="header">
            <nav>
                <ul ref={ulRef}>
                    {tabs.map((tab, i) => (
                        <li key={tab.label}>
                            {i > 0 && <span className="nav-separator">|</span>}
                            <button
                                ref={activePanelIndex === tab.index ? activeRef : null}
                                className={`nav-tab${activePanelIndex === tab.index ? ' is-active' : ''}`}
                                onClick={() => goToPanel(tab.index)}
                            >
                                {tab.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
            <span className="lang-switch">
                <Link to="/es/">
                    <img src="images/spain.png" alt="ES" />
                </Link>
            </span>
        </div>
    )
}

export default Header;