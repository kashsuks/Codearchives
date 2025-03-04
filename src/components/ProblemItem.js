import React from 'react';

function ProblemItem({ problem, onClick }) {
    return (
        <div className="problem-item" onClick={() => onClick(problem)}>
            <div>
                <h3>{problem.title}</h3>
                <p>Category: {problem.category}</p>
                <p>Points: {problem.points}</p>
                <p>Difficulty: {problem.difficulty}</p> {/* You can keep this if needed */}
            </div>
            <div>
                <p>Acceptance Rate: {problem.acceptanceRate}</p> {/* You can keep this if needed */}
                <p>Users Solved: {problem.usersSolved}</p> {/* You can keep this if needed */}
            </div>
        </div>
    );
}

export default ProblemItem;