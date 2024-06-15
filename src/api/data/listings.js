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
} from 'firebase/firestore';
import db from '../../firebase/firebase';
import {
  filterByDateRange,
  filterByGuests,
  filterBySearchTerm,
  filterByCreator,
} from './filterFunctions';

const firestore = db;

// Fetch a single listing by ID
const fetchListingById = async (listingsCollection, listingId) => {
  const listingDocRef = doc(listingsCollection, listingId);
  const listingSnapshot = await getDoc(listingDocRef);
  if (!listingSnapshot.exists()) throw new Error('No such document!');
  return { id: listingSnapshot.id, ...listingSnapshot.data() };
};

// Build query based on filters
const buildQueryWithFilters = (listingsCollection, filters) => {
  let queryConstraints = [];

  if (filters.dates) {
    queryConstraints.push(
      ...filterByDateRange(filters.dates.from, filters.dates.to),
    );
  }

  if (filters.guests !== undefined) {
    queryConstraints.push(...filterByGuests(filters.guests));
  }

  if (filters.search) {
    queryConstraints.push(...filterBySearchTerm(filters.search));
  }

  if (filters.createdBy) {
    queryConstraints.push(...filterByCreator(filters.createdBy));
  }

  return query(listingsCollection, ...queryConstraints);
};

export const getListingDataFromFirestore = async (filtersOrId) => {
  try {
    const listingsCollection = collection(firestore, 'listings');

    if (typeof filtersOrId === 'string') {
      // Fetch a single listing based on listingId
      return await fetchListingById(listingsCollection, filtersOrId);
    } else if (typeof filtersOrId === 'object') {
      // Fetch listings based on filters
      const listingsQuery = buildQueryWithFilters(
        listingsCollection,
        filtersOrId,
      );
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
