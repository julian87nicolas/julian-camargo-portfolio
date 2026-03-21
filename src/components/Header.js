import { Link, NavLink } from "react-router-dom";
import { FaAward, FaCircleInfo, FaCode, FaEnvelope, FaGears, FaGithub, FaMoon, FaSun, FaUser } from "react-icons/fa6";

import "./styles/Header.css"

function Header({ theme, onToggleTheme }) {

    return (
        <>
            <div id="header">
                <nav>
                    <ul>
                        <li>
                            <h1>
                                <NavLink to={"/"}>
                                    <FaCode className="fa-solid fa-code" /> Julián Camargo
                                </NavLink>
                            </h1>
                        </li>
                        <li>
                            <a href="/#highlights">
                                Highlights <FaAward className="fa-solid fa-award" />
                            </a>
                        </li>
                        <li>
                            <a href="/#projects">
                                Projects <FaGears className="fa-solid fa-gears" />
                            </a>
                        </li>
                        <li>
                            <NavLink to={"/about"}>
                                About <FaCircleInfo className="fa-solid fa-circle-info" />
                            </NavLink>
                        </li>
                        <li>
                            <a href="/#contact">
                                Contact <FaEnvelope className="fa-solid fa-envelope" />
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/julian87nicolas" target="_blank" rel="noreferrer">
                                GitHub <FaGithub className="fa-brands fa-github" />
                            </a>
                        </li>
                        <li className="resume">
                            <a href="./CV-Eng.pdf" target="_blank" rel="noopener noreferrer">
                                Resume <FaUser className="fa-solid fa-user" />
                            </a>
                        </li>
                        <li className="theme-toggle">
                            <button
                                type="button"
                                className={`theme-switch ${theme === "light" ? "is-light" : "is-dark"}`}
                                onClick={onToggleTheme}
                                aria-label="Switch color mode"
                                aria-pressed={theme === "light"}
                            >
                                <span className="theme-switch-thumb" aria-hidden="true">
                                    {theme === "dark" ? <FaMoon /> : <FaSun />}
                                </span>
                            </button>
                        </li>
                        <li className="lang-switch">
                            <Link to="/es/">
                                <img src="images/spain.png" alt="Switch to Spanish" />
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