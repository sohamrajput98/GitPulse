from sqlalchemy import Column, Integer, String, Text
from ..database import Base

class Badge(Base):
    """
    Badge model to store definitions of achievable badges.
    The backend service will contain the logic to determine if a user earns a badge.
    """
    __tablename__ = "badges"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), unique=True, nullable=False)
    description = Column(Text, nullable=False)
    icon = Column(String(255), nullable=False)  # e.g., an emoji or SVG name
    tier = Column(String(50), nullable=False)   # e.g., Bronze, Silver, Gold