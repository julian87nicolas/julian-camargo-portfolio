import { useEffect } from "react";
import { useNavigation } from "./NavigationContext";
import "./styles/Intro.css"

function Intro () {
    const { setFocusCount, contentOpen, openContent } = useNavigation();

    useEffect(() => { setFocusCount(0); }, [setFocusCount]);

    return (
        <section id="intro" className={`screen${!contentOpen ? ' panel-preview' : ''}`}>
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