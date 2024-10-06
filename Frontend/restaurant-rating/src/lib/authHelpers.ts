// /lib/authHelpers.ts
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";

export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
    //console.log(auth.currentUser); <-- Indicated succesful logout: null
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};
