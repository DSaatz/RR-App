import firebase_admin
from firebase_admin import credentials, auth
import os

def initializeFirebase():
    if not firebase_admin._apps:  # Prevent multiple initializations
        cred_path = os.path.join(os.path.dirname(__file__), "../firebaseCredentials.json")
        cred = credentials.Certificate(cred_path)
        firebase_admin.initialize_app(cred)
