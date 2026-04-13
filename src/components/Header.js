import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigation } from "./NavigationContext";

import "./styles/Header.css"

function Header() {
    const { activePanelIndex, goToPanel } = useNavigation();
    const ulRef = useRef(null);
    const txRef = useRef(0);
    const mountedRef = useRef(false);
    const prevPanelRef = useRef(0);
    const activePanelRef = useRef(0);

    const tabs = [
        { label: "Home", index: 0 },
        { label: "Highlights", index: 1 },
        { label: "Projects", index: 2 },
        { label: "Contact", index: 3 },
    ];

    /* 9 copies so there are always 4 full copies on each side of center —
       gives the infinite circular scroll illusion on any screen width */
    const COPIES = 9;
    const ANIMATION_DURATION_MS = 320; /* slightly > CSS 300ms transition */
    const circularTabs = Array.from({ length: COPIES }, () => tabs).flat();
    const centerCopy = Math.floor(COPIES / 2);
    const centerStart = centerCopy * tabs.length;
    const centerEnd = centerStart + tabs.length;

    /* Get the n-th nav-tab button from the rendered list */
    const getButton = (copyIdx, panelIdx) => {
        if (!ulRef.current) return null;
        const allButtons = ulRef.current.querySelectorAll('button.nav-tab');
        return allButtons[copyIdx * tabs.length + panelIdx] || null;
    };

    /* Center the given button in the nav viewport */
    const centerOnButton = (btn, animate) => {
        if (!btn || !ulRef.current) return;
        const ul = ulRef.current;
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

    /* Recenter with direction awareness for infinite carousel effect */
    const recenter = (animate, prevPanel) => {
        const current = activePanelRef.current;
        const tabCount = tabs.length;
        let targetCopy = centerCopy;

        if (animate && prevPanel !== undefined && prevPanel !== current) {
            const diff = current - prevPanel;
            if (Math.abs(diff) > tabCount / 2) {
                /* Circular wrap — continue scrolling in the same direction */
                targetCopy = diff < 0 ? centerCopy + 1 : centerCopy - 1;
            }
        }

        const btn = getButton(targetCopy, current);
        centerOnButton(btn, animate);

        /* If we animated to a non-center copy, silently jump to center copy after animation */
        if (animate && targetCopy !== centerCopy) {
            setTimeout(() => {
                const centerBtn = getButton(centerCopy, activePanelRef.current);
                centerOnButton(centerBtn, false);
            }, ANIMATION_DURATION_MS);
        }
    };

    /* Center on panel change */
    useEffect(() => {
        const prev = prevPanelRef.current;
        activePanelRef.current = activePanelIndex;
        recenter(mountedRef.current, prev);
        prevPanelRef.current = activePanelIndex;
        mountedRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activePanelIndex]);

    /* Recenter without animation on window resize / orientation change */
    useEffect(() => {
        const onResize = () => {
            const btn = getButton(centerCopy, activePanelRef.current);
            centerOnButton(btn, false);
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <Link to="/es/" className="lang-switch">
                <span className="lang-label">ES</span>
            </Link>
        </div>
    )
}

export default Header;