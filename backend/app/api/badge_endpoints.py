from fastapi import APIRouter, Depends
from typing import List, Dict, Any
from ..services import badge_service
from ..schemas.stats import UserStats

router = APIRouter()

@router.post("/badges/calculate", tags=["Badges"], response_model=List[Dict[str, Any]])
async def calculate_user_badges(stats: UserStats):
    """
    Accepts a user's GitHub stats and returns a list of earned badges.
    The frontend is responsible for fetching and compiling the stats.
    """
    earned_badges = badge_service.award_badges_for_user(stats.dict())
    return earned_badges