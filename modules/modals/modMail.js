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
import { modmailChannel } from "../../constants.js";
export async function modmailModal(interaction) {
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
