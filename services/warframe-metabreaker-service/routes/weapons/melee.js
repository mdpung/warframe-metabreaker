import express from "express"
import WeaponsController from "../../controllers/WeaponsController.js"

const router = express.Router()

router.route("/").get(WeaponsController.apiGetMeleeWeapons)
router.route("/:name").get(WeaponsController.apiGetMeleeWeaponByName)

export default router