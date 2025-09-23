# core/utils.py

def format_response(data: dict, message: str = "Success") -> dict:
    """
    A utility function to standardize API responses.
    (Not used in the current implementation but good practice to have).
    """
    return {
        "status": "success",
        "message": message,
        "data": data
    }