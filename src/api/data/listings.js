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

    // Function to fetch a single listing by ID
    const fetchListingById = async (listingId) => {
      const listingDocRef = doc(listingsCollection, listingId);
      const listingSnapshot = await getDoc(listingDocRef);
      if (!listingSnapshot.exists()) throw new Error('No such document!');
      return listingSnapshot.data();
    };

    // Function to build query based on filters
    const buildQueryWithFilters = (filters) => {
      let queryConstraints = [];

      if (filters.from && filters.to) {
        queryConstraints.push(
          where('availability.from', '<=', new Date(filters.to)),
          where('availability.to', '>=', new Date(filters.from)),
        );
      }

      if (filters.guests) {
        queryConstraints.push(where('maxGuests', '>=', filters.guests));
      }

      if (filters.search) {
        queryConstraints.push(
          where('name', '>=', filters.search),
          where('name', '<=', filters.search + '\uf8ff'),
        );
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

// const admin = require('firebase-admin');

// Function to add a property object to Firestore
export async function addListingToFirestore(listingObject) {
  try {
    const listingsCollectionRef = collection(db, 'listings'); // Assuming 'db' is your Firestore instance
    // const propertiesCollectionRef = collection(db, 'properties'); // Assuming 'db' is your Firestore instance

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

// Example usage:
export const listingObject = {
  guestFavorite: false,
  availability: {
    to: {
      seconds: 1719196248,
      nanoseconds: 0,
    },
    from: {
      seconds: 1719196248,
      nanoseconds: 0,
    },
  },
  modifiedAt: {
    seconds: 1719196248,
    nanoseconds: 0,
  },
  description:
    'EstudioVintage. Heliopolis is located in Seville, 4 km from Alcazar and 4 km from Plaza de España. The property is approximately 4.7 km from Triana-Isabella II Bridge, 5.3 km from Santa María La Blanca Church and 7.7 km from La Giralda and Seville Cathedral. Free WiFi is available throughout the property. Maria Luisa Park is 3.7 km from the property. Some apartments have a terrace, a seating area with a flat-screen TV, air conditioning and heating. In the apartment complex, each apartment has a private bathroom. Mágica Island is 7.7 km from the apartment, while Seville Aquarium is 2.3 km away. The nearest airport is Seville Airport, 14 km from EstudioVintage. Heliopolis.',
  images: [
    'https://firebasestorage.googleapis.com/v0/b/bookapp-2a36e.appspot.com/o/images%2F1.jpg?alt=media&token=f0f3c78b-f192-4cb8-80ef-91e875b52712',
    'https://firebasestorage.googleapis.com/v0/b/bookapp-2a36e.appspot.com/o/images%2F2.jpg?alt=media&token=6f87003c-e950-4587-88a3-226a9cb3af3c',
    'https://firebasestorage.googleapis.com/v0/b/bookapp-2a36e.appspot.com/o/images%2F3.jpg?alt=media&token=7b6ddeac-3d4f-4b66-b6d0-02f1f050c94b',
    'https://firebasestorage.googleapis.com/v0/b/bookapp-2a36e.appspot.com/o/images%2F4.jpg?alt=media&token=bd913017-be76-46aa-a18d-11867f753859',
    'https://firebasestorage.googleapis.com/v0/b/bookapp-2a36e.appspot.com/o/images%2F5.jpg?alt=media&token=6390bd36-8ae4-413a-a453-043bbbe21c8f',
  ],
  name: 'EstudioVintage. Heliopolis',
  rating: 0,
  price: 699,
  createdAt: {
    seconds: 1719196248,
    nanoseconds: 0,
  },
  maxGuests: 4,
  location: 'Sevilla, Spain',
};
