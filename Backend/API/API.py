from fastapi import FastAPI, HTTPException, File, UploadFile
from fastapi.responses import HTMLResponse
from pydantic import BaseModel, EmailStr
from fastapi.middleware.cors import CORSMiddleware
import sys
sys.path.append('../')
from Backend.Data.Helpers.Readers import checkForUser
from Backend.Data.Helpers.Operations import operationsDB
from Backend.Auth import authSetup
from Backend.Auth import register
import os
from typing import List
from Backend.Data.Images import addPicturesToRestaurant

app = FastAPI()

class UserRegister(BaseModel):
    username: str
    email: EmailStr
    password: str

@app.post("/registerUser")
async def register_user(user: UserRegister):
    if checkForUser.checkIfRegistered(user.username, user.email):
        raise HTTPException(status_code=400, detail="Username or email already registered.")

    authSetup.initializeFirebase()
    register.registerUser(user.email, user.password)
    
    operationsDB.insertUser(user.username, user.email)

    return {"message": "User registered successfully."}

@app.post("/uploadReview")
async def upload_review(
    userName: str,
    restaurantName: str,
    ambient: int,
    service: int,
    taste: int,
    plating: int,
    location: int,
    priceToValue: int,
    reviewText: str,
    images: List[UploadFile] = File(...),  # Accepting multiple images
):
    userID = checkForUser.getUserID(userName)
    if userID is None:
        raise HTTPException(status_code=400, detail="User not found.")
    
    # Save uploaded images to a temporary location
    image_paths = []
    try:
        for image in images:
            # Create a temporary file for the uploaded image
            temp_image_path = f"/tmp/{image.filename}"  # Adjust path as needed
            with open(temp_image_path, "wb") as buffer:
                buffer.write(await image.read())
            image_paths.append(temp_image_path)
        
        # Use your helper function to upload images and create an album
        addPicturesToRestaurant.addPicturesToRestaurant(restaurantName, image_paths)

        # Now you can proceed to create the review
        operationsDB.createReview(
            userID,
            restaurantName,
            ambient,
            service,
            taste,
            plating,
            location,
            priceToValue,
            reviewText,
        )
        
        return {"message": "Review uploaded successfully."}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing images: {str(e)}")

    finally:
        # Optionally clean up temporary image files
        for path in image_paths:
            try:
                os.remove(path)  # Remove temporary image files
            except OSError:
                pass  # Handle errors if needed