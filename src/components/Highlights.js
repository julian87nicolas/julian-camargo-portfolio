import listHighlights from "./list-highlights.json"
import "./styles/HighLights.css"

function Highlights() {
    return (
        <div className="section-black">
            <section id="highlights">
                <h2>Highlights</h2>
                {listHighlights.map((highl, idx) =>
                    <div className="hl_item" key={`${highl.title}-${idx}`}>
                        <article className="hl_article">
                            <div className="hl_text">

                                <h3>{highl.title} - {highl.company.url && <a href={highl.company.url} target="_blank" rel="noreferrer">{highl.company.name}</a>}{!highl.company.url && highl.company.name}</h3>
                                <h5>{highl.time_interval}</h5>
                                <h4>Description:</h4>
                                {highl.description.map((d, descIdx) =>
                                    <ul key={`${highl.title}-${descIdx}`}>
                                        <li>{d.summary}:
                                            <ul>
                                                <li className="tech">Technologies used: {d.tech}</li>
                                            </ul>
                                        </li>
                                    </ul>
                                )}
                            </div>
                        </article>
                    </div>
                )}
            </section>
            <div className="border-gradient"></div>
        </div>
    );
}

export default Highlights;
