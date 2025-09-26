from sqlalchemy.orm import Session
from .. import models, schemas

def get_user_by_github_username(db: Session, username: str):
    """
    Placeholder function to retrieve a user from the database.
    Not used in the core application logic.
    """
    pass
    # return db.query(models.User).filter(models.User.github_username == username).first()

def create_user(db: Session, user: schemas.UserCreate):
    """
    Placeholder function to create a user in the database.
    Not used in the core application logic.
    """
    pass
    # db_user = models.User(github_username=user.github_username, email=user.email)
    # db.add(db_user)
    # db.commit()
    # db.refresh(db_user)
    # return db_user