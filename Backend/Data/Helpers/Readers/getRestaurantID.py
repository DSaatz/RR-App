import sys
sys.path.append('../')

from Backend.Data.Helpers import connector

def getIDfromName(name):
    conn = connector.create_connection()
    if conn is None:
        return  
    
    try:
        cur = conn.cursor()
        
        cur.execute('''
            SELECT restaurantID FROM restaurants WHERE restaurantName = %s
        ''', (name,))
        
        result = cur.fetchone()
        if result is None:
            return None
        else:
            return result[0]
    
    except Exception as e:
        print(f"Error getting restaurant ID: {e}")
    
    finally:
        cur.close()
        conn.close()