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
import { EmbedBuilder } from "discord.js";
import { getperms } from "../util/permcheck.js";
export async function help(interaction) {
  try {
    const embed = new EmbedBuilder()
      .setColor("#0099ff")
      .setTitle("**Commands**")
      .addFields(
        { name: "/help", value: "Shows this page", inline: true },
        {
          name: "/modmail",
          value:
            "Sends an message to staff thats compleatly private, it can be a comment about the server",
          inline: true,
        },
        {
          name: "/resourcepack",
          value: "Get the Resource Pack download links",
          inline: true,
        },
        {
          name: "/rules",
          value: "Get the server's rules (Gotta follow the rules! 😊)",
          inline: true,
        },
        {
          name: "/config",
          value: "Get how to access the config files for your plugin",
          inline: true,
        },
        {
          name: "/wiki <plugin_name>",
          value:
            "Get the wiki page link for the plugin you are looking for (if it exists)",
          inline: true,
        },
        {
          name: "/download",
          value: "Get the latest stable release of the plugins",
          inline: true,
        },
        {
          name: "/downloadpre",
          value: "Get the latest pre-release download link for the plugins",
          inline: true,
        },
        {
          name: "/format <format_type>",
          value:
            "Get the format for a bug report or a suggestion, the avalible format types are: bug, suggestion",
          inline: true,
        },
        {
          name: "/ad",
          value:
            "Send an advertisement, Will require approval from staff for it to show up in self-promo",
          inline: true,
        },
        {
          name: "/github",
          value: "Get the github link for the selected plugin",
          inline: true,
        },
        {
          name: "/botgithub",
          value:
            "Get the github link to the bot's code to report issues and give suggestions!",
        }
      )
      .setTimestamp()
      .setFooter({
        text: "Made with ❤️ by LunarcatOwO",
        iconURL:
          "https://cdn.discordapp.com/avatars/905758994155589642/96f2fabc5e89d3e89a71aeda12f81a47?size=1024&f=.png",
      });
    const embed2 = new EmbedBuilder()
      .setColor("#0099ff")
      .setTitle("**Admin Commands list**")
      .addFields(
        {
          name: "/help",
          value:
            "Shows this page (Will not show up for other users other then you)",
          inline: true,
        },
        {
          name: "/modmail",
          value:
            "Sends an message to staff thats compleatly private, it can be a comment about the server (Yes even you youself as a staff can use this command)",
          inline: true,
        },
        {
          name: "/resourcepack",
          value:
            "sends the Resource Pack download links publically in the channel unlike a normal user which will not show up in the channel for other people",
          inline: true,
        },
        {
          name: "/rules",
          value:
            "Sends the server rules into the channel you use the command in publically (Gotta follow the rules! 😊)",
          inline: true,
        },
        {
          name: "/config",
          value:
            "sends the way of accesing the config files for any of the plugins publically in the channel",
          inline: true,
        },
        {
          name: "/wiki <plugin_name>",
          value:
            "sends the wiki page link for the plugin publically (if it exists)",
          inline: true,
        },
        {
          name: "/download",
          value:
            "Get the latest stable release of the plugins and sends it publically in the channel",
          inline: true,
        },
        {
          name: "/downloadpre",
          value:
            "Get the latest pre-release download link for the plugins and sends it publically in the channel",
          inline: true,
        },
        {
          name: "/format <format_type>",
          value:
            "Get the format for a bug report or a suggestion, the avalible format types are: `bug`, `suggestion` and sends it publically in the channel",
          inline: true,
        },
        {
          name: "/ad",
          value:
            "Send an advertisement, Will require approval from staff for it to show up in self-promo, WHY ARE YOU USING THIS COMMAND? YOU ARE A STAFF MEMBER! 😂",
          inline: true,
        },
        {
          name: "/github",
          value: "Get the github link for the selected plugin and sends it publically in the channel",
          inline: true,
        },
        {
          name: "/botgithub",
          value:
            "Get the github link to the bot's code to report issues and give suggestions! (will not send out to everyone)",
        },
        {
          name: "/update",
          value: `Send out messages for plugin updates
            **Usage:** Run /update and then fill out the form that appears
            **Plugin IDs:** pg = powergems, vc = valocraft, op = orepowers, pp = parkourproject
            **Version:** The version number of the plugin
            **Ping or No Ping:** If you want to ping the server or not (0 or n = no ping, 1 or y = ping, if there is no input it will default ping)`,
        }
      )
      .setTimestamp()
      .setFooter({
        text: "Made with ❤️ by LunarcatOwO",
        iconURL:
          "https://cdn.discordapp.com/avatars/905758994155589642/96f2fabc5e89d3e89a71aeda12f81a47?size=1024&f=.png",
      });
    if (!interaction.guild) {
      await interaction.reply({ embeds: [embed] });
      return;
    }
    const hasRole = await getperms(interaction);
    if (hasRole) {
      await interaction.reply({ embeds: [embed2], ephemeral: true });
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
