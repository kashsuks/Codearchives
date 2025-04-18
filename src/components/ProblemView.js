import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import './ProblemView.css';

function ProblemView() {
  const { problemId } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState(null);
  const [showFileContent, setShowFileContent] = useState(false);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/problems/${problemId}.json`);
        if (!response.ok) {
          throw new Error('Problem not found');
        }
        const data = await response.json();
        setProblem(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProblem();
  }, [problemId]);

  const handleBackClick = () => {
    navigate('/problems');
  };

  // Convert numeric difficulty to text
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

  // Format notes with proper line breaks and support for Markdown and equations
  const formatNotes = (notes) => {
    if (!notes) return '';
    
    // Process the notes to handle equations and Markdown
    const processedNotes = notes.split('\\n').map(line => {
      // Replace LaTeX-style equations with KaTeX components
      // Inline equations: $...$
      // Block equations: $$...$$
      return line.replace(/\$\$(.*?)\$\$/g, (match, equation) => {
        try {
          return `<BlockMath math={${JSON.stringify(equation)}} />`;
        } catch (e) {
          console.error('Error parsing block equation:', e);
          return match;
        }
      }).replace(/\$(.*?)\$/g, (match, equation) => {
        try {
          return `<InlineMath math={${JSON.stringify(equation)}} />`;
        } catch (e) {
          console.error('Error parsing inline equation:', e);
          return match;
        }
      });
    }).join('\n');
    
    return (
      <ReactMarkdown
        components={{
          // Custom renderer for code blocks (backticks)
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <code className={className} {...props}>
                {children}
              </code>
            ) : (
              <code className="variable-highlight" {...props}>
                {children}
              </code>
            );
          },
          // Custom renderer for paragraphs to handle equations
          p: ({ children }) => {
            // Check if the paragraph contains an equation component
            const hasEquation = React.Children.toArray(children).some(
              child => typeof child === 'string' && (child.includes('<InlineMath') || child.includes('<BlockMath'))
            );
            
            if (hasEquation) {
              // Parse and render equations
              const content = React.Children.toArray(children).map(child => {
                if (typeof child === 'string') {
                  // Replace equation placeholders with actual components
                  return child
                    .replace(/<InlineMath math={"(.*?)"} \/>/g, (_, equation) => (
                      <InlineMath key={Math.random()} math={equation} />
                    ))
                    .replace(/<BlockMath math={"(.*?)"} \/>/g, (_, equation) => (
                      <BlockMath key={Math.random()} math={equation} />
                    ));
                }
                return child;
              });
              return <p>{content}</p>;
            }
            
            return <p>{children}</p>;
          }
        }}
      >
        {processedNotes}
      </ReactMarkdown>
    );
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      
      // Read the file content
      const reader = new FileReader();
      reader.onload = (event) => {
        setFileContent(event.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = () => {
    if (selectedFile && fileContent) {
      // For now, just show the file content
      setShowFileContent(true);
      
      // In the future, this will redirect to a status page
      // navigate(`/submission-status/${problemId}`);
    }
  };

  if (loading) {
    return <div className="loading">Loading problem...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <button onClick={handleBackClick}>Back to Problems</button>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="error">
        <p>Problem not found</p>
        <button onClick={handleBackClick}>Back to Problems</button>
      </div>
    );
  }

  return (
    <div className="problem-view">
      <div className="problem-header">
        <div className="header-content">
          <h1 className="problem-title">{problem.title}</h1>
          <div className="submit-section">
            <h3>Submit Solution</h3>
            <div className="file-upload">
              <input
                type="file"
                id="python-file"
                accept=".py"
                onChange={handleFileSelect}
              />
              <div className="submit-controls">
                <label htmlFor="python-file" className="file-upload-label">
                  {selectedFile ? 'Submit' : 'Choose Python File'}
                </label>
                {selectedFile && (
                  <>
                    <span className="selected-file-name">{selectedFile.name}</span>
                    <button 
                      className="submit-button"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="problem-limits">
          <span>Time Limit: {problem.timeLimit || '1s'}</span>
          <span>Memory Limit: {problem.memoryLimit || '256MB'}</span>
        </div>
        <div className="problem-meta">
          <span className="difficulty" style={{ 
            backgroundColor: problem.difficulty <= 2 ? '#4CAF50' : 
                           problem.difficulty <= 4 ? '#8BC34A' : 
                           problem.difficulty <= 6 ? '#FFC107' : 
                           problem.difficulty <= 7 ? '#FF9800' : 
                           problem.difficulty <= 9 ? '#F44336' : '#9C27B0',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '0.9em'
          }}>
            {getDifficultyText(problem.difficulty)}
          </span>
          <span className="problem-id">Problem #{problem.id}</span>
        </div>
      </div>

      <div className="problem-content">
        <div className="problem-description">
          <h2>Description</h2>
          <ReactMarkdown>{problem.description}</ReactMarkdown>
        </div>

        <div className="problem-input">
          <h2>Input Specification</h2>
          <ReactMarkdown>{problem.inputSpec}</ReactMarkdown>
        </div>

        <div className="problem-output">
          <h2>Output Specification</h2>
          <ReactMarkdown>{problem.outputSpec}</ReactMarkdown>
        </div>

        <div className="problem-samples">
          <h2>Sample Test Cases</h2>
          {problem.samples.map((sample, index) => (
            <div key={index} className="sample-case">
              <h3>Sample {index + 1}</h3>
              <div className="sample-input">
                <h4>Input:</h4>
                <pre>{sample.input}</pre>
              </div>
              <div className="sample-output">
                <h4>Output:</h4>
                <pre>{sample.output}</pre>
              </div>
            </div>
          ))}
        </div>

        {problem.image && (
          <div className="problem-image">
            <h2>Visual Explanation</h2>
            <img 
              src={`/assets/problems/${problem.image}`} 
              alt={`Visual explanation for ${problem.title}`}
              className="problem-visual"
            />
          </div>
        )}

        <div className="problem-notes">
          <h2>Notes</h2>
          <div style={{ whiteSpace: 'pre-wrap' }}>
            {formatNotes(problem.notes)}
          </div>
        </div>
      </div>

      {showFileContent && fileContent && (
        <div className="file-content-preview">
          <h3>File Content Preview</h3>
          <pre>{fileContent}</pre>
        </div>
      )}

      <button onClick={handleBackClick} className="back-button">
        Back to Problems
      </button>
    </div>
  );
}

export default ProblemView;