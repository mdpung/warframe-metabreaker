import * as downloader from "../../util/downloader.js";

const wep = {
  name: 'Paris Prime',
  link: 'https://warframe.fandom.com/wiki/Paris_Prime'
};

await downloader.downloadContent(wep.link, "/weapons/primary/" + wep.name + ".html");