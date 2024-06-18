export const convertTimestampToDate = (timestamp) => {
  if (!timestamp || typeof timestamp.seconds !== 'number') {
    return new Date();
  }
  return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
};
