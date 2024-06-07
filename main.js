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
  EmbedBuilder,
  ModalBuilder,
  TextInputBuilder,
  ActionRowBuilder,
  CategoryChannel,
  Collection,
} from "discord.js";
// Loading the environment variables
import {
  TOKEN,
  CLIENT_ID,
  TRIGGER_ROLES,
  modmailChannel,
  resourcepackmessageID,
  magicresourcepackmessageID,
  commands,
} from "./constants.js";

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
  allowedMentions: { parse: ["users", "roles", "everyone"] },
});
import {
  getLatestReleaseAsset,
  getLatestPreReleaseAsset,
} from "./modules/util/getreleaseasset.js";
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
BOT.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "help") {
    help(interaction);
  }
  if (interaction.commandName === "modmail") {
    modmail(interaction);
  }
  if (
    interaction.commandName === "resourcepack" ||
    interaction.commandName === "rp"
  ) {
   resourcepack(interaction)
  }
  if (interaction.commandName === "rules") {
    rules(interaction);
  }
  if (interaction.commandName === "config") {
    config(interaction)
  }
  if (interaction.commandName === "wiki") {
    wiki(interaction)
  }
  if (interaction.commandName === "download") {
    download(interaction)
  }
  if (interaction.commandName === "downloadpre") {
    downloadpre(interaction)
  }
  if (interaction.commandName === "update") {
    update(interaction)
  }
  if (interaction.commandName === "format") {
    format(interaction)
  }
  if (interaction.commandName === "botgithub") {
    botgithub(interaction)
  }
});

BOT.on("interactionCreate", async (interaction) => {
  if (!interaction.isModalSubmit()) return;

  if (interaction.customId === "updateModal") {
    try {
      if (!interaction.guild) {
        await interaction.reply({
          content: "How did you even trigger this message... ",
        });
        return;
      }
      const pluginID = interaction.fields.getTextInputValue("pluginIDinput");
      const version = interaction.fields.getTextInputValue("versionInfoInput");
      const updateInfo =
        interaction.fields.getTextInputValue("updateInfoInput");
      let pluginName;
      let roleid;
      if (pluginID === "pg") {
        pluginName = "PowerGems";
        roleid = "1158015875744551003";
      } else if (pluginID === "op") {
        pluginName = "OrePowers";
        roleid = "1185692151716270121";
      } else if (pluginID === "vc") {
        pluginName = "Valocraft";
        roleid = "1201124609060245555";
      } else if (pluginID === "pp") {
        pluginName = "ParkourProject";
        roleid = "1215399455835029504";
      } else {
        await interaction.reply({
          content: "Invalid plugin ID",
          ephemeral: true,
        });
        return;
      }
      const embed = new EmbedBuilder()
        .setColor("#FFFF00")
        .setTitle(`${pluginName} has updated to version ${version}`)
        .setDescription(
          `**What changed:**
    ${updateInfo}`
        )
        .setTimestamp()
        .setFooter({
          text: "Made with ❤️ by LunarcatOwO",
          iconURL:
            "https://cdn.discordapp.com/avatars/905758994155589642/96f2fabc5e89d3e89a71aeda12f81a47?size=1024&f=.png",
        })
        .addFields({
          name: "Download",
          value: `[Click me to download the plugin](${await getLatestReleaseAsset(
            "Iseal-plugin-developement",
            pluginName
          )})`,
        });
      if (!interaction.guild) {
        await interaction.reply({ embeds: [embed] });
        return;
      }
      const member =
        interaction.member ||
        (await interaction.guild.members.fetch(interaction.user.id));
      const roleNamesToCheck = TRIGGER_ROLES;
      const hasRole = member.roles.cache.some((role) =>
        roleNamesToCheck.includes(role.name)
      );
      if (hasRole) {
        await interaction.reply({ content: `<@&${roleid}>`, embeds: [embed] });
      } else {
        await interaction.reply({ embeds: [embed], ephemeral: true });
      }
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content:
          "an error has occured, try again, if it doesnt work contact lunarcatowo",
        ephemeral: true,
      });
    }
  }
  if (interaction.customId === "modmailModal") {
    try {
      if (!interaction.guild) {
        await interaction.reply({
          content: "ummmm how. did you. trigger this.",
        });
        return;
      }
      const mailMessage = interaction.fields.getTextInputValue("mailMessage");
      const channel = interaction.guild.channels.cache.get(modmailChannel);
      const embed = new EmbedBuilder()
        .setColor("#00ff00")
        .setTitle(`New Modmail`)
        .setDescription(`Information are the following:`)
        .addFields(
          {
            name: "Content",
            value: `${mailMessage}`,
          },
          {
            name: "User who sent the message",
            value: `Username: ${interaction.user.username}
ID: ${interaction.user.id}`,
          }
        )
        .setTimestamp()
        .setFooter({
          text: "Made with ❤️ by LunarcatOwO",
          iconURL:
            "https://cdn.discordapp.com/avatars/905758994155589642/96f2fabc5e89d3e89a71aeda12f81a47?size=1024&f=.png",
        });
      await channel.send({ embeds: [embed] });
      await interaction.reply({
        content: "Your message has been sent to the staff team!",
        ephemeral: true,
      });
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content:
          "an error has occured, try again, if it doesnt work contact lunarcatowo",
        ephemeral: true,
      });
    }
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
  } catch (error) {
    console.error(error);
  }
});

BOT.on("messageCreate", async (message) => {
  try {
    if (message.mentions.has(BOT.user)) {
      await message.reply(
        "**I am a bot, cannot assist you! If you want to report a bug put it in https://discord.com/channels/1157645386480091156/1157659553345831012 if you have a suggestion put it in https://discord.com/channels/1157645386480091156/1157664317932584970 **"
      );
    }
    if (message.channel.type === "DM" && message.author.id !== BOT.user.id) {
      await message.reply(
        "**I am a bot, cannot assist you! If you want to report a bug put it in https://discord.com/channels/1157645386480091156/1157659553345831012 if you have a suggestion put it in https://discord.com/channels/1157645386480091156/1157664317932584970 **"
      );
    }
  } catch (error) {
    console.error(error);
  }
});

BOT.on("guildMemberAdd", async (member) => {
  try {
    const embed = new EmbedBuilder()
      .setColor("#0099ff")
      .setTitle("Welcome to the server!")
      .setDescription(
        "Welcome to the server! if you are looking for the resource pack then run /resourcepack and it will automatically help you with that. Again welcome to the server and if you have any questions then just ask!"
      )
      .setTimestamp()
      .setFooter({
        text: "Made with ❤️ by LunarcatOwO",
        iconURL:
          "https://cdn.discordapp.com/avatars/905758994155589642/96f2fabc5e89d3e89a71aeda12f81a47?size=1024&f=.png",
      });
    await member.user.send({ content: "Hello!", embed: [embed] });
  } catch (error) {
    console.error(`Could not send welcome DM to ${member.displayName}.`, error);
  }
});

BOT.login(TOKEN);
