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
from Backend.Data.Helpers.Readers.getAllRestaurants import getAllRestaurants, getAllRestaurantSortedByHighestRating, getAllRestaurantSortedByNewest, getAllRestaurantsSortedByMostReviews
from Backend.Data.Helpers.Readers.getReviewsForRestaurant import getReviews
from Backend.Data.Helpers.Readers.getRestaurant import getRestaurantByName 
from Backend.Data.Helpers.Readers.getUserByMail import getUserByMail
from Backend.Data.Helpers.Readers.getReviewsByUser import getReviewsByUser
from dotenv import load_dotenv
from Backend.Data.Helpers.Readers.getReviewsUsername import getReviewsUsername
from Backend.Data.Helpers.Operations.userOperations import changeUsername, changePassword

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


class UsernameUpdateRequest(BaseModel):
    email: str
    new_username: str

class PasswordUpdateRequest(BaseModel):
    email: str
    new_password: str

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

from fastapi import HTTPException

@app.get("/getUserByMail/{email}")
async def get_user_by_mail(email: str):
    decoded_email = email  # The URL-encoded email is automatically decoded by FastAPI
    logger.info(f"Fetching user by email: {decoded_email}")

    user = getUserByMail(decoded_email)  # Use the decoded email here
    if user is None:
        logger.error(f"User not found for email: {decoded_email}.")
        raise HTTPException(status_code=404, detail="User not found")
    
    logger.info(f"Successfully retrieved user by email: {decoded_email}.")
    return JSONResponse(content=user)


@app.get("/allRestaurantsTrending")
async def get_restaurants_trending():
    logger.info("Fetching all restaurants by most reviews.")
    restaurants = getAllRestaurantsSortedByMostReviews()
    if restaurants is None:
        logger.error("Error retrieving all restaurants.")
        return JSONResponse(status_code=500, content={"message": "Error retrieving data"})
    logger.info("Successfully retrieved all restaurants.")
    return JSONResponse(content=restaurants)

@app.get("/allRestaurantsNewest")
async def get_restaurants_newest():
    logger.info("Fetching all restaurants by newest reviews.")
    restaurants = getAllRestaurantSortedByNewest()
    if restaurants is None:
        logger.error("Error retrieving all restaurants.")
        return JSONResponse(status_code=500, content={"message": "Error retrieving data"})
    logger.info("Successfully retrieved all restaurants.")
    return JSONResponse(content=restaurants)

@app.get("/allRestaurantsTopRated")
async def get_restaurants_top_rated():
    logger.info("Fetching all restaurants by highest rating.")
    restaurants = getAllRestaurantSortedByHighestRating()
    if restaurants is None:
        logger.error("Error retrieving all restaurants.")
        return JSONResponse(status_code=500, content={"message": "Error retrieving data"})
    logger.info("Successfully retrieved all restaurants.")
    return JSONResponse(content=restaurants)

@app.get("/getReviewsByUser/{email}")
async def get_reviews_by_user(email: str):
    decoded_email = email  # The URL-encoded email is automatically decoded by FastAPI
    logger.info(f"Fetching reviews by user: {decoded_email}")
    reviews = getReviewsByUser(decoded_email)
    if reviews is None:
        logger.error(f"Error retrieving reviews for user: {decoded_email}.")
        return JSONResponse(status_code=500, content={"message": "Error retrieving data"})
    logger.info(f"Successfully retrieved reviews for user: {decoded_email}.")
    return JSONResponse(content=reviews)

@app.get("/getReviewsUsername/{username}")
async def get_reviews_username(username: str):
    logger.info(f"Fetching reviews by user: {username}")
    reviews = getReviewsUsername(username)
    if reviews is None:
        logger.error(f"Error retrieving reviews for user: {username}.")
        return JSONResponse(status_code=500, content={"message": "Error retrieving data"})
    logger.info(f"Successfully retrieved reviews for user: {username}.")
    return JSONResponse(content=reviews)

@app.post("/updateUsername")
async def update_username(data: UsernameUpdateRequest):
    logger.info(f"Updating username for user: {data.email}")
    if changeUsername(data.email, data.new_username):
        logger.info(f"Username updated successfully for user: {data.email}.")
        return JSONResponse(status_code=200, content={"message": "Username updated successfully."})
    else:
        logger.error(f"Error updating username for user: {data.email}.")
        return JSONResponse(status_code=500, content={"message": "Error updating username."})
    
@app.post("/updatePassword")
async def update_password(data: PasswordUpdateRequest):
    logger.info(f"Attempting to update password for user: {data.email}")
    if changePassword(data.email, data.new_password):
        logger.info(f"Password updated successfully for user: {data.email}")
        return JSONResponse(status_code=200, content={"message": "Password updated successfully."})
    else:
        logger.error(f"Error updating password for user: {data.email}")
        raise HTTPException(status_code=500, detail="Error updating password.")
