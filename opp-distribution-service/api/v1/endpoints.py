from fastapi import FastAPI

from utils.logging import logger    
from api.v1.distributions import router as distribution_router


def register_endpoints():
    logger.info("Starting API endpoints registration")
    api = FastAPI()
    api.include_router(distribution_router, prefix="/v1/distributions", tags=["v1 distribution"])
    logger.info("Ending API endpoints registration")
    return api

