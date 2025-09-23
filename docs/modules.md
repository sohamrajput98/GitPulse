#### `GitPulse/docs/modules.md`
```markdown
# GitPulse Module Documentation

This document provides a detailed overview of the project's modular structure, explaining the purpose of each directory and key file.

## Backend Structure (`/backend`)

The backend is built with FastAPI and follows a highly modular, service-oriented architecture.

-   **/app**: The main application package.
    -   **/main.py**: The entry point of the FastAPI application. It initializes the app, includes the API routers, and sets up CORS middleware. It contains minimal logic.
    -   **/database.py**: Configures the SQLAlchemy database engine, session management, and declarative base.
    -   **/core**: Contains application-wide configuration and core utilities.
        -   **/config.py**: Manages environment variables using Pydantic's `BaseSettings`.
        -   **/utils.py**: Holds helper functions used across the application.
    -   **/models**: Defines the SQLAlchemy ORM models, which represent the database tables.
        -   **/search_history.py**: Model for storing recent GitHub username searches.
        -   **/badge.py**: Model for storing badge definitions.
    -   **/schemas**: Defines the Pydantic schemas used for data validation, serialization, and API request/response bodies. Each schema corresponds to a model.
        -   **/search_history.py**: Pydantic schemas for creating and reading search history entries.
        -   **/badge.py**: Pydantic schemas for badge data.
    -   **/services**: Contains the business logic of the application. Services are responsible for interacting with the database via models and performing operations.
        -   **/search_service.py**: Logic for managing search history (e.g., creating new entries, fetching recent searches).
        -   **/badge_service.py**: Logic for awarding and retrieving badges based on user stats.
    -   **/api**: Contains the API endpoints (routers). These files handle HTTP requests, call the appropriate service methods, and return responses.
        -   **/search_endpoints.py**: Endpoints for `/history`.
        -   **/badge_endpoints.py**: Endpoints for `/badges`.

## Frontend Structure (`/frontend`)

The frontend is a React Single Page Application (SPA) built with Vite, emphasizing extreme component modularization.

-   **/public**: Contains static assets like `index.html` and favicons.
-   **/src**: The main source code directory.
    -   **/main.jsx**: The entry point of the React application.
    -   **/App.jsx**: The root component, responsible for setting up routing.
    -   **/pages**: High-level components that represent a page or view. These components are kept lean and primarily compose other smaller components.
        -   **/Home.jsx**: The main dashboard page for a single user's analytics.
        -   **/Comparison.jsx**: The page for comparing two users side-by-side.
    -   **/components**: Reusable UI components, organized by feature.
        -   **/profile**: Components related to the user profile header (`ProfileCard`, `ProfileAvatar`, `ProfileStats`).
        -   **/repo**: Components for listing and filtering repositories (`RepoList`, `RepoCard`, `RepoFilter`).
        -   **/charts**: Interactive data visualization components (`LanguagePieChart`, `ActivityTimeline`, `ContributionCalendar`).
        -   **/badges**: Components for displaying achievement badges (`BadgeList`, `Badge`).
        -   **/fun**: Purely aesthetic or UX-enhancing components (`ConfettiEffect`, `HoverTooltip`).
    -   **/hooks**: Custom React hooks for shared logic.
        -   **/useGitHubAPI.js**: A centralized hook for fetching all data from the GitHub API. It manages loading states, errors, and data transformation.
    -   **/utils**: Utility functions that don't depend on React state.
        -   **/dataFormatter.js**: Functions to process and format raw data from the GitHub API into a structure usable by the chart and UI components.
    -   **/styles**: Global CSS and Tailwind configuration.
        -   **/tailwind.css**: Main CSS file for Tailwind directives.

