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

// Create a new item
export const createItem = async (data) => {
  try {
    const db = getDatabase(app);
    const newItemRef = push(ref(db, "food"));
    await set(newItemRef, data);
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