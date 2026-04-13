import { useEffect } from "react";
import { useNavigation } from "./NavigationContext";
import TextPathAnimation from "./TextPathAnimation";
import "./styles/Intro.css"

function Intro () {
    const { setFocusCount } = useNavigation();

    useEffect(() => { setFocusCount(0); }, [setFocusCount]);

    return (
        <section id="intro" className="screen">
            <TextPathAnimation panelKey="home" text="Julian Camargo - Backend Developer" />
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
        </section>
    )
}

export default Intro