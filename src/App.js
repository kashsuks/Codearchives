import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './styles.css';
import Home from './components/Home';
import ProblemArchive from './components/ProblemArchive';
import ProblemView from './components/ProblemView';
import Contests from './components/Contests';
import Status from './components/Status';

function App() {
  return (
    <Router>
      <div className="app">
        <header>
          <h1>Codearchives</h1>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/problem">Archive</Link>
              </li>
              <li>
                <Link to="/contest">Contests</Link>
              </li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/problem" element={<ProblemArchive />} />
            <Route path="/problem/:problemId" element={<ProblemView />} />
            <Route path="/status/:problemId" element={<Status />} />
            <Route path="/contest" element={<Contests />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;