import { NavLink } from "react-router-dom";

import "./styles/Header.css"

function Header() {
    return (
        <>
        <nav>
            <ul>
                <li>
                    <h1>
                        <NavLink to={"/"}>
                            <i className="fa-solid fa-code"></i>Julián Camargo
                        </NavLink>
                    </h1>
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
                    <a href="https://www.linkedin.com/in/julian-camargo/" target="_blank" rel="noreferrer">
                        LinkedIn <i className="fa-brands fa-linkedin"></i>
                    </a>
                </li>
                <li>
                    <a href="https://github.com/julian87nicolas" target="_blank" rel="noreferrer">
                        Github <i className="fa-brands fa-github"></i>
                    </a>
                </li>
                <li className="resume">
                    <a href="./CV.pdf" target="_blank" rel="noopener noreferrer">
                        Resume <i className="fa-solid fa-user"></i>
                    </a>
                </li>
                <li>
                    <a href="../index.html">
                        <img src="images/united-states.png" alt="english site" />
                    </a>
                </li>
            </ul>
        </nav>

        <div className="border-gradient"></div>
        </>
    )
}

export default Header;