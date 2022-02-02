import PrimaryWeaponsDAO from "../dao/PrimaryWeaponsDAO.js"
import SecondaryWeaponsDAO from "../dao/SecondaryWeaponsDAO.js"
import MeleeWeaponsDAO from "../dao/MeleeWeaponsDAO.js"
import ArchwingWeaponsDAO from "../dao/ArchwingWeaponsDAO.js"
import RoboticWeaponsDAO from "../dao/RoboticWeaponsDAO.js"
import { preScrapeWeapons } from "./util/pre-scraper.js";
import { scrapeWeapons } from "./util/scraper.js"
import { compareData } from "./util/comparer.js"

export default class ScraperController {
  static async apiPreScrapeWeapons() {
    const preScrapedWeapons = await preScrapeWeapons();
    res.json(preScrapedWeapons);
  }

  static async apiPotentialChanges(req, res, next) {
    const currentData = await ScraperController.#getCurrentData()
    res.json(currentData)

    if (currentData) {
      // const newData = await preScrapeWeapons()
      // console.log(`preScrape: ${JSON.stringify(newData)}`)
      // Modifies newData object by adding 'stats' property to each weapon
      // await scrapeWeapons(newData)
      const newData = {}
      return compareData(currentData, newData)
    }
    return { undefined, undefined }
  }

  static async #getCurrentData() {
    let weapons = {};
    weapons.primaries = await ScraperController.#getPrimaryWeapons();
    weapons.secondaries = await ScraperController.#getSecondaryWeapons();
    weapons.melees = await ScraperController.#getMeleeWeapons();
    weapons.archwings = await ScraperController.#getArchwingWeapons();
    weapons.robotics = await ScraperController.#getRoboticWeapons();
    return weapons;
  }

  static async #getPrimaryWeapons() {
    return await ScraperController.#getWeapons(PrimaryWeaponsDAO)
  }

  static async #getSecondaryWeapons() {
    return await ScraperController.#getWeapons(SecondaryWeaponsDAO)
  }

  static async #getMeleeWeapons() {
    return await ScraperController.#getWeapons(MeleeWeaponsDAO)
  }

  static async #getArchwingWeapons() {
    return await ScraperController.#getWeapons(ArchwingWeaponsDAO)
  }

  static async #getRoboticWeapons() {
    return await ScraperController.#getWeapons(RoboticWeaponsDAO)
  }

  static async #getWeapons(weaponsDAO) {
    return await weaponsDAO.getWeapons()
  }

}