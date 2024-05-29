import { addDays, startOfDay } from 'date-fns';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  query,
  where,
} from 'firebase/firestore';

import { firebaseConfig } from '../../firebase';
import '../../firebase';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const firestore = getFirestore(app);

const startOfToday = startOfDay(new Date());

const createListing = (listing) => {
  const {
    availability = { from: startOfToday, to: addDays(startOfToday, 7) }, // Default availability
    description = '', // Default to empty string if undefined
    guestFavorite = false, // Default to false if undefined
    id,
    maxGuests = 1, // Default to 1 if undefined
    name = '', // Default to empty string if undefined
    locationId,
    images = [], // Default to empty array if undefined
    price = 0, // Default to 0 if undefined
    rating = 0, // Default to 0 if undefined
  } = listing;

  return {
    id,
    name,
    description,
    locationId,
    images,
    availability,
    maxGuests,
    price,
    rating,
    guestFavorite,
    createdAt: new Date(),
    modifiedAt: new Date(),
  };
};

const listings = [
  createListing({
    id: 1,
    name: 'Cozy Apartment in London',
    description: `This beautiful and spacious apartment is located in the heart of London, just a stone's throw away from all the major attractions and landmarks. With its modern and stylish decor, this apartment is the perfect choice for anyone looking for a comfortable and convenient stay in the city.

The apartment features a large living room with plenty of natural light, a fully equipped kitchen with all the necessary appliances, and a cozy bedroom with a comfortable bed and high-quality linens. The bathroom is modern and clean, with a large shower and plenty of towels provided.

With its central location, modern amenities, and comfortable furnishings, this apartment is sure to make your stay in London a memorable one. Book now and experience the best that the city has to offer!`,
    locationId: 1,
    images: [
      'listing1-1.jpg',
      'listing1-2.jpg',
      'listing1-3.jpg',
      'listing1-4.jpg',
      'listing1-5.jpg',
      'listing1-6.jpg',
      'listing1-7.jpg',
    ],
    price: 100,
    maxGuests: 4,
    availability: {
      from: startOfToday,
      to: addDays(startOfToday, 7),
    },
  }),
  createListing({
    id: 2,
    name: 'Charming Studio in Paris',
    description: `This charming studio is located in the heart of Paris, just a few minutes' walk from the Louvre Museum and the Pompidou Center. It is also close to many restaurants, cafes, and shops.

    The studio is located on the 3rd floor of a building with an elevator. It has a living room with a sofa bed, a kitchenette, and a bathroom with a shower and toilet. The studio is equipped with a TV, a DVD player, and a washing machine.

    Another thing to note is that the studio is located in a quiet residential area, but it is still close to many restaurants, cafes, and shops. It is also close to the British Museum and the National Gallery.`,
    locationId: 2,
    images: [
      'listing2-1.jpg',
      'listing2-2.jpg',
      'listing2-3.jpg',
      'listing2-4.jpg',
      'listing2-5.jpg',
      'listing2-6.jpg',
      'listing2-7.jpg',
    ],
    price: 120,
    maxGuests: 2,
    availability: {
      from: startOfToday,
      to: addDays(startOfToday, 14),
    },
  }),
  createListing({
    id: 3,
    name: 'Spacious House in London',
    description: `This spacious house is located in the heart of London, just a few minutes' walk from the nearest metro station. It has a large living room with a fireplace, a fully equipped kitchen, and a dining area. The house has three bedrooms and two bathrooms.

    The house is located in a quiet residential area, but it is still close to many restaurants, cafes, and shops. It is also close to the British Museum and the National Gallery.

    One of the bedrooms has a double bed, while the other two have twin beds. The house is equipped with a TV, a DVD player, and a washing machine.

    If you need any help during your stay, we will be happy to assist you. We look forward to welcoming you to London!`,
    locationId: 1,
    images: [
      'listing3-1.jpg',
      'listing3-2.jpg',
      'listing3-3.jpg',
      'listing3-4.jpg',
    ],
    price: 200,
    maxGuests: 6,
    availability: {
      from: startOfToday,
      to: addDays(startOfToday, 30),
    },
  }),
  createListing({
    id: 4,
    name: 'Stylish Loft in Paris',
    description: `This stylish loft is located in the heart of Paris, just a few minutes' walk from the Louvre Museum and the Pompidou Center. It is also close to many restaurants, cafes, and shops.
    
    The loft is located on the 3rd floor of a building with an elevator. It has a living room with a sofa bed, a kitchenette, and a bathroom with a shower and toilet. The loft is equipped with a TV, a DVD player, and a washing machine.`,
    locationId: 2,
    images: [
      'listing4-1.jpg',
      'listing4-2.jpg',
      'listing4-3.jpg',
      'listing4-4.jpg',
    ],
    price: 150,
    maxGuests: 3,
    availability: {
      from: startOfToday,
      to: addDays(startOfToday, 10),
    },
  }),
];

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

export const getAllListingsFromFirestore = async (filters) => {
  // Abort the previous request if it exists
  if (currentAbortController) {
    currentAbortController.abort();
  }

  // Create a new AbortController for the current request
  currentAbortController = new AbortController();
  const { signal } = currentAbortController;

  try {
    const listingsCollection = collection(firestore, 'listings');
    let listingsQuery = query(listingsCollection);

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
        where('name', '==', filters.search),
      );
    }

    const listingsSnapshot = await getDocs(listingsQuery, { signal });
    const listingsList = listingsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return listingsList;
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Previous request aborted');
    } else {
      console.error('Error getting listings: ', error);
      throw error;
    }
  } finally {
    // Reset the AbortController once the operation is done
    currentAbortController = null;
  }
};

const createListingInFirestore = async (listing) => {
  try {
    const docRef = await addDoc(collection(firestore, 'listings'), {
      ...listing,
      createdAt: serverTimestamp(),
      modifiedAt: serverTimestamp(),
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
export { listings };
