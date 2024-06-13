import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { storage } from '../firebase';
import { storage } from '../firebase/firebase';

export const uploadImage = async (file) => {
  const storageRef = ref(storage, `images/${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};
