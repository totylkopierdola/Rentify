import { where } from 'firebase/firestore';

export const filterByDateRange = (from, to) => {
  return [
    where('dates.from', '<=', new Date(to)),
    where('dates.to', '>=', new Date(from)),
  ];
};

export const filterByGuests = (guests) => {
  return guests > 0 ? [where('maxGuests', '>=', guests)] : [];
};

export const filterBySearchTerm = (searchTerm) => {
  return searchTerm
    ? [
        where('name', '>=', searchTerm),
        where('name', '<=', searchTerm + '\uf8ff'),
      ]
    : [];
};

export const filterByCreator = (creatorId) => {
  return creatorId ? [where('createdBy', '==', creatorId)] : [];
};
