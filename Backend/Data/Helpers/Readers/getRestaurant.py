import sys
import json
from decimal import Decimal
sys.path.append('../')

from Backend.Data.Helpers import connector

def getRestaurantByName(restaurant_name):
    conn = connector.create_connection()
    if conn is None:
        return None
    
    try:
        cur = conn.cursor()
        
        # Fetch restaurant data based on the provided restaurant name
        cur.execute('''
            SELECT restaurantName, avg_rating, review_amount, images FROM restaurants WHERE restaurantName = %s
        ''', (restaurant_name,))
        
        restaurant = cur.fetchone()
        
        if restaurant is None:
            print(f"Restaurant '{restaurant_name}' not found.")
            return None
        
        # Convert the result to a dictionary
        restaurant_data = {
            "restaurantName": restaurant[0],
            "avg_rating": float(restaurant[1]) if isinstance(restaurant[1], Decimal) else restaurant[1],
            "review_amount": int(restaurant[2]),
            "images": restaurant[3]
        }
        
        return json.dumps(restaurant_data)  # Convert to JSON string
    
    except Exception as e:
        print(f"Error fetching restaurant: {e}")
        return None
    
    finally:
        cur.close()
        conn.close()  # Ensure the connection is closed
