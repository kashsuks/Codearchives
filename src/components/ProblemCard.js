"use client"
import { Star } from "lucide-react"

function ProblemCard({ problem, onClick, onStarToggle, isStarred }) {
  // Function to get color based on difficulty
  const getDifficultyColor = (difficulty) => {
    // Convert difficulty to text if it's a number
    let diffText = difficulty
    if (!isNaN(Number(difficulty))) {
      const diffNum = Number(difficulty)
      if (diffNum <= 2) diffText = "Really Easy"
      else if (diffNum <= 4) diffText = "Easy"
      else if (diffNum <= 6) diffText = "Normal"
      else if (diffNum <= 7) diffText = "Hard"
      else if (diffNum <= 9) diffText = "Very Hard"
      else diffText = "Godly"
    }

    // Color mapping for text difficulties
    const colors = {
      "Really Easy": "#90EE90", // Light green
      Easy: "#7FBF7F",
      Normal: "#4C8F4C",
      Hard: "#3B7F3B",
      "Very Hard": "#195F19",
      Godly: "#FFD700", // Gold
    }
    return colors[diffText] || "#808080"
  }

  // Function to get text color based on background color
  const getTextColor = (backgroundColor) => {
    // For light backgrounds, use dark text
    if (["#90EE90", "#7FBF7F"].includes(backgroundColor)) {
      return "#000000"
    }
    // For gold (Godly), use dark text
    if (backgroundColor === "#FFD700") {
      return "#000000"
    }
    // For darker backgrounds, use white text
    return "#FFFFFF"
  }

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

  const difficultyText = getDifficultyText(problem.difficulty)
  const difficultyColor = getDifficultyColor(problem.difficulty)
  const textColor = getTextColor(difficultyColor)

  const handleStarClick = (e) => {
    e.stopPropagation() // Prevent card click event
    onStarToggle(problem.id)
  }

  return (
    <div
      className="problem-card"
      onClick={onClick}
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "16px",
        cursor: "pointer",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        position: "relative", // For absolute positioning of star
      }}
    >
      <button
        onClick={handleStarClick}
        className="star-button"
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "none",
          border: "none",
          cursor: "pointer",
          opacity: 1, // Always visible
          padding: "5px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2, // Ensure it's above other content
        }}
        aria-label={isStarred ? "Unstar problem" : "Star problem"}
      >
        <Star size={20} fill={isStarred ? "#FFD700" : "none"} color={isStarred ? "#FFD700" : "#999"} />
      </button>

      <h3 style={{ marginTop: 0, marginBottom: "12px" }}>{problem.title}</h3>

      {problem.tags && problem.tags.length > 0 && (
        <div className="topics-section" style={{ marginBottom: "12px" }}>
          <h4 style={{ margin: "0 0 8px 0", fontSize: "14px", color: "#666" }}>Topics:</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {problem.tags.map((tag, index) => (
              <span
                key={index}
                style={{
                  color: "#007bff",
                  fontSize: "14px",
                }}
              >
                {tag.trim()}
                {index < problem.tags.length - 1 ? ", " : ""}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="difficulty-section">
        <span
          className="difficulty-badge"
          style={{
            backgroundColor: difficultyColor,
            color: textColor,
            padding: "4px 8px",
            borderRadius: "4px",
            display: "inline-block",
            fontWeight: "bold",
          }}
        >
          {difficultyText}
        </span>
      </div>
    </div>
  )
}

export default ProblemCard
