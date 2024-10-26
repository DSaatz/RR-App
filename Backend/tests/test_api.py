import requests
import pytest
from pathlib import Path
import os

BASE_URL = "http://localhost:8000"  # Adjust if your server runs on a different port

def test_register_user():
    url = f"{BASE_URL}/registerUser"
    payload = {
        "username": "testuser2",
        "email": "testuser2@example.com",
        "password": "testpassword69"
    }
    response = requests.post(url, json=payload)
    print(f"Register User Response: {response.status_code}")
    print(f"Response content: {response.json()}")
    assert response.status_code in [200, 400]  # 400 if user already exists

def test_upload_review():
    url = f"{BASE_URL}/uploadReview"
    
    data = {
        "userName": "testuser",
        "restaurantName": "Test Restaurant",
        "ambient": 4,
        "service": 5,
        "taste": 5,
        "plating": 4,
        "location": 4,
        "priceToValue": 4,
        "reviewText": "This is a test review"
    }
    
    response = requests.post(url, json=data)  # Send as JSON since no files are involved
    print(f"Upload Review Response: {response.status_code}")
    print(f"Response content: {response.json()}")
    assert response.status_code == 200


def test_get_all_restaurants():
    url = f"{BASE_URL}/allRestaurants"
    response = requests.get(url)
    print(f"Get All Restaurants Response: {response.status_code}")
    print(f"Response content: {response.json()}")
    assert response.status_code == 200

def test_get_specific_restaurant():
    restaurant_name = "Test Restaurant"
    url = f"{BASE_URL}/getRestaurant/{restaurant_name}"
    response = requests.get(url)
    print(f"Get Specific Restaurant Response: {response.status_code}")
    print(f"Response content: {response.json()}")
    assert response.status_code == 200

def test_get_reviews():
    restaurant_name = "Test Restaurant"
    url = f"{BASE_URL}/getReviews/{restaurant_name}"
    response = requests.get(url)
    print(f"Get Reviews Response: {response.status_code}")
    print(f"Response content: {response.json()}")
    assert response.status_code == 200

def test_get_user_by_mail():
    email = "testuser@example.com"
    url = f"{BASE_URL}/getUserByMail/{email}"
    response = requests.get(url)
    print(f"Get User By Mail Response: {response.status_code}")
    print(f"Response content: {response.json()}")
    assert response.status_code == 200

def test_get_reviews_by_user_username():
    username = "testuser"
    url = f"{BASE_URL}/getReviewsUsername/{username}"
    response = requests.get(url)
    print(f"Get Reviews By User Username Response: {response.status_code}")
    print(f"Response content: {response.json()}")
    assert response.status_code == 200

def test_change_username():
    payload = {
        "email": "testuser2@example.com",
        "new_username": "testuser2New"
    }
    url = f"{BASE_URL}/updateUsername"
    response = requests.post(url, json=payload)
    print(f"Change Username Response: {response.status_code}")
    print(f"Response content: {response.json()}")
    assert response.status_code == 200

def test_change_password():
    payload = {
        "email": "testuser2@example.com",
        "new_password": "newpassword123"
    }
    url = f"{BASE_URL}/updatePassword"
    response = requests.post(url, json=payload)
    print(f"Change Password Response: {response.status_code}")
    print(f"Response content: {response.json()}")
    assert response.status_code == 200


if __name__ == "__main__":
    print("Starting API tests...")
    test_register_user()
    #test_upload_review()
    #test_get_all_restaurants()
    #test_get_specific_restaurant()
    #test_get_reviews()
    #test_get_user_by_mail()
    #test_get_reviews_by_user_username()
    #test_change_username()
    #test_change_password()

    print("All tests completed!")