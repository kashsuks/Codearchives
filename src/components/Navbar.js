import React from 'react';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="container">
                <a href="/" className="logo">Codearchives</a>
                <ul className="nav-links">
                    <li><a href="/problems">Problems</a></li> {/* Link to /problems */}
                    <li><a href="/contests">Contests</a></li>
                    <li><a href="/rankings">Rankings</a></li>
                    <li><a href="/login">Login</a></li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;