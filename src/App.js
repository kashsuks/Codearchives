import React, { useState } from 'react';
import './styles.css';
import Home from './components/Home';
import ProblemArchive from './components/ProblemArchive';
import ProblemView from './components/ProblemView';
import Contests from './components/Contests';

function App() {
  const [activePage, setActivePage] = useState('home');
  const [selectedProblem, setSelectedProblem] = useState(null);

  const handleProblemSelect = (problem) => {
    setSelectedProblem(problem);
    setActivePage('problem-view');
  };

  const handleBackToArchive = () => {
    setActivePage('archive');
    setSelectedProblem(null);
  };

  return (
    <div className="app">
      <header>
        <h1>Problem Archive</h1>
        <nav>
          <ul>
            <li>
              <a 
                href="#home" 
                className={activePage === 'home' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  setActivePage('home');
                }}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#archive" 
                className={activePage === 'archive' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  setActivePage('archive');
                }}
              >
                Archive
              </a>
            </li>
            <li>
              <a 
                href="#contests" 
                className={activePage === 'contests' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  setActivePage('contests');
                }}
              >
                Contests
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        {activePage === 'home' && <Home />}
        {activePage === 'archive' && <ProblemArchive onProblemSelect={handleProblemSelect} />}
        {activePage === 'contests' && <Contests />}
        {activePage === 'problem-view' && selectedProblem && (
          <ProblemView problem={selectedProblem} onBackClick={handleBackToArchive} />
        )}
      </main>
    </div>
  );
}

export default App;