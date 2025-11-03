# backend/app/cache.py

# Simple in-memory cache for GitHub profile data
cache: dict[str, dict] = {}

def store_profile(username: str, data: dict):
    """
    Stores GitHub profile data in memory.
    """
    cache[username] = data

def get_profile(username: str) -> dict | None:
    """
    Retrieves cached GitHub profile data.
    """
    return cache.get(username)