import express from "express"
import WeaponsController from "../controllers/weapons.controller.js"

const router = express.Router()

router.route("/").get(WeaponsController.apiGetWeapons)
router.route("/:name").get(WeaponsController.apiGetWeaponByName)

export default router