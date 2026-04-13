import { useMemo } from "react";
import { NavigationProvider } from "../NavigationContext";
import PanelContainer from "../PanelContainer";
import KeyboardHints from "../KeyboardHints";
import Intro from "./Intro"
import Projects from "./Projects"
import HighLights from "./Highlights"
import Contact from "./Contact"

function Mainpage({ HeaderComponent }) {
    const panels = useMemo(() => [Intro, HighLights, Projects, Contact], []);

    return (
        <NavigationProvider panels={panels}>
            <div id="page">
                {HeaderComponent && <HeaderComponent />}
                <PanelContainer />
                <KeyboardHints labels={{ navigate: "Navegar", select: "Seleccionar", open: "Abrir", back: "Volver" }} />
            </div>
        </NavigationProvider>
    );
}

export default Mainpage