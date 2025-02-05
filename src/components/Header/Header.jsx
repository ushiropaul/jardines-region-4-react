// Header.jsx
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    return (
        <header className="header">
        <nav className="nav">
            <a href="./">
            <img className="nav-logo" src="/logo.png" alt="Logo de jardines región 4" />
            </a>
            <input type="checkbox" id="nav-toggle" className="nav-checkbox" />
            <label htmlFor="nav-toggle" className="nav-toggle" aria-label="Abrir menú">
            ☰
            </label>
            <ul className="nav-menu">
            <li>
                <Link to="/">Inicio</Link>
            </li>
            <li>
                <Link to="/gardens">Ver jardines</Link>
            </li>
            {/* <li>
                <Link to={"/marketplace"}>Marketplace</Link>
            </li> */}
            <li>
                <Link to='/registrarse'>Registrarse</Link>
            </li>
            </ul>
        </nav>
    </header>
    );
}

export default Header;


