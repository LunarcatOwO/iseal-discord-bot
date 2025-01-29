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

// Import required Discord.js components
import { Client, GatewayIntentBits, REST, Routes, Partials } from "discord.js";
// Import environment variables and commands
import { TOKEN, CLIENT_ID, commands } from "./constants.js";

// Initialize Discord REST API client
const rest = new REST({ version: "10" }).setToken(TOKEN);

 // Register slash commands with Discord
try {
  console.log("Started refreshing application (/) commands.");

  // Wrap the code in an async function
  (async () => {
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
  })();

  console.log("Successfully reloaded application (/) commands.");
} catch (error) {
  console.error(error);
}

// Initialize Discord bot client with required intents and settings
export const BOT = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMembers,
  ],
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.GuildMembers,
    Partials.Reaction,
    Partials.GuildScheduledEvent,
    Partials.ThreadMember,
  ],
  allowedMentions: { parse: ["users", "roles", "everyone"] },
});

// Bot ready event handler
BOT.on("ready", () => {
  console.log(`Logged in as ${BOT.user.tag}!`);
});

// Import command handlers
import {
  help,
  modmail,
  resourcepack,
  rules,
  config,
  wiki,
  download,
  downloadpre,
  update,
  format,
  botgithub,
  ad,
  github,
} from "./modules/commands/commands.js";

// Slash command interaction handler
BOT.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName == "help") {
    await help(interaction);
  }
  if (interaction.commandName == "modmail") {
    await modmail(interaction);
  }
  if (
    interaction.commandName == "resourcepack" ||
    interaction.commandName == "rp"
  ) {
    await resourcepack(interaction);
  }
  if (interaction.commandName == "rules") {
    await rules(interaction);
  }
  if (interaction.commandName == "config") {
    await config(interaction);
  }
  if (interaction.commandName == "wiki") {
    await wiki(interaction);
  }
  if (interaction.commandName == "download") {
    await download(interaction);
  }
  if (interaction.commandName == "downloadpre") {
    await downloadpre(interaction);
  }
  if (interaction.commandName == "update") {
    await update(interaction);
  }
  if (interaction.commandName == "format") {
    await format(interaction);
  }
  if (interaction.commandName == "botgithub") {
    await botgithub(interaction);
  }
  if (interaction.commandName == "ad") {
    await ad(interaction);
  }
  if (interaction.commandName == "github") {
    await github(interaction);
  }
});

// Import modal handlers
import { updateModal } from "./modules/modals/update.js";
import { modmailModal } from "./modules/modals/modmail.js";
import { adPendingModal, adApprove, adDeny } from "./modules/modals/ad.js";

// Modal submission handler
BOT.on("interactionCreate", async (interaction) => {
  if (!interaction.isModalSubmit()) return;

  if (interaction.customId == "updateModal") {
    updateModal(interaction);
  }
  if (interaction.customId == "modmailModal") {
    modmailModal(interaction);
  }
  if (interaction.customId == "ad") {
    adPendingModal(interaction);
  }
});

// Button interaction handler
BOT.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === "AdApprove") {
    await adApprove(interaction, BOT);
  } else if (interaction.customId === "AdDeny") {
    await adDeny(interaction, BOT);
  }
});

// Thread management
import { handleThread } from "./modules/util/handleThreads.js";
BOT.on("threadCreate", async (thread) => {
  await handleThread(thread);
});

// Bot mention and DM response handler
BOT.on("messageCreate", async (message) => {
  try {
    if (message.author.bot) return;
    if (message.mentions.has(BOT.user)) {
      await message.reply(
        `**Hey <@${message.author.id}>. I am a bot, cannot assist you!**`
      );
    }
    if (message.channel.type == 1 && message.author.id !== BOT.user.id) {
      await message.reply(
        `**Hey <@${message.author.id}>. I am a bot, cannot assist you!**`
      );
    }
  } catch (error) {
    console.error(error);
  }
});

// Import utility handlers
import { handlemessagesiumalrity } from "./modules/util/handlemessagesiumalrity.js";
import { DM } from "./modules/util/directmessage.js";
import { handlebots } from "./modules/util/handlebots.js";

// Message similarity checker for specific channel
BOT.on("messageCreate", async (message) => {
  try {
    if (message.author.bot) return;
    if (message.channel.id !== "1157659447976534087") return;
    await handlemessagesiumalrity(message);
  } catch (error) {
    console.error(error);
  }
});

// Sticky message handler
import { handleStickyMessage } from "./modules/util/handleStickyMessage.js";
let stickyMessage = {
  channelId: "1157659447976534087",
  messageId: null,
  content:
    "### Read https://discord.com/channels/1157645386480091156/1296440139504943131 before asking for the resourcepack!",
};

// Sticky message event handler
BOT.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  else if (message.channel.id !== stickyMessage.channelId) return;
  else handleStickyMessage(message, stickyMessage);
});

// Bot message handler
BOT.on("messageCreate", async (message) => {
  if (!message.author.bot) return;
  else handlebots(message);
});

// New member welcome message handler
BOT.on("guildMemberAdd", async (member) => {
  await DM(
    BOT,
    member.user.id,
    `Hello ${member.displayName}, Welcome to ISeals Plugins Server! For the Powergems resourcepack run \`/resourcepack\` in here or in the server. If you have a bug to report put it in https://discord.com/channels/1157645386480091156/1157659553345831012 and if you have a suggestion then put it in https://discord.com/channels/1157645386480091156/1157664317932584970`
  );
});

// Start the bot
BOT.login(TOKEN);
