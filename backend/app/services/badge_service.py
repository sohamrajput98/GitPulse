from sqlalchemy.orm import Session
from .. import models

# In a real application, these rules would be more complex and possibly stored in the database
BADGE_CRITERIA = {
    "Stargazer": {"description": "Own repositories with over 50 total stars.", "icon": "⭐", "tier": "Bronze"},
    "Galactic Stargazer": {"description": "Own repositories with over 500 total stars.", "icon": "🌟", "tier": "Silver"},
    "Cosmic Stargazer": {"description": "Own repositories with over 2000 total stars.", "icon": "✨", "tier": "Gold"},
    "Contributor": {"description": "Have more than 50 total commits.", "icon": "💪", "tier": "Bronze"},
    "Prolific Contributor": {"description": "Have more than 500 total commits.", "icon": "🚀", "tier": "Silver"},
    "Open Source Champion": {"description": "Have more than 2000 total commits.", "icon": "🏆", "tier": "Gold"},
    "Polyglot": {"description": "Use 5 or more distinct languages in your repositories.", "icon": "🗣️", "tier": "Silver"},
    "Followed": {"description": "Gain over 100 followers.", "icon": "👥", "tier": "Bronze"},
    "Influencer": {"description": "Gain over 1000 followers.", "icon": "👑", "tier": "Silver"},
    "Repo Pioneer": {"description": "Create more than 20 public repositories.", "icon": "🗺️", "tier": "Bronze"},
}


def get_all_badges(db: Session):
    """
    Retrieves all predefined badge definitions.
    
    (Note: This is a placeholder. A real implementation might populate the DB
    with the BADGE_CRITERIA on startup and query it here.)
    """
    # For this example, we return the static dictionary.
    # To use the database, you would first need to populate the `badges` table
    # and then run: return db.query(models.Badge).all()
    return BADGE_CRITERIA


def award_badges_for_user(user_stats: dict):
    """
    Determines which badges a user has earned based on their GitHub stats.

    Args:
        user_stats (dict): A dictionary containing fetched stats like 'total_stars',
                           'total_commits', 'languages', 'followers', 'public_repos'.

    Returns:
        A list of earned badge objects.
    """
    earned_badges = []
    
    # Safely get stats from the input dictionary
    total_stars = user_stats.get("total_stars", 0)
    total_commits = user_stats.get("total_commits", 0)
    num_languages = len(user_stats.get("languages", {}))
    followers = user_stats.get("followers", 0)
    public_repos = user_stats.get("public_repos", 0)

    # Check star-related badges
    if total_stars > 2000:
        earned_badges.append(BADGE_CRITERIA["Cosmic Stargazer"])
    elif total_stars > 500:
        earned_badges.append(BADGE_CRITERIA["Galactic Stargazer"])
    elif total_stars > 50:
        earned_badges.append(BADGE_CRITERIA["Stargazer"])

    # Check commit-related badges
    if total_commits > 2000:
        earned_badges.append(BADGE_CRITERIA["Open Source Champion"])
    elif total_commits > 500:
        earned_badges.append(BADGE_CRITERIA["Prolific Contributor"])
    elif total_commits > 50:
        earned_badges.append(BADGE_CRITERIA["Contributor"])

    # Check language badge
    if num_languages >= 5:
        earned_badges.append(BADGE_CRITERIA["Polyglot"])
        
    # Check follower badges
    if followers > 1000:
        earned_badges.append(BADGE_CRITERIA["Influencer"])
    elif followers > 100:
        earned_badges.append(BADGE_CRITERIA["Followed"])

    # Check repository count badge
    if public_repos > 20:
        earned_badges.append(BADGE_CRITERIA["Repo Pioneer"])

    return earned_badges