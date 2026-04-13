import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigation } from "../NavigationContext";

import "./../styles/Header.css"

function Header() {
    const { activePanelIndex, goToPanel } = useNavigation();
    const ulRef = useRef(null);
    const activeRef = useRef(null);
    const txRef = useRef(0);
    const mountedRef = useRef(false);

    const tabs = [
        { label: "Inicio", index: 0 },
        { label: "Hitos", index: 1 },
        { label: "Proyectos", index: 2 },
        { label: "Contacto", index: 3 },
    ];

    /* 9 copies so there are always 4 full copies on each side of center —
       gives the infinite circular scroll illusion on any screen width */
    const COPIES = 9;
    const circularTabs = Array.from({ length: COPIES }, () => tabs).flat();
    const centerStart = Math.floor(COPIES / 2) * tabs.length;
    const centerEnd = centerStart + tabs.length;

    /* Compute translateX to center the active button in the nav viewport */
    const recenter = (animate) => {
        if (!activeRef.current || !ulRef.current) return;
        const ul = ulRef.current;
        const btn = activeRef.current;
        const nav = ul.parentElement;
        const navW = nav.offsetWidth;

        const btnRect = btn.getBoundingClientRect();
        const navRect = nav.getBoundingClientRect();
        const btnCenterInNav = btnRect.left + btnRect.width / 2 - navRect.left;
        const naturalCenter = btnCenterInNav - txRef.current;
        const newTx = navW / 2 - naturalCenter;
        txRef.current = newTx;

        if (!animate) {
            ul.style.transition = 'none';
            ul.style.transform = `translateX(${newTx}px)`;
            requestAnimationFrame(() => { ul.style.transition = ''; });
        } else {
            ul.style.transform = `translateX(${newTx}px)`;
        }
    };

    /* Center on panel change */
    useEffect(() => {
        recenter(mountedRef.current);
        mountedRef.current = true;
    }, [activePanelIndex]);

    /* Recenter without animation on window resize / orientation change */
    useEffect(() => {
        const onResize = () => recenter(false);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    return (
        <div id="header">
            <nav>
                <ul ref={ulRef}>
                    {circularTabs.map((tab, i) => {
                        const isCenter = i >= centerStart && i < centerEnd;
                        const isActive = isCenter && activePanelIndex === tab.index;
                        return (
                            <li key={`nav-${i}`}>
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