import axios from "axios";
import cheerio from "cheerio";
import yn from "yn";
import { generalConfig, preScraperConfig } from '../../config/config.js'

/*
 * This file contains operations before it has detailed data about each weapon
 */
let $

function scrapeWeaponType(table) {
  var weapons = [];
  $(table).children("tr").each((idx, el) => {
    // May be multiple weapons per line
    $(el).find("td > span").each((idx, el) => {
      var weapon = {
        name: "",
        link: ""
      };
      weapon.name = $(el).attr("data-param");
      weapon.link = generalConfig.baseUrl + $(el).find("a").attr("href");
      weapons.push(weapon);
    });
  });
  return weapons
}

export async function preScrapeWeapons() {
  console.log("Pre-Scraping started");

  const { data } = await axios.get(generalConfig.weaponsUrl);
  $ = cheerio.load(data);

  var tables = $(".wds-tab__content tbody");

  let weapons = {};

  if (yn(preScraperConfig.allowPrimary)) {
    weapons.primaries = scrapeWeaponType(tables[0]);
  }
  if (yn(preScraperConfig.allowSecondary)) {
    weapons.secondaries = scrapeWeaponType(tables[1]);
  }
  if (yn(preScraperConfig.allowMelee)) {
    weapons.melees = scrapeWeaponType(tables[2]);
  }
  if (yn(preScraperConfig.allowArchwing)) {
    weapons.archwings = scrapeWeaponType(tables[3]);
  }
  if (yn(preScraperConfig.allowRobotic)) {
    weapons.robotics = scrapeWeaponType(tables[4]);
  }

  console.log("Pre-Scraping finished");
  return weapons;
}