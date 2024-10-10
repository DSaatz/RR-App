import sys
sys.path.append('../')
from Backend.Data.Helpers.Readers.getUserByMail import getUserByMail
from Backend.Data.Helpers import connector

def getReviewsByUser(email):
    user = getUserByMail(email)
    if user is None:
        return None
    uid = user['userID']

    conn = connector.create_connection()
    if conn is None:
        return None
    
    try:
        cur = conn.cursor()
        
        cur.execute('''
            SELECT restaurantName, reviewText, reviewDate, rating FROM reviews WHERE userID = %s
        ''', (uid,))
        
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
        
        return reviews
    except Exception as e:
        print(f"Error getting reviews by user: {e}")
        return None