import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function handleBots(message) {
  try {
    let whitelistedBot = false;
    const whitelistFile = path.resolve(__dirname, "botwhitelist.json");
    const whitelistData = JSON.parse(fs.readFileSync(whitelistFile, "utf8"));
    let whitelisted = whitelistData.whitelist;

    for (let bot of whitelisted) {
      if (message.author.id == bot) {
        whitelistedBot = true;
        break;
      }
    }
    if (whitelistedBot) {
      return;
    } else {
        message.delete();
    }
  } catch (error) {
    console.log(error);
  }
}
