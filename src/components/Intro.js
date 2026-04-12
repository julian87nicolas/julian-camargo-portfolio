import { useNavigation } from "./NavigationContext";
import "./styles/Intro.css"

function Intro () {
    const { goToPanel } = useNavigation();

    return (
        <section id="intro">
            <p className="name">Hi, I am <span>Julián Camargo.</span></p>

            <h2>Backend developer focused on Java, cloud and IoT integrations.</h2>

            <p>
            Backend developer specialized in Java microservices, cloud infrastructure, and integration between software and embedded systems. Experience in cloud migration projects, CI/CD automation, and API design for scalable and reliable services.
            </p>

            <div className="intro-actions">
                <button onClick={() => goToPanel(3)} className="btn-primary">View Projects</button>
                <button onClick={() => goToPanel(4)} className="btn-secondary">Let&apos;s Talk</button>
            </div>
        </section>
    )
}

export default Intro