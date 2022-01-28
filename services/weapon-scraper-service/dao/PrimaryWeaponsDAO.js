import WeaponsDAO from "./WeaponsDAO.js"
import { dbConfig } from "../config/config.js"


export default class PrimaryWeaponsDAO extends WeaponsDAO {
  static async getWeapons() {
    return await super.getWeapons(dbConfig.primaryWeaponsCollection)
  }

  static async getWeaponsByName(name) {
    return await super.getWeaponByName(dbConfig.primaryWeaponsCollection, name)
  }
}