import { useEffect } from "react";
import { useNavigation } from "../NavigationContext";
import FocusableItem from "../FocusableItem";
import "../styles/Intro.css"

function Intro () {
    const { goToPanel, setFocusCount } = useNavigation();

    useEffect(() => { setFocusCount(3); }, [setFocusCount]);

    return (
        <section id="intro" className="screen" role="menu">
            <div className="screen-header">
                <h2 className="screen-title">Camargo Julian 2.0</h2>
                <p className="screen-subtitle">Desarrollador Backend · Java · Cloud · IoT</p>
            </div>

            <nav className="menu-list" aria-label="Menú principal">
                <FocusableItem index={0} onSelect={() => goToPanel(1)}>
                    <span className="menu-text">Hitos</span>
                    <span className="menu-hint">→</span>
                </FocusableItem>
                <FocusableItem index={1} onSelect={() => goToPanel(2)}>
                    <span className="menu-text">Proyectos</span>
                    <span className="menu-hint">→</span>
                </FocusableItem>
                <FocusableItem index={2} onSelect={() => goToPanel(3)}>
                    <span className="menu-text">Contacto</span>
                    <span className="menu-hint">→</span>
                </FocusableItem>
            </nav>

            <div className="screen-footer">
                <span className="key-badge">↑↓</span> Navegar
                <span className="key-badge">Enter</span> Seleccionar
                <span className="key-badge">→</span> Siguiente
            </div>
        </section>
    )
}

export default Intro