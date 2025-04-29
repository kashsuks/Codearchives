import React, { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import "./ActiveMashup.css"

function ActiveMashup() {
  const { mashupId } = useParams()
  const navigate = useNavigate()
  const [activeMashup, setActiveMashup] = useState(null)
  const [timeRemaining, setTimeRemaining] = useState(null)
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0)

  useEffect(() => {
    // Load active mashup from localStorage
    const storedActiveMashup = localStorage.getItem("activeMashup")
    
    if (!storedActiveMashup) {
      navigate("/mashups")
      return
    }
    
    const mashup = JSON.parse(storedActiveMashup)
    
    // Check if this is the correct mashup
    if (mashup.id !== mashupId) {
      navigate("/mashups")
      return
    }
    
    setActiveMashup(mashup)
    
    // Calculate initial time remaining
    const endTime = new Date(mashup.endTime).getTime()
    const now = Date.now()
    const initialTimeRemaining = Math.max(0, Math.floor((endTime - now) / 1000))
    setTimeRemaining(initialTimeRemaining)
    
    // Set up timer
    const timer = setInterval(() => {
      setTimeRemaining(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)
    
    return () => clearInterval(timer)
  }, [mashupId, navigate])
  
  // Format time remaining as HH:MM:SS
  const formatTimeRemaining = (seconds) => {
    if (seconds === null) return "--:--:--"
    
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    
    return [
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      secs.toString().padStart(2, "0")
    ].join(":")
  }
  
  // Navigate to a specific problem
  const goToProblem = (index) => {
    setCurrentProblemIndex(index)
  }
  
  // End the mashup early
  const endMashup = () => {
    if (window.confirm("Are you sure you want to end this mashup? This action cannot be undone.")) {
      localStorage.removeItem("activeMashup")
      navigate("/mashups")
    }
  }
  
  if (!activeMashup) {
    return <div className="loading">Loading mashup...</div>
  }
  
  const currentProblem = activeMashup.problems[currentProblemIndex]
  
  return (
    <div className="active-mashup-container">
      <div className="mashup-header">
        <h2>{activeMashup.name}</h2>
        <div className="mashup-meta">
          <span>Problems: {activeMashup.problems.length}</span>
          <span>Total Time: {Math.floor(activeMashup.totalTimeMinutes / 60)}h {activeMashup.totalTimeMinutes % 60}m</span>
        </div>
      </div>
      
      <div className="mashup-content">
        <div className="problem-navigation">
          <h3>Problems</h3>
          <div className="problem-list">
            {activeMashup.problems.map((problem, index) => (
              <div 
                key={problem.id}
                className={`problem-nav-item ${index === currentProblemIndex ? 'active' : ''}`}
                onClick={() => goToProblem(index)}
              >
                <span className="problem-number">{index + 1}</span>
                <span className="problem-title">{problem.title}</span>
              </div>
            ))}
          </div>
          
          <button className="end-mashup-btn" onClick={endMashup}>
            End Mashup
          </button>
        </div>
        
        <div className="problem-display">
          {currentProblem && (
            <>
              <div className="problem-header">
                <h3>{currentProblem.title}</h3>
                <div className="problem-meta">
                  <span>Difficulty: {
                    (() => {
                      const difficulty = currentProblem.difficulty;
                      if (difficulty <= 2) return "Really Easy";
                      if (difficulty <= 4) return "Easy";
                      if (difficulty <= 6) return "Normal";
                      if (difficulty <= 7) return "Hard";
                      if (difficulty <= 9) return "Very Hard";
                      return "Godly";
                    })()
                  }</span>
                  <span>Time Limit: {currentProblem.timeLimit || "1s"}</span>
                  <span>Memory Limit: {currentProblem.memoryLimit || "256MB"}</span>
                </div>
              </div>
              
              <div className="problem-content">
                <div className="problem-section">
                  <h4>Description</h4>
                  <p>{currentProblem.description}</p>
                </div>
                
                <div className="problem-section">
                  <h4>Input Specification</h4>
                  <p>{currentProblem.inputSpec}</p>
                </div>
                
                <div className="problem-section">
                  <h4>Output Specification</h4>
                  <p>{currentProblem.outputSpec}</p>
                </div>
                
                <div className="problem-section">
                  <h4>Sample Test Cases</h4>
                  {currentProblem.samples.map((sample, index) => (
                    <div key={index} className="sample-case">
                      <div className="sample-input">
                        <h5>Input:</h5>
                        <pre>{sample.input}</pre>
                      </div>
                      <div className="sample-output">
                        <h5>Output:</h5>
                        <pre>{sample.output}</pre>
                      </div>
                    </div>
                  ))}
                </div>
                
                {currentProblem.notes && (
                  <div className="problem-section">
                    <h4>Notes</h4>
                    <p>{currentProblem.notes}</p>
                  </div>
                )}
                
                {currentProblem.image && (
                  <div className="problem-section">
                    <h4>Visual Explanation</h4>
                    <img 
                      src={`/assets/problems/${currentProblem.image}`} 
                      alt={`Visual explanation for ${currentProblem.title}`}
                      className="problem-image"
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      
      <div className="mashup-timer">
        <div className="timer-content">
          {activeMashup.name} - {formatTimeRemaining(timeRemaining)}
        </div>
      </div>
    </div>
  )
}

export default ActiveMashup