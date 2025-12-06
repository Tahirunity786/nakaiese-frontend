import { format } from "date-fns";

/**
 * Formats a JS Date object to 'YYYY-MM-DD' string for URLs.
 * Returns empty string if date is null.
 */
export const formatDateParam = (date) => {
  if (!date) return "";
  return format(date, "yyyy-MM-dd");
};

/**
 * Constructs the query string object for Next.js router.
 * Removes empty keys to keep URL clean.
 */
export const buildSearchQuery = (destination, dateRange, guests) => {
  const [startDate, endDate] = dateRange;

  const query = {
    city: destination || undefined, // undefined keys are ignored by Next.js router
    checkin: formatDateParam(startDate),
    checkout: formatDateParam(endDate),
    adults: guests.adults > 1 ? guests.adults : undefined,
    children: guests.children > 0 ? guests.children : undefined,
    rooms: guests.rooms > 1 ? guests.rooms : undefined,
    pets: guests.pets ? "true" : undefined,
  };

  // Filter out undefined values manually if needed, 
  // but Next.js router.push handles objects well.
  return query;
};