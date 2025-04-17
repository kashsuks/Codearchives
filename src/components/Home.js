import React from 'react';

function Home() {
  return (
    <section id="home" className="page active">
      <h2>Welcome to the Problem Archive</h2>
      <p>This is a simple problem archive system where you can browse programming problems.</p>
      
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
  "difficulty": "easy|medium|hard",
  "timeLimit": "1s",
  "memoryLimit": "256MB",
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