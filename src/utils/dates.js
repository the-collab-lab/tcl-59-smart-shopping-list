const ONE_DAY_IN_MILLISECONDS = 86400000;

/**
 * Get a new JavaScript Date that is `offset` days in the future.
 * @example
 * // Returns a Date 3 days in the future
 * getFutureDate(3)
 * @param {number} offset
 */
export function getFutureDate(offset) {
	return new Date(Date.now() + offset * ONE_DAY_IN_MILLISECONDS);
}

/**
 *
 * @param {firebase.firestore.Timestamp} startTimestamp
 * @param {firebase.firestore.Timestamp} endTimestamp
 * @returns {number} number of days between two dates.
 */

export function getDaysBetweenDates(startTimestamp, endTimestamp) {
	const start = startTimestamp.toDate();
	const end = endTimestamp.toDate();
	const timeDifference = end.getTime() - start.getTime();
	const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
	return daysDifference;
}
