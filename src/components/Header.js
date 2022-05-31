import { Link } from "react-router-dom";

function Header() {
    return (
        <>
        <nav>
            <ul>
                <li>
                    <h1>
                        <Link to={"/"}>
                            <i className="fa-solid fa-code"></i>Julián Camargo
                        </Link>
                    </h1>
                </li>
                <li>
                    <Link to={"/#projects"}>
                        Projects <i className="fa-solid fa-gears"></i>
                    </Link>
                </li>
                <li>
                    <Link to={"/about"}>
                        About <i className="fa-solid fa-circle-info"></i>
                    </Link>
                </li>
                <li>
                    <a href="#contact">
                        Contact <i className="fa-solid fa-envelope"></i>
                    </a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/in/julian-camargo/" target="_blank">
                        LinkedIn <i className="fa-brands fa-linkedin"></i>
                    </a>
                </li>
                <li>
                    <a href="https://github.com/julian87nicolas" target="_blank">
                        Github <i className="fa-brands fa-github"></i>
                    </a>
                </li>
                <li className="resume">
                    <a href="../files/CV-esp.pdf"  target="_blank">
                        Resume <i className="fa-solid fa-user"></i>
                    </a>
                </li>
                <li>
                    <a href="../index.html">
                        <img src="united-states.png" alt="english site" />
                    </a>
                </li>
            </ul>
        </nav>

        <div className="border-gradient"></div>
        </>
    )
}

export default Header;