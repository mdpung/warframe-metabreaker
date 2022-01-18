import axios from "axios";
import fs from "fs";
import cheerio from "cheerio";
import yn from "yn";

function scrapeStats(data, weaponName, weaponTypeJsonStatsBasePath) {
  let dict = {};

  const $ = cheerio.load(data);
  let sections = $("aside > section");
  sections.each((idx, section) => {
    let subDictkey = $(section).find("h2").text();
    let subDict = dict[subDictkey] = {};
    let fields = $(section).children("div");
    fields.each((idx, field) => {
      subDict[$(field).attr("data-source")] = $(field).children("div").text();
    })
  });

  console.log("Finished scraping weapon: " + weaponName);
  fs.writeFileSync(weaponTypeJsonStatsBasePath + weaponName + "-stats.json", JSON.stringify(dict, null, 2), (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
}

function scrapeWeaponStats(preWeaponsJson, weaponTypeHtmlBasePath, weaponTypeJsonStatsBasePath) {
  if (yn(process.env.REACT_APP_LOCAL)) {
    preWeaponsJson.forEach(element => {
      scrapeStats(fs.readFileSync(weaponTypeHtmlBasePath + element.name + ".html"), element.name, weaponTypeJsonStatsBasePath);
    });
  } else {
    preWeaponsJson.forEach(element => {
      let data = axios.get(element.link).data;
      scrapeStats(data, element.name, weaponTypeHtmlBasePath, weaponTypeJsonStatsBasePath);
    });
  }
}

function scrapePrimaryStats() {
  scrapeWeaponStats(
    JSON.parse(fs.readFileSync(process.env.REACT_APP_PRIMARY_JSON_PRE_STORAGE_PATH)),
    process.env.REACT_APP_PRIMARY_HTML_STORAGE_BASE_PATH,
    process.env.REACT_APP_PRIMARY_JSON_STATS_STORAGE_BASE_PATH
  );
}

function scrapeSecondaryStats() {
  scrapeWeaponStats(
    JSON.parse(fs.readFileSync(process.env.REACT_APP_SECONDARY_JSON_PRE_STORAGE_PATH)),
    process.env.REACT_APP_SECONDARY_HTML_STORAGE_BASE_PATH,
    process.env.REACT_APP_SECONDARY_JSON_STATS_STORAGE_BASE_PATH
  );
}

function scrapeMeleeStats() {
  scrapeWeaponStats(
    JSON.parse(fs.readFileSync(process.env.REACT_APP_MELEE_JSON_PRE_STORAGE_PATH)),
    process.env.REACT_APP_MELEE_HTML_STORAGE_BASE_PATH,
    process.env.REACT_APP_MELEE_JSON_STATS_STORAGE_BASE_PATH
  );
}

function scrapeArchwingStats() {
  scrapeWeaponStats(
    JSON.parse(fs.readFileSync(process.env.REACT_APP_ARCHWING_JSON_PRE_STORAGE_PATH)),
    process.env.REACT_APP_ARCHWING_HTML_STORAGE_BASE_PATH,
    process.env.REACT_APP_ARCHWING_JSON_STATS_STORAGE_BASE_PATH
  );
}

function scrapeRoboticStats() {
  scrapeWeaponStats(
    JSON.parse(fs.readFileSync(process.env.REACT_APP_ROBOTIC_JSON_PRE_STORAGE_PATH)),
    process.env.REACT_APP_ROBOTIC_HTML_STORAGE_BASE_PATH,
    process.env.REACT_APP_ROBOTIC_JSON_STATS_STORAGE_BASE_PATH
  );
}

/**
 * Scrape the necessary weapon types based on which type is enabled in the config.
 */
export function scrapeAllWeaponStats() {
  if (yn(process.env.REACT_APP_LOCAL)) {
    console.log("Scraping from local weapons html...");

  } else {
    console.log("Scraping started");
  }

  if (yn(process.env.REACT_APP_SCRAPER_ALLOW_PRIMARY)) {
    console.log("Scraping primaries...");
    scrapePrimaryStats();
  }
  if (yn(process.env.REACT_APP_SCRAPER_ALLOW_SECONDARY)) {
    console.log("Scraping secondaries...");
    scrapeSecondaryStats();
  }
  if (yn(process.env.REACT_APP_SCRAPER_ALLOW_MELEE)) {
    console.log("Scraping melees...");
    scrapeMeleeStats();
  }
  if (yn(process.env.REACT_APP_SCRAPER_ALLOW_ARCHWING)) {
    console.log("Scraping archwings...");
    scrapeArchwingStats();
  }
  if (yn(process.env.REACT_APP_SCRAPER_ALLOW_ROBOTIC)) {
    console.log("Scraping robotics...");
    scrapeRoboticStats();
  }

  console.log("Scraping finished");
}