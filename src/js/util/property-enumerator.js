import axios from "axios";
import fs from "fs";
import cheerio from "cheerio";
import yn from "yn";

function enumerateFields(data, dict) {
  const $ = cheerio.load(data);
  let sections = $("aside > section");
  sections.each((idx, section) => {
    let subDictName = $(section).find("h2").text();
    let fields = $(section).children("div");
    fields.each((idx, field) => {
      addToSubDict(dict, subDictName, $(field).attr("data-source"));
    })
  });
}

function addToSubDict(dict, subDictName, key) {
  if (dict[subDictName] === undefined) {
    dict[subDictName] = {};
  }
  let og = dict[subDictName];
  if (og[key]) {
    og[key] += 1;
  } else {
    og[key] = 1;
  }
}

async function enumerateWeapons(type) {
  let dict = {};
  let weapons = JSON.parse(fs.readFileSync("resources/json/weapons/pre/" + type + "-pre.json"));

  if (yn(process.env.REACT_APP_LOCAL)) {
    console.log("Enumerating from local " + type + " weapons html...");
    weapons.forEach(element => {
      enumerateFields(fs.readFileSync(process.env.REACT_APP_ENUMERATOR_BASE_PATH + type + "/" + element.name + ".html"), dict);
    });
  } else {
    weapons.forEach(element => {
      let data = axios.get(element.link).data;
      enumerateFields(data, dict);
    });
  }

  fs.writeFile("resources/json/weapons/enumerate/" + type + "-fields.json", JSON.stringify(dict, null, 2), (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
}

export function enumerateAllWeaponFields() {
  if (yn(process.env.REACT_APP_ENUMERATOR_ALLOW_PRIMARY)) {
    enumerateWeapons("primary");
  }
  if (yn(process.env.REACT_APP_ENUMERATOR_ALLOW_SECONDARY)) {
    enumerateWeapons("secondary");
  }
  if (yn(process.env.REACT_APP_ENUMERATOR_ALLOW_MELEE)) {
    enumerateWeapons("melee");
  }
  if (yn(process.env.REACT_APP_ENUMERATOR_ALLOW_ARCHWING)) {
    enumerateWeapons("archwing");
  }
  if (yn(process.env.REACT_APP_ENUMERATOR_ALLOW_ROBOTIC)) {
    enumerateWeapons("robotic");
  }
}