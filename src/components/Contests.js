import React from 'react';
import { Link } from 'react-router-dom';

function Contests() {
  return (
    <section id="contests" className="page">
      <h2>Contests</h2>
      <p>Contest functionality will be implemented later.</p>
      <div id="contest-list">
        <p>No contests available yet.</p>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <Link to="/" style={{ 
          textDecoration: 'none', 
          color: '#007bff',
          fontWeight: 'bold'
        }}>
          ← Back to Home
        </Link>
      </div>
    </section>
  );
}

export default Contests;