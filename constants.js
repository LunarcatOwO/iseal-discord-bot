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
import { config } from "dotenv";
config();
let modmailChannelcheck = "0";
export const TOKEN = process.env.TOKEN;
export const CLIENT_ID = process.env.CLIENT_ID;
export const magicresourcepackattachmentURL =
  "https://github.com/ISeal-plugin-developement/Powergems-ResoucePack/raw/main/PowerGems_magic_pack.zip";
export const resourcepackattachmentURL =
  "https://github.com/ISeal-plugin-developement/Powergems-ResoucePack/raw/main/Powergems_Pack.zip";
export const ModMailCD = 60; //In minutes
export const adCD = 1440; //In minutes
export const approvedAdsChannel = "1257573049251794995";
export const stickyMessageCD = 10000000; //In milliseconds
export const OWNER_ID = process.env.OWNER_ID;
export const TRIGGER_ROLES = ["ISeal", "Community Manager", "Staff"];
export const resourcepackmessageID = "1193993805012140103";
export const modmailChannel = "1242816508145569792";
export const adPendingChannel = "1301012028026130493";
export const magicresourcepackmessageID = "1194529976666570863";
export const commands = [
  {
    name: "help",
    description: "Get help on how to use the bot",
  },
  {
    name: "modmail",
    description: "Sends an message to staff",
  },
  {
    name: "resourcepack",
    description: "Get a link to download the resource pack",
  },
  {
    name: "rp",
    description: "Get a link to download the resource pack",
  },
  {
    name: "rules",
    description: "Get the server's rules",
  },
  {
    name: "config",
    description: "Get how to access the config file",
  },
  {
    name: "wiki",
    description: "Get the wiki link",
    options: [
      {
        name: "powergems",
        description: "Get the wiki link for powergems",
        type: 1,
      },
      {
        name: "orepowers",
        description:
          "Get the wiki link for orepowers (wiki coming if the plugin gains populairty)",
        type: 1,
      },
      {
        name: "valocraft",
        description:
          "Get the wiki link for valocraft (wiki coming if the plugin gains populairty)",
        type: 1,
      },
      {
        name: "parkourproject",
        description:
          "Get the wiki link for parkourproject (wiki coming if the plugin gains populairty)",
        type: 1,
      },
    ],
  },
  {
    name: "download",
    description: "Get the latest download link",
  },
  {
    name: "downloadpre",
    description: "Get the latest pre-release download link for the plugins",
  },
  {
    name: "update",
    description: "Sends out a message for plugin updates (ADMIN ONLY)",
  },
  {
    name: "format",
    description: "Get how to format your bug reports or suggestions",
    options: [
      {
        name: "bug",
        description: "Get how to format your bug reports",
        type: 1,
      },
      {
        name: "suggestion",
        description: "Get how to format your suggestions",
        type: 1,
      },
    ],
  },
  {
    name: "botgithub",
    description:
      "Get the github link to the bot's code to report issues and give suggestions!",
  },
  {
    name: "ad",
    description:
      "Send an advertisement, Will require approval from staff for it to show up in self-promo",
  },
  {
    name: "github",
    description: "Get the GitHub repository links for plugins",
    options: [
      {
        name: "powergems",
        description: "Get PowerGems repository link",
        type: 1,
      },
      {
        name: "orepowers",
        description: "Get OrePowers repository link",
        type: 1,
      },
      {
        name: "valocraft",
        description: "Get ValoCraft repository link",
        type: 1,
      },
      {
        name: "parkourproject",
        description: "Get ParkourProject repository link",
        type: 1,
      },
    ],
  },
];
//why are you here. you shouldnt be here. you should be in the main.js file. go back there
export const goofy =
  "c3R1cGlkIGh1bWFuIHdobyBkbyB5b3UgdGhpbmsgeW91IGFyZSA8QCR7bWVzc2FnZS5hdXRob3IuaWR9PiBub3cgc2h1dCB0aGUgaGVsbCB1cC4=";
export const goofycheck = atob("c3R1cGlkIGJvdA==");
