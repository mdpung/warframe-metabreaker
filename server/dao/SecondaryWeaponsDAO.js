import WeaponsDAO from "./WeaponsDAO.js"

let secondaryWeaponsCollection = "weapons_secondary"

export default class SecondaryWeaponsDAO extends WeaponsDAO {
  static async getWeapons() {
    return await super.getWeapons(secondaryWeaponsCollection)
  }

  static async getWeaponsByName(name) {
    return await super.getWeaponByName(secondaryWeaponsCollection, name)
  }
}