import express from 'express'
import ScraperController from '../controller/ScraperController'

const router = express.Router()

router.route("/scrape").post(ScraperController.apiScrapeAllWeapons())