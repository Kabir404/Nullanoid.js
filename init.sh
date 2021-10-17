#!/bin/sh

clear

echo "Checking dependencies.."
npm install discord.js @discordjs/rest discord-api-types @discordjs/builders >> /dev/null
npm install node-fetch ws >> /dev/null


node deploy-commands.js
node index.js
