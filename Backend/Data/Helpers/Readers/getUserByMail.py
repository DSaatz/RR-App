import sys
import json
sys.path.append('../')

from Backend.Data.Helpers import connector

def getUserByMail(email):
    conn = connector.create_connection()
    if conn is None:
        return None
    
    try:
        cur = conn.cursor()
        
        cur.execute('''
            SELECT * FROM users WHERE email = %s
        ''', (email,))
        
        result = cur.fetchone()
        
        if result is None:
            return None
        
        user = {
            "userID": result[0],
            "username": result[1],
            "email": result[2]
        }
        
        return user
    
    except Exception as e:
        print(f"Error getting user by email: {e}")
        return None
    
    finally:
        cur.close()
        conn.close()  # Ensure the connection is closed