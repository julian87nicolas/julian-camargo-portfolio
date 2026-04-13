import { useMemo } from "react";
import { NavigationProvider } from "./NavigationContext";
import PanelContainer from "./PanelContainer";
import MorphingTextPath from "./MorphingTextPath";
import KeyboardHints from "./KeyboardHints";
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
                <MorphingTextPath text="Julian Camargo - Backend Developer" />
                <PanelContainer />
                <KeyboardHints labels={{ navigate: "Navigate", select: "Select", open: "Open", back: "Back" }} />
            </div>
        </NavigationProvider>
    );
}

export default Mainpage