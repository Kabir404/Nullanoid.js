//Import the libraries
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token, useGID, name } = require('./config.json'); //Import the config files

const commands = []; //Create a dictionary of commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); //Add all the commands within the ./commands directory

//Push all the commands to a json file for the server
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

//Create a new restv9 with the token
const rest = new REST({ version: '9' }).setToken(token);

//Asyncronysly try registering the commands
(async () => {
	try {
		console.log(`Registering ${name} commands..`)
		//Check if the bot's config file will register commands publicly or in just a development server
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
