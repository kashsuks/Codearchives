# Problem Archive

A simple problem archive system similar to DMOJ, built with Next.js and TypeScript.

## Features

- Browse and search programming problems
- View problem details including description, input/output specifications, and sample cases
- Simple problem creation through markdown files
- Contest functionality (coming soon)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Creating Problems

To create a new problem, simply add a markdown file to the `problems` directory with the following format:

```markdown
---
id: P001
title: Problem Title
timeLimit: 1.0s
spaceLimit: 256MB
---

# Description
Problem description goes here...

# Input Specification
Input specification details...

# Output Specification
Output specification details...

# Sample Input 1
Sample input data...

# Sample Output 1
Sample output data...

# Notes
Additional notes or constraints...
```

The file should be named with the problem ID (e.g., `P001.md`).

## Project Structure

- `app/` - Next.js application code
- `problems/` - Problem markdown files
- `app/utils/` - Utility functions for parsing problems
- `app/components/` - Reusable React components

## Technologies Used

- Next.js
- TypeScript
- Tailwind CSS
- gray-matter (for parsing markdown frontmatter)
