#!/bin/sh

# Clear the screen
clear

# Check for dependencies and install them
echo "Checking dependencies.."
npm install discord.js @discordjs/rest discord-api-types @discordjs/builders >> /dev/null
npm install node-fetch ws >> /dev/null

# Initilize the commands and run the server
node deploy-commands.js
node index.js
