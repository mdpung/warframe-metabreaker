import PrimaryWeaponsDAO from "../dao/PrimaryWeaponsDAO.js"
import SecondaryWeaponsDAO from "../dao/SecondaryWeaponsDAO.js"
import MeleeWeaponsDAO from "../dao/MeleeWeaponsDAO.js"
import ArchwingWeaponsDAO from "../dao/ArchwingWeaponsDAO.js"
import RoboticWeaponsDAO from "../dao/RoboticWeaponsDAO.js"
import { preScrapeWeapons } from "./util/pre-scraper.js";
import { scrapeWeapons } from "./util/scraper.js"
import { compareData } from "./util/comparer.js"
import fs from "fs"

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

  static async apiCreateManyWeapons(req, res, next) {
    const data = JSON.parse(fs.readFileSync('./misc/scraper_response.json'));
    const ids = await ScraperController.#createManyWeapons(data.dataToCreate);
  }

  static async #getCurrentData() {
    let weapons = {};
    weapons.primaries = await ScraperController.#getWeapons(PrimaryWeaponsDAO);
    weapons.secondaries = await ScraperController.#getWeapons(SecondaryWeaponsDAO);
    weapons.melees = await ScraperController.#getWeapons(MeleeWeaponsDAO);
    weapons.archwings = await ScraperController.#getWeapons(ArchwingWeaponsDAO);
    weapons.robotics = await ScraperController.#getWeapons(RoboticWeaponsDAO);
    return weapons;
  }

  static async #getWeapons(weaponsDAO) {
    return await weaponsDAO.getWeapons()
  }

  static async #createManyWeapons(weaponsToCreate) {
    let weapons = {};
    weapons.primaries = await ScraperController.#createWeapons(PrimaryWeaponsDAO, weaponsToCreate.primaries);
    weapons.secondaries = await ScraperController.#createSecondaryWeapons(SecondaryWeaponsDAO, weaponsToCreate.secondaries);
    weapons.melees = await ScraperController.#createMeleeWeapons(MeleeWeaponsDAO, weaponsToCreate.melees);
    weapons.archwings = await ScraperController.#createArchwingWeapons(ArchwingWeaponsDAO, weaponsToCreate.archwings);
    weapons.robotics = await ScraperController.#createRoboticWeapons(RoboticWeaponsDAO, weaponsToCreate.robotics);
    return weapons;
  }

  static async #createWeapons(weaponsDAO, weapons) {
    return await weaponsDAO.createWeapons(weapons);
  }

}