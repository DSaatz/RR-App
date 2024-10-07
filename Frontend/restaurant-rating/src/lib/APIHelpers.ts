import { User } from "@/models/User";
import { Restaurant} from "@/models/Restaurant";
import { Review } from "@/models/Review";

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
