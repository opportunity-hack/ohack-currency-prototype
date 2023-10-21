import os
import logging
from logging.handlers import RotatingFileHandler

logger = logging.getLogger(__name__)

def config_logging(c):
    # create logs folders if doesn't exist already
    if not os.path.exists('logs'):
        os.makedirs('logs')

    log_format = "%(asctime)s - %(levelname)s - %(message)s"

    # File rotation handler config
    # 5MB per file, keep last 3 files
    roation_handler = RotatingFileHandler('logs/cps.log', maxBytes=5*1024*1024, backupCount=3)
    # debug mode
    if c.DEBUG:
        roation_handler.setLevel(logging.DEBUG)
    else:
        roation_handler.setLevel(logging.INFO)
    roation_handler.setFormatter(logging.Formatter(log_format))

    # setup console handler to print to console
    console_handler = logging.StreamHandler()
    console_handler.setFormatter(logging.Formatter(log_format))

    # set logging instance
    logger = logging.getLogger()
    logger.addHandler(roation_handler)
    logger.addHandler(console_handler)
    logger.setLevel(logging.INFO)
    logger.info("Logging configured.")