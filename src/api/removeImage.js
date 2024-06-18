import { getStorage, ref, deleteObject } from 'firebase/storage';

// Function to remove an image from Firebase Storage
export const removeImage = async (imageUrl) => {
  try {
    const storage = getStorage();
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
    console.log(`Successfully deleted ${imageUrl}`);
  } catch (error) {
    console.error('Error removing image:', error);
    throw new Error('Failed to remove image from Firebase storage');
  }
};
