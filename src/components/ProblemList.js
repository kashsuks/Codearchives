import React, { useState, useEffect } from 'react';
import ProblemItem from './ProblemItem';
import ProblemDetails from './ProblemDetails';

function ProblemList() {
    const [problems, setProblems] = useState([]); // Initialize as an empty array
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProblem, setSelectedProblem] = useState(null);

    useEffect(() => {
        import('../problems/sumOfPrimes2')
            .then(module => setProblems([module.default]))
            .catch(error => console.error("Error loading problem:", error)); // Add error handling
    }, []);

    const filteredProblems = problems.filter(problem =>
        problem.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleProblemClick = (problem) => {
        setSelectedProblem(problem);
    };

    return (
        <div className="problem-list">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search problems..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            {problems.length > 0 ? ( // Check if problems array has data
                selectedProblem ? (
                    <ProblemDetails problem={selectedProblem} />
                ) : (
                    filteredProblems.map(problem => (
                        <ProblemItem key={problem.id} problem={problem} onClick={() => handleProblemClick(problem)} />
                    ))
                )
            ) : (
                <div>Loading problems...</div> // Display a loading message
            )}
        </div>
    );
}

export default ProblemList;