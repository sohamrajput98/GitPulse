# GitPulse 🚀

GitPulse is a full-stack web application designed to provide in-depth analytics for GitHub profiles. It features an interactive, dark-themed interface built with React and Shadcn UI, powered by a minimal yet robust FastAPI backend. Dive deep into your contributions, repositories, and language statistics, compare your profile with others, and earn fun badges for your achievements.

## ✨ Features

-   **Interactive Dashboard**: A comprehensive overview of a user's GitHub profile, including stats, bio, and contribution activity.
-   **In-depth Analytics**:
    -   **Language Analysis**: Interactive pie chart showing language distribution across all repositories.
    -   **Activity Timeline**: A chart visualizing commits, PRs, and other activities over time.
    -   **Contribution Calendar**: A detailed, interactive heatmap of daily contributions.
-   **Repository Explorer**: A filterable and sortable list of all public repositories with key stats for each.
-   **👥 Comparison Mode**: View two GitHub profiles side-by-side to compare statistics and activity.
-   **🏆 Badge System**: Unlock badges for milestones like "Prolific Committer" or "Polyglot Programmer".
-   **⬇️ Export Options**: Export profile data and analytics to CSV or PDF.
-   **Fun & Engaging UX**: Enjoy smooth animations, skeleton loaders, and a confetti celebration for significant achievements.
-   **Fully Responsive**: A seamless experience on both desktop and mobile devices.

## 🛠️ Tech Stack

-   **Frontend**: React, Vite, Tailwind CSS, Shadcn UI, Recharts, React-Confetti
-   **Backend**: FastAPI, Python 3.11+, SQLAlchemy, MySQL
-   **Database**: MySQL
-   **API**: Official GitHub REST API

## 📸 Screenshots

*(Placeholder: Add a screenshot of the main dashboard here)*
![GitPulse Dashboard](https://via.placeholder.com/800x450.png?text=GitPulse+Dashboard)

*(Placeholder: Add a screenshot of the comparison mode here)*
![GitPulse Comparison Mode](https://via.placeholder.com/800x450.png?text=Comparison+Mode)

## ⚙️ Setup and Installation

### Prerequisites

-   Node.js (v18+) and npm/yarn
-   Python (v3.10+) and pip
-   MySQL Server
-   A GitHub Personal Access Token

### 1. Clone the Repository

```bash
git clone [https://github.com/your-username/GitPulse.git](https://github.com/your-username/GitPulse.git)
cd GitPulse