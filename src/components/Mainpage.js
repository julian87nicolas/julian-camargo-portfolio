import { useMemo } from "react";
import { NavigationProvider } from "./NavigationContext";
import PanelContainer from "./PanelContainer";
import Intro from "./Intro";
import Highlights from "./Highlights";
import Projects from "./Projects";
import Contact from "./Contact";

function Mainpage({ HeaderComponent }) {
    const panels = useMemo(() => [Intro, Highlights, Projects, Contact], []);

    return (
        <NavigationProvider panels={panels}>
            <div id="page">
                {HeaderComponent && <HeaderComponent />}
                <PanelContainer />
            </div>
        </NavigationProvider>
    );
}

export default Mainpage