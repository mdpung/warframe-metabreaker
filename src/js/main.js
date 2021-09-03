import * as pre_scraper from "./util/pre-scraper.js"
import * as downloader from "./util/downloader.js"
import * as enumerator from "./util/property-enumerator.js"
import * as scraper from "./util/scraper.js"
import dotenv from "dotenv";
import yn from "yn";

dotenv.config()
/**
 * Gather name and URL of each weapon of each weapon type 
 */
if (yn(process.env.REACT_APP_OPERATE_PRE_SCRAPE)) {
  pre_scraper.preScrapeWeapons();
}

/**
 * Downloads each weapon's html page to reduce http requests against the website.
 * The LOCAL check is a double check since it shouldn't download the HTML in prod.
 */
if (yn(process.env.REACT_APP_OPERATE_PRE_SCRAPE) && yn(process.env.REACT_APP_LOCAL)) {
  downloader.downloadWeapons();
}

/**
 * Scrape each weapon's stats into JSON
 */
if (yn(process.env.REACT_APP_OPERATE_SCRAPE_WEAPON_STATS)) {
  scraper.scrapeStats();
}

/**
 * Enumerate all weapon stats to identify most/common stats listed.
 * More for curiosity sake, nothing uses this info.
 */
if (yn(process.env.REACT_APP_OPERATE_ENUMERATE_WEAPON_STATS)) {
  enumerator.enumerateAllWeaponFields();
}
