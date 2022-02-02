import axios from "axios";
import cheerio from "cheerio";
import yn from "yn";
import { scraperConfig } from "../../config/config.js"

function scrapeStats(data, weaponName) {
  let stats = {};

  const $ = cheerio.load(data);
  // 'slice(1)' to skip the "tradeable/untradeable" section 
  let sections = $("aside > section").slice(1);
  sections.each((idx, section) => {
    // Section name
    let subDictkey = $(section).find("h2").text();
    let subDict = stats[subDictkey] = {};
    // Fields in Section
    let fields = $(section).children("div");
    // Fetch each Field and corresponding Value
    fields.each((idx, field) => {
      subDict[$(field).attr("data-source")] = $(field).children("div").text();
    })
  });

  console.log("\t\tFinished scraping weapon: " + weaponName);
  return stats;
}

async function scrapeWeaponStats(preScrapedWeapons) {
  for (const weapon of preScrapedWeapons) {
    console.log(`\t\tWeapon: ${JSON.stringify(weapon)}`)
    const { data } = await axios.get(weapon.link);
    weapon.stats = scrapeStats(data, weapon.name);
  }
}

/**
 * Scrape the necessary weapon types based on which type is enabled in the config.
 * Developer note: modifies object passed in parameters.
 */
export async function scrapeWeapons(preScrapedWeapons) {
  console.log("Scraping started");

  if (yn(scraperConfig.allowPrimary)) {
    console.log("\tScraping primaries...");
    await scrapeWeaponStats(preScrapedWeapons.primaries)
  }
  if (yn(scraperConfig.allowSecondary)) {
    console.log("\tScraping secondaries...");
    await scrapeWeaponStats(preScrapedWeapons.secondaries)
  }
  if (yn(scraperConfig.allowMelee)) {
    console.log("\tScraping melees...");
    await scrapeWeaponStats(preScrapedWeapons.melees)
  }
  if (yn(scraperConfig.allowArchwing)) {
    console.log("\tScraping archwings...");
    await scrapeWeaponStats(preScrapedWeapons.archwings)
  }
  if (yn(scraperConfig.allowRobotic)) {
    console.log("\tScraping robotics...");
    await scrapeWeaponStats(preScrapedWeapons.robotics)
  }

  console.log("Scraping finished");
}