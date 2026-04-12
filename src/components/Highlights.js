import { useEffect } from "react";
import { useNavigation } from "./NavigationContext";
import FocusableItem from "./FocusableItem";
import listHighlights from "./list-highlights.json"
import "./styles/HighLights.css"

function Highlights() {
    const { focusIndex, setFocusCount, goBack } = useNavigation();

    useEffect(() => { setFocusCount(listHighlights.length); }, [setFocusCount]);

    const active = listHighlights[focusIndex] || listHighlights[0];

    return (
        <section id="highlights" className="screen">
            <button className="back-btn" onClick={goBack}>
                ← Back
            </button>
            <h2 className="screen-title">Highlights</h2>

            <div className="hl-layout">
                <nav className="hl-list" role="menu" aria-label="Experience list">
                    {listHighlights.map((hl, idx) => (
                        <FocusableItem key={idx} index={idx}>
                            <span className="hl-item-title">{hl.title}</span>
                            <span className="hl-item-company">{hl.company.name}</span>
                        </FocusableItem>
                    ))}
                </nav>

                <div className="hl-detail" key={focusIndex}>
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
            </div>

            <div className="screen-footer">
                <span className="key-badge">↑↓</span> Navigate
                <span className="key-badge">Esc</span> Back
            </div>
        </section>
    );
}

export default Highlights;
