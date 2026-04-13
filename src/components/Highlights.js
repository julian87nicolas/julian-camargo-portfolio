import { useEffect, useState } from "react";
import { useNavigation } from "./NavigationContext";
import FocusableItem from "./FocusableItem";
import listHighlights from "./list-highlights.json"
import "./styles/HighLights.css"

function Highlights() {
    const { setFocusCount, contentOpen, openContent, closeContent } = useNavigation();
    const [selectedIndex, setSelectedIndex] = useState(null);

    useEffect(() => {
        setFocusCount(contentOpen ? listHighlights.length : 0);
    }, [setFocusCount, contentOpen]);

    // Reset detail when content closes
    useEffect(() => {
        if (!contentOpen) setSelectedIndex(null);
    }, [contentOpen]);

    const active = selectedIndex !== null
        ? (listHighlights[selectedIndex] || listHighlights[0])
        : null;

    if (!contentOpen) {
        return (
            <section id="highlights" className="screen panel-preview">
                <h2 className="screen-title preview-title" onClick={openContent}>Highlights</h2>
                <p className="preview-hint">Press Enter or click to open</p>
            </section>
        );
    }

    return (
        <section id="highlights" className="screen">
            <button className="back-btn" onClick={selectedIndex !== null ? () => setSelectedIndex(null) : closeContent}>
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
