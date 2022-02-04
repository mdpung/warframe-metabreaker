import { getDb } from "../db/conn.js"

export default class WeaponsDAO {
  static async getWeapons(collectionName) {
    let connection = getDb().collection(collectionName);
    let cursor;

    try {
      cursor = await connection.find({}, { projection: { _id: 0 } });
    } catch (e) {
      console.error(`Unable to issue find command: ${e}`);
      return { weapons: [], totalWeaponCount: 0 };
    }

    try {
      return await cursor.toArray()
    } catch (e) {
      console.error(`Unable to convert cursor to array or problem counting documents: ${e}`);
      return [];
    }
  }

  static async replaceWeapon(collectionName, weapon) {
    let connection = getDb().collection(collectionName);
    let query = { name = weapon.name };

    try {
      const replaceResult = await connection.replaceOne(query, weapon);
      console.log(`Modified ${replaceResult.modifiedCount} document(s)`);
    } catch (e) {
      console.log(`Failed to replace ${weapon.name} in ${collectionName}}`);
    }
  }

  static async createWeapons(collectionName, documents) {
    let connection = getDb().collection(collectionName);

    try {
      const insertManyResult = await connection.insertMany(documents);
      let ids = insertManyResult.insertedIds;
      let insertedCount = insertManyResult.insertedCount;
      console.log(`${insertedCount} documents were inserted.`)

      for (let id of Object.values(ids)) {
        console.log(`Inserted a document into ${collectionName} with id ${id}`);
      }

      return insertedCount;
    } catch (e) {
      console.log(`A MongoBulkWriteException occurred, but there are successfully processed documents.`);
      let ids = e.result.result.insertedIds;

      for (let id of Object.values(ids)) {
        console.log(`Processed a document into ${collectionName} with id ${id._id}`);
      }

      let nInserted = e.result.result.nInserted;
      console.log(`Number of documents inserted: ${nInserted}`);
      return nInserted;
    }

  }
}