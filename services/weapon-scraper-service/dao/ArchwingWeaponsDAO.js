import WeaponsDAO from "./WeaponsDAO.js"
import { dbConfig } from "../config/config.js"


export default class SecondaryWeaponsDAO extends WeaponsDAO {
  static async getWeapons() {
    return await super.getWeapons(dbConfig.archwingWeaponsCollection)
  }
}