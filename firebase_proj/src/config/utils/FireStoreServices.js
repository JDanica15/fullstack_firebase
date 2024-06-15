import app from "../firestore";
import {
  ref,
  set,
  push,
  get,
  update,
  remove,
  getDatabase,
} from "firebase/database";

// Read all items
export const readItems = async () => {
  try {
    const db = getDatabase(app);
    const snapshot = await get(ref(db, "food"));
    if (snapshot.exists()) {
      const items = [];
      snapshot.forEach((childSnapshot) => {
        items.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
      return items;
    } else {
      console.log("No data available");
      return [];
    }
  } catch (e) {
    console.error("Error reading items: ", e);
  }
};

//edit by id
export const getSpecificItem = async (itemId) => {
  try {
    const db = getDatabase(app);
    const snapshot = await get(ref(db, `food/${itemId}`));

    if (snapshot.exists()) {
      const item = { id: snapshot.key, ...snapshot.val() };
      return item; // Return the specific item
    } else {
      console.log(`Item with ID ${itemId} not found`);
      return null;
    }
  } catch (error) {
    console.error("Error reading item: ", error);
    throw error;
  }
};

// Create a new item
export const createItem = async (data) => {
  try {
    const db = getDatabase(app);
    const newItemRef = push(ref(db, "food"));
    const createdAt = new Date().toISOString();
    await set(newItemRef, { ...data, createdAt });
    return newItemRef;
  } catch (e) {
    console.error("Error adding item: ", e);
  }
};

// Update an item
export const updateItem = async (itemId, updatedData) => {
  try {
    const db = getDatabase(app);
    const itemRef = ref(db, `food/${itemId}`);
    await update(itemRef, updatedData);
  } catch (e) {
    console.error("Error updating item: ", e);
  }
};

// Delete an item
export const deleteItem = async (itemId) => {
  try {
    const db = getDatabase(app);
    const itemRef = ref(db, `food/${itemId}`);
    await remove(itemRef);
  } catch (e) {
    console.error("Error deleting item: ", e);
  }
};