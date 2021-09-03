import axios from "axios";
import fs from "fs";
import path from "path";
import yn from "yn";


export async function downloadContent(element, downloadLocation) {
  const {
    data
  } = await axios.get(element.link);
  fs.writeFileSync(path.join(process.cwd(), downloadLocation + element.name + ".html"), data, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
  console.log("Downloaded " + element.name + "...")
}

function downloadWeapon(storagePath, downloadLocation) {
  const weapons = JSON.parse(fs.readFileSync(storagePath));
  weapons.forEach(element => {
    downloadContent(element, downloadLocation)
  });
}

export function downloadWeapons() {
  if (yn(process.env.REACT_APP_DOWNLOADER_ALLOW_PRIMARY)) {
    downloadWeapon(process.env.REACT_APP_PRIMARY_JSON_PRE_STORAGE_PATH, process.env.REACT_APP_PRIMARY_HTML_STORAGE_BASE_PATH);
  }
  if (yn(process.env.REACT_APP_DOWNLOADER_ALLOW_SECONDARY)) {
    downloadWeapon(process.env.REACT_APP_SECONDARY_JSON_PRE_STORAGE_PATH, process.env.REACT_APP_SECONDARY_HTML_STORAGE_BASE_PATH);
  }
  if (yn(process.env.REACT_APP_DOWNLOADER_ALLOW_MELEE)) {
    downloadWeapon(process.env.REACT_APP_MELEE_JSON_PRE_STORAGE_PATH, process.env.REACT_APP_MELEE_HTML_STORAGE_BASE_PATH);
  }
  if (yn(process.env.REACT_APP_DOWNLOADER_ALLOW_ARCHWING)) {
    downloadWeapon(process.env.REACT_APP_ARCHWING_JSON_PRE_STORAGE_PATH, process.env.REACT_APP_ARCHWING_HTML_STORAGE_BASE_PATH);
  }
  if (yn(process.env.REACT_APP_DOWNLOADER_ALLOW_ROBOTIC)) {
    downloadWeapon(process.env.REACT_APP_ROBOTIC_JSON_PRE_STORAGE_PATH, process.env.REACT_APP_ROBOTIC_HTML_STORAGE_BASE_PATH);
  }
}