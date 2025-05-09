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
export async function github(interaction) {
  try {
    const subcommand = interaction.options.getSubcommand();
    if (subcommand === "powergems") {
      const embed = new EmbedBuilder()
        .setColor("#0099ff")
        .setTitle("Link to PowerGems github")
        .setTimestamp()
        .setDescription(
          "[Click me](https://github.com/ISeal-plugin-developement/PowerGems) for Powergems Github"
        )
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
        await interaction.reply({ embeds: [embed] });
      } else {
        await interaction.reply({ embeds: [embed], ephemeral: true });
      }
    }
    if (subcommand === "orepowers") {
      const embed = new EmbedBuilder()
        .setColor("#0099ff")
        .setTitle("Link to OrePowers github")
        .setDescription("[Click me](https://github.com/ISeal-plugin-developement/OrePowers) for OrePowers Github (You will not be able to access this.)")
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
        await interaction.reply({ embeds: [embed] });
      } else {
        await interaction.reply({ embeds: [embed], ephemeral: true });
      }
    }
    if (subcommand === "valocraft") {
      const embed = new EmbedBuilder()
        .setColor("#0099ff")
        .setTitle("Link to Valocraft github")
        .setDescription("[Click me](https://github.com/ISeal-plugin-developement/ValoCraft) for Valocraft Github (You will not be able to access this.)")
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
      await permissioncheck(interaction, embed);
    }
    if (subcommand === "parkourproject") {
      const embed = new EmbedBuilder()
        .setColor("#0099ff")
        .setTitle("Link to ParkourProject github")
        .setDescription("[Click me](https://github.com/ISeal-plugin-developement/ParkourProject) for ParkourProject Github (You will not be able to access this.)")
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
        await interaction.reply({ embeds: [embed] });
      } else {
        await interaction.reply({ embeds: [embed], ephemeral: true });
      }
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
