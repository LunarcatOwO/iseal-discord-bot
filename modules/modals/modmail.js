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
