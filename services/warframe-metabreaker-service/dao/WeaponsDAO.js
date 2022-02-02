
import { getDb } from "../db/conn.js"

export default class WeaponsDAO {
  static async getWeapons(collectionName) {
    let connection = getDb().collection(collectionName)
    let cursor

    try {
      cursor = await connection.find({}, { projection: { _id: 0 } })
    } catch (e) {
      console.error(`Uanble to issue find command: ${e}`)
      return { weapons: [], totalWeaponCount: 0 }
    }

    try {
      const weapons = await cursor.toArray()
      const totalWeaponCount = await connection.countDocuments()
      return { weapons, totalWeaponCount }
    } catch (e) {
      console.error(`Unable to convert cursor to array or problem counting documents: ${e}`)
      return { weapons: [], totalWeaponCount: 0 }
    }
  }

  static async getWeaponByName(collectionName, name) {
    let connection = getDb().collection(collectionName)

    try {
      let query = {
        name: name
      }
      return await connection.findOne(query, { projection: { _id: 0 } })
    } catch (e) {
      console.error(`Something went wrong in getWeaponByName: ${e}`)
      throw e
    }
  }
}