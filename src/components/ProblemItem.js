// components/ProblemItem.js
import React from 'react';

function ProblemItem({ problem, onClick }) {
    return (
        <div className="problem-item" onClick={() => onClick(problem)}>
            <div>
                <h3>{problem.title}</h3>
                <p>Category: {problem.category}</p>
                <p>Points: {problem.points}</p>
                <p>Difficulty: {problem.difficulty}</p>
            </div>
            <div>
                <p>Acceptance Rate: {problem.acceptanceRate}</p>
                <p>Users Solved: {problem.usersSolved}</p>
            </div>
        </div>
    );
}

export default ProblemItem;