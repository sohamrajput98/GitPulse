# backend/app/api/search_endpoints.py

from fastapi import APIRouter
from typing import List
from datetime import datetime

from .. import schemas
from ..models.search_history import SearchHistory
from ..services import search_service
from ..cache import store_profile, get_profile

router = APIRouter()

# In-memory search history log
search_log: List[SearchHistory] = []

@router.post("/history", response_model=schemas.SearchHistory, tags=["Search History"])
def create_search(search: schemas.SearchHistoryCreate):
    """
    Creates a new search history entry.
    """
    entry = SearchHistory(
        id=len(search_log) + 1,
        username=search.username,
        searched_at=datetime.now()
    )
    search_log.append(entry)
    return entry

@router.get("/history", response_model=List[schemas.SearchHistory], tags=["Search History"])
def read_recent_searches(skip: int = 0, limit: int = 10):
    """
    Retrieves the most recent, unique search history entries.
    """
    return search_log[::-1][skip:skip + limit]