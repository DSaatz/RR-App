import logging
from fastapi import FastAPI, HTTPException, File, UploadFile
from fastapi.responses import JSONResponse
from pydantic import BaseModel, EmailStr
from fastapi.middleware.cors import CORSMiddleware
import sys
sys.path.append('../')
import os
from typing import List
from Backend.Data.Helpers.Readers import checkForUser
from Backend.Data.Helpers.Operations import operationsDB
from Backend.Auth import authSetup
from Backend.Auth import register
from Backend.Data.Images import addPicturesToRestaurant
from Backend.Data.Helpers.Readers.getAllRestaurants import getAllRestaurants
from Backend.Data.Helpers.Readers.getReviewsForRestaurant import getReviews
from Backend.Data.Helpers.Readers.getRestaurant import getRestaurantByName 
from dotenv import load_dotenv

load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,  # Change to DEBUG for more detailed logs
    format="%(asctime)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserRegister(BaseModel):
    username: str
    email: EmailStr
    password: str

class ReviewData(BaseModel):
    userName: str
    restaurantName: str
    ambient: int
    service: int
    taste: int
    plating: int
    location: int
    priceToValue: int
    reviewText: str

@app.post("/registerUser")
async def register_user(user: UserRegister):
    logger.info(f"Attempting to register user: {user.username}")
    if checkForUser.checkIfRegistered(user.username, user.email):
        logger.warning(f"User already registered: {user.username} or {user.email}")
        raise HTTPException(status_code=400, detail="Username or email already registered.")

    try:
        authSetup.initializeFirebase()
        logger.info("Firebase initialized.")

        register.registerUser(user.email, user.password)  # Register user in Firebase
        logger.info(f"User registered in Firebase: {user.email}")

        operationsDB.createUser(user.username, user.email)  # Put user in PostgreSQL database
        logger.info(f"User inserted into PostgreSQL: {user.username}")

        return {"message": "User registered successfully."}
    
    except Exception as e:
        logger.error(f"Error registering user: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error registering user: {str(e)}")

#TODO add uploading images functionallity (maybe per seperate function NOT FOR NOW!)
@app.post("/uploadReview")
async def upload_review(review_data: ReviewData):
    logger.info(f"Uploading review for user: {review_data.userName} to restaurant: {review_data.restaurantName}")
    
    userID = checkForUser.getUserID(review_data.userName)
    if userID is None:
        logger.warning(f"User not found: {review_data.userName}")
        raise HTTPException(status_code=400, detail="User not found.")
    
    try:
        # Create the review
        operationsDB.createReview(
            userID,
            review_data.restaurantName,
            review_data.ambient,
            review_data.service,
            review_data.taste,
            review_data.plating,
            review_data.location,
            review_data.priceToValue,
            review_data.reviewText,
        )
        
        logger.info(f"Review uploaded successfully for {review_data.restaurantName} by {review_data.userName}.")
        return {"message": "Review uploaded successfully."}

    except Exception as e:
        logger.error(f"Error uploading review: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error uploading review: {str(e)}")
@app.get("/allRestaurants")
async def get_restaurants():
    logger.info("Fetching all restaurants.")
    restaurants = getAllRestaurants()
    if restaurants is None:
        logger.error("Error retrieving all restaurants.")
        return JSONResponse(status_code=500, content={"message": "Error retrieving data"})
    logger.info("Successfully retrieved all restaurants.")
    return JSONResponse(content=restaurants)

@app.get("/getRestaurant/{restaurantName}")
async def get_restaurant(restaurantName: str):
    logger.info(f"Fetching restaurant: {restaurantName}")
    restaurant = getRestaurantByName(restaurantName)
    if restaurant is None:
        logger.error(f"Error retrieving restaurant: {restaurantName}.")
        return JSONResponse(status_code=500, content={"message": "Error retrieving data"})
    logger.info(f"Successfully retrieved restaurant: {restaurantName}.")
    return JSONResponse(content=restaurant)

@app.get("/getReviews/{restaurantName}")
async def get_reviews(restaurantName: str):
    logger.info(f"Fetching reviews for restaurant: {restaurantName}.")
    reviews = getReviews(restaurantName)
    if reviews is None:
        logger.error(f"Error retrieving reviews for restaurant: {restaurantName}.")
        return JSONResponse(status_code=500, content={"message": "Error retrieving data"})
    logger.info(f"Successfully retrieved reviews for restaurant: {restaurantName}.")
    return JSONResponse(content=reviews)
