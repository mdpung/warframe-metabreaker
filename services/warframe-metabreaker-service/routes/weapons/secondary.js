import express from "express"
import WeaponsController from "../../controllers/WeaponsController.js"

const router = express.Router()

router.route("/").get(WeaponsController.apiGetSecondaryWeapons)
router.route("/:name").get(WeaponsController.apiGetSecondaryWeaponByName)

export default router