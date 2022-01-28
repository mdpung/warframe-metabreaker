import express from 'express'
import ScraperController from '../controller/ScraperController.js'
import { compareWeaponTypeData } from "../controller/util/comparer.js"


const router = express.Router()

router.route("/preScrape").get(ScraperController.apiPreScrapeWeapons)
router.route("/potentialChanges").get(ScraperController.apiPotentialChanges)
router.route("/test").get(function (req, res) {
  let currentData = {
    "_id": {
      "$oid": "61e727dc74f090364c69c86b"
    },
    "name": "Acceltra",
    "link": "https://warframe.fandom.com/wiki/Acceltra",
    "stats": {
      "Utility": {
        "AmmoType": "Rifle",
        "ShotType": "Projectile",
        "ShotSpeed": "70 m/s",
        "NoiseLevel": "Alarming",
        "FireRate": "12",
        "Accuracy": "23.5",
        "Magazine": "48",
        "MaxAmmo": "96",
        "Reload": "2 s",
        "Disposition": "●○○○○ (0.60x)"
      },
      "Rocket Impact": {
        "Attack1Total": "35",
        "Attack1ShotType": "Projectile",
        "Attack1ShotSpeed": "70 m/s",
        "ForcedProcs": "Impact Damage Impact",
        "Attack1FireRate": "12",
        "Attack1Multishot": "1 (35 damage per projectile)",
        "Attack1StatusChance": "6%",
        "Attack1CritChance": "32%",
        "Attack1CritMultiplier": "2.8x"
      },
      "Rocket Explosion": {
        "Attack2Total": "44 (80%)",
        "Attack2ShotType": "AoE",
        "Attack2Range": "4 m",
        "Attack2FireRate": "12",
        "Attack2Multishot": "1 (44 damage per projectile)",
        "Attack2StatusChance": "6%",
        "Attack2CritChance": "32%",
        "Attack2CritMultiplier": "2.8x",
        "Attack2Falloff": "100% damage up to 0 m50% damage at 4 m50% max reduction"
      },
      "Miscellaneous": {
        "ExilusPolarity": "",
        "Polarities": "",
        "Introduced": "Update 25.7 (2019-08-29)",
        "InternalName": "/Lotus/Weapons/Tenno/LongGuns/SapientPrimary/SapientPrimaryWeapon"
      }
    }
  }
  let newData = {
    "_id": {
      "$oid": "61e727dc74f090364c69c86b"
    },
    "name": "Acceltra",
    "link": "https://warframe.fandom.com/wiki/Acceltra",
    "stats": {
      "Utility": {
        "AmmoType": "Rifle",
        "ShotType": "Projectile",
        "ShotSpeed": "70 m/s",
        "NoiseLevel": "Alarming",
        "FireRate": "15",
        "Accuracy": "23.5",
        "Magazine": "48",
        "MaxAmmo": "96",
        "Reload": "2 s",
        "Disposition": "●○○○○ (0.60x)"
      },
      "Rocket Impact": {
        "Attack1Total": "35",
        "Attack1ShotType": "Projectile",
        "Attack1ShotSpeed": "70 m/s",
        "ForcedProcs": "Impact Damage Impact",
        "Attack1FireRate": "12",
        "Attack1Multishot": "1 (35 damage per projectile)",
        "Attack1StatusChance": "6%",
        "Attack1CritChance": "32%",
        "Attack1CritMultiplier": "2.8x",
        "AttackRandomStat": "40 sub projectiles"
      },
      "Rocket Explosion": {
        "Attack2Total": "44 (80%)",
        "Attack2ShotType": "AoE",
        "Attack2Range": "4 m",
        "Attack2FireRate": "12",
        "Attack2Multishot": "1 (44 damage per projectile)",
        "Attack2StatusChance": "6%",
        "Attack2CritChance": "32%",
        "Attack2CritMultiplier": "2.8x",
        "Attack2Falloff": "100% damage up to 0 m50% damage at 4 m50% max reduction"
      },
      "Miscellaneous": {
        "ExilusPolarity": "",
        "Polarities": "",
        "Introduced": "Update 25.7 (2019-08-29)",
        "InternalName": "/Lotus/Weapons/Tenno/LongGuns/SapientPrimary/SapientPrimaryWeapon"
      }
    }
  }
  res.json(compareWeaponTypeData(currentData, newData))
})

export default router