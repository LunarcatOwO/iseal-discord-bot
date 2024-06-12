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
        value: `[Click me to download the plugin](${await getLatestReleaseAsset(
          "Iseal-plugin-developement",
          pluginName
        )})`,
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
