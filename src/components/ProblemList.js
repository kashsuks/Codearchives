// components/ProblemList.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProblemList({ problems }) {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const problemArray = Object.values(problems);

    const filteredProblems = problemArray.filter(problem =>
        problem.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="problem-list" style={{ display: 'flex', padding: '20px' }}>
            <div style={{ flex: 3 }}>
                <div style={{ width: '100%', overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #333', minWidth: '800px' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#1e1e1e', borderBottom: '2px solid #333' }}>
                                <th style={{ padding: '15px', textAlign: 'left', fontWeight: 'bold', color: '#89cff0' }}>Title</th>
                                <th style={{ padding: '15px', textAlign: 'left', fontWeight: 'bold', color: '#89cff0' }}>Category</th>
                                <th style={{ padding: '15px', textAlign: 'left', fontWeight: 'bold', color: '#89cff0' }}>Points</th>
                                <th style={{ padding: '15px', textAlign: 'left', fontWeight: 'bold', color: '#89cff0' }}>Difficulty</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProblems.map(problem => (
                                <tr key={problem.id} style={{ borderBottom: '1px solid #333', cursor: 'pointer', transition: 'background-color 0.3s' }} onClick={() => navigate(`/problems/${problem.id}`)} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2a2a2a'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                    <td style={{ padding: '15px' }}>{problem.title}</td>
                                    <td style={{ padding: '15px' }}>{problem.category}</td>
                                    <td style={{ padding: '15px' }}>{problem.points}</td>
                                    <td style={{ padding: '15px' }}>{problem.difficulty}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div style={{ flex: 1, paddingLeft: '20px' }}>
                <div style={{ marginBottom: '20px' }}>
                    <input
                        type="text"
                        placeholder="Search problems..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ padding: '10px', borderRadius: '5px', border: '1px solid #333', backgroundColor: '#2a2a2a', color: '#e0e0e0', width: '300px' }}
                    />
                </div>
            </div>
        </div>
    );
}

export default ProblemList;