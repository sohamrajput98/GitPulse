# backend/app/models/search_history.py

from pydantic import BaseModel
from datetime import datetime

class SearchHistory(BaseModel):
    """
    SearchHistory model to represent a log of searched GitHub usernames.
    Used to show recent searches on the frontend.
    """

    id: int
    username: str
    searched_at: datetime