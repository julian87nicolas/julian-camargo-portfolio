import certifications from "./list-certifications.json";
import "../styles/Certifications.css";

function Certifications() {
    return (
        <section id="certifications">
            <h2>Certificaciones</h2>
            <p className="cert-intro">Credenciales seleccionadas y alineadas con mi trabajo en backend, cloud y seguridad.</p>
            <div className="cert-grid">
                {certifications.map((cert, idx) => (
                    <article className="cert-card surface-card" key={`${cert.title}-${idx}`}>
                        <p className="cert-meta">{cert.issuer} · {cert.year}</p>
                        <h3>{cert.title}</h3>
                        <a href={cert.url} target="_blank" rel="noreferrer">Ver credencial</a>
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
                    Ver más
                </a>
            </div>
        </section>
    );
}

export default Certifications;
