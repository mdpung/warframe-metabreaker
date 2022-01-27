import express from 'express'
import ScraperController from '../controller/ScraperController.js'

const router = express.Router()

router.route("/preScrape").get(ScraperController.apiPreScrapeWeapons)
router.route("/potentialChanges").get(ScraperController.apiPotentialChanges)

export default router