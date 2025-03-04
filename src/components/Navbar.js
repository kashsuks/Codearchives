// components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="container">
                <Link to="/" className="logo">Codearchives</Link>
                <ul className="nav-links">
                    <li><Link to="/problems">Problems</Link></li>
                    <li><Link to="/contests">Contests</Link></li>
                    <li><Link to="/rankings">Rankings</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;