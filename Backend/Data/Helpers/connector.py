import os
from dotenv import load_dotenv
import psycopg
from psycopg import OperationalError

load_dotenv()

def create_connection():
    try:
        connection = psycopg.connect(
            host = os.getenv('DB_HOST'),
            port = os.getenv('DB_PORT'),
            dbname = os.getenv('DB_NAME'),
            user = os.getenv('DB_USER'),
            password = os.getenv('DB_PASS')
        )
        print("DB Connection Successful")
        return connection

    except OperationalError as e:
        print(f"Error: {e}")
        return None