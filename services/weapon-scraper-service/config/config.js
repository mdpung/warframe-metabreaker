import dotenv from "dotenv"
dotenv.config()

export const serverConfig = {
  port: process.env.PORT
}

export const dbConfig = {
  uri: process.env.MONGODB_URI,
  namespace: process.env.DATBASE_NS
}

export const scraperConfig = {
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