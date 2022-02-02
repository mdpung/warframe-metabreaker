import WeaponsDAO from "./WeaponsDAO.js"
import { dbConfig } from "../config/config.js"


export default class MeleeWeaponsDAO extends WeaponsDAO {
  static async getWeapons() {
    return await super.getWeapons(dbConfig.meleeWeaponsCollection)
  }

  static async getWeaponByName(name) {
    return await super.getWeaponByName(dbConfig.meleeWeaponsCollection, name)
  }
}