from pydantic import BaseModel

class RepoBase(BaseModel):
    """
    Base schema for a repository. (Placeholder)
    """
    name: str

class RepoCreate(RepoBase):
    """
    Schema for creating a repository. (Placeholder)
    """
    pass

class Repo(RepoBase):
    """
    Schema for reading repository data.
    """
    id: int
    owner_id: int

    class Config:
        from_attributes = True