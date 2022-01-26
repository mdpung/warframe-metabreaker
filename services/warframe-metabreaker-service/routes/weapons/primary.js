import express from "express"
import WeaponsController from "../../controllers/WeaponsController.js"

const router = express.Router()

router.route("/").get(WeaponsController.apiGetPrimaryWeapons)
router.route("/:name").get(WeaponsController.apiGetPrimaryWeaponByName)

export default router