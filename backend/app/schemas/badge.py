from pydantic import BaseModel

class BadgeBase(BaseModel):
    """
    Base schema for a Badge, with all common fields.
    """
    name: str
    description: str
    icon: str
    tier: str

class BadgeCreate(BadgeBase):
    """
    Schema used for creating a new badge in the database.
    (e.g., for an admin endpoint to populate badges)
    """
    pass

class Badge(BadgeBase):
    """
    Schema for reading a badge from the database.
    This model will be used in API responses.
    """
    id: int

    class Config:
        from_attributes = True