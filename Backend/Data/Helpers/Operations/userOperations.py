import sys
sys.path.append('../')

from Backend.Data.Helpers import connector
from Backend.Data.Helpers.Readers.getUserByMail import getUserByMail
from Backend.Auth.authSetup import initializeFirebase
from firebase_admin import auth
import logging

logger = logging.getLogger(__name__)

def changeUsername(userEmail, newUsername):
    conn = connector.create_connection()
    if conn is None:
        print("Failed to establish database connection.")
        return
    
    userID = getUserByMail(userEmail)["userID"]

    try:
        cur = conn.cursor()

        # Update the user's username
        cur.execute('''
            UPDATE users
            SET username = %s
            WHERE userID = %s
        ''', (newUsername, userID))

        # Commit the changes
        conn.commit()
        print("Username changed successfully.")
        return True
    except Exception as e:
        print(f"Error changing username: {e}")
        conn.rollback()  # Rollback in case of error
    finally:
        cur.close()
        conn.close()

def changePassword(userEmail, newPassword):
    try:
        initializeFirebase()  # Ensure Firebase is initialized
        user = auth.get_user_by_email(userEmail)  # Retrieve user by email
        auth.update_user(user.uid, password=newPassword)  # Update password
        print(f'Successfully updated password for user: {user.uid}')
        return True
    except Exception as e:
        print(f'Error updating password: {e}')
        return False
    
def deleteUser(userEmail):
    try:
        initializeFirebase()  # Ensure Firebase is initialized
        user = auth.get_user_by_email(userEmail)  # Retrieve user by email
        auth.delete_user(user.uid)  # Delete user
        print(f'Successfully deleted user: {user.uid}')

        userInfo = getUserByMail(userEmail)

        #Delete user from database
        conn = connector.create_connection()
        if conn is None:
            print("Failed to establish database connection.")
            return False
        cur = conn.cursor()
        logger.info(f"Deleting user with userID: {userInfo['userID']}")
        cur.execute('''
            DELETE FROM users
            WHERE userid = %s
        ''', (userInfo["userID"],))
        conn.commit()
        return True
    #TODO: eventually check if fk constraints are violated and won't delete the user
    except Exception as e:
        print(f'Error deleting user: {e}')
        return False

def updateProfilePicture(userEmail, profilePictureLink):
    conn = connector.create_connection()
    if conn is None:
        print("Failed to establish database connection.")
        return False
    
    userID = getUserByMail(userEmail)["userID"]

    try:
        cur = conn.cursor()

        # Update the user's profile picture
        cur.execute('''
            UPDATE users
            SET profilepicture = %s
            WHERE userID = %s
        ''', (profilePictureLink, userID))

        # Commit the changes
        conn.commit()
        print("Profile picture added successfully.")
        return True
    except Exception as e:
        print(f"Error adding profile picture: {e}")
        conn.rollback()  # Rollback in case of error
    finally:
        cur.close()
        conn.close()