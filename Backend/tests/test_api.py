import pytest
from fastapi.testclient import TestClient
from Backend.API.API import app  # Adjust the import according to your structure
import sys
import os

# Add the Backend directory to the system path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../Backend')))

from fastapi.testclient import TestClient
from API import app  # Adjust the import according to your structure

client = TestClient(app)

class TestAPI:
    
    @pytest.fixture(scope="class", autouse=True)
    def setup_class(self):
        # Setup code to run before tests, like populating test data
        pass

    @pytest.fixture()
    def sample_user(self):
        return {
            "username": "testuser",
            "email": "testuser@example.com",
            "password": "securepassword"
        }

    def test_register_user(self, sample_user):
        response = client.post("/registerUser", json=sample_user)
        assert response.status_code == 200
        assert response.json() == {"message": "User registered successfully."}

    def test_register_duplicate_user(self, sample_user):
        client.post("/registerUser", json=sample_user)  # First registration
        response = client.post("/registerUser", json=sample_user)  # Second registration
        assert response.status_code == 400
        assert response.json() == {"detail": "Username or email already registered."}

    def test_get_all_restaurants(self):
        response = client.get("/allRestaurants")
        assert response.status_code == 200
        # You can assert more specific content if needed

    # Add more tests for other endpoints...
