
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token, useGID, name } = require('./config.json');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}


const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		console.log(`Registering ${name} commands..`)
		if (useGID=="true"){
			console.warn(`Use GuildID is enabled! Thus the commands will only work in one server with the matched GuildID`)
			await rest.put(
			Routes.applicationCommands(clientId, guildId),
			{ body: commands },
		);
		} else {
			await rest.put(
				Routes.applicationCommands(clientId),
				{ body: commands },
			);
		}


		console.log(`Successfully registered ${name} commands.`);
	} catch (error) {
		console.error(error);
	}
})();
