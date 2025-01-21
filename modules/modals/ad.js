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
import { adPendingChannel, approvedAdsChannel } from "../../constants.js";
import {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} from "discord.js";
import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";
import { DM } from "../util/directmessage.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export async function adPendingModal(interaction) {
  try {
    const messageMapPath = path.join(__dirname, "messagemap.json");
    if (!interaction.guild) {
      await interaction.reply({
        content: "ummmm how. did you. trigger this.",
      });
      return;
    }
    const ADMessage = interaction.fields.getTextInputValue("ADMessage");

    // Check for @ in the message
    // if (ADMessage.includes("@")) {
    //   await interaction.reply({
    //     content: "Your message contains @, which is not allowed. The command will go into cooldown either way.",
    //     ephemeral: true,
    //   });
    //   return;
    // }

    const channel = interaction.guild.channels.cache.get(adPendingChannel);

    const embed = new EmbedBuilder()
      .setColor("#00ff00")
      .setTitle(`New Advertisement Awaiting Approval`)
      .setDescription(`Information are the following:`)
      .addFields(
        {
          name: "Content",
          value: `${ADMessage}`,
        },
        {
          name: "User who sent the message",
          value: `Username: ${interaction.user.username}\nID: ${interaction.user.id}`,
        }
      )
      .setTimestamp()
      .setFooter({
        text: "Made with ❤️ by LunarcatOwO",
        iconURL:
          "https://cdn.discordapp.com/avatars/905758994155589642/96f2fabc5e89d3e89a71aeda12f81a47.png",
      });

    const AdApprove = new ButtonBuilder()
      .setCustomId("AdApprove")
      .setLabel("Approve")
      .setStyle(ButtonStyle.Success);

    const AdDeny = new ButtonBuilder()
      .setCustomId("AdDeny")
      .setLabel("Deny")
      .setStyle(ButtonStyle.Danger);

    const actionRow = new ActionRowBuilder().addComponents(AdApprove, AdDeny);

    // Send the message and get the sent message object
    const sentMessage = await channel.send({
      embeds: [embed],
      components: [actionRow],
      allowedMentions: { parse: [] },
    });

    // Load existing mappings
    let messageMap = {};
    if (fs.existsSync(messageMapPath)) {
      const data = fs.readFileSync(messageMapPath, "utf8");
      messageMap = JSON.parse(data);
    }

    // Add new mapping
    messageMap[sentMessage.id] = {
      originalMessage: ADMessage,
      userId: interaction.user.id,
    };

    // Save the updated mappings
    fs.writeFileSync(messageMapPath, JSON.stringify(messageMap, null, 2));

    await interaction.reply({
      content: "Your advertisement has been submitted for approval.",
      ephemeral: true,
    });
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "An error has occurred, please try again later.",
      ephemeral: true,
    });
  }
}
export async function adApprove(interaction, BOT) {
  try {
    const messageMapPath = path.join(__dirname, "messagemap.json");
    if (!interaction.guild) {
      await interaction.reply({
        content: "ummmm how. did you. trigger this.",
      });
      return;
    }
    const messageId = interaction.message.id;

    // Load existing mappings
    let messageMap = {};
    if (fs.existsSync(messageMapPath)) {
      const data = fs.readFileSync(messageMapPath, "utf8");
      messageMap = JSON.parse(data);
    }

    // Retrieve the original message and user ID
    const mapping = messageMap[messageId];
    if (!mapping) {
      await interaction.reply({
        content: "No advertisement found for this message ID.",
        ephemeral: true,
      });
      return;
    }
    const { originalMessage, userId } = mapping;

    // Get the channel to send approved ads
    const channel = interaction.guild.channels.cache.get(approvedAdsChannel);

    // Send the original message to the approved ads channel
    await channel.send(`@silent ${originalMessage}`, { allowedMentions: { parse: [] } });
    await channel.send(
      `@silent The following advertisement is sent by: <@${userId}>\n-# The advertisment is not official and is not endorsed by the server staff. `,
      { allowedMentions: { parse: [] } }
    );
    await DM(
      BOT,
      userId,
      `@silent Your advertisement has been approved and sent to the server.`
    );
    await DM(
      BOT,
      userId,
      `@silent Advertisement:\n${originalMessage}`
    );
    // Optionally delete the mapping since it's no longer needed
    delete messageMap[messageId];
    fs.writeFileSync(messageMapPath, JSON.stringify(messageMap, null, 2));
    
    // Delete the pending advertisement message
    await interaction.message.delete();
    await interaction.reply({
      content: "The advertisement has been approved and sent.",
      ephemeral: true,
    });
  } catch (error) {
    console.log(error);
    try {
      await interaction.reply({
        content: "An error has occurred, please try again later.",
        ephemeral: true,
      });
    } catch (error) { console.log(error) }
  }
}
export async function adDeny(interaction, BOT) {
  try {
    if (!interaction.guild) {
      await interaction.reply({
        content: "This command can only be used within a server.",
        ephemeral: true,
      });
      return;
    }

    const messageId = interaction.message.id;

    // Load existing mappings
    const messageMapPath = path.join(__dirname, "messagemap.json");
    let messageMap = {};
    if (fs.existsSync(messageMapPath)) {
      const data = fs.readFileSync(messageMapPath, "utf8");
      messageMap = JSON.parse(data);
    }

    // Retrieve the mapping for the message ID
    const mapping = messageMap[messageId];
    if (!mapping) {
      await interaction.reply({
        content: "No advertisement found for this message ID.",
        ephemeral: true,
      });
      return;
    }
//1
    const { originalMessage, userId } = mapping;
    await DM(
      BOT,
      userId,
      `@silent Your advertisement has been Denied.`
    );
    await DM(
      BOT,
      userId,
      `@silent Advertisement:\n${originalMessage}`
    );
    // Delete the mapping from messageMap
    delete messageMap[messageId];
    fs.writeFileSync(messageMapPath, JSON.stringify(messageMap, null, 2));

    // Delete the pending advertisement message
    await interaction.message.delete();
    await interaction.reply({
      content: "The advertisement has been denied and removed.",
      ephemeral: true,
    });
  } catch (error) {
    console.log(error);
    try {
      await interaction.reply({
        content: "An error has occurred, please try again later.",
        ephemeral: true,
      });
    } catch (error) { console.log(error) }
  }
}
