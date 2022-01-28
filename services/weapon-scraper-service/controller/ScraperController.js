import PrimaryWeaponsDAO from "../dao/PrimaryWeaponsDAO.js"
import SecondaryWeaponsDAO from "../dao/SecondaryWeaponsDAO.js"
import MeleeWeaponsDAO from "../dao/MeleeWeaponsDAO.js"
import ArchwingWeaponsDAO from "../dao/ArchwingWeaponsDAO.js"
import RoboticWeaponsDAO from "../dao/RoboticWeaponsDAO.js"
import { preScrapeWeapons } from "./util/pre-scraper.js";

export default class ScraperController {
  static async apiPreScrapeWeapons() {
    const preScrapedWeapons = await preScrapeWeapons();
    res.json(preScrapedWeapons);
  }

  static async apiPotentialChanges(req, res, next) {
    const currentData = await ScraperController.#getCurrentData()
    const newData = await preScrapeWeapons()
    return { dataToUpdate, dataToCreate } = compareData(currentData, newData)
  }

  static async #getCurrentData() {
    let weapons = {};
    weapons.primaries = ScraperController.#getPrimaryWeapons();
    weapons.secondaries = ScraperController.#getSecondaryWeapons();
    weapons.melees = ScraperController.#getMeleeWeapons();
    weapons.archwings = ScraperController.#getArchwingWeapons();
    weapons.robotics = ScraperController.#getRoboticWeapons();
    return weapons;
  }

  static async #getPrimaryWeapons() {
    await ScraperController.#getWeapons(PrimaryWeaponsDAO)
  }

  static async #getSecondaryWeapons() {
    await ScraperController.#getWeapons(SecondaryWeaponsDAO)
  }

  static async #getMeleeWeapons() {
    await ScraperController.#getWeapons(MeleeWeaponsDAO)
  }

  static async #getArchwingWeapons() {
    await ScraperController.#getWeapons(ArchwingWeaponsDAO)
  }

  static async #getRoboticWeapons() {
    await ScraperController.#getWeapons(RoboticWeaponsDAO)
  }

  static async #getWeapons(weaponsDAO) {
    return weaponsDAO.getWeapons()
  }

}