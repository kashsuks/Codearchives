import React, { useState, useEffect } from 'react';
import ProblemCard from './ProblemCard';

function ProblemArchive({ onProblemSelect }) {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [selectedTags, setSelectedTags] = useState([]);

  // Function to list all problems in the /public/problems directory
  const loadProblems = async () => {
    try {
      setLoading(true);
      
      // We'll try to fetch problems_index.json first which should contain a list of problem IDs
      try {
        const indexResponse = await fetch('/problems_index.json');
        if (indexResponse.ok) {
          const problemIds = await indexResponse.json();
          const loadedProblems = await Promise.all(
            problemIds.map(async (id) => {
              try {
                const response = await fetch(`/problems/${id}.json`);
                if (!response.ok) {
                  console.error(`Problem ${id} not found`);
                  return null;
                }
                const problem = await response.json();
                return { ...problem, id };
              } catch (err) {
                console.error(`Error loading problem ${id}:`, err);
                return null;
              }
            })
          );
          setProblems(loadedProblems.filter(p => p !== null));
          setLoading(false);
          return;
        }
      } catch (indexError) {
        console.log('No index file found, trying to load individual problems');
      }

      // If no index file, use hardcoded problem IDs to try
      const problemIds = ['problem1', 'problem2', 'problem3'];
      const loadedProblems = await Promise.all(
        problemIds.map(async (id) => {
          try {
            const response = await fetch(`/problems/${id}.json`);
            if (!response.ok) {
              console.log(`Problem ${id} not found`);
              return null;
            }
            const problem = await response.json();
            return { ...problem, id };
          } catch (err) {
            console.error(`Error loading problem ${id}:`, err);
            return null;
          }
        })
      );
      
      // Filter out nulls (problems that couldn't be loaded)
      setProblems(loadedProblems.filter(p => p !== null));
    } catch (err) {
      setError('Failed to load problems. Make sure problems are in the /public/problems directory.');
      console.error('Error loading problems:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProblems();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleDifficultyChange = (e) => {
    setDifficultyFilter(e.target.value);
  };

  const handleTagClick = (tag) => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) {
        return prev.filter(t => t !== tag);
      }
      return [...prev, tag];
    });
  };

  // Get all unique tags from problems
  const allTags = [...new Set(problems.flatMap(problem => problem.tags || []))].sort();

  // Convert numeric difficulty to text for filtering
  const getDifficultyText = (difficulty) => {
    if (isNaN(Number(difficulty))) return difficulty;
    
    const diffNum = Number(difficulty);
    if (diffNum <= 2) return "Really Easy";
    if (diffNum <= 4) return "Easy";
    if (diffNum <= 6) return "Normal";
    if (diffNum <= 7) return "Hard";
    if (diffNum <= 9) return "Very Hard";
    return "Godly";
  };

  const filteredProblems = problems.filter((problem) => {
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm);
    const problemDifficultyText = getDifficultyText(problem.difficulty);
    const matchesDifficulty = difficultyFilter === 'all' || 
                             problemDifficultyText === difficultyFilter;
    const matchesTags = selectedTags.length === 0 || 
                       (problem.tags && selectedTags.every(tag => problem.tags.includes(tag)));
    return matchesSearch && matchesDifficulty && matchesTags;
  });

  return (
    <section id="archive" className="page">
      <h2>Problem Archive</h2>
      
      <div className="filters-container" style={{ marginBottom: '20px' }}>
        <div className="filter-section" style={{ marginBottom: '16px' }}>
          <h4 style={{ margin: '0 0 8px 0' }}>Filter by Name:</h4>
          <input
            type="text"
            id="search-input"
            placeholder="Search problems..."
            value={searchTerm}
            onChange={handleSearch}
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              width: '100%',
              maxWidth: '300px'
            }}
          />
        </div>
        
        <div className="filter-section" style={{ marginBottom: '16px' }}>
          <h4 style={{ margin: '0 0 8px 0' }}>Filter by Difficulty:</h4>
          <select 
            id="difficulty-filter" 
            value={difficultyFilter}
            onChange={handleDifficultyChange}
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              width: '100%',
              maxWidth: '300px'
            }}
          >
            <option value="all">All Difficulties</option>
            <option value="Really Easy">Really Easy</option>
            <option value="Easy">Easy</option>
            <option value="Normal">Normal</option>
            <option value="Hard">Hard</option>
            <option value="Very Hard">Very Hard</option>
            <option value="Godly">Godly</option>
          </select>
        </div>

        <div className="filter-section">
          <h4 style={{ margin: '0 0 8px 0' }}>Filter by Topic:</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                style={{
                  backgroundColor: selectedTags.includes(tag) ? '#0056b3' : '#007bff',
                  color: '#ffffff',
                  border: 'none',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading problems...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : filteredProblems.length === 0 ? (
        <div className="no-problems">No problems found matching your criteria.</div>
      ) : (
        <div id="problem-list">
          {filteredProblems.map((problem) => (
            <ProblemCard 
              key={problem.id} 
              problem={problem} 
              onClick={() => onProblemSelect(problem)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default ProblemArchive;