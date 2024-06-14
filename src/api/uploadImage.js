import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { storage } from '../firebase';
import { storage } from '../firebase/firebase';

// Function to generate a unique file name
const generateUniqueFileName = (fileName) => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const fileExtension = fileName.split('.').pop();
  return `${timestamp}_${randomString}.${fileExtension}`;
};

export const uploadImage = async (file) => {
  const uniqueFileName = generateUniqueFileName(file.name);
  const storageRef = ref(storage, `images/${uniqueFileName}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};
