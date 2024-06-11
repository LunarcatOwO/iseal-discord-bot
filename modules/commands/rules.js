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
import { getperms } from "../util/permcheck";
export async function rules(interaction) {
try {
    const embed = new EmbedBuilder()
      .setColor("#00ff00")
      .setTitle("Rules for the server")
      .setDescription("Read the following carefully!")
      .addFields(
        {
          name: "1️⃣ Spam!",
          value: "Please dont spam. Nobody likes it and you will get muted.",
        },
        {
          name: "2️⃣ Help us to help you!",
          value:
            'If you are reporting a bug/issue, please give plenty of information. Simply just saying "Help" isn\'t very useful.',
        },
        {
          name: "3️⃣ We have tickets!",
          value:
            "To get individual support, you can open a ticket in the <#1157666504461000714> channel.",
        },
        {
          name: "4️⃣ Patience",
          value:
            "When asking for help, please be patient. We will get to you as soon as possible, but we all have a life too. (I know, shocking)",
        },
        {
          name: "5️⃣ Tone.",
          value:
            "Keep a friendly tone and try not to swear, a little is allowed, but dont exagerate",
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