import { useEffect, useState } from "react";
import { useNavigation } from "./NavigationContext";
import TextPathAnimation from "./TextPathAnimation";
import "./styles/Intro.css"

function Intro () {
    const { setFocusCount, activePanelIndex } = useNavigation();
    const [contentOpen, setContentOpen] = useState(false);

    useEffect(() => { setFocusCount(0); }, [setFocusCount]);

    // Reset preview when navigating away
    useEffect(() => {
        if (activePanelIndex !== 0) setContentOpen(false);
    }, [activePanelIndex]);

    // Enter key opens content in preview mode
    useEffect(() => {
        if (!contentOpen && activePanelIndex === 0) {
            const handler = (e) => {
                if (e.key === 'Enter') { e.preventDefault(); setContentOpen(true); }
            };
            window.addEventListener('keydown', handler);
            return () => window.removeEventListener('keydown', handler);
        }
    }, [contentOpen, activePanelIndex]);

    const openContent = () => setContentOpen(true);

    return (
        <section id="intro" className={`screen${!contentOpen ? ' panel-preview' : ''}`}>
            <TextPathAnimation panelKey="home" text="Julian Camargo - Backend Developer" onClick={!contentOpen ? openContent : undefined} />
            {contentOpen ? (
                <div className="screen-header intro-content">
                    <h2 className="screen-title">Camargo Julian 2.0</h2>
                    <p className="screen-subtitle">Backend Developer · Java · Cloud · IoT</p>
                    <p className="intro-description">
                        Backend developer specialized in Java microservices, cloud infrastructure,
                        and integration between software and embedded systems. Experience in cloud
                        migration projects, CI/CD automation, and API design for scalable and
                        reliable services.
                    </p>
                </div>
            ) : (
                <>
                    <h2 className="screen-title preview-title" onClick={openContent}>Camargo Julian 2.0</h2>
                    <p className="preview-hint">Press Enter or click to open</p>
                </>
            )}
        </section>
    )
}

export default Intro