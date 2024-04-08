import listHighlights from "./list-hightlights.json";
import "../styles/HighLights.css"

function Highlights() {
  return (
    <div className="section-black">
        <section id="highlights">
            <h2>Hitos</h2>
            {listHighlights.map( (highl, idx) =>
            <div className="hl_item"> 
            <article className="hl_article">
                <div class="hl_text">
                    
                    <h3>{highl.title} - { highl.company.url && <a href={highl.company.url} target="_blank" rel="noreferrer">{highl.company.name}</a> }{ !highl.company.url && highl.company.name }</h3>        
                    <h5>{highl.time_interval}</h5>
                    <h4>Descripción:</h4>
                    {highl.description.map( d => 
                        <ul>
                            <li>{d.summary}:
                                <ul>
                                    <li className="tech">Tecnologías usadas: {d.tech}</li>
                                </ul>
                            </li>
                        </ul>
                    )}
                </div>
            </article>
            </div>
            )}
        </section>
        <div class="border-gradient"></div>
    </div>
  );
}

export default Highlights;