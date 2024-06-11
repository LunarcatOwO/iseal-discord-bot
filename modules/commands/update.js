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
import { ModalBuilder, TextInputBuilder, ActionRowBuilder } from "discord.js";
import { getperms } from "../util/permcheck.js";
export async function update(interaction) {
  try {
    const modal = new ModalBuilder()
      .setCustomId("updateModal")
      .setTitle("Update");
    const pluginIDinput = new TextInputBuilder()
      .setCustomId("pluginIDinput")
      .setLabel("What is the ID for the plugin")
      .setStyle(1)
      .setMaxLength(2)
      .setRequired(true);

    const updateInfoInput = new TextInputBuilder()
      .setCustomId("updateInfoInput")
      .setLabel("What changed?")
      .setStyle(2)
      .setRequired(true);
    const versionInfoInput = new TextInputBuilder()
      .setCustomId("versionInfoInput")
      .setLabel("Version of update")
      .setStyle(1)
      .setRequired(true);
    const secondActionRow = new ActionRowBuilder().addComponents(
      versionInfoInput
    );
    const firstActionRow = new ActionRowBuilder().addComponents(pluginIDinput);
    const thirdActionRow = new ActionRowBuilder().addComponents(
      updateInfoInput
    );

    modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);
    if (!interaction.guild) {
      await interaction.reply({ content: "What are you thinking..." });
      return;
    }
    const hasRole = await getperms(interaction);
    if (hasRole) {
      await interaction.showModal(modal);
    } else {
      await interaction.reply({
        content: "What are you trying to do...",
        ephemeral: true,
      });
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
