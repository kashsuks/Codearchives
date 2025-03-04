import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProblemList from './components/ProblemList';
import Navbar from './components/Navbar';
import './styles.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/problems" element={<ProblemList />} /> {/* Route for /problems */}
                    <Route path="/" element={<div />} /> {/* Empty default route */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;