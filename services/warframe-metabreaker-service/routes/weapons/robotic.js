import express from "express"
import WeaponsController from "../../controllers/WeaponsController.js"

const router = express.Router()

router.route("/").get(WeaponsController.apiGetRoboticWeapons)
router.route("/:name").get(WeaponsController.apiGetRoboticWeaponByName)

export default router