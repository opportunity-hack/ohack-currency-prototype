import os

from api.v1.endpoints import register_endpoints
from utils.logging import config_logging, logger
from config import get_config

CONFIG = get_config()
config_logging(CONFIG)
api = register_endpoints()
logger.info(f"App configuration complete, currently running in {os.getenv('APP_MODE')}")
