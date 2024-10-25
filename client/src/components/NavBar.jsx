import { Link } from "react-router-dom";


function NavBar() {


    return(
        <nav>
            <ul>
                <li>
                    <Link to={`/`}>Home</Link>
                </li>
                <li>
                    <Link to={`/Graph`}>Graph</Link>
                </li>
                <li>
                    <Link to={`/MostUsed`}>Most Used</Link>
                </li>
                <li>
                    <Link to={`/Search`}>Search</Link>
                </li>
                <li>
                    <Link to={`/Admin`}>Admin</Link>
                </li>
            </ul>
        </nav>
    );
};
export default NavBar;