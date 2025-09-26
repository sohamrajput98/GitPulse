from sqlalchemy.orm import Session
from sqlalchemy import desc, distinct
from .. import models, schemas

def create_search_entry(db: Session, search: schemas.SearchHistoryCreate):
    """
    Creates a new entry in the search history.

    Args:
        db (Session): The database session.
        search (schemas.SearchHistoryCreate): The search data containing the username.

    Returns:
        The created SearchHistory object.
    """
    db_search = models.SearchHistory(username=search.username)
    db.add(db_search)
    db.commit()
    db.refresh(db_search)
    return db_search

def get_recent_searches(db: Session, limit: int = 10):
    """
    Retrieves a list of the most recent unique search queries.

    Args:
        db (Session): The database session.
        limit (int): The maximum number of recent searches to return.

    Returns:
        A list of the most recently searched unique usernames.
    """
    # Subquery to get the latest search timestamp for each unique username
    subquery = db.query(
        models.SearchHistory.username,
        db.func.max(models.SearchHistory.searched_at).label('max_searched_at')
    ).group_by(models.SearchHistory.username).subquery()

    # Join the original table with the subquery to get the full record of the latest search
    recent_searches = db.query(models.SearchHistory).join(
        subquery,
        db.and_(
            models.SearchHistory.username == subquery.c.username,
            models.SearchHistory.searched_at == subquery.c.max_searched_at
        )
    ).order_by(desc(models.SearchHistory.searched_at)).limit(limit).all()
    
    return recent_searches