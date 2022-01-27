import axios from "axios";
import cheerio from "cheerio";
import yn from "yn";
import { scraperConfig, preScraperConfig } from '../../config/config.js'

/*
 * This file contains operations before it has detailed data about each weapon
 */
console.log(scraperConfig.weaponsUrl)
var $

function scrapeWeaponType(table, weaponType) {
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
      weapon.link = scraperConfig.baseUrl + $(el).find("a").attr("href");
      weapons.push(weapon);
    });
  });
  return weapons
}

function scrapePrimaryWeapons(table) {
  console.log("Scraping Primaries");
  return scrapeWeaponType(table, "Primary");
}

function scrapeSecondaryWeapons(table) {
  console.log("Scraping Secondaries");
  return scrapeWeaponType(table, "Secondary");
}

function scrapeMeleeWeapons(table) {
  console.log("Scraping Melees");
  return scrapeWeaponType(table, "Melee");
}

function scrapeArchwingWeapons(table) {
  console.log("Scraping Archwings");
  return scrapeWeaponType(table, "Archwing");
}

function scrapeRoboticWeapons(table) {
  console.log("Scraping Robotics");
  return scrapeWeaponType(table, "Robotic");
}

export async function preScrapeWeapons() {
  console.log("Pre-Scraping started");

  const { data } = await axios.get(scraperConfig.weaponsUrl);
  $ = cheerio.load(data);

  var tables = $(".wds-tab__content tbody");

  let weapons = {};

  if (yn(preScraperConfig.allowPrimary)) {
    weapons.primaries = scrapePrimaryWeapons(tables[0]);
  }
  if (yn(preScraperConfig.allowSecondary)) {
    weapons.secondaries = scrapeSecondaryWeapons(tables[1]);
  }
  if (yn(preScraperConfig.allowMelee)) {
    weapons.melees = scrapeMeleeWeapons(tables[2]);
  }
  if (yn(preScraperConfig.allowArchwing)) {
    weapons.archwings = scrapeArchwingWeapons(tables[3]);
  }
  if (yn(preScraperConfig.allowRobotic)) {
    weapons.robotics = scrapeRoboticWeapons(tables[4]);
  }

  console.log("Pre-Scraping finished");
  console.log(weapons);
  return weapons;
}