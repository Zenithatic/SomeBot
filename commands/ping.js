const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    commandData: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with pong"),

    async execute(interaction){
        await interaction.reply("pong")
    },
}