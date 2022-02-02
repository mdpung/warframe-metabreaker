import dotenv from "dotenv"
dotenv.config()

export const serverConfig = {
  port: process.env.PORT
}

export const dbConfig = {
  uri: process.env.MONGODB_URI,
  namespace: process.env.DATBASE_NS,
  primaryWeaponsCollection: process.env.PRIMARY_WEAPONS_COLLECTION,
  secondaryWeaponsCollection: process.env.SECONDARY_WEAPONS_COLLECTION,
  meleeWeaponsCollection: process.env.MELEE_WEAPONS_COLLECTION,
  archwingWeaponsCollection: process.env.ARCHWING_WEAPONS_COLLECTION,
  roboticWeaponsCollection: process.envROBOTIC_WEAPONS_COLLECTION
}

export const generalConfig = {
  baseUrl: process.env.BASE_URL,
  weaponsUrl: process.env.WEAPONS_URL
}

export const preScraperConfig = {
  allowPrimary: process.env.PRE_SCRAPER_ALLOW_PRIMARY,
  allowSecondary: process.env.PRE_SCRAPER_ALLOW_SECONDARY,
  allowMelee: process.env.PRE_SCRAPER_ALLOW_MELEE,
  allowArchwing: process.env.PRE_SCRAPER_ALLOW_ARCHWING,
  allowRobotic: process.env.PRE_SCRAPER_ALLOW_ROBOTIC
}

export const scraperConfig = {
  allowPrimary: process.env.SCRAPER_ALLOW_PRIMARY,
  allowSecondary: process.env.SCRAPER_ALLOW_SECONDARY,
  allowMelee: process.env.SCRAPER_ALLOW_MELEE,
  allowArchwing: process.env.SCRAPER_ALLOW_ARCHWING,
  allowRobotic: process.env.SCRAPER_ALLOW_ROBOTIC
}