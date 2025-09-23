from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from ..database import Base

class Repo(Base):
    """
    Placeholder Repo model.
    Not actively used, as repository data is fetched live from the GitHub API.
    Could be used in the future to cache repository data or store user notes.
    """
    __tablename__ = "repos"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User")