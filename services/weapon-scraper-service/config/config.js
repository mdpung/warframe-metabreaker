import dotenv from "dotenv"
dotenv.config()

export const dbConfig = {
  uri: process.env.MONGODB_URI,
  namespace: process.env.DATBASE_NS
}

export const scraperConfig = {
  weaponsUrl: process.env.WEAPONS_URL
}

export const preScraperConfig = {
  allowPrimary: process.env.PRE_SCRAPE_ALLOW_PRIMARY,
  allowSecondary: process.env.PRE_SCRAPE_ALLOW_SECONDARY,
  allowMelee: process.env.PRE_SCRAPE_ALLOW_MELEE,
  allowArchwing: process.env.PRE_SCRAPE_ALLOW_ARCHWING,
  allowRobotic: process.env.PRE_SCRAPE_ALLOW_ROBOTIC
}