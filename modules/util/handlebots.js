// MIT License

// Copyright (c) 2024 LunarcatOwO

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { modmailChannel } from "../../constants.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const botAlerts = {};

export async function handlebots(message) {
  try {
    if (message.guild.id !== "1157645386480091156") return;
    const channel = message.guild.channels.cache.get(modmailChannel);
    if (message.channel.type == 1 && message.author.id !== "1202759951395586069") {
        channel.send(
          "Bot who dmed the bot is: " +
            message.author.id +
            " and the message is: " +
            message.content
        );
        return;
    }
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
      const now = Date.now();
      if (!botAlerts[message.author.id]) {
        botAlerts[message.author.id] = [];
      }

      botAlerts[message.author.id] = botAlerts[message.author.id].filter(
        (ts) => now - ts < 60 * 60 * 1000
      );
      botAlerts[message.author.id].push(now);

      message.delete();

      if (botAlerts[message.author.id].length <= 3) {
        await channel.send(
          message.content +
            "\n# was deleted because it was sent by bot: " +
            message.author.id +
            "\n# and is not whitelisted."
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
}
