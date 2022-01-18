import mongodb from "mongodb"

let primaryWeapons
let secondaryWeapons
let meleeWeapons
let archwingWeapons
let roboticWepaons

export default class WeaponsDAO {
  static async injectDB(conn) {
    try {
      if (!primaryWeapons) {
        primaryWeapons = await conn.db(process.env.DATABASE).collection("weapons_primary")
      }
      // if (!secondaryWeapons) {
      //   secondaryWeapons = await conn.db(process.env.DATABASE).collection("weapon_secondary")
      // }
      // if (!meleeWeapons) {
      //   meleeWeapons = await conn.db(process.env.DATABASE).collection("weapon_melee")
      // }
      // if (!archwingWeapons) {
      //   archwingWeapons = await conn.db(process.env.DATABASE).collection("weapon_archwing")
      // }
      // if (!roboticWepaons) {
      //   roboticWepaons = await conn.db(process.env.DATABASE).collection("weapon_robotic")
      // }
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in weaponsDAO: ${e}`
      )
    }
  }

  static async getWeapons() {

    let cursor

    try {
      try {
        cursor = await primaryWeapons.find({})
        // await cursor.forEach(doc => console.log(doc))
      } catch (e) {
        console.error(`Uanble to issue find command: ${e}`)
        return { weapons: [], totalWeaponCount: 0 }
      }

      try {
        const weapons = await cursor.toArray()
        const totalWeaponCount = await primaryWeapons.countDocuments()

        return { weapons, totalWeaponCount }
      } catch (e) {
        console.error(`Unable to convert cursor to array or problem counting documents: ${e}`)
        return { weapons: [], totalWeaponCount: 0 }
      }
    } finally {
      cursor.close()
    }
  }

  static async getWeaponByName(name) {
    try {
      let query = {
        name: name
      }
      return await primaryWeapons.findOne(query)
    } catch (e) {
      console.error(`Something went wrong in getWeaponByName: ${e}`)
      throw e
    }
  }
}