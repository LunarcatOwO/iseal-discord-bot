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
import { getLatestReleaseAsset } from "../util/getreleaseasset.js";
import { getperms } from "../util/permcheck.js";
export async function updateModal(interaction) {
  try {
    if (!interaction.guild) {
      await interaction.reply({
        content: "How did you even trigger this message... ",
      });
      return;
    }
    const pluginID = interaction.fields.getTextInputValue("pluginIDinput");
    const version = interaction.fields.getTextInputValue("versionInfoInput");
    const updateInfo = interaction.fields.getTextInputValue("updateInfoInput");
    let pluginName;
    let roleid;
    async function UpdateLink() {
      if (pluginID == "pg") {
        return "https://modrinth.com/plugin/powergems";
      } else {
        return await getLatestReleaseAsset(
          "Iseal-plugin-developement",
          pluginName
        )
      }
    }
    if (pluginID == "pg") {
      pluginName = "PowerGems";
      roleid = "1158015875744551003";
    } else if (pluginID == "op") {
      pluginName = "OrePowers";
      roleid = "1185692151716270121";
    } else if (pluginID == "vc") {
      pluginName = "Valocraft";
      roleid = "1201124609060245555";
    } else if (pluginID == "pp") {
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
        value: `[Click me to download the plugin](${await UpdateLink()})`,
      });
    if (!interaction.guild) {
      await interaction.reply({ embeds: [embed] });
      return;
    }
    const hasRole = await getperms(interaction);
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
