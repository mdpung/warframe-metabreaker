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