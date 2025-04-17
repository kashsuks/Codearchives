import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <section id="home" className="page active">
      <h2>Welcome to Codearchives</h2>
      <p>This is a simple problem archive system where you can browse programming problems.</p>
      
      <div className="navigation-cards" style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '20px', 
        marginTop: '20px',
        marginBottom: '30px'
      }}>
        <Link to="/problem" style={{ 
          textDecoration: 'none', 
          color: 'inherit',
          flex: '1 1 300px'
        }}>
          <div style={{ 
            border: '1px solid #ddd', 
            borderRadius: '8px', 
            padding: '20px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            height: '100%'
          }}>
            <h3 style={{ marginTop: 0 }}>Problem Archive</h3>
            <p>Browse and solve programming problems of various difficulties.</p>
          </div>
        </Link>
        
        <Link to="/contest" style={{ 
          textDecoration: 'none', 
          color: 'inherit',
          flex: '1 1 300px'
        }}>
          <div style={{ 
            border: '1px solid #ddd', 
            borderRadius: '8px', 
            padding: '20px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            height: '100%'
          }}>
            <h3 style={{ marginTop: 0 }}>Contests</h3>
            <p>Participate in programming contests and challenges.</p>
          </div>
        </Link>
      </div>
      
      <div className="instructions">
        <h3>How to Manage Problems</h3>
        <p>This system loads problems directly from the <code>public/problems/</code> directory.</p>
        <ul>
          <li>To add a new problem, create a JSON file in the <code>public/problems/</code> directory</li>
          <li>Each problem file should be named with the problem ID (e.g., <code>problem1.json</code>)</li>
          <li>The system will automatically load all problem files from this directory</li>
        </ul>
      </div>
      
      <div className="problem-format">
        <h3>Problem Format</h3>
        <pre>{`{
  "id": "unique_problem_id",
  "title": "Problem Title",
  "difficulty": 5,  // Number from 1-10
  "timeLimit": "1s",
  "memoryLimit": "256MB",
  "tags": ["arrays", "strings", "dynamic-programming"],  // Comma-separated tags
  "description": "Full problem description",
  "inputSpec": "Input specification",
  "outputSpec": "Output specification",
  "samples": [
    {
      "input": "sample input",
      "output": "expected output"
    }
  ],
  "notes": "Additional notes (optional)"
}`}</pre>
      </div>
    </section>
  );
}

export default Home;