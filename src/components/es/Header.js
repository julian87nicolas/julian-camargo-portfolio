import { Link, NavLink } from "react-router-dom";

import "./../styles/Header.css"

function Header() {
    return (
        <>
            <div id="header">
                <nav>
                    <ul>
                        <li>
                            <h1>
                                <NavLink to={"/es"}>
                                    <i className="fa-solid fa-code"></i> Julián Camargo
                                </NavLink>
                            </h1>
                        </li>
                        <li>
                            <a href="./#highlights">
                                Hitos <i className="fa-solid fa-award"></i>
                            </a>
                        </li>
                        <li>
                            <a href="/es/#projects">
                                Proyectos <i className="fa-solid fa-gears"></i>
                            </a>
                        </li>
                        <li>
                            <NavLink to={"/es/about"}>
                                Sobre <i className="fa-solid fa-circle-info"></i>
                            </NavLink>
                        </li>
                        <li>
                            <a href="#contact">
                                Contacto <i className="fa-solid fa-envelope"></i>
                            </a>
                        </li>

                        <li>
                            <a href="https://github.com/julian87nicolas" target="_blank" rel="noreferrer">
                                Github <i className="fa-brands fa-github"></i>
                            </a>
                        </li>
                        <li className="resume">
                            <a href="./CV.pdf" target="_blank" rel="noopener noreferrer">
                                Curriculum <i className="fa-solid fa-user"></i>
                            </a>
                        </li>
                        <li>
                            <Link to="/">
                                <img src="images/spain.png" alt="sitio en español" />
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