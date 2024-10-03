import sys
import json
sys.path.append('../')

from Backend.Data.Helpers import connector

def getAllRestaurants():
    # Return JSON with all restaurants, their avg rating and review amount
    conn = connector.create_connection()
    if conn is None:
        return None
    
    try:
        cur = conn.cursor()
        
        cur.execute('''
            SELECT restaurantName, avg_rating, review_amount, images FROM restaurants
        ''')
        
        result = cur.fetchall()
        
        # Convert result to a list of dictionaries
        restaurants = []
        for row in result:
            restaurants.append({
                "restaurantName": row[0],
                "avg_rating": row[1],
                "review_amount": row[2],
                "images": row[3]
            })
        
        return json.dumps(restaurants)  # Convert to JSON string
    
    except Exception as e:
        print(f"Error getting all restaurants: {e}")
        return None
    
    finally:
        cur.close()
        conn.close()  # Ensure the connection is closed