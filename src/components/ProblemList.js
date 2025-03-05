// components/ProblemList.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProblemItem from './ProblemItem';

function ProblemList({ problems }) {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const problemArray = Object.values(problems);

    const filteredProblems = problemArray.filter(problem =>
        problem.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleProblemClick = (problem) => {
        navigate(`/problems/${problem.id}`);
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
            {filteredProblems.map(problem => (
                <ProblemItem key={problem.id} problem={problem} onClick={() => handleProblemClick(problem)} />
            ))}
        </div>
    );
}

export default ProblemList;