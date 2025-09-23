from sqlalchemy import Column, Integer, String, DateTime, func
from ..database import Base

class SearchHistory(Base):
    """
    SearchHistory model to store a log of searched GitHub usernames.
    This will be used to show recent searches on the frontend.
    """
    __tablename__ = "search_history"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(255), index=True, nullable=False)
    searched_at = Column(DateTime(timezone=True), server_default=func.now())