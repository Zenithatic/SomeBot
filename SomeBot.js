const token = require("./private_modules/token").token
const { GatewayIntentBits } = require("discord.js")
const Discord = require("discord.js")

const client = new Discord.Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
})

client.on("ready", () => {
    console.log("SomeBot is ready")
})

client.login(token)