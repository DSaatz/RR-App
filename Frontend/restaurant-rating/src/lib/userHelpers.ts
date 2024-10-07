import { getUserByMail } from "./APIHelpers";

export const getCurrentUser = async () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  console.log('Current user:', user);
  const email = user.email;
  if (!email) {
    return null;
  }

  try {
    const response = await getUserByMail(email);
    if (response && response.username) {
      console.log('User by mail:', response);
      return response
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
};
