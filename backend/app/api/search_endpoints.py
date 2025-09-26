from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from .. import schemas
from ..services import search_service
from ..database import get_db

router = APIRouter()

@router.post("/history", response_model=schemas.SearchHistory, tags=["Search History"])
def create_search(search: schemas.SearchHistoryCreate, db: Session = Depends(get_db)):
    """
    Creates a new search history entry.
    """
    return search_service.create_search_entry(db=db, search=search)


@router.get("/history", response_model=List[schemas.SearchHistory], tags=["Search History"])
def read_recent_searches(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    """
    Retrieves the most recent, unique search history entries.
    """
    searches = search_service.get_recent_searches(db, limit=limit)
    return searches