import { User } from "@/models/User";
import { Restaurant} from "@/models/Restaurant";
import { Review } from "@/models/Review";
import { getCurrentUser } from "./userHelpers";

import axios, { AxiosError } from 'axios';

const BASE_URL = "http://localhost:8000"; // Update to match your API base URL

export const registerUser = async (username: string, email: string, password: string) => {
  const url = `${BASE_URL}/registerUser`;
  const payload = {"username": username, "email": email, "password": password};

  try {
    const response = await axios.post(url, payload);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorResponse = error.response;
      if (errorResponse) {
        console.error('Error response:', errorResponse.data);
        return errorResponse;
      }
    } else {
      console.error('Unexpected error:', error);
    }
  }
}

export const getUserByMail = async (email: string) => {
  const url = `${BASE_URL}/getUserByMail/${email}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorResponse = error.response;
      if (errorResponse) {
        console.error('Error response:', errorResponse.data);
        return errorResponse;
      }
    } else {
      console.error('Unexpected error:', error);
    }
  }
}

export const uploadReview = async (review: Review) => {
  const url = `${BASE_URL}/uploadReview`;
  const payload = {
    "userName": review.username,
    "restaurantName": review.restaurantName,
    "ambient": review.ambienceRating,
    "service": review.serviceRating,
    "taste": review.tasteRating,
    "plating": review.platingRating,
    "location": review.locationRating,
    "priceToValue": review.priceToValueRating,
    "reviewText": review.reviewText
  }

  try {
    console.log('Sending payload:', JSON.stringify(payload, null, 2));
    const response = await axios.post(url, payload);
    console.log('Upload Review Response:', response.status, response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorResponse = error.response;
      if (errorResponse) {
        console.error('Error response:', errorResponse.status, JSON.stringify(errorResponse.data, null, 2));
        throw new Error(`Server error: ${JSON.stringify(errorResponse.data.detail || 'Unknown error')}`);
      }
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
}

export const getAllReviews = async () => {
  const url = `${BASE_URL}/allRestaurants`;

  try {
    const response = await axios.get(url);
   // console.log('All Reviews:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorResponse = error.response;
      if (errorResponse) {
        console.error('Error response:', errorResponse.status, JSON.stringify(errorResponse.data, null, 2));
        throw new Error(`Server error: ${JSON.stringify(errorResponse.data.detail || 'Unknown error')}`);
      }
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
}

export const getAllReviewsSortedByRating = async () => {
  const url = `${BASE_URL}/allRestaurantsTopRated`;

  try {
    const response = await axios.get(url);
    //console.log('All Reviews:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorResponse = error.response;
      if (errorResponse) {
        console.error('Error response:', errorResponse.status, JSON.stringify(errorResponse.data, null, 2));
        throw new Error(`Server error: ${JSON.stringify(errorResponse.data.detail || 'Unknown error')}`);
      }
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
}

export const getAllReviewsSortedByTrending = async () => {
  const url = `${BASE_URL}/allRestaurantsTrending`;

  try {
    const response = await axios.get(url);
    //console.log('All Reviews:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorResponse = error.response;
      if (errorResponse) {
        console.error('Error response:', errorResponse.status, JSON.stringify(errorResponse.data, null, 2));
        throw new Error(`Server error: ${JSON.stringify(errorResponse.data.detail || 'Unknown error')}`);
      }
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
}

export const getAllReviewsNewest = async () => {
  const url = `${BASE_URL}/allRestaurantsNewest`;

  try {
    const response = await axios.get(url);
    //console.log('All Reviews:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorResponse = error.response;
      if (errorResponse) {
        console.error('Error response:', errorResponse.status, JSON.stringify(errorResponse.data, null, 2));
        throw new Error(`Server error: ${JSON.stringify(errorResponse.data.detail || 'Unknown error')}`);
      }
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
}

export const getAllReviewsByUser = async (email: string) => {
  const url = `${BASE_URL}/getReviewsByUser/${email}`;

  try {
    const response = await axios.get(url);
    //console.log('All Reviews:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorResponse = error.response;
      if (errorResponse) {
        console.error('Error response:', errorResponse.status, JSON.stringify(errorResponse.data, null, 2));
        throw new Error(`Server error: ${JSON.stringify(errorResponse.data.detail || 'Unknown error')}`);
      }
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
}

export const getReviewsByUsername = async (username: string) => {
  const url = `${BASE_URL}/getReviewsUsername/${username}`;

  try {
    const response = await axios.get(url);
    //console.log('All Reviews:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorResponse = error.response;
      if (errorResponse) {
        console.error('Error response:', errorResponse.status, JSON.stringify(errorResponse.data, null, 2));
        throw new Error(`Server error: ${JSON.stringify(errorResponse.data.detail || 'Unknown error')}`);
      }
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
}

export const changeUsername = async (email: string, newUsername: string) => {
  const url = `${BASE_URL}/updateUsername`;
  const payload = {
    email: email,
    new_username: newUsername // Note: This should match the API's expected field name
  };

  try {
    console.log('Sending payload:', payload);
    const response = await axios.post(url, payload);
    console.log('Response:', response);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data);
      return error.response;
    } else {
      console.error('Unexpected error:', error);
      throw error;
    }
  }
}

// Similarly, update changePassword and deleteUser functions

export const changePassword = async (email: string, newPassword: string) => {
  const url = `${BASE_URL}/updatePassword`;
  const payload = {
    email: email,
    new_password: newPassword
  };

  try {
    console.log('Sending payload:', payload);
    const response = await axios.post(url, payload);
    console.log('Response:', response);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data);
      return error.response;
    } else {
      console.error('Unexpected error:', error);
      throw error;
    }
  }
}

export const deleteUser = async (email: string) => {
  const url = `${BASE_URL}/deleteUser`;
  const payload = {
    email: email
  };

  try {
    console.log('Sending payload:', payload);
    const response = await axios.post(url, payload);
    console.log('Response:', response);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data);
      return error.response;
    } else {
      console.error('Unexpected error:', error);
      throw error;
    }
  }
}

export const updateProfilePicture = async (email: string, profilePictureLink: string) => {
  const url = `${BASE_URL}/updateProfilePicture`;
  const payload = {
    email: email,
    profilePictureLink: profilePictureLink
  };

  try {
    const response = await axios.post(url, payload);
    return response;
  } catch (error) {
    console.error('Error updating profile picture:', error);
    throw error;
  }
};

export const getUserProfilePictureUrl = async (email: string): Promise<string | null> => {
  const url = `${BASE_URL}/getUserProfilePicture/${encodeURIComponent(email)}`;

  try {
    const response = await axios.get(url);
    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      console.error('No profile picture found or unexpected response structure');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user profile picture URL:', error);
    return null;
  }
}