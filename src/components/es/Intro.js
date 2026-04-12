import { useNavigation } from "../NavigationContext";
import "../styles/Intro.css"

function Intro () {
    const { goToPanel } = useNavigation();

    return (
        <section id="intro">
            <p className="name">Hola, soy <span>Julián Camargo.</span></p>

            <h2>Desarrollador backend con foco en Java, cloud e integraciones IoT.</h2>

            <p>
            Desarrollador backend especializado en microservicios Java, infraestructura cloud e integración entre software y sistemas embebidos. Experiencia en proyectos de migración cloud, automatización de CI/CD y diseño de APIs para servicios escalables y confiables.
            </p>

            <div className="intro-actions">
                <button onClick={() => goToPanel(3)} className="btn-primary">Ver Proyectos</button>
                <button onClick={() => goToPanel(4)} className="btn-secondary">Hablemos</button>
            </div>
        </section>
    )
}

export default Intro