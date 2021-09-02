import axios from "axios";
import cheerio from "cheerio";
import fs from "fs";
import path from "path";
import yn from "yn";

/*
 * This file contains operations before it has detailed data about each weapon
 */
var data;
if (yn(process.env.LOCAL)) {
  console.log("Using local Weapons.html");
  data = fs.readFileSync(process.env.WEAPONS_URL_LOCAL);
} else {
  data = await axios.get(process.env.WEAPONS_URL).data;
}

const $ = cheerio.load(data);

function scrapeWeapon(table, weaponType) {
  var weapons = [];
  $(table).children("tr").each((idx, el) => {
    // May be multiple weapons per line
    $(el).find("td > span").each((idx, el) => {
      var weapon = {
        name: "",
        link: "",
        type: weaponType
      };
      weapon.name = $(el).attr("data-param");
      weapon.link = $(el).find("span > span > a").attr("href");
      weapons.push(weapon);
    });
  });
  return weapons
}

function writeToFile(filename, data) {
  try {
    var url = path.join(process.cwd(), filename);
    fs.writeFile(url, JSON.stringify(data, null, 2), (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  } catch (err) {
    console.error("Error occurred writing to " + fileName + ": " + err);
  }
}

function scrapePrimaryWeapons(table) {
  console.log("Scraping Primaries");
  const primary = scrapeWeapon(table, "Primary");
  writeToFile(process.env.PRIMARY_PRE_STORAGE, primary)
}

function scrapeSecondaryWeapons(table) {
  console.log("Scraping Secondaries");
  const secondary = scrapeWeapon(table, "Secondary");
  writeToFile(process.env.SECONDARY_PRE_STORAGE, secondary)
}

function scrapeMeleeWeapons(table) {
  console.log("Scraping Melees", "Melee");
  const melee = scrapeWeapon(table);
  writeToFile(process.env.MELEE_PRE_STORAGE, melee)
}

function scrapeArchwingWeapons(table) {
  console.log("Scraping Archwings", "Archwing");
  const robotic = scrapeWeapon(table);
  writeToFile(process.env.ARCHWING_PRE_STORAGE, robotic)
}

function scrapeRoboticWeapons(table) {
  console.log("Scraping Robotics");
  const robotic = scrapeWeapon(table, "Robotic");
  writeToFile(process.env.ROBOTIC_PRE_STORAGE, robotic)
}

export function preScrapeWeapons() {
  console.log("Pre-Scraping started");

  var tables = $(".wds-tab__content tbody");
  
  if (yn(process.env.PRE_SCRAPER_ALLOW_PRIMARY)) {
    scrapePrimaryWeapons(tables[0]);
  }
  if (yn(process.env.PRE_SCRAPER_ALLOW_SECONDARY)) {
    scrapeSecondaryWeapons(tables[1]);
  }
  if (yn(process.env.PRE_SCRAPER_ALLOW_MELEE)) {
    scrapeMeleeWeapons(tables[2]);
  }
  if (yn(process.env.PRE_SCRAPER_ALLOW_ARCHWING)) {
    scrapeArchwingWeapons(tables[3]);
  }
  if (yn(process.env.PRE_SCRAPER_ALLOW_ROBOTIC)) {
    scrapeRoboticWeapons(tables[4]);
  }
  
  console.log("Pre-Scraping finished");
}