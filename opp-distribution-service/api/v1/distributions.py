from fastapi import APIRouter
from utils.logging import logger

router = APIRouter()

@router.get("/")
def test():
    logger.info(f"Executing $OPP distribution process for user USER_WALLET")
    # call service to execute relevant contract for this
    return {"message": "Distribution Complete"}
