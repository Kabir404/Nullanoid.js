const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token, name } = require('./config.json');

console.log(`Initializing ${name} server..`); //Start Initializing Server

const client = new Client({ intents: [Intents.FLAGS.GUILDS] }); //Instance New Client

client.commands = new Collection(); // Create a collection of commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); //Add commands to the collection

//Look for the files of the commands under the ./commands directory
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

//Client ready class
client.once('ready', () => {
	console.log(`${name} is now ready to take actions!`);
	console.warn('Warning! Nullanoid.js bot is still under Heavy Development.')
	//Set the discord status for the bot
	client.user.setActivity("Nullanoid's Development", { type: "WATCHING"})
	client.user.setStatus("idle");
});

//Allow executing slash commands
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return; //If its not a command then dont do anything

	const command = client.commands.get(interaction.commandName);

	if (!command) return; //If its not a valid command or a command for a another bot then dont do anything

	// If its actually a command that Nullanoid.js supports and uses then try to execute it
	try {
		await command.execute(interaction); //Executes the command
	} catch (error) {
		console.error(error); //Show the full contents of the error to the log
		return interaction.reply({ content: `There was an error while executing this command! \n${error} `, ephemeral: true }); //Tell the user that there was an error
	}
});


client.login(token); //Log into discord

//Shut down server when it recives an Interrupt signal
process.on('SIGINT', function() {
	client.user.setActivity("Shutting Down..", { type: "WATCHING"})
	client.user.setStatus("dnd");
	console.warn("\nCaught interrupt signal");
	console.log(`${name} is now shutting down..`)
	client.destroy(); // Destroy the client and log off
	process.exit(); // Shut down node.js
});

