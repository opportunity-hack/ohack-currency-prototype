from fastapi import APIRouter
from utils.logging import logger

router = APIRouter()

@router.get("/")
def get_claims():
    logger.info(f"Getting list of all user claims")
    return {"message": "List of claims"}
