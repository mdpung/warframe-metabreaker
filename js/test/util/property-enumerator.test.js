import * as enumerator from "../../util/property-enumerator.js"
import dotenv from "dotenv";

dotenv.config();
enumerator.enumerateWeaponFields();

// let dict = {
//   "Normal": {
//     "Heal": 1
//   }
// }

// let dict2 = {
//   "Normal": {
//     "Damage": 2
//   }
// }

// let dict3 = {};
// dict3.Normal = {};
// console.log(dict3);
// let temp = dict3.Normal;
// console.log("Temp: " + temp);
// console.log("dict3: " + dict3.Normal);
// console.log(enumerator.addToSubDict("Normal", dict2));