import sys
sys.path.append('../')

from Backend.Data.Helpers import connector

def getReviews(name):
    conn = connector.create_connection()
    if conn is None:
        return None
    
    try:
        cur = conn.cursor()
        
        cur.execute('''
            SELECT * FROM reviews WHERE restaurantName = %s
        ''', (name,))
        
        result = cur.fetchall()
        
        # Convert result to a list of dictionaries
        reviews = []
        for row in result:
            reviews.append({
                "restaurantName": row[0],
                "userName": row[1],
                "ambient": row[2],
                "service": row[3],
                "taste": row[4],
                "plating": row[5],
                "location": row[6],
                "priceToValue": row[7],
                "reviewText": row[8]
            })
        
        return reviews
    
    except Exception as e:
        print(f"Error getting reviews for restaurant: {e}")
        return None
    
    finally:
        cur.close()
        conn.close()  # Ensure the connection is closed