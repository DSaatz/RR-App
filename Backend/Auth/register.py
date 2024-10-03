from firebase_admin import auth

def registerUser(email, password):
    try:
        user = auth.create_user(
            email=email,
            password=password
        )
        print(f'Successfully created new user: {user.uid}')
        return user.uid
    except Exception as e:
        print(f'Error creating user: {e}')