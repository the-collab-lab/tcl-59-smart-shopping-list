import {
	collection,
	onSnapshot,
	addDoc,
	doc,
	updateDoc,
	deleteDoc,
	getDoc,
} from 'firebase/firestore';
import { db } from './config';
import { getFutureDate } from '../utils';
import { getDaysBetweenDates } from '../utils';
import { differenceInDays } from 'date-fns';

/**
 * Subscribe to changes on a specific list in the Firestore database (listId), and run a callback (handleSuccess) every time a change happens.
 * @param {string} listId The user's list token
 * @param {Function} handleSuccess The callback function to call when we get a successful update from the database.
 * @returns {Function}
 *
 * @see https://firebase.google.com/docs/firestore/query-data/listen
 */
export function streamListItems(listId, handleSuccess) {
	const listCollectionRef = collection(db, listId);
	return onSnapshot(listCollectionRef, handleSuccess);
}

/**
 * Read the information from the provided snapshot and return an array
 * that can be stored in our React state.
 * @param {Object} snapshot A special Firebase document with information about the current state of the database.
 * @returns {Object[]} An array of objects representing the user's list.
 */
export function getItemData(snapshot) {
	/**
	 * Firebase document snapshots contain a `.docs` property that is an array of
	 * document references. We use `.map()` to iterate over them.
	 * @see https://firebase.google.com/docs/reference/js/firestore_.documentsnapshot
	 */
	return snapshot.docs.map((docRef) => {
		/**
		 * We call the `.data()` method to get the data
		 * out of the referenced document
		 */
		const data = docRef.data();

		/**
		 * The document's ID is not part of the data, but it's very useful
		 * so we get it from the document reference.
		 */
		data.id = docRef.id;

		return data;
	});
}

/**
 * Add a new item to the user's list in Firestore.
 * @param {string} listId The id of the list we're adding to.
 * @param {Object} itemData Information about the new item.
 * @param {string} itemData.itemName The name of the item.
 * @param {number} itemData.daysUntilNextPurchase The number of days until the user thinks they'll need to buy the item again.
 */
export async function addItem(listId, { itemName, daysUntilNextPurchase }) {
	const listCollectionRef = collection(db, listId);
	//const purchaseDate = new Date();
	// TODO: Replace this call to console.log with the appropriate
	// Firebase function, so this information is sent to your database!
	return addDoc(listCollectionRef, {
		dateCreated: new Date(),
		// NOTE: This is null because the item has just been created.
		// We'll use updateItem to put a Date here when the item is purchased!
		dateLastPurchased: null,
		dateNextPurchased: getFutureDate(daysUntilNextPurchase),
		name: itemName,
		totalPurchases: 0,
	});
}

export async function updateItem(
	listId,
	itemId,
	{ day, purchaseCounter, dateNextPurchased },
) {
	try {
		const listCollectionRef = doc(db, listId, itemId);
		return updateDoc(listCollectionRef, {
			dateLastPurchased: day,
			totalPurchases: purchaseCounter,
			dateNextPurchased: dateNextPurchased,
		});
	} catch (error) {
		console.error(error);
	}
	/**
	 * TODO: Fill this out so that it uses the correct Firestore function
	 * to update an existing item. You'll need to figure out what arguments
	 * this function must accept!
	 */
}

export async function deleteItem(listId, itemId) {
	try {
		return await deleteDoc(doc(db, listId, itemId));
	} catch (error) {
		console.error(error);
	}

	/**
	 * TODO: Fill this out so that it uses the correct Firestore function
	 * to delete an existing item. You'll need to figure out what arguments
	 * this function must accept!
	 */
}

export function comparePurchaseUrgency(itemA, itemB) {
	// Inactive items
	const dateLastPurchaseToDateA = itemA.dateLastPurchased
		? itemA.dateLastPurchased.toDate()
		: itemA.dateCreated.toDate();
	const dateLastPurchaseToDateB = itemB.dateLastPurchased
		? itemB.dateLastPurchased.toDate()
		: itemB.dateCreated.toDate();

	// Overdue items
	const overdueItemA = differenceInDays(
		itemA.dateNextPurchased.toDate(),
		Date.now(),
	);
	const overdueItemB = differenceInDays(
		itemB.dateNextPurchased.toDate(),
		Date.now(),
	);

	const daysSinceLastPurchaseA = getDaysBetweenDates(
		Date.now(),
		dateLastPurchaseToDateA,
	);
	const daysSinceLastPurchaseB = getDaysBetweenDates(
		Date.now(),
		dateLastPurchaseToDateB,
	);

	// Other categories of item
	const daysUntilPurchaseA = getDaysBetweenDates(
		itemA.dateNextPurchased.toDate(),
		Date.now(),
	);
	const daysUntilPurchaseB = getDaysBetweenDates(
		itemB.dateNextPurchased.toDate(),
		Date.now(),
	);

	const daysSinceLastPurchaseBoth =
		daysSinceLastPurchaseA >= 60 && daysSinceLastPurchaseB >= 60;

	const overdueItemsBoth = overdueItemA < 0 && overdueItemB < 0;

	const compare = () => {
		if (itemA.name.toLowerCase() < itemB.name.toLowerCase()) return -1;
		if (itemA.name.toLowerCase() > itemB.name.toLowerCase()) return 1;
		return 0;
	};

	if (daysSinceLastPurchaseBoth && overdueItemsBoth) {
		// both items are overdue, sort alphabetically
		return compare();
	} else if (daysSinceLastPurchaseBoth) {
		// both items are inactive, sort alphabetically
		return compare();
	} else if (daysSinceLastPurchaseA >= 60) {
		// itemA is inactive, sort it last
		return 1;
	} else if (daysSinceLastPurchaseB >= 60) {
		// itemB is inactive, sort it last
		return -1;
	} else if (daysUntilPurchaseA === daysUntilPurchaseB) {
		// items have same number of days until next purchase, sort alphabetically
		return compare();
	} else {
		// sort by days until next purchase in ascending order
		return daysUntilPurchaseA - daysUntilPurchaseB;
	}
}
