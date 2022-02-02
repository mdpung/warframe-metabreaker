import express from 'express'
import ScraperController from '../controller/ScraperController.js'
import { compareData } from "../controller/util/comparer.js"
import fs from "fs"


const router = express.Router()

router.route("/preScrape").get(ScraperController.apiPreScrapeWeapons)
router.route("/potentialChanges").get(ScraperController.apiPotentialChanges)
router.route("/test").get(function (req, res) {
  const currentData = JSON.parse(fs.readFileSync('./misc/current.json'));
  const newData = JSON.parse(fs.readFileSync('./misc/new.json'));
  res.json(compareData(currentData, newData))
})

export default router