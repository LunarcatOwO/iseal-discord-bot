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
import { TextInputBuilder, ActionRowBuilder, ModalBuilder, Collection } from "discord.js";
import { adCD } from "../../constants.js";
const ADcooldowns = new Collection();
export async function ad(interaction) {
  try {
    if (!interaction.guild) {
      await interaction.reply({
        content: "You cannot trigger this command in dms",
        ephemeral: true,
      });
      return;
    }
    const now = Date.now();
    const cooldownAmount = 1 * 1000 * 60 * adCD;
    if (!ADcooldowns.has(interaction.user.id)) {
      ADcooldowns.set(interaction.user.id, now);
    } else {
      const expirationTime =
        ADcooldowns.get(interaction.user.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000 / 60;
        return await interaction.reply({
          content: `Please wait ${timeLeft.toFixed(
            1
          )} more minute(s) before reusing the command.`,
          ephemeral: true,
        });
      }

      ADcooldowns.set(interaction.user.id, now);
      setTimeout(() => ADcooldowns.delete(interaction.user.id), cooldownAmount);
    }
    const modal = new ModalBuilder()
      .setCustomId("ad")
      .setTitle("Advertisement Builder");
    const ADMessage = new TextInputBuilder()
      .setCustomId("ADMessage")
      .setLabel("Message for Advertisement")
      .setStyle(2)
      .setMaxLength(1024)
      .setRequired(true);
    const firstActionRow = new ActionRowBuilder().addComponents(ADMessage);
    modal.addComponents(firstActionRow);
    await interaction.showModal(modal);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content:
        "an error has occured, try again, if it doesnt work contact lunarcatowo",
      ephemeral: true,
    });
  }
}
