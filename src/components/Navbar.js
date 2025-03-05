// components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const handleLogin = () => {
        const clientId = 'Ov23livrApKARbCdh9BT'; // Use environment variable
        const redirectUri = 'https://codearchives.vercel.app/auth/github/callback'; // Use environment variable
        const scope = 'user:email';
        const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
        window.location.href = authUrl;
    };

    return (
        <nav className="navbar">
            <div className="container">
                <Link to="/" className="logo">Codearchives</Link>
                <ul className="nav-links">
                    <li><Link to="/problems">Problems</Link></li>
                    <li><Link to="/contests">Contests</Link></li>
                    <li><Link to="/rankings">Rankings</Link></li>
                    <li><button onClick={handleLogin}>Login</button></li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;