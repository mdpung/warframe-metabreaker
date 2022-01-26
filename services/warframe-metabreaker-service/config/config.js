import dotenv from "dotenv"
dotenv.config()

export const serverConfig = {
  port: process.env.PORT
}

export const dbConfig = {
  uri: process.env.MONGODB_URI,
  namespace: process.env.DATBASE_NS
}