// components/Navbar.js
import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Navbar() {
    const clientId = 'Ov23livrApKARbCdh9BT'; // Your client ID
    const redirectUri = 'https://codearchives.vercel.app'; // Your frontend URL
    const backendIp = '174.115.245.34:5000'; // Corrected: Just the IP address
    const scope = 'user:email';
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}`;
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const code = params.get('code');

        if (code) {
            // Send code to your backend
            axios.get(`https://${backendIp}:5000/auth/github/callback?code=${code}`) // Corrected: Removed port from backendIp
                .then(response => {
                    // Handle user data from backend
                    console.log(response.data);
                    // store the user data in local storage, or in state.
                    navigate('/'); // Redirect to home page
                })
                .catch(error => {
                    console.error('Error exchanging code:', error);
                });

            // Remove code from URL
            params.delete('code');
            navigate({ search: params.toString() }, { replace: true });
        }
    }, [location, navigate]);

    const handleLogin = () => {
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