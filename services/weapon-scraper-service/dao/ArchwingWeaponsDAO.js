import WeaponsDAO from "./WeaponsDAO.js"
import { dbConfig } from "../config/config.js"


export default class ArchwingWeaponsDAO extends WeaponsDAO {
  static async getWeapons() {
    return await super.getWeapons(dbConfig.archwingWeaponsCollection)
  }

  static async createWeapons(weapons) {
    return await super.createWeapons(dbConfig.archwingWeaponsCollection, weapons);
  }
}