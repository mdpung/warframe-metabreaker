import express from "express"
import WeaponsController from "../../controllers/WeaponsController.js"

const router = express.Router()

router.route("/").get(WeaponsController.apiGetArchwingWeapons)
router.route("/:name").get(WeaponsController.apiGetArchwingWeaponByName)

export default router