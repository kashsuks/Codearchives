"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import ProblemCard from "./ProblemCard"

function ProblemArchive() {
  const [problems, setProblems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState("all")
  const [selectedTags, setSelectedTags] = useState([])
  const [tagFilter, setTagFilter] = useState("all")
  const [starredFilter, setStarredFilter] = useState(false)
  const [starredProblems, setStarredProblems] = useState([])
  const navigate = useNavigate()

  // Load starred problems from localStorage on initial mount only
  useEffect(() => {
    const loadStarredProblems = () => {
      try {
        const saved = localStorage.getItem("starredProblems")
        if (saved) {
          const parsed = JSON.parse(saved)
          console.log("Loaded starred problems:", parsed)
          setStarredProblems(parsed)
        }
      } catch (err) {
        console.error("Error loading starred problems from localStorage:", err)
      }
    }

    loadStarredProblems()
  }, []) // Empty dependency array ensures this runs only once on mount

  // Save starred problems to localStorage whenever they change
  useEffect(() => {
    try {
      console.log("Saving starred problems:", starredProblems)
      localStorage.setItem("starredProblems", JSON.stringify(starredProblems))
    } catch (err) {
      console.error("Error saving starred problems to localStorage:", err)
    }
  }, [starredProblems]) // This will run whenever starredProblems changes

  // Function to list all problems in the /public/problems directory
  const loadProblems = async () => {
    try {
      setLoading(true)

      // We'll try to fetch problems_index.json first which should contain a list of problem IDs
      try {
        const indexResponse = await fetch("/problems_index.json")
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

      // If no index file, try to load problems directly
      // First, try to get a list of problems from the server
      try {
        // Try to fetch a list of problems from the server
        const response = await fetch("/api/problems")
        if (response.ok) {
          const problemIds = await response.json()
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
      } catch (apiError) {
        console.log("API endpoint not available, using fallback method")
      }

      // Fallback: Try to load a few common problem IDs
      console.log("Using fallback method to load problems")
      const problemIds = ["problem1", "problem2", "problem3", "1", "2", "3", "4"]
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

  useEffect(() => {
    loadProblems()
  }, [])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase())
  }

  const handleDifficultyChange = (e) => {
    setDifficultyFilter(e.target.value)
  }

  const handleTagFilterChange = (e) => {
    const selectedTag = e.target.value
    setTagFilter(selectedTag)

    if (selectedTag === "all") {
      setSelectedTags([])
    } else {
      setSelectedTags([selectedTag])
    }
  }

  const handleStarredFilterChange = (e) => {
    setStarredFilter(e.target.checked)
  }

  const handleProblemClick = (problemId) => {
    navigate(`/problem/${problemId}`)
  }

  const handleStarToggle = (problemId) => {
    setStarredProblems((prev) => {
      // Create a new array to ensure React detects the state change
      if (prev.includes(problemId)) {
        return prev.filter((id) => id !== problemId)
      } else {
        return [...prev, problemId]
      }
    })
  }

  // Get all unique tags from problems
  const allTags = [...new Set(problems.flatMap((problem) => problem.tags || []))].sort()

  // Convert numeric difficulty to text for filtering
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

  const filteredProblems = problems.filter((problem) => {
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm)
    const problemDifficultyText = getDifficultyText(problem.difficulty)
    const matchesDifficulty = difficultyFilter === "all" || problemDifficultyText === difficultyFilter
    const matchesTags =
      selectedTags.length === 0 || (problem.tags && selectedTags.every((tag) => problem.tags.includes(tag)))
    const matchesStarred = !starredFilter || starredProblems.includes(problem.id)
    return matchesSearch && matchesDifficulty && matchesTags && matchesStarred
  })

  return (
    <section id="archive" className="page">
      <h2>Codearchives</h2>

      <div
        className="filters-container"
        style={{
          marginBottom: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          alignItems: "flex-end",
        }}
      >
        <div className="filter-section" style={{ flex: "1 1 200px" }}>
          <label
            htmlFor="search-input"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            Filter by Name:
          </label>
          <input
            type="text"
            id="search-input"
            placeholder="Search problems..."
            value={searchTerm}
            onChange={handleSearch}
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ddd",
              width: "100%",
            }}
          />
        </div>

        <div className="filter-section" style={{ flex: "1 1 200px" }}>
          <label
            htmlFor="difficulty-filter"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            Filter by Difficulty:
          </label>
          <select
            id="difficulty-filter"
            value={difficultyFilter}
            onChange={handleDifficultyChange}
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ddd",
              width: "100%",
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

        <div className="filter-section" style={{ flex: "1 1 200px" }}>
          <label
            htmlFor="tag-filter"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            Filter by Topic:
          </label>
          <select
            id="tag-filter"
            value={tagFilter}
            onChange={handleTagFilterChange}
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ddd",
              width: "100%",
            }}
          >
            <option value="all">All Topics</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-section" style={{ flex: "1 1 200px" }}>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              marginTop: "24px", // Align with other filters
            }}
          >
            <input
              type="checkbox"
              id="starred-filter"
              checked={starredFilter}
              onChange={handleStarredFilterChange}
              style={{
                width: "18px",
                height: "18px",
              }}
            />
            <span style={{ fontWeight: "bold" }}>Show Starred Only</span>
          </label>
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
              onClick={() => handleProblemClick(problem.id)}
              onStarToggle={handleStarToggle}
              isStarred={starredProblems.includes(problem.id)}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default ProblemArchive