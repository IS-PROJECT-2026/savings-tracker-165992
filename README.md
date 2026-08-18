# Savings Tracking System

A full-stack financial tracking application designed to help users organize their capital, visualize progress, and reach financial milestones. Built as a final-year academic project for Strathmore University.

## 🚀 Features

*   **Persuasive Landing Page:** A seamless, distraction-free entry point that transitions instantly to the main application without requiring user authentication.
*   **Dynamic Dashboard:** Real-time metrics calculating Total Capital, Active Targets, and Completed Goals.
*   **Modern Glassmorphism UI:** A premium, blurred-card aesthetic utilizing **Playfair Display** for editorial headers and **Poppins** for clean, readable data presentation.
*   **Full CRUD Functionality:** 
    *   Create new financial goals with target valuations.
    *   Read and track real-time progress.
    *   Update saved amounts and targets via a blurred modal overlay.
    *   Delete obsolete or mistaken goals.
*   **Visual Progress Tracking:** Individual linear progress bars that automatically calculate completion percentages and toggle "Active" or "Done" status badges.

## 🛠️ Technology Stack

**Frontend**
*   React.js (scaffolded with Vite)
*   Axios (for HTTP requests)
*   Vanilla CSS3 (Glassmorphism & CSS Grid layout)

**Backend**
*   Python 3 & Flask
*   Flask-SQLAlchemy (ORM)
*   Flask-CORS (Cross-Origin Resource Sharing)
*   SQLite (Lightweight relational database)

## 📋 Prerequisites

Ensure you have the following installed on your local development environment (instructions assume a WSL Ubuntu / Linux environment):

*   **Python 3.x** and `python3-venv`
*   **Node.js** (installed via NVM) and **npm**
*   **Git**

## ⚙️ Local Setup & Installation

This project requires running two separate servers simultaneously. Open your terminal and follow these steps:

### 1. Clone the Repository
```bash
git clone https://github.com/IS-PROJECT-2026/savings-tracker-165992.git
cd savings-tracker-165992
```

## API Endpoints
GET - /api/goals, Retrieves a list of all financial targets.
POST - /api/goals, Creates a new financial goal (requires name and target_amount).
PUT - /api/goals/<id>, "Updates an existing goal (modifies name, target_amount, or current_amount)."
DELETE - /api/goals/<id>, Deletes a specific goal from the database.

## Git Branching Strategy
feat/[issue-number]-[description] - For new features (e.g., frontend setup, API endpoints).

style/[issue-number]-[description] - For UI/UX adjustments and CSS modifications.

fix/[issue-number]-[description] - For bug resolutions (e.g., CORS policy fixes).

docs/[issue-number]-[description] - For documentation updates.

## Author
Ivan Muvane Musila

Informatics and Computer Sciences

Strathmore University