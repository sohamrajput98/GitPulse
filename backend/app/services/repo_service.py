from sqlalchemy.orm import Session
from .. import models, schemas

def get_repos_for_user(db: Session, user_id: int):
    """
    Placeholder function to get repositories for a user from the database.
    Not used, as repo data is fetched live from the GitHub API.
    """
    pass
    # return db.query(models.Repo).filter(models.Repo.owner_id == user_id).all()

def create_user_repo(db: Session, repo: schemas.RepoCreate, user_id: int):
    """
    Placeholder function to create a repository in the database.
    Not used in the core application logic.
    """
    pass
    # db_repo = models.Repo(**repo.dict(), owner_id=user_id)
    # db.add(db_repo)
    # db.commit()
    # db.refresh(db_repo)
    # return db_repo