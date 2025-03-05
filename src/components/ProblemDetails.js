// components/ProblemDetails.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ProblemDetails({ problems }) {
    const { problemId } = useParams();
    const navigate = useNavigate();

    const problem = problems[problemId];

    if (!problem) {
        return <div>Problem not found</div>;
    }

    const handleBackToList = () => {
        navigate('/problems');
    }

    return (
        <div>
            <button onClick={handleBackToList} style={{ display: 'flex', height: '3em', width: '100px', alignItems: 'center', justifyContent: 'center', backgroundColor: '#89cff0', borderRadius: '3px', letterSpacing: '1px', transition: 'all 0.2s linear', cursor: 'pointer', border: 'none', color: '#121212', margin: '20px' }}>
                <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
                <span>Back</span>
            </button>
            <div className="problem-details">
                <div className="problem-sections">
                    <h2>{problem.title}</h2>
                    <div className="problem-section">
                        <h3>Input Specification</h3>
                        <p>{problem.inputSpecification}</p>
                    </div>

                    <div className="problem-section">
                        <h3>Output Specification</h3>
                        <p>{problem.outputSpecification}</p>
                    </div>

                    <div className="problem-section">
                        <h3>Constraints</h3>
                        <p>{problem.constraints}</p>
                    </div>

                    <div className="problem-section">
                        <h3>Subtasks</h3>
                        {problem.subtasks && problem.subtasks.map((subtask, index) => (
                            <div key={index}>
                                <h4>{subtask.title}</h4>
                                <p>{subtask.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="problem-section">
                        <h3>Sample Input</h3>
                        <pre className="code-block">{problem.sampleInput}</pre>
                    </div>

                    <div className="problem-section">
                        <h3>Sample Output</h3>
                        <pre className="code-block">{problem.sampleOutput}</pre>
                    </div>
                </div>
                <div className="problem-sidebar">
                    <div className="problem-meta">
                        <button className="view-pdf">View as PDF</button>
                        <button className="submit-solution">Submit Solution</button>
                    </div>

                    <div className="sidebar-section">
                        <h3>All submissions</h3>
                        <p>Best submissions</p>
                        <p>Voting statistics</p>
                    </div>

                    <div className="sidebar-section">
                        <p>Points: {problem.points} (partial)</p>
                        <p>Time limit: {problem.timeLimit}</p>
                        <p>Memory limit: {problem.memoryLimit}</p>
                    </div>

                    <div className="sidebar-section">
                        <p>Author: {problem.author}</p>
                        <p>Problem type: {problem.problemType}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProblemDetails;