import { Link, NavLink } from "react-router-dom";

import "./styles/Header.css"

function Header() {

    return (
        <>
            <div id="header">
                <nav>
                    <ul>
                        <li>
                            <h1>
                                <NavLink to={"/"}>
                                    <i className="fa-solid fa-code"></i> Julián Camargo
                                </NavLink>
                            </h1>
                        </li>
                        <li>
                            <a href="./#highlights">
                                Highlights <i className="fa-solid fa-award"></i>
                            </a>
                        </li>
                        <li>
                            <a href="./#projects">
                                Projects <i className="fa-solid fa-gears"></i>
                            </a>
                        </li>
                        <li>
                            <NavLink to={"/about"}>
                                About <i className="fa-solid fa-circle-info"></i>
                            </NavLink>
                        </li>
                        <li>
                            <a href="#contact">
                                Contact <i className="fa-solid fa-envelope"></i>
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/julian87nicolas" target="_blank" rel="noreferrer">
                                Github <i className="fa-brands fa-github"></i>
                            </a>
                        </li>
                        <li className="resume">
                            <a href="./CV-Eng.pdf" target="_blank" rel="noopener noreferrer">
                                Resume <i className="fa-solid fa-user"></i>
                            </a>
                        </li>
                        <li>
                            <Link to="/es/">
                                <img src="images/united-states.png" alt="english site" />
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