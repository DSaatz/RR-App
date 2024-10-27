from Backend.Data.Helpers.Readers.getUserByMail import getUserByMail
from Backend.Data.Helpers import connector

def getUserProfilePicture(userEmail):
    userInfo = getUserByMail(userEmail)
    uid = userInfo["userID"]

    conn = connector.create_connection()
    if conn is None:
        print("Failed to establish database connection.")
        return None
    else:
        try:
            cur = conn.cursor()
            cur.execute('''
                SELECT profilepicture
                FROM users
                WHERE userID = %s
            ''', (uid,))
            profilePicture = cur.fetchone()[0]
            if profilePicture is None:
                return None
            else:
                return profilePicture
        except Exception as e:
            print(f"Error getting user profile picture: {e}")
            return None
        finally:
            cur.close()
            conn.close()
    