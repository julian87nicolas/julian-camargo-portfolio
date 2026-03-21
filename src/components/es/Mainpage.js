import Intro from "./Intro"
import Projects from "./Projects"
import HighLights from "./Highlights"
import Certifications from "./Certifications"

function Mainpage () {
    return (
        <>
            <Intro />
            <HighLights/>
            <Certifications />
            <Projects />
        </>
    )
}

export default Mainpage