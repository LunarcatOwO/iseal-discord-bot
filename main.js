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

import {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  Partials,
  EmbedBuilder,
} from "discord.js";
// Loading the environment variables
import { TOKEN, CLIENT_ID, commands, stickyMessageCD, goofy, goofycheck } from "./constants.js";

const rest = new REST({ version: "10" }).setToken(TOKEN);

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
BOT.on("ready", () => {
  console.log(`Logged in as ${BOT.user.tag}!`);
});
import { help } from "./modules/commands/help.js";
import { modmail } from "./modules/commands/modmail.js";
import { resourcepack } from "./modules/commands/resourcepack.js";
import { rules } from "./modules/commands/rules.js";
import { config } from "./modules/commands/config.js";
import { wiki } from "./modules/commands/wiki.js";
import { download } from "./modules/commands/download.js";
import { downloadpre } from "./modules/commands/downloadpre.js";
import { update } from "./modules/commands/update.js";
import { format } from "./modules/commands/format.js";
import { botgithub } from "./modules/commands/botgithub.js";
import { sleep } from "./modules/util/sleep.js";
import { ad } from "./modules/commands/ad.js";
import { github } from "./modules/commands/github.js";
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

import { updateModal } from "./modules/modals/update.js";
import { modmailModal } from "./modules/modals/modmail.js";
import { adPendingModal, adApprove, adDeny } from "./modules/modals/ad.js";
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
BOT.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === "AdApprove") {
    await adApprove(interaction, BOT);
  } else if (interaction.customId === "AdDeny") {
    await adDeny(interaction, BOT);
  }
});

BOT.on("threadCreate", async (thread) => {
  try {
    await thread.join();
    const embed = new EmbedBuilder()
      .setColor("#FFFF00")
      .setTitle("Hello!")
      .setDescription(
        "**I am a bot, I may not be able to assist you, but please be patient as someone will respond as soon as they can!**"
      )
      .setTimestamp()
      .setFooter({
        text: "Made with ❤️ by LunarcatOwO",
        iconURL:
          "https://cdn.discordapp.com/avatars/905758994155589642/96f2fabc5e89d3e89a71aeda12f81a47?size=1024&f=.png",
      });
    await thread.send({ embeds: [embed] });
    await thread.send({
      content: "<@905758994155589642> <@398908171357519872>",
    });
    await thread.lastMessage.delete();
    const tags = thread.appliedTags
      .map((tagId) => {
        const tag = thread.parent.availableTags.find((t) => t.id === tagId);
        return tag ? tag.name : "Unknown Tag";
      })
      .join(", ");
    console.log(
      `Thread created: ${thread.name} with tags: ${tags}, parent: ${thread.parent.name}`
    );
  } catch (error) {
    console.error(error);
  }
});

BOT.on("messageCreate", async (message) => {
  try {
    if (message.author.bot) return;
    if (message.mentions.has(BOT.user)) {
      await message.reply(
        `**Hey <@${message.author.id}>. I am a bot, cannot assist you! If you want to report a bug put it in https://discord.com/channels/1157645386480091156/1157659553345831012 if you have a suggestion put it in https://discord.com/channels/1157645386480091156/1157664317932584970 **`
      );
    }
    if (message.channel.type == 1 && message.author.id !== BOT.user.id) {
      if (message.content.startsWith(goofycheck)) {
        const decodedMessage = atob(goofy);
        await message.reply(
          decodedMessage.replace("${message.author.id}", message.author.id)
        );
      } else {
        await message.reply(
          `**Hey <@${message.author.id}>. I am a bot, cannot assist you! If you want to report a bug put it in https://discord.com/channels/1157645386480091156/1157659553345831012 if you have a suggestion put it in https://discord.com/channels/1157645386480091156/1157664317932584970 **`
        );
      }
    } else return;
  } catch (error) {
    console.error(error);
  }
});
import { handlemessagesiumalrity } from "./modules/util/handlemessagesiumalrity.js";
import { DM } from "./modules/util/directmessage.js";
import { handlebots } from "./modules/util/handlebots.js";
BOT.on("messageCreate", async (message) => {
  try {
    if (message.author.bot) return;
    if (message.channel.id !== "1157659447976534087") return;
    await handlemessagesiumalrity(message);
  } catch (error) {
    console.error(error);
  }
});
let stickyMessage = {
  channelId: "1157659447976534087",
  messageId: null,
  content:
    "### Read https://discord.com/channels/1157645386480091156/1296440139504943131 before asking for the resourcepack!",
};
let isStickyMessageRunning = false;
async function handleStickyMessage(message, stickyMessage) {
  if (isStickyMessageRunning) {
    return;
  }

  isStickyMessageRunning = true;

  try {
    const stickyMsg = await message.channel.messages.fetch(
      stickyMessage.messageId
    );
    await stickyMsg.delete();
    const newStickyMsg = await message.channel.send(stickyMessage.content);
    stickyMessage.messageId = newStickyMsg.id;
  } catch (error) {
    const newStickyMsg = await message.channel.send(stickyMessage.content);
    stickyMessage.messageId = newStickyMsg.id;
  }

  await sleep(stickyMessageCD);
  isStickyMessageRunning = false;
}
BOT.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  else if (message.channel.id !== stickyMessage.channelId) return;
  else handleStickyMessage(message, stickyMessage);
});
BOT.on("messageCreate", async (message) => {
  if (!message.author.bot) return;
  else handlebots(message);
});
BOT.on("guildMemberAdd", async (member) => {
  await DM(
    BOT,
    member.user.id,
    `Hello ${member.displayName}, Welcome to ISeals Plugins Server! For the Powergems resourcepack run \`/resourcepack\` in here or in the server. If you have a bug to report put it in https://discord.com/channels/1157645386480091156/1157659553345831012 and if you have a suggestion then put it in https://discord.com/channels/1157645386480091156/1157664317932584970`
  );
});
BOT.login(TOKEN);
