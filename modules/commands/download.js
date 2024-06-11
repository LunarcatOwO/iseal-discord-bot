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
import { getLatestReleaseAsset } from "../util/getreleaseasset.js";
import { EmbedBuilder } from "discord.js";
import { getperms } from "../util/permcheck.js";
export async function download(interaction) {
try {
    const PGdownloadLink = await getLatestReleaseAsset(
      "ISeal-plugin-developement",
      "PowerGems"
    );
    const OPdownloadLink = await getLatestReleaseAsset(
      "ISeal-plugin-developement",
      "OrePowers"
    );
    const VCdownloadLink = await getLatestReleaseAsset(
      "ISeal-plugin-developement",
      "Valocraft"
    );
    const PPdownloadLink = await getLatestReleaseAsset(
      "ISeal-plugin-developement",
      "ParkourProject"
    );
    const embed = new EmbedBuilder()
      .setColor("#0099ff")
      .setTitle("Download Link for the plugins!")
      .setDescription(
        `[Click me to download PowerGems](${PGdownloadLink})
[Click me to download OrePowers](${OPdownloadLink})
[Click me to download Valocraft](${VCdownloadLink})
[Click me to download ParkourProject](${PPdownloadLink})`
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
    hasRole = await getperms(interaction);
    if (hasRole) {
      await interaction.reply({ embeds: [embed] });
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