from fastapi import FastAPI

from utils.logging import logger    
from api.v1.claims import router as claims_router


def register_endpoints():
    logger.info("Starting API endpoints registration")
    api = FastAPI()
    api.include_router(claims_router, prefix="/v1/claims", tags=["v1 claims"])
    logger.info("Ending API endpoints registration")
    return api

