import { addDays, startOfDay } from 'date-fns';
import Fuse from 'fuse.js';
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  addDoc,
  getDocs,
  serverTimestamp,
  query,
  updateDoc,
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
  const queryConstraints = [
    ...(filters.dates
      ? filterByDateRange(filters.dates.from, filters.dates.to)
      : []),
    ...(filters.guests !== undefined ? filterByGuests(filters.guests) : []),
    ...(filters.createdBy ? filterByCreator(filters.createdBy) : []),
  ];

  return query(listingsCollection, ...queryConstraints);
};

// Apply fuzzy search
const applyFuzzySearch = (listings, searchTerm) => {
  const options = {
    keys: ['name'],
    threshold: 0.3, // Adjust the threshold for fuzzy matching
  };
  const fuse = new Fuse(listings, options);
  return fuse.search(searchTerm).map((result) => result.item);
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
      let listings = listingsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Apply fuzzy search if search term is provided
      if (filtersOrId.search) {
        listings = applyFuzzySearch(listings, filtersOrId.search);
      }

      return listings;
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

export const updateListingInFirestore = async (listingId, updatedData) => {
  try {
    const listingRef = doc(db, 'listings', listingId);
    await updateDoc(listingRef, updatedData);
    console.log('Listing updated successfully!');
  } catch (error) {
    console.error('Error updating listing: ', error);
  }
};
