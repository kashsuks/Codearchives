// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProblemList from './components/ProblemList';
import ProblemDetails from './components/ProblemDetails';
import Navbar from './components/Navbar';
import './styles.css';

function App() {
    const [problems, setProblems] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const problemModules = await Promise.all([
                    import('./problems/1'),
                    import('./problems/2'),
                    // Add more problem imports here
                ]);

                const fetchedProblems = {};
                problemModules.forEach(module => {
                    const problem = module.default;
                    fetchedProblems[problem.id] = problem;
                });

                setProblems(fetchedProblems);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchProblems();
    }, []);

    if (loading) {
        return <div>Loading problems...</div>;
    }

    if (error) {
        return <div>Error loading problems: {error.message}</div>;
    }

    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/problems" element={<ProblemList problems={problems} />} />
                    <Route path="/problems/:problemId" element={<ProblemDetails problems={problems} />} />
                    <Route path="/" element={<div />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;