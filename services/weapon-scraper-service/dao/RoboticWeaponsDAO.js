import WeaponsDAO from "./WeaponsDAO.js"
import { dbConfig } from "../config/config.js"


export default class RoboticWeaponsDAO extends WeaponsDAO {
  static async getWeapons() {
    return await super.getWeapons(dbConfig.roboticWeaponsCollection)
  }

  static async createWeapons(weapons) {
    return await super.createWeapons(dbConfig.roboticWeaponsCollection, weapons);
  }
}