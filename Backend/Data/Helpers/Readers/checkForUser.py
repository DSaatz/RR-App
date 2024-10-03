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

def getUserID(name):
    conn = connector.create_connection()
    if conn is None:
        return None
    
    try:
        cur = conn.cursor()
        
        cur.execute('''
            SELECT userID FROM users WHERE username = %s
        ''', (name,))
        
        result = cur.fetchone()
        if result is None:
            return None
        else:
            return result[0]
    
    except Exception as e:
        print(f"Error getting user ID: {e}")
    
    finally:
        cur.close()
        conn.close()