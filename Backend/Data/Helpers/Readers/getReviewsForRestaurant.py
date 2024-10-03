import sys
import json
sys.path.append('../')

from Backend.Data.Helpers import connector

def getReviews(restaurant_name):
    conn = connector.create_connection()
    if conn is None:
        return None
    
    try:
        cur = conn.cursor()
        
        cur.execute('''
            SELECT * FROM reviews WHERE restaurantname = %s
        ''', (restaurant_name,))
        
        result = cur.fetchall()
        
        # Convert result to a list of dictionaries
        reviews = []
        for row in result:
            reviews.append({
                "reviewID": row[0],
                "userID": row[1],  # Adjusted to userID
                "restaurantName": row[2],
                "ambient": row[3],
                "service": row[4],
                "taste": row[5],
                "plating": row[6],
                "location": row[7],
                "priceToValue": row[8],
                "reviewDate": str(row[9]),  # Convert date to string
                "score": float(row[10]),  # Convert Decimal to float
                "reviewText": row[11],
                "images": row[12]  # Add images if present
            })
        
        return json.dumps(reviews)  # Convert to JSON string
    
    except Exception as e:
        print(f"Error getting reviews for restaurant: {e}")
        return None
    
    finally:
        cur.close()
        conn.close()  # Ensure the connection is closed
