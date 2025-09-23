from pydantic import BaseModel, EmailStr
from typing import Optional

class UserBase(BaseModel):
    """
    Base schema for a User, containing shared fields.
    """
    github_username: str
    email: Optional[EmailStr] = None

class UserCreate(UserBase):
    """
    Schema for creating a new user. (Placeholder)
    """
    pass

class User(UserBase):
    """
    Schema for reading user data, includes the database ID.
    """
    id: int

    class Config:
        from_attributes = True # Pydantic V2 replaces orm_mode