import WeaponsDAO from "./WeaponsDAO.js"

let roboticWeaponsCollection = "weapons_robotic"

export default class SecondaryWeaponsDAO extends WeaponsDAO {
  static async getWeapons() {
    return await super.getWeapons(roboticWeaponsCollection)
  }

  static async getWeaponsByName(name) {
    return await super.getWeaponByName(roboticWeaponsCollection, name)
  }
}