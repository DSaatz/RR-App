import firebase_admin
from firebase_admin import credentials

def initializeFirebase():
    cred = credentials.Certificate("Backend/firebaseCredentials.json")
    firebase_admin.initialize_app(cred)


#login handled via frontend since there is no option for backend with firebase