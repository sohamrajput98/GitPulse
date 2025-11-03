# backend/app/models/badge.py

from pydantic import BaseModel

class Badge(BaseModel):
   

    id: int
    name: str
    description: str
    icon: str    
    tier: str       