import sys
sys.path.append('../')

from Backend.Data.Helpers import connector

def checkIfRegistered(username, email):
    conn = connector.create_connection()
    if conn is None:
        return False
    
    try:
        cur = conn.cursor()
        
        cur.execute('''
            SELECT * FROM users WHERE username = %s OR email = %s
        ''', (username, email))
        
        result = cur.fetchone()
        if result is None:
            return False
        else:
            return True
    
    except Exception as e:
        print(f"Error checking if user is registered: {e}")
    
    finally:
        cur.close()
        conn.close()