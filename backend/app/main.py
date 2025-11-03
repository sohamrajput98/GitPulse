from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


from .api import search_endpoints, badge_endpoints, user_endpoints, repo_endpoints

# This command will create all the database tables based on the models
# when the application starts up.


# Initialize the FastAPI app instance
app = FastAPI(
    title="GitPulse API",
    description="Backend API for GitPulse GitHub Profile Analyzer.",
    version="1.0.0",
)

# --- Middleware Configuration ---

# Configure CORS (Cross-Origin Resource Sharing) to allow the frontend
# to communicate with this API.
# In a production environment, you should restrict the origins.
origins = [
    "http://localhost:5173",  # Default Vite dev server port
    "http://localhost:3000",  # Default Create React App port
    # Add your deployed frontend URL here
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for simplicity in development
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)


# --- API Router Inclusion ---

# Include the modular routers from the /api directory.
# This keeps the main file clean and organized.
app.include_router(search_endpoints.router, prefix="/api/v1")
app.include_router(badge_endpoints.router, prefix="/api/v1")
app.include_router(user_endpoints.router, prefix="/api/v1")
app.include_router(repo_endpoints.router, prefix="/api/v1")


# --- Root Endpoint ---

@app.get("/", tags=["Root"])
async def read_root():
    """
    A simple root endpoint to confirm the API is running.
    """
    return {"message": "Welcome to the GitPulse API! Visit /docs for documentation."}