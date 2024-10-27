import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth } from "./firebase";

export const uploadProfilePicture = async (file: File): Promise<string> => {
  if (!auth.currentUser) {
    throw new Error("No authenticated user");
  }

  const storage = getStorage();
  const storageRef = ref(storage, `profile_pictures/${auth.currentUser.uid}`);

  try {
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading file: ", error);
    throw error;
  }
};