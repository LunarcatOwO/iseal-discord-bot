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
import { TRIGGER_ROLES } from "../../constants.js";
export async function botgithub(interaction) {
  try {
    if (!interaction.guild) {
      await interaction.reply({
        content: `Thank you for being intrested in the bot! 
  [Github](https://github.com/LunarcatOwO/iseal-discord-bot)
  [Support me!](https://ko-fi.com/lunarcatOwO)`,
        ephemeral: true,
      });
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
      await interaction.reply({
        content: `Thank you for being intrested in the bot! 
  [Github](https://github.com/LunarcatOwO/iseal-discord-bot)
  [Support me!](https://ko-fi.com/lunarcatOwO)`,
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: `Thank you for being intrested in the bot! 
  [Github](https://github.com/LunarcatOwO/iseal-discord-bot)
  [Support me!](https://ko-fi.com/lunarcatOwO)`,
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