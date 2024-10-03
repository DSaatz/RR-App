import sys
sys.path.append('../')

from Backend.Data.Helpers import connector

def createRestaurant(
    restaurantName,
    avg_rating,
    review_amount,
    pictures=None #Later change to imgur url for restaurant which should be generated
):
    conn = connector.create_connection()
    if conn is None:
        return  
    
    try:
        cur = conn.cursor()
        
        cur.execute('''
            INSERT INTO restaurants (
                restaurantName, avg_rating, review_amount, images
            )
            VALUES (%s, %s, %s, %s)
        ''', (restaurantName, avg_rating, review_amount, pictures))
        
        conn.commit()
        print("Restaurant created successfully.")
    
    except Exception as e:
        print(f"Error creating restaurant: {e}")
    
    finally:
        cur.close()
        conn.close()

#Added explenations since its a bit more complex
#Image link in review creation is temporary since it will later be transferred to the restaurants image collection(imgur)
#TODO implement logic for image collection & updating the restaurant image collection
def createReview(
    userID,
    restaurantName,
    ambient,
    service,
    taste,
    plating,
    location,
    priceToValue,
    reviewText,
    images=None
):
    conn = connector.create_connection()
    if conn is None:
        return  
    
    try:
        cur = conn.cursor()

        # Calculate the score from the ratings
        score = (ambient + service + taste + plating + location + priceToValue) / 6.0
        
        # Check if the restaurant already exists
        cur.execute('''
            SELECT restaurantID, avg_rating, review_amount FROM restaurants WHERE restaurantName = %s
        ''', (restaurantName,))
        restaurant = cur.fetchone()

        if restaurant:
            # If the restaurant exists, get its ID, avg_rating, and review_amount
            restaurantID, avg_rating, review_amount = restaurant
            print(f"Restaurant already exists with ID: {restaurantID}")

            # Update avg_rating and review_amount
            new_avg_rating = ((avg_rating * review_amount) + score) / (review_amount + 1)
            new_review_amount = review_amount + 1
            
            # Update the restaurant details
            cur.execute('''
                UPDATE restaurants SET avg_rating = %s, review_amount = %s WHERE restaurantID = %s
            ''', (new_avg_rating, new_review_amount, restaurantID))

        else:
            # If not, insert the restaurant into the database
            cur.execute('''
                INSERT INTO restaurants (
                    restaurantName, avg_rating, review_amount, pictures
                )
                VALUES (%s, %s, %s, %s)
                RETURNING restaurantID
            ''', (restaurantName, score, 1, images))
            restaurantID = cur.fetchone()[0]
            print(f"Restaurant created successfully with ID: {restaurantID}")

            # After creating a new restaurant, set the initial values for avg_rating and review_amount
            new_avg_rating = score
            new_review_amount = 1
            
            # Update the restaurant details with the first review
            cur.execute('''
                UPDATE restaurants SET avg_rating = %s, review_amount = %s WHERE restaurantID = %s
            ''', (new_avg_rating, new_review_amount, restaurantID))

        # Now create the review associated with the restaurant
        cur.execute('''
            INSERT INTO reviews (
                userID, restaurantName, ambient, service, taste, 
                plating, location, priceToValue, reviewDate, 
                score, review, images
            )
            VALUES (%s, %s, %s, %s, %s, 
                    %s, %s, %s, CURRENT_DATE, 
                    %s, %s, %s)
        ''', (userID, restaurantName, ambient, service, taste, 
              plating, location, priceToValue, score, reviewText, images))
        
        # Commit the changes
        conn.commit()
        print("Review created successfully.")
    
    except Exception as e:
        print(f"Error creating review: {e}")
    
    finally:
        cur.close()
        conn.close()



def createUser(
        username,
        email
):
    conn = connector.create_connection()
    if conn is None:
        return  
    
    try:
        cur = conn.cursor()

        cur.execute('''
            INSERT INTO users (
                username, email
            )
            VALUES (%s, %s)
        ''', (username, email))
        
        conn.commit()
        print("User created successfully.")
    
    except Exception as e:
        print(f"Error creating user: {e}")
    
    finally:
        cur.close()
        conn.close()

'''
# test
createUser(
    username='test_user',
    email="testmail@test.com"
)

createReview(
    userID=1,
    restaurantName='Sample Restaurant',
    ambient=5,
    service=4,
    taste=5,
    plating=4,
    location=5,
    priceToValue=4,
    reviewText='Great food and ambiance!',
    images='image_url_here'  # Optional
)
'''