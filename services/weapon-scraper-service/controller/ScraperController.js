import { preScrapeWeapons } from "./util/pre-scraper.js";

export default class ScraperController {
  static async apiPreScrapeWeapons(req, res, next) {
    const preScrapedWeapons = await preScrapeWeapons();
    res.json(preScrapedWeapons);
  }

  static apiPotentialChanges(req, res, next) {

  }
}