import PrimaryWeaponsDAO from "../dao/PrimaryWeaponsDAO.js"
import SecondaryWeaponsDAO from "../dao/SecondaryWeaponsDAO.js"
import MeleeWeaponsDAO from "../dao/MeleeWeaponsDAO.js"
import ArchwingWeaponsDAO from "../dao/ArchwingWeaponsDAO.js"
import RoboticWeaponsDAO from "../dao/RoboticWeaponsDAO.js"

export default class WeaponsController {
  static async apiGetPrimaryWeapons(req, res, next) {
    await WeaponsController.#getWeapons(PrimaryWeaponsDAO, res)
  }

  static async apiGetPrimaryWeaponByName(req, res, next) {
    await WeaponsController.#getWeaponByName(PrimaryWeaponsDAO, req, res)
  }

  static async apiGetSecondaryWeapons(req, res, next) {
    await WeaponsController.#getWeapons(SecondaryWeaponsDAO, res)
  }

  static async apiGetSecondaryWeaponByName(req, res, next) {
    await WeaponsController.#getWeaponByName(SecondaryWeaponsDAO, req, res)
  }

  static async apiGetMeleeWeapons(req, res, next) {
    await WeaponsController.#getWeapons(MeleeWeaponsDAO, res)
  }

  static async apiGetMeleeWeaponByName(req, res, next) {
    await WeaponsController.#getWeaponByName(MeleeWeaponsDAO, req, res)
  }

  static async apiGetArchwingWeapons(req, res, next) {
    await WeaponsController.#getWeapons(ArchwingWeaponsDAO, res)
  }

  static async apiGetArchwingWeaponByName(req, res, next) {
    await WeaponsController.#getWeaponByName(ArchwingWeaponsDAO, req, res)
  }

  static async apiGetRoboticWeapons(req, res, next) {
    await WeaponsController.#getWeapons(RoboticWeaponsDAO, res)
  }

  static async apiGetRoboticWeaponByName(req, res, next) {
    await WeaponsController.#getWeaponByName(RoboticWeaponsDAO, req, res)
  }

  static async #getWeapons(weaponsDAO, res) {
    const { weapons, totalWeaponCount } = await weaponsDAO.getWeapons()

    let response = {
      weapons: weapons,
      totalWeaponCount: totalWeaponCount
    }

    res.json(response)
  }

  static async #getWeaponByName(weaponsDAO, req, res) {
    try {
      let name = req.params.name
      let weapon = await weaponsDAO.getWeaponByName(name)

      if (!weapon) {
        res.status(404).json({ error: "Weapon not found" })
        return
      }

      res.json(weapon)
    } catch (e) {
      console.log(`Error fetching weapon by name: ${e}`)
      res.status(500).json({ error: e })
    }
  }
}