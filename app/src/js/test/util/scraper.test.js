import * as scraper from "../../../util/scrapers/scraper.js"
import dotenv from "dotenv"

dotenv.config();

const wep = {
  "name": "Ballistica",
  "link": "https://warframe.fandom.com/wiki/Ballistica"
}

console.log(scraper.scrapeStat(wep));