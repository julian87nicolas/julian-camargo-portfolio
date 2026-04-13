import { useEffect } from "react";
import { useNavigation } from "./NavigationContext";
import FocusableItem from "./FocusableItem";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa6";
import "./styles/Contact.css"

function Contact() {
    const { setFocusCount, contentOpen, openContent, closeContent } = useNavigation();

    useEffect(() => { setFocusCount(contentOpen ? 3 : 0); }, [setFocusCount, contentOpen]);

    if (!contentOpen) {
        return (
            <section id="contact" className="screen panel-preview">
                <h2 className="screen-title preview-title" onClick={openContent}>Contact</h2>
                <p className="preview-hint">Press Enter or click to open</p>
            </section>
        );
    }

    return (
        <section id="contact" className="screen">
            <button className="back-btn" onClick={closeContent}>
                ← Back
            </button>
            <h2 className="screen-title">Contact</h2>
            <p className="contact-subtitle">Always interested in new growth opportunities.</p>

            <nav className="menu-list" role="menu" aria-label="Contact options">
                <FocusableItem index={0} onSelect={() => window.open('mailto:julicmrgo@gmail.com', '_blank')}>
                    <FaEnvelope className="contact-icon" />
                    <span className="menu-text">Email</span>
                    <span className="contact-value">julicmrgo@gmail.com</span>
                </FocusableItem>
                <FocusableItem index={1} onSelect={() => window.open('https://www.linkedin.com/in/julian-camargo/', '_blank')}>
                    <FaLinkedin className="contact-icon" />
                    <span className="menu-text">LinkedIn</span>
                    <span className="contact-value">julian-camargo</span>
                </FocusableItem>
                <FocusableItem index={2} onSelect={() => window.open('https://github.com/julian87nicolas', '_blank')}>
                    <FaGithub className="contact-icon" />
                    <span className="menu-text">GitHub</span>
                    <span className="contact-value">julian87nicolas</span>
                </FocusableItem>
            </nav>

            <div className="contact-footer-text">
                <p>© 2022 Julián Camargo. All rights reserved.</p>
            </div>
        </section>
    )
}

export default Contact