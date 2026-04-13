import { useEffect } from "react";
import { useNavigation } from "./NavigationContext";
import FocusableItem from "./FocusableItem";
import "./styles/Intro.css"

function Intro () {
    const { goToPanel, setFocusCount } = useNavigation();

    useEffect(() => { setFocusCount(3); }, [setFocusCount]);

    return (
        <section id="intro" className="screen" role="menu">
            <div className="screen-header">
                <h2 className="screen-title">Camargo Julian 2.0</h2>
                <p className="screen-subtitle">Backend Developer · Java · Cloud · IoT</p>
            </div>

            <nav className="menu-list" aria-label="Main menu">
                <FocusableItem index={0} onSelect={() => goToPanel(1)}>
                    <span className="menu-text">Highlights</span>
                    <span className="menu-hint">→</span>
                </FocusableItem>
                <FocusableItem index={1} onSelect={() => goToPanel(2)}>
                    <span className="menu-text">Projects</span>
                    <span className="menu-hint">→</span>
                </FocusableItem>
                <FocusableItem index={2} onSelect={() => goToPanel(3)}>
                    <span className="menu-text">Contact</span>
                    <span className="menu-hint">→</span>
                </FocusableItem>
            </nav>

            <div className="screen-footer">
                <span className="key-badge">↑↓</span> Navigate
                <span className="key-badge">Enter</span> Select
                <span className="key-badge">→</span> Next
            </div>
        </section>
    )
}

export default Intro