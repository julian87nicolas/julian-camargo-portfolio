import { useEffect, useState } from "react";
import { useNavigation } from "../NavigationContext";
import FocusableItem from "../FocusableItem";
import TextPathAnimation from "../TextPathAnimation";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa6";
import "../styles/Contact.css"

function Contact() {
    const { goBack, setFocusCount, activePanelIndex } = useNavigation();
    const [contentOpen, setContentOpen] = useState(false);

    useEffect(() => { setFocusCount(contentOpen ? 3 : 0); }, [setFocusCount, contentOpen]);

    // Reset when navigating away
    useEffect(() => {
        if (activePanelIndex !== 3) setContentOpen(false);
    }, [activePanelIndex]);

    // Enter key opens content in preview mode
    useEffect(() => {
        if (!contentOpen && activePanelIndex === 3) {
            const handler = (e) => {
                if (e.key === 'Enter') { e.preventDefault(); setContentOpen(true); }
            };
            window.addEventListener('keydown', handler);
            return () => window.removeEventListener('keydown', handler);
        }
    }, [contentOpen, activePanelIndex]);

    const openContent = () => setContentOpen(true);

    if (!contentOpen) {
        return (
            <section id="contact" className="screen panel-preview">
                <TextPathAnimation panelKey="contact" text="Julian Camargo - Desarrollador Backend" onClick={openContent} />
                <h2 className="screen-title preview-title" onClick={openContent}>Contacto</h2>
                <p className="preview-hint">Presiona Enter o haz click para abrir</p>
            </section>
        );
    }

    return (
        <section id="contact" className="screen">
            <TextPathAnimation panelKey="contact" text="Julian Camargo - Desarrollador Backend" />
            <button className="back-btn" onClick={() => setContentOpen(false)}>
                ← Volver
            </button>
            <h2 className="screen-title">Contacto</h2>
            <p className="contact-subtitle">Siempre interesado en nuevas oportunidades de crecimiento.</p>

            <nav className="menu-list" role="menu" aria-label="Opciones de contacto">
                <FocusableItem index={0} onSelect={() => window.open('mailto:julicmrgo@gmail.com', '_blank')}>
                    <FaEnvelope className="contact-icon" />
                    <span className="menu-text">Email</span>
                    <span className="contact-value">julicmrgo@gmail.com</span>
                </FocusableItem>
                <FocusableItem index={1} onSelect={() => window.open('https://www.linkedin.com/in/julian-camargo/', '_blank')}>
                    <FaLinkedin className="contact-icon" />
                    <span className="menu-text">LinkedIn</span>
                    <span className="contact-value">julian-camargo</span>
                </FocusableItem>
                <FocusableItem index={2} onSelect={() => window.open('https://github.com/julian87nicolas', '_blank')}>
                    <FaGithub className="contact-icon" />
                    <span className="menu-text">GitHub</span>
                    <span className="contact-value">julian87nicolas</span>
                </FocusableItem>
            </nav>

            <div className="contact-footer-text">
                <p>© 2022 Julián Camargo. Todos los derechos reservados.</p>
            </div>
        </section>
    )
}

export default Contact