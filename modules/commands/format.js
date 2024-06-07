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
import { TRIGGER_ROLES } from "../../constants.js";
export async function format(interaction) {
  try {
    const subcommand = interaction.options.getSubcommand();
    if (subcommand === "bug") {
      const embed = new EmbedBuilder()
        .setColor("#0099ff")
        .setTitle("How to format your bug report")
        .setDescription(
          "Please follow the following format to format your bug report"
        )
        .addFields(
          {
            name: "General information",
            value: `Server software:
  Server version:
  Software build: (if applicable)
  Plugins on the server`,
          },
          {
            name: "Plugin information",
            value: `Plugin:
  Plugin version:
  Errors in console: (if applicable, preferably using https://mclo.gs/)`,
          },
          {
            name: "Bug information:",
            value: `Expected result:
  Actual result:
  Things tried:`,
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
      const member =
        interaction.member ||
        (await interaction.guild.members.fetch(interaction.user.id));
      const roleNamesToCheck = TRIGGER_ROLES;
      const hasRole = member.roles.cache.some((role) =>
        roleNamesToCheck.includes(role.name)
      );
      if (hasRole) {
        await interaction.reply({ embeds: [embed] });
      } else {
        await interaction.reply({ embeds: [embed], ephemeral: true });
      }
    }
    if (subcommand === "suggestion") {
      const embed = new EmbedBuilder()
        .setColor("#0099ff")
        .setTitle("How to format your suggestion")
        .setDescription(
          "Please follow the following format to format your suggestion"
        )
        .addFields({
          name: "Information needed",
          value: `Plugin Name:
  What to add:
  How it is currently (If applicable):
  Why it should be added:
  Extra Notes (If applicable):`,
          inline: true,
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
