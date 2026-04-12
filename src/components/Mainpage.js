import { useMemo } from "react";
import { NavigationProvider } from "./NavigationContext";
import PanelContainer from "./PanelContainer";
import Highlights from "./Highlights";
import Intro from "./Intro";
import Projects from "./Projects";
import Certifications from "./Certifications";
import Contact from "./Contact";

function Mainpage({ HeaderComponent, AboutComponent, FooterComponent }) {
    const panels = useMemo(() => [Intro, Highlights, Certifications, Projects, ContactFooter], []);

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