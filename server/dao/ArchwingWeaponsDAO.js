import WeaponsDAO from "./WeaponsDAO.js"

let archwingWeaponsCollection = "weapons_archwing"

export default class SecondaryWeaponsDAO extends WeaponsDAO {
  static async getWeapons() {
    return await super.getWeapons(archwingWeaponsCollection)
  }

  static async getWeaponsByName(name) {
    return await super.getWeaponByName(archwingWeaponsCollection, name)
  }
}