import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # TODO: cahcing config
    CACHE=""

class DevelopmentConfig(Config):
    DEBUG = True
    # TODO: config db url


class ProductionConfig(Config):
    DEBUG = False

def get_config():
    env = os.getenv("APP_MODE", "DEVELOPMENT").upper()
    if env == "DEVELOPMENT":
        return DevelopmentConfig
    elif env == "PRODUCTION":
        return ProductionConfig
    else:
        raise ValueError(f"{env} is not a valid environment for this app. Use 'DEVELOPMENT' or 'PRODUCTION'")