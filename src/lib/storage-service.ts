
import { storage } from './firebase';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';

/**
 * Uploads a base64 or data URL string to Firebase Storage.
 * @param dataUrl The image data as a data URL.
 * @param path The path in Firebase Storage where the image will be saved (e.g., 'students/photos').
 * @returns The public download URL of the uploaded image.
 */
export async function uploadImage(dataUrl: string, path: string): Promise<string> {
  if (!dataUrl.startsWith('data:image')) {
    // If it's already a URL (e.g., http, gs), just return it.
    return dataUrl;
  }
  
  const fileExtension = dataUrl.substring(dataUrl.indexOf('/') + 1, dataUrl.indexOf(';base64'));
  const fileName = `${new Date().getTime()}.${fileExtension}`;
  const storageRef = ref(storage, `${path}/${fileName}`);
  
  // 'data_url' is the correct format string for uploadString with a data URL.
  const snapshot = await uploadString(storageRef, dataUrl, 'data_url');
  const downloadURL = await getDownloadURL(snapshot.ref);
  
  return downloadURL;
}
