from pydantic import BaseModel
from typing import Dict

class UserStats(BaseModel):
    """
    Schema for receiving user stats from the frontend
    to calculate which badges have been earned.
    """
    total_stars: int = 0
    total_commits: int = 0
    public_repos: int = 0
    followers: int = 0
    languages: Dict[str, int] = {}