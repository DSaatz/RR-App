import firebase_admin
from firebase_admin import credentials
import os

def initializeFirebase():
    # Get the absolute path to the credentials file
    cred_path = os.path.join(os.path.dirname(__file__), "../firebaseCredentials.json")
    cred = credentials.Certificate(cred_path)
    firebase_admin.initialize_app(cred)


#login handled via frontend since there is no option for backend with firebase