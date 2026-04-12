import { useMemo } from "react";
import { NavigationProvider } from "../NavigationContext";
import PanelContainer from "../PanelContainer";
import Intro from "./Intro"
import Projects from "./Projects"
import HighLights from "./Highlights"
import Certifications from "./Certifications"
import Contact from "./Contact"

function Mainpage({ HeaderComponent, AboutComponent, FooterComponent }) {
    const panels = useMemo(() => [Intro, HighLights, Certifications, Projects, ContactFooter], []);

    return (
        <NavigationProvider panels={panels}>
            <div id="page">
                {HeaderComponent && <HeaderComponent />}
                <PanelContainer />
            </div>
        </NavigationProvider>
    );
}

function ContactFooter() {
    return <Contact />;
}

export default Mainpage