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
  if (yn(process.env.DOWNLOADER_ALLOW_PRIMARY)) {
    downloadWeapon(process.env.PRIMARY_JSON_PRE_STORAGE_PATH, process.env.PRIMARY_HTML_STORAGE_BASE_PATH);
  }
  if (yn(process.env.DOWNLOADER_ALLOW_SECONDARY)) {
    downloadWeapon(process.env.SECONDARY_JSON_PRE_STORAGE_PATH, process.env.SECONDARY_HTML_STORAGE_BASE_PATH);
  }
  if (yn(process.env.DOWNLOADER_ALLOW_MELEE)) {
    downloadWeapon(process.env.MELEE_JSON_PRE_STORAGE_PATH, process.env.MELEE_HTML_STORAGE_BASE_PATH);
  }
  if (yn(process.env.DOWNLOADER_ALLOW_ARCHWING)) {
    downloadWeapon(process.env.ARCHWING_JSON_PRE_STORAGE_PATH, process.env.ARCHWING_HTML_STORAGE_BASE_PATH);
  }
  if (yn(process.env.DOWNLOADER_ALLOW_ROBOTIC)) {
    downloadWeapon(process.env.ROBOTIC_JSON_PRE_STORAGE_PATH, process.env.ROBOTIC_HTML_STORAGE_BASE_PATH);
  }
}