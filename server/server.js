import express from 'express';
import weapons from "./routes/weapons.route.js"

const app = express()

app.use("/weapons", weapons)
app.use("*", (req, res) => res.status(404).json({ error: "not found" }))

export default app;