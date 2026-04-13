import { useEffect, useState } from "react";
import { useNavigation } from "./NavigationContext";
import FocusableItem from "./FocusableItem";
import TextPathAnimation from "./TextPathAnimation";
import listHighlights from "./list-highlights.json"
import "./styles/HighLights.css"

function Highlights() {
    const { setFocusCount, goBack } = useNavigation();
    const [selectedIndex, setSelectedIndex] = useState(null);

    useEffect(() => { setFocusCount(listHighlights.length); }, [setFocusCount]);

    const active = selectedIndex !== null
        ? (listHighlights[selectedIndex] || listHighlights[0])
        : null;

    return (
        <section id="highlights" className="screen">
            <TextPathAnimation panelKey="highlights" text="Julian Camargo - Backend Developer" />
            <button className="back-btn" onClick={selectedIndex !== null ? () => setSelectedIndex(null) : goBack}>
                ← Back
            </button>
            <h2 className="screen-title">Highlights</h2>

            <div className={`hl-layout${selectedIndex !== null ? ' has-detail' : ''}`}>
                <nav className="hl-list" role="menu" aria-label="Experience list">
                    {listHighlights.map((hl, idx) => (
                        <FocusableItem key={idx} index={idx} onSelect={() => setSelectedIndex(idx)}>
                            <span className="hl-item-title">{hl.title}</span>
                            <span className="hl-item-company">{hl.company.name}</span>
                        </FocusableItem>
                    ))}
                </nav>

                {active && (
                    <div className="hl-detail" key={selectedIndex}>
                        <p className="hl-time">{active.time_interval}</p>
                        <h3>{active.title}</h3>
                        <p className="hl-company-name">
                            {active.company.url
                                ? <a href={active.company.url} target="_blank" rel="noreferrer">{active.company.name}</a>
                                : active.company.name
                            }
                        </p>
                        <ul className="hl-desc">
                            {active.description.map((d, i) => (
                                <li key={i}>
                                    <p>{d.summary}</p>
                                    {d.tech && <p className="hl-tech">{d.tech}</p>}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Highlights;
