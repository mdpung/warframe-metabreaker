import WeaponsDAO from "./WeaponsDAO.js"

let meleeWeaponsCollection = "weapons_melee"

export default class MeleeWeaponsDAO extends WeaponsDAO {
  static async getWeapons() {
    return await super.getWeapons(meleeWeaponsCollection)
  }

  static async getWeaponsByName(name) {
    return await super.getWeaponByName(meleeWeaponsCollection, name)
  }
}