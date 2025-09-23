from sqlalchemy import Column, Integer, String
from ..database import Base

class User(Base):
    """
    Placeholder User model.
    Not actively used in the initial version of GitPulse,
    as user data is fetched directly from the GitHub API.
    This can be expanded later to store user-specific preferences.
    """
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    github_username = Column(String(255), unique=True, index=True, nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=True)