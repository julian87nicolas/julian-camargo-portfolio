import { useRef, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useNavigation } from "../NavigationContext";

import "./../styles/Header.css"

const COPIES = 9;
const ANIMATION_DURATION_MS = 320; /* slightly > CSS 300ms transition */

const BREADCRUMB_ROOT = "CAMARGO JULIAN 2.0";
const BREADCRUMB_LABELS = ["Inicio", "Hitos", "Proyectos", "Contacto"];

function Header() {
    const { activePanelIndex, goToPanel, contentOpen, closeContent, detailName, setDetailName } = useNavigation();
    const ulRef = useRef(null);
    const txRef = useRef(0);
    const mountedRef = useRef(false);
    const prevPanelRef = useRef(0);
    const activePanelRef = useRef(0);

    const tabs = useMemo(() => [
        { label: "Inicio", index: 0 },
        { label: "Hitos", index: 1 },
        { label: "Proyectos", index: 2 },
        { label: "Contacto", index: 3 },
    ], []);

    const tabCount = tabs.length;
    const circularTabs = useMemo(
        () => Array.from({ length: COPIES }, () => tabs).flat(),
        [tabs]
    );
    const centerCopy = Math.floor(COPIES / 2);
    const centerStart = centerCopy * tabCount;
    const centerEnd = centerStart + tabCount;

    /* Get the n-th nav-tab button from the rendered list */
    const getButton = (copyIdx, panelIdx) => {
        if (!ulRef.current) return null;
        const allButtons = ulRef.current.querySelectorAll('button.nav-tab');
        return allButtons[copyIdx * tabCount + panelIdx] || null;
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
            <div className="breadcrumb">
                {activePanelIndex === 0 && !contentOpen ? (
                    <span className="breadcrumb-active">{BREADCRUMB_ROOT}</span>
                ) : activePanelIndex === 0 && contentOpen ? (
                    <>
                        <button className="breadcrumb-link breadcrumb-dim" onClick={closeContent}>{BREADCRUMB_ROOT}</button>
                        <span className="breadcrumb-sep">&gt;</span>
                        <span className="breadcrumb-active">Inicio</span>
                    </>
                ) : !detailName ? (
                    <>
                        <button className="breadcrumb-link breadcrumb-dim" onClick={closeContent}>{BREADCRUMB_ROOT}</button>
                        <span className="breadcrumb-sep">&gt;</span>
                        <span className="breadcrumb-active">{BREADCRUMB_LABELS[activePanelIndex]}</span>
                    </>
                ) : (
                    <>
                        <button className="breadcrumb-link breadcrumb-dim" onClick={closeContent}>{BREADCRUMB_ROOT}</button>
                        <span className="breadcrumb-sep">&gt;</span>
                        <button className="breadcrumb-link breadcrumb-dim" onClick={() => setDetailName(null)}>{BREADCRUMB_LABELS[activePanelIndex]}</button>
                        <span className="breadcrumb-sep">&gt;</span>
                        <span className="breadcrumb-active">{detailName}</span>
                    </>
                )}
            </div>
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
            <div className="header-actions">
                <a
                    href="https://shhnrhfmvombagmkvvgw.supabase.co/storage/v1/object/public/resumes/CV_Julian_Camargo_Backend_ES.pdf"
                    className="resume-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    CV
                </a>
                <Link to="/" className="lang-switch">
                    <span className="lang-label">EN</span>
                </Link>
            </div>
        </div>
    )
}

export default Header;