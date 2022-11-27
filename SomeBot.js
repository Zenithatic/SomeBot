// Import libraries
const token = require("./private_modules/token").token
const { GatewayIntentBits } = require("discord.js")
const Discord = require("discord.js")
const FileSystem = require("node:fs")
const path = require("node:path")

// Create new client
const client = new Discord.Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
})

// 'c' is the event parameter
// 'once' instead of 'on' for one-time only
client.once("ready", c => {
    // Bot is ready
    console.log("SomeBot is ready, logged in as " + c.user.tag)

    // Create command collection for bot
    client.commands = new Discord.Collection

    // Load command files
    const commandsPath = path.join(__dirname, "commands")
    const commandFiles = FileSystem.readdirSync(commandsPath).filter(file => file.endsWith(".js"))

    for (const file of commandFiles){
        // Get command file
        const filePath = path.join(commandPath, file)
        const command = require(filePath)
        
        // Set command in commands Collection
        if ("data" in command && "execute" in command){
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
})

// Check for interactions
client.on(Discord.Events.InteractionCreate, interaction => {
    // Narrows the interaction down from BaseInteraction
    if (!interaction.isChatInputCommand()) return;
	
    const command = interaction.client.commands.get(interaction.commandName)

    if (!command) {
        console.log(`No command with name ${interaction.commandName}`)
        return
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.log(error)
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
    }

})

client.login(token)