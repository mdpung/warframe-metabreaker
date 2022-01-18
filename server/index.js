import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import WeaponsDAO from "./dao/weaponsDAO.js"

dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT

MongoClient.connect(
  process.env.MONGODB_URI,
  // Should come back to finilize the connection options
  // https://docs.mongodb.com/drivers/node/current/fundamentals/connection/#std-label-connection-options
  {
    maxPoolSize: 20,
    wtimeoutMS: 2500,
    monitorCommands: true
  }
).catch(err => {
  console.error(err.stack)
  process.exit(1)
}).then(async client => {
  // MongoDB request debugging
  // client.on('commandStarted', (event) => console.debug(event));
  // client.on('commandSucceeded', (event) => console.debug(event));
  // client.on('commandFailed', (event) => console.debug(event));

  await WeaponsDAO.injectDB(client)
  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
  })
})