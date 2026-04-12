import listHighlights from "./list-highlights.json";
import "../styles/HighLights.css"

function Highlights() {
  return (
    <section id="highlights">
        <h2>Hitos</h2>
        <div className="hl_timeline">
            {listHighlights.map((highl, idx) =>
                <article className="hl_item surface-card" key={`${highl.title}-${idx}`}>
                    <span className="hl_marker" aria-hidden="true"></span>
                    <div className="hl_content">
                        <p className="hl_time">{highl.time_interval}</p>
                        <h3>{highl.title} - { highl.company.url && <a href={highl.company.url} target="_blank" rel="noreferrer">{highl.company.name}</a> }{ !highl.company.url && highl.company.name }</h3>
                        <h4>Descripción</h4>
                        <ul className="hl_points">
                            {highl.description.map((d, descIdx) =>
                                <li key={`${highl.title}-${descIdx}`}>
                                    <p>{d.summary}</p>
                                    {d.tech && <p className="tech">{d.tech}</p>}
                                </li>
                            )}
                        </ul>
                    </div>
                </article>
            )}
        </div>
    </section>
  );
}

export default Highlights;