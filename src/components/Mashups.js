import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Mashups.css"

function Mashups() {
  const navigate = useNavigate()
  const [problems, setProblems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedProblems, setSelectedProblems] = useState([])
  const [mashupName, setMashupName] = useState("")
  const [timeHours, setTimeHours] = useState(1)
  const [timeMinutes, setTimeMinutes] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState("all")

  // Load problems from the archive
  useEffect(() => {
    const loadProblems = async () => {
      try {
        setLoading(true)

        // Try to fetch problems_index.json first
        try {
          const indexResponse = await fetch("/problem_index.json")
          if (indexResponse.ok) {
            const problemIds = await indexResponse.json()
            const loadedProblems = await Promise.all(
              problemIds.map(async (id) => {
                try {
                  const response = await fetch(`/problems/${id}.json`)
                  if (!response.ok) {
                    console.error(`Problem ${id} not found`)
                    return null
                  }
                  const problem = await response.json()
                  return { ...problem, id }
                } catch (err) {
                  console.error(`Error loading problem ${id}:`, err)
                  return null
                }
              }),
            )
            setProblems(loadedProblems.filter((p) => p !== null))
            setLoading(false)
            return
          }
        } catch (indexError) {
          console.log("No index file found, trying to load individual problems")
        }

        // Fallback: Try to load a few common problem IDs
        console.log("Using fallback method to load problems")
        const problemIds = ["1", "2"]
        const loadedProblems = await Promise.all(
          problemIds.map(async (id) => {
            try {
              const response = await fetch(`/problems/${id}.json`)
              if (!response.ok) {
                console.log(`Problem ${id} not found`)
                return null
              }
              const problem = await response.json()
              return { ...problem, id }
            } catch (err) {
              console.error(`Error loading problem ${id}:`, err)
              return null
            }
          }),
        )

        // Filter out nulls (problems that couldn't be loaded)
        const validProblems = loadedProblems.filter((p) => p !== null)
        setProblems(validProblems)

        if (validProblems.length === 0) {
          setError("No problems found. Please make sure problem files exist in the /public/problems/ directory.")
        }
      } catch (err) {
        setError("Failed to load problems. Make sure problems are in the /public/problems directory.")
        console.error("Error loading problems:", err)
      } finally {
        setLoading(false)
      }
    }

    loadProblems()
  }, [])

  // Convert numeric difficulty to text
  const getDifficultyText = (difficulty) => {
    if (isNaN(Number(difficulty))) return difficulty

    const diffNum = Number(difficulty)
    if (diffNum <= 2) return "Really Easy"
    if (diffNum <= 4) return "Easy"
    if (diffNum <= 6) return "Normal"
    if (diffNum <= 7) return "Hard"
    if (diffNum <= 9) return "Very Hard"
    return "Godly"
  }

  // Handle problem selection
  const toggleProblemSelection = (problem) => {
    if (selectedProblems.some((p) => p.id === problem.id)) {
      setSelectedProblems(selectedProblems.filter((p) => p.id !== problem.id))
    } else {
      setSelectedProblems([...selectedProblems, problem])
    }
  }

  // Handle search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase())
  }

  // Handle difficulty filter change
  const handleDifficultyChange = (e) => {
    setDifficultyFilter(e.target.value)
  }

  // Filter problems based on search and difficulty
  const filteredProblems = problems.filter((problem) => {
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm)
    const problemDifficultyText = getDifficultyText(problem.difficulty)
    const matchesDifficulty = difficultyFilter === "all" || problemDifficultyText === difficultyFilter
    return matchesSearch && matchesDifficulty
  })

  // Start the mashup
  const startMashup = () => {
    if (selectedProblems.length === 0) {
      alert("Please select at least one problem for the mashup.")
      return
    }

    if (!mashupName.trim()) {
      alert("Please enter a name for the mashup.")
      return
    }

    // Calculate total time in minutes
    const totalTimeMinutes = timeHours * 60 + timeMinutes

    if (totalTimeMinutes <= 0) {
      alert("Please set a valid time for the mashup.")
      return
    }

    // Create mashup object
    const mashup = {
      id: Date.now().toString(),
      name: mashupName,
      problems: selectedProblems,
      totalTimeMinutes,
      createdAt: new Date().toISOString(),
    }

    // Save mashup to localStorage
    const savedMashups = JSON.parse(localStorage.getItem("mashups") || "[]")
    localStorage.setItem("mashups", JSON.stringify([...savedMashups, mashup]))

    // Save active mashup
    localStorage.setItem("activeMashup", JSON.stringify({
      ...mashup,
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + totalTimeMinutes * 60 * 1000).toISOString()
    }))

    // Navigate to the active mashup page
    navigate(`/active-mashup/${mashup.id}`)
  }

  return (
    <div className="mashups-container">
      <h2>Create Problem Mashup</h2>

      <div className="mashup-creator">
        <div className="mashup-form">
          <div className="form-group">
            <label htmlFor="mashup-name">Mashup Name:</label>
            <input
              type="text"
              id="mashup-name"
              value={mashupName}
              onChange={(e) => setMashupName(e.target.value)}
              placeholder="Enter mashup name"
              required
            />
          </div>

          <div className="form-group time-selector">
            <label>Time Limit:</label>
            <div className="time-inputs">
              <div className="time-input">
                <input
                  type="number"
                  min="0"
                  max="24"
                  value={timeHours}
                  onChange={(e) => setTimeHours(parseInt(e.target.value) || 0)}
                />
                <span>hours</span>
              </div>
              <div className="time-input">
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={timeMinutes}
                  onChange={(e) => setTimeMinutes(parseInt(e.target.value) || 0)}
                />
                <span>minutes</span>
              </div>
            </div>
          </div>

          <div className="selected-problems">
            <h3>Selected Problems ({selectedProblems.length})</h3>
            {selectedProblems.length === 0 ? (
              <p className="no-problems-selected">No problems selected yet</p>
            ) : (
              <ul className="selected-problems-list">
                {selectedProblems.map((problem) => (
                  <li key={problem.id} className="selected-problem-item">
                    <span className="problem-title">{problem.title}</span>
                    <span className="problem-difficulty">{getDifficultyText(problem.difficulty)}</span>
                    <button
                      className="remove-problem-btn"
                      onClick={() => toggleProblemSelection(problem)}
                      aria-label="Remove problem"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            className="start-mashup-btn"
            onClick={startMashup}
            disabled={selectedProblems.length === 0 || !mashupName.trim() || (timeHours === 0 && timeMinutes === 0)}
          >
            Start Mashup
          </button>
        </div>

        <div className="problem-selector">
          <h3>Select Problems</h3>

          <div className="problem-filters">
            <div className="filter-group">
              <input
                type="text"
                placeholder="Search problems..."
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
              />
            </div>
            <div className="filter-group">
              <select
                value={difficultyFilter}
                onChange={handleDifficultyChange}
                className="difficulty-select"
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
          </div>

          {loading ? (
            <div className="loading">Loading problems...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : filteredProblems.length === 0 ? (
            <div className="no-problems">No problems found matching your criteria.</div>
          ) : (
            <div className="problem-list">
              {filteredProblems.map((problem) => {
                const isSelected = selectedProblems.some((p) => p.id === problem.id)
                return (
                  <div
                    key={problem.id}
                    className={`problem-item ${isSelected ? "selected" : ""}`}
                    onClick={() => toggleProblemSelection(problem)}
                  >
                    <div className="problem-info">
                      <h4 className="problem-title">{problem.title}</h4>
                      <div className="problem-meta">
                        <span
                          className="difficulty-badge"
                          style={{
                            backgroundColor:
                              problem.difficulty <= 2
                                ? "#4CAF50"
                                : problem.difficulty <= 4
                                  ? "#8BC34A"
                                  : problem.difficulty <= 6
                                    ? "#FFC107"
                                    : problem.difficulty <= 7
                                      ? "#FF9800"
                                      : problem.difficulty <= 9
                                        ? "#F44336"
                                        : "#9C27B0",
                            color: "white",
                          }}
                        >
                          {getDifficultyText(problem.difficulty)}
                        </span>
                        {problem.tags && (
                          <span className="problem-tags">
                            {problem.tags.slice(0, 2).join(", ")}
                            {problem.tags.length > 2 && "..."}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="selection-indicator">
                      {isSelected ? "✓" : "+"}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Mashups