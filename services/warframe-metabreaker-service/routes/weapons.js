import express from "express"
import primaryWeapons from "./weapons/primary.js"
import secondaryWeapons from "./weapons/secondary.js"
import meleeWeapons from "./weapons/melee.js"
import archwingWeapons from "./weapons/archwing.js"
import roboticWeapons from "./weapons/robotic.js"

const router = express.Router()

router.use("/primary", primaryWeapons)
router.use("/secondary", secondaryWeapons)
router.use("/melee", meleeWeapons)
router.use("/archwing", archwingWeapons)
router.use("/robotic", roboticWeapons)

export default router