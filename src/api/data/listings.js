import { addDays, startOfDay } from 'date-fns';
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  addDoc,
  getDocs,
  serverTimestamp,
  query,
  where,
} from 'firebase/firestore';

// firebase
import db from '../../firebase/firebase';
import '../../firebase/firebase';
const firestore = db;

export const getListingDataFromFirestore = async (filtersOrId) => {
  try {
    const listingsCollection = collection(firestore, 'listings');

    // Function to fetch a single listing by ID
    const fetchListingById = async (listingId) => {
      const listingDocRef = doc(listingsCollection, listingId);
      const listingSnapshot = await getDoc(listingDocRef);
      if (!listingSnapshot.exists()) throw new Error('No such document!');
      return { id: listingSnapshot.id, ...listingSnapshot.data() };
    };

    // Function to build query based on filters
    const buildQueryWithFilters = (filters) => {
      let queryConstraints = [];

      console.log(filters);

      if (filters.dates !== undefined) {
        // query between two dates:

        queryConstraints.push(
          where('dates.from', '<=', new Date(filters.dates.to)),
          where('dates.to', '>=', new Date(filters.dates.from)),
        );
      }

      if (filters.guests > 0) {
        queryConstraints.push(where('maxGuests', '>=', filters.guests));
      }

      if (filters.search) {
        queryConstraints.push(
          where('name', '>=', filters.search),
          where('name', '<=', filters.search + '\uf8ff'),
        );
      }

      if (filters.createdBy) {
        console.log('filters.createdBy', filters.createdBy);

        queryConstraints.push(where('createdBy', '==', filters.createdBy));
      }

      return query(listingsCollection, ...queryConstraints);
    };

    if (typeof filtersOrId === 'string') {
      // Fetch a single listing based on listingId
      return await fetchListingById(filtersOrId);
    } else if (typeof filtersOrId === 'object') {
      // Fetch listings based on filters
      const listingsQuery = buildQueryWithFilters(filtersOrId);
      const listingsSnapshot = await getDocs(listingsQuery);
      return listingsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } else {
      throw new Error(
        'Invalid input: filtersOrId must be a string or an object',
      );
    }
  } catch (error) {
    console.error('Error getting listings: ', error);
    throw error;
  }
};

export const createListingInFirestore = async (listing, userId) => {
  try {
    const docRef = await addDoc(collection(firestore, 'listings'), {
      ...listing,
      createdAt: serverTimestamp(),
      modifiedAt: serverTimestamp(),
      createdBy: userId,
    });
    console.log('Document written with ID: ', docRef.id);
    return docRef.id; // Return the ID of the newly created document
  } catch (error) {
    console.error('Error adding document: ', error);
    throw error;
  }
};

export async function addListingToFirestore(listingObject) {
  try {
    const listingsCollectionRef = collection(db, 'listings');
    // Use addDoc to add the property object to Firestore
    const docRef = await addDoc(listingsCollectionRef, {
      ...listingObject,
      // If you have an 'id' field in propertyObject, you may omit it here as Firestore will auto-generate a new ID
    });

    console.log('Property added with ID: ', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding property to Firestore: ', error);
    throw error;
  }
}
