import WeaponsDAO from "../dao/weaponsDAO.js"

export default class WeaponsController {
  static async apiGetWeapons(req, res, next) {
    const weaponType = req.query.weaponType
    const { weapons, totalWeaponCount } = await WeaponsDAO.getWeapons()

    let response = {
      weapons: weapons,
      totalWeaponCount: totalWeaponCount
    }

    res.json(response)
  }

  static async apiGetWeaponByName(req, res, next) {
    try {
      let name = req.params.name
      let weapon = await WeaponsDAO.getWeaponByName(name)

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