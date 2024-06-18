export const convertTimestampToDate = (timestamp) => {
  if (!timestamp || typeof timestamp.seconds !== 'number') {
    return new Date();
  }
  return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
};

export const formatDate = (dateString) => {
  // Create a new Date object from the dateString
  const date = new Date(dateString);

  // Define an array for the suffixes of the day
  const suffixes = ['th', 'st', 'nd', 'rd'];

  // Extract day, month, and year from the date object
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  // Determine the suffix for the day
  let suffix;
  if (day % 10 >= 1 && day % 10 <= 3 && (day < 10 || day > 20)) {
    suffix = suffixes[day % 10];
  } else {
    suffix = suffixes[0];
  }

  // Construct the formatted date string
  const formattedDate = `${day}${suffix} ${month} ${year}`;

  return formattedDate;
};
