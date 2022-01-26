import WeaponsDAO from "./WeaponsDAO.js"

let primaryWeaponsCollection = "weapons_primary"

export default class PrimaryWeaponsDAO extends WeaponsDAO {
  static async getWeapons() {
    return await super.getWeapons(primaryWeaponsCollection)
  }

  static async getWeaponsByName(name) {
    return await super.getWeaponByName(primaryWeaponsCollection, name)
  }
}