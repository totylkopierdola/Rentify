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

const startOfToday = startOfDay(new Date());

// Initialize Firebase

export const isListingAvailable = (listing, dates) => {
  const { availability } = listing;
  const availableFrom = new Date(availability.from.toDate());
  const availableTo = new Date(availability.to.toDate());
  const { from: checkIn, to: checkOut } = dates;

  // If there are no bounds, return true
  if (!checkIn && !checkOut) {
    return true;
  }

  // Handles check-in only
  if (checkIn && !checkOut) {
    return checkIn >= availableFrom && checkIn <= availableTo;
  }

  // Handles check-out only
  if (!checkIn && checkOut) {
    return checkOut <= availableTo && checkOut >= availableFrom;
  }

  return availableFrom <= checkIn && availableTo >= checkOut;
};
let currentAbortController = null;

export const getListingDataFromFirestore = async (filtersOrId) => {
  try {
    const listingsCollection = collection(firestore, 'listings');
    let listingsQuery;

    if (typeof filtersOrId === 'object') {
      // Fetch all listings based on filters
      const filters = filtersOrId;
      listingsQuery = query(listingsCollection);

      // Apply date range filter
      if (filters.from && filters.to) {
        listingsQuery = query(
          listingsCollection,
          where('availability.from', '<=', new Date(filters.to)),
          where('availability.to', '>=', new Date(filters.from)),
        );
      }

      // Apply guests filter
      if (filters.guests) {
        listingsQuery = query(
          listingsCollection,
          where('maxGuests', '>=', filters.guests),
        );
      }

      // Apply search value filter
      if (filters.search) {
        listingsQuery = query(
          listingsCollection,
          where('name', '>=', filters.search),
          where('name', '<=', filters.search + '\uf8ff'),
        );
      }
    } else {
      // Fetch a single listing based on listingId
      const listingId = filtersOrId;
      listingsQuery = query(
        listingsCollection,
        where('id', '==', Number(listingId)),
      );
    }

    const listingsSnapshot = await getDocs(listingsQuery);
    const listingsList = listingsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (listingsList.length === 1 && typeof filtersOrId === 'string') {
      // If only one listing is found and listingId is provided, return the single listing
      return listingsList[0];
    } else {
      // Otherwise, return the list of listings
      return listingsList;
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

// Function to add all listings to Firestore
// const addAllListingsToFirestore = async () => {
//   for (const listing of listings) {
//     try {
//       await createListingInFirestore(listing);
//     } catch (error) {
//       console.error('Error adding listing to Firestore: ', error);
//     }
//   }
// };

// addAllListingsToFirestore();

// Export listings for external use
