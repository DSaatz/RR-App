import sys
sys.path.append('../')

from Backend.Data.Helpers import connector
from Backend.Data.Images import imgurHelpers
from Backend.Data.Helpers.Readers import getRestaurantID

def addPicturesToRestaurant(name, pathImgs):
    id = getRestaurantID.getIDfromName(name)
    if id is None:
        print("Restaurant not found.")
        return
    link = imgurHelpers.upload_images_and_create_album(pathImgs, name)
    conn = connector.create_connection()
    if conn is None:
        (f"Error connecting to database.")
        return
    try:
        # Update the restaurant entry with the new image link
        update_query = """
        UPDATE restaurants
        SET images = %s
        WHERE id = %s
        """
        cursor = conn.cursor()
        cursor.execute(update_query, (link, id))
        
        # Commit the transaction
        conn.commit()
        print("Images updated successfully.")
    except Exception as e:
        print(f"An error occurred while updating images: {e}")
        conn.rollback()  # Rollback in case of error
    finally:
        cursor.close()
        conn.close()  # Close the database connection