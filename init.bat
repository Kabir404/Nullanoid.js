@echo off


echo Checking dependencies..
npm install discord.js @discordjs/rest discord-api-types @discordjs/builders >> nul
npm install node-fetch ws >> nul

node deploy-commands.js
node index.js
