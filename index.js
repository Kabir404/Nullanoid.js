const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token, name } = require('./config.json');

console.log(`Initializing ${name} server..`);

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log(`${name} is now ready to take actions!`);
	console.warn('Warning! Nullanoid.js bot is still under Heavy Development.')
	client.user.setActivity("Nullanoid's Development", { type: "WATCHING"})
	client.user.setStatus("idle");
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: `There was an error while executing this command! \n${error} `, ephemeral: true });
	}
});


client.login(token);

process.on('SIGINT', function() {
	client.user.setActivity("Shutting Down..", { type: "WATCHING"})
	client.user.setStatus("dnd");
	console.warn("\nCaught interrupt signal");
	console.log(`${name} is now shutting down..`)
	client.destroy();
	process.exit();
});

