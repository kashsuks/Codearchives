import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom"
import "./styles.css"
import Home from "./components/Home"
import ProblemArchive from "./components/ProblemArchive"
import ProblemView from "./components/ProblemView"
import Contests from "./components/Contests"

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
            <Route path="/contest" element={<Contests />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <footer className="footer">
          <div className="footer-content">
            <div className="footer-name">Codearchives</div>
            <div className="footer-links">
              <a href="https://discord.gg/StmgUe24VN " target="_blank" rel="noopener noreferrer">
                Discord
              </a>
              <a href="https://github.com/kashsuks/Codearchives" target="_blank" rel="noopener noreferrer">
                Github
              </a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App