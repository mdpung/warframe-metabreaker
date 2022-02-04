import diff from "deep-diff"

export function compareData(currentData, newData) {
  let primaries = compareWeaponTypeData(currentData.primaries, newData.primaries);
  let secondaries = compareWeaponTypeData(currentData.secondaries, newData.secondaries);
  let melees = compareWeaponTypeData(currentData.melees, newData.melees);
  let arcwhings = compareWeaponTypeData(currentData.archwings, newData.archwings);
  let robotics = compareWeaponTypeData(currentData.robotics, newData.robotics);

  console.log(`primariesDataToUpdate: ${JSON.stringify(primaries.dataToUpdate)}`);
  // console.log(`primariesDataToCreate: ${JSON.stringify(primaries.dataToCreate)}`)

  let dataToUpdate = {
    primaries: primaries.dataToUpdate,
    secondaries: secondaries.dataToUpdate,
    melees: melees.dataToUpdate,
    archwings: arcwhings.dataToUpdate,
    robotics: robotics.dataToUpdate
  };
  let dataToCreate = {
    primaries: primaries.dataToCreate,
    secondaries: secondaries.dataToCreate,
    melees: melees.dataToCreate,
    archwings: archwings.dataToCreate,
    robotics: robotics.dataToCreate
  };

  return { dataToUpdate: dataToUpdate, dataToCreate: dataToCreate, other: primaries.other };
}

export function compareWeaponTypeData(currentData, newData) {
  // Trivially separate newData into weapons that may possibly be updated and
  // weapons that are new and need to be added into the database.
  if (newData === {}) {
    return { dataToUpdate: {}, dataToCreate: {} };
  }

  const { existingWeapons, newWeapons } = separateNewData(currentData, newData);

  // Compare existing weapon objects and get list of changes.
  let differences = diff(currentData, existingWeapons);

  // We want a list of all the weapons that are going to be changed.
  // This is done by looking at the `diff` object and taking all the
  // indexes where weapons from the new are different from the old.
  // If a weapon's index is not listed, we assume it has not changed.
  let indexesOfWeaponsChanging = getAffectedIndexes(differences);

  // Remove duplicates
  let uniqueIndexes = new Set(indexesOfWeaponsChanging);

  // Use indexes to get names of weapons need updating.
  let weaponNamesToUpdate = getWeaponNamesFromGivenIndexes(currentData, uniqueIndexes);

  // Use list of weapon names to filter out the unaffected weapons that don't need updating.
  let dataToUpdate = getWeaponsWithGivenNames(existingWeapons, weaponNamesToUpdate);

  return { dataToUpdate: dataToUpdate, dataToCreate: newWeapons, other: differences };
}

function getAffectedIndexes(differences) {
  return differences.map(({ path }) => {
    return path[0];
  });
}

function getWeaponNamesFromGivenIndexes(weapons, indexes) {
  return weapons.map((weapon, index, arr) => {
    if (indexes.has(index)) {
      return weapon.name;
    }
  });
}

function getWeaponsWithGivenNames(weapons, weaponNames) {
  return weapons.filter((weapon) => {
    return weaponNames.includes(weapon.name);
  });
}

function separateNewData(currentData, newData) {
  let existingWeapons = [];
  let newWeapons = [];
  // Make array of existing weapons names
  let existingWeaponNames = currentData.map(({ name }) => {
    return name;
  })

  newData.forEach(element => {
    // Check if weapon exists already.
    // Determines if content will be added or possibly added.
    if (existingWeaponNames.includes(element.name)) {
      // Weapon already exists, content may need updating
      existingWeapons.push(element);
    } else {
      // Weapon doesn't exist, will be new entry in db
      newWeapons.push(element);
    }
  });

  return { existingWeapons: existingWeapons, newWeapons: newWeapons };
}