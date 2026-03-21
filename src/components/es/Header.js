import { Link, NavLink } from "react-router-dom";
import { FaAward, FaCertificate, FaCircleInfo, FaCode, FaEnvelope, FaGears, FaGithub, FaMoon, FaSun, FaUser } from "react-icons/fa6";

import "./../styles/Header.css"

function Header({ theme, onToggleTheme }) {
    return (
        <>
            <div id="header">
                <nav>
                    <ul>
                        <li>
                            <h1>
                                <NavLink to={"/es"}>
                                    <FaCode className="fa-solid fa-code" /> Julián Camargo
                                </NavLink>
                            </h1>
                        </li>
                        <li>
                            <a href="/es/#highlights">
                                Hitos <FaAward className="fa-solid fa-award" />
                            </a>
                        </li>
                        <li>
                            <a href="/es/#projects">
                                Proyectos <FaGears className="fa-solid fa-gears" />
                            </a>
                        </li>
                        <li>
                            <a href="/es/#certifications">
                                Certificaciones <FaCertificate className="fa-solid fa-certificate" />
                            </a>
                        </li>
                        <li>
                            <NavLink to={"/es/about"}>
                                Sobre <FaCircleInfo className="fa-solid fa-circle-info" />
                            </NavLink>
                        </li>
                        <li>
                            <a href="/es/#contact">
                                Contacto <FaEnvelope className="fa-solid fa-envelope" />
                            </a>
                        </li>

                        <li>
                            <a href="https://github.com/julian87nicolas" target="_blank" rel="noreferrer">
                                GitHub <FaGithub className="fa-brands fa-github" />
                            </a>
                        </li>
                        <li className="resume">
                            <a href="./CV.pdf" target="_blank" rel="noopener noreferrer">
                                Curriculum <FaUser className="fa-solid fa-user" />
                            </a>
                        </li>
                        <li className="theme-toggle">
                            <button
                                type="button"
                                className={`theme-switch ${theme === "light" ? "is-light" : "is-dark"}`}
                                onClick={onToggleTheme}
                                aria-label="Cambiar modo de color"
                                aria-pressed={theme === "light"}
                            >
                                <span className="theme-switch-thumb" aria-hidden="true">
                                    {theme === "dark" ? <FaMoon /> : <FaSun />}
                                </span>
                            </button>
                        </li>
                        <li className="lang-switch">
                            <Link to="/">
                                <img src="images/united-states.png" alt="Switch to English" />
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="border-gradient"></div>
            </div>
        </>
    )
}

export default Header;