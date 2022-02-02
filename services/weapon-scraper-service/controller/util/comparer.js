import diff from "deep-diff"

export function compareData(currentData, newData) {
  let { primariesDataToUpdate, primariesDataToCreate, other } = compareWeaponTypeData(currentData.primaries, newData.primaries)
  // let { secondariesDataToUpdate, secondariesDataToCreate } = compareWeaponTypeData(currentData.secondaries, newData.secondaries)
  // let { meleesDataToUpdate, meleesDataToCreate } = compareWeaponTypeData(currentData.melees, newData.melees)
  // let { archwingsDataToUpdate, archwingsDataToCreate } = compareWeaponTypeData(currentData.archwings, newData.archwings)
  // let { roboticsDataToUpdate, roboticsDataToCreate } = compareWeaponTypeData(currentData.robotics, newData.robotics);

  let dataToUpdate = {
    primaries: primariesDataToUpdate,
    //   secondaries: secondariesDataToUpdate,
    //   melees: meleesDataToUpdate,
    //   archwings: archwingsDataToUpdate,
    //   robotics: roboticsDataToUpdate
  }
  let dataToCreate = {
    primaries: primariesDataToCreate,
    // secondaries: secondariesDataToCreate,
    // melees: meleesDataToCreate,
    // archwings: archwingsDataToCreate,
    // robotics: roboticsDataToCreate
  }

  return { dataToUpdate: dataToUpdate, dataToCreate: dataToCreate, other: other }
}

export function compareWeaponTypeData(currentData, newData) {
  // Iterate through every weapon and call #compareWeaponData()
  // console.log(`Current: ${currentData}`)
  // console.log(`New: ${newData}`)
  let diff = compareWeaponData(currentData, newData)
  return { dataToUpdate: {}, dataToCreate: {}, other: diff }
}

export function compareWeaponData(currentData, newData) {
  return diff(currentData, newData)
}