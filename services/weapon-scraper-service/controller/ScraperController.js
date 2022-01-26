import { preScrapeWeapons } from "./util/pre-scraper";

export default class ScraperController {
  static apiScrapeAllWeapons(req, res, next) {
    preScrapeWeapons();
  }

  static preScrapeWeapons() {
    preScrapeWeapons()
  }
}