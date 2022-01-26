import axios from "axios";
import cheerio from "cheerio";
import yn from "yn";
import { scraperConfig, preScraperConfig } from '../../config/config.js'

/*
 * This file contains operations before it has detailed data about each weapon
 */
var data = await axios.get(scraperConfig.weaponsUrl).data;

const $ = cheerio.load(data);

function scrapeWeapon(table, weaponType) {
  var weapons = [];
  console.log(`Scraping ${weaponType}`)
  // $(table).children("tr").each((idx, el) => {
  //   // May be multiple weapons per line
  //   $(el).find("td > span").each((idx, el) => {
  //     var weapon = {
  //       name: "",
  //       link: "",
  //       type: weaponType
  //     };
  //     weapon.name = $(el).attr("data-param");
  //     weapon.link = $(el).find("span > span > a").attr("href");
  //     weapons.push(weapon);
  //   });
  // });
  return weapons
}

function scrapePrimaryWeapons(table) {
  console.log("Scraping Primaries");
  const primary = scrapeWeapon(table, "Primary");
}

function scrapeSecondaryWeapons(table) {
  console.log("Scraping Secondaries");
  const secondary = scrapeWeapon(table, "Secondary");
}

function scrapeMeleeWeapons(table) {
  console.log("Scraping Melees", "Melee");
  const melee = scrapeWeapon(table);
}

function scrapeArchwingWeapons(table) {
  console.log("Scraping Archwings", "Archwing");
  const robotic = scrapeWeapon(table);
}

function scrapeRoboticWeapons(table) {
  console.log("Scraping Robotics");
  const robotic = scrapeWeapon(table, "Robotic");
}

export function preScrapeWeapons() {
  console.log("Pre-Scraping started");

  var tables = $(".wds-tab__content tbody");

  if (yn(preScraperConfig.allowPrimary)) {
    scrapePrimaryWeapons(tables[0]);
  }
  if (yn(preScraperConfig.allowSecondary)) {
    scrapeSecondaryWeapons(tables[1]);
  }
  if (yn(preScraperConfig.allowMelee)) {
    scrapeMeleeWeapons(tables[2]);
  }
  if (yn(preScraperConfig.allowArchwing)) {
    scrapeArchwingWeapons(tables[3]);
  }
  if (yn(preScraperConfig.allowRobotic)) {
    scrapeRoboticWeapons(tables[4]);
  }

  console.log("Pre-Scraping finished");
}