import { useEffect } from "react";
import { useNavigation } from "../NavigationContext";
import "../styles/Intro.css"

function Intro () {
    const { setFocusCount, contentOpen, openContent } = useNavigation();

    useEffect(() => { setFocusCount(0); }, [setFocusCount]);

    return (
        <section id="intro" className={`screen${!contentOpen ? ' panel-preview' : ''}`}>
            {contentOpen ? (
                <div className="screen-header intro-content">
                    <h2 className="screen-title">Camargo Julian 2.0</h2>
                    <p className="screen-subtitle">Desarrollador Backend · Java · Cloud · IoT</p>
                    <p className="intro-description">
                        Desarrollador backend especializado en microservicios Java, infraestructura
                        cloud e integración entre software y sistemas embebidos. Experiencia en
                        proyectos de migración cloud, automatización de CI/CD y diseño de APIs
                        para servicios escalables y confiables.
                    </p>
                </div>
            ) : (
                <>
                    <h2 className="screen-title preview-title" onClick={openContent}>Camargo Julian 2.0</h2>
                    <p className="preview-hint">Presiona Enter o haz click para abrir</p>
                </>
            )}
        </section>
    )
}

export default Intro