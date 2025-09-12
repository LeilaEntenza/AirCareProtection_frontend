import db from './db';

export async function addItem(collection, data) {
  const doc = {
    _id: new Date().toISOString(),
    collection: collection,
    ...data
  };

  return db.put(doc);
}

export async function getItems(collection) {
  const result = await db.find({
    selector: { collection: collection }
  });
  return result.docs;
}
