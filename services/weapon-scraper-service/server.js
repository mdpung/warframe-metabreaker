import { serverConfig } from "./config/config.js"
import express from "express"
import scraper from "./routes/scraper.js"
import { connectToServer } from "./db/conn.js"


const PORT = serverConfig.port || 5001;
const app = express()

app.use("/scraper", scraper)
app.use("*", (req, res) => res.status(404).json({ error: "not found" }))

// Global error handling
app.use(function (err, _req, res) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// perform a database connection when the server starts
connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }

  // start the Express server
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});