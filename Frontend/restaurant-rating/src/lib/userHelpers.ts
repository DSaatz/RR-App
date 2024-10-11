import { getUserByMail } from "./APIHelpers";

export const getCurrentUser = async () => {
  let user;
  try {
    const userString = localStorage.getItem('user');
    if (!userString) {
      console.log('No user found in localStorage');
      return null;
    }
    user = JSON.parse(userString);
    console.log('User parsed from localStorage:', user);
  } catch (error) {
    console.error('Error parsing user from localStorage:', error);
    return null;
  }

  console.log('Current user from localStorage:', user);

  if (!user || !user.email) {
    console.log('No valid user or email found');
    return null;
  }

  try {
    const response = await getUserByMail(user.email);
    if (response && response.username) {
      console.log('User fetched from API:', response);
      return response;
    } else {
      console.log('No valid user data returned from API');
      return null;
    }
  } catch (error) {
    console.error("Error fetching current user from API:", error);
    return null;
  }
};