import certifications from "./list-certifications.json";
import "./styles/Certifications.css";

function Certifications() {
    return (
        <div className="section-blue">
            <section id="certifications">
                <h2>Certifications</h2>
                <p className="cert-intro">Selected credentials aligned with my backend, cloud and security work.</p>
                <div className="cert-grid">
                    {certifications.map((cert, idx) => (
                        <article className="cert-card surface-card" key={`${cert.title}-${idx}`}>
                            <p className="cert-meta">{cert.issuer} · {cert.year}</p>
                            <h3>{cert.title}</h3>
                            <a href={cert.url} target="_blank" rel="noreferrer">View credential</a>
                        </article>
                    ))}
                </div>
                <div className="cert-more">
                    <a
                        className="cert-more-link"
                        href="https://www.linkedin.com/in/julian-camargo/details/certifications/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        See more
                    </a>
                </div>
            </section>
            <div className="border-gradient"></div>
        </div>
    );
}

export default Certifications;
