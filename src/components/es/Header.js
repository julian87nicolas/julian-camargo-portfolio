import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigation } from "../NavigationContext";

import "./../styles/Header.css"

function Header() {
    const { activePanelIndex, goToPanel } = useNavigation();
    const ulRef = useRef(null);
    const activeRef = useRef(null);

    const tabs = [
        { label: "Inicio", index: 0 },
        { label: "Hitos", index: 1 },
        { label: "Proyectos", index: 2 },
        { label: "Contacto", index: 3 },
    ];

    /* Build circular track: [...tabs, ...tabs, ...tabs] — center copy holds the real refs */
    const circularTabs = [...tabs, ...tabs, ...tabs];

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
                    {circularTabs.map((tab, i) => {
                        /* The center copy is items [tabs.length .. 2*tabs.length-1] */
                        const isCenter = i >= tabs.length && i < tabs.length * 2;
                        const isActive = isCenter && activePanelIndex === tab.index;
                        return (
                            <li key={`${tab.label}-${i}`}>
                                {i > 0 && <span className="nav-separator">|</span>}
                                <button
                                    ref={isActive ? activeRef : null}
                                    className={`nav-tab${isActive ? ' is-active' : ''}`}
                                    onClick={() => goToPanel(tab.index)}
                                >
                                    {tab.label}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>
            <span className="lang-switch">
                <Link to="/">
                    <img src="images/united-states.png" alt="EN" />
                </Link>
            </span>
        </div>
    )
}

export default Header;