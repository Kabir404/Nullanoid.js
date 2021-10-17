 
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Discord, MessageEmbed } = require('discord.js');
const { name, clientId, permissions} = require(`${process.cwd()}/config.json`)

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription(`Pings back at you with ${name}'s stats!`),
	async execute(interaction) {
		//await interaction.reply(`<@!${interaction.user.id}> Pong!`);
		const userEmbed = new MessageEmbed()
		.setTitle(`${name}'s Stats!`)
		.setColor(interaction.member.displayHexColor)
		.addFields(
			{ name: 'Requested By', value: `<@!${interaction.user.id}>`, inline: false },
			{ name: 'Latency', value: `${Date.now() - interaction.createdTimestamp}ms`, inline: true },
			{ name: 'API Latency', value: `${Math.round(interaction.client.ws.ping)}ms`, inline: true },
			{ name: 'Version', value: `${interaction.version}`, inline: true },			
			)
		//.addField('Inline field title', 'Some value here', true)
		.setTimestamp()
		.setFooter("Nullanoid Development");

		interaction.reply({ embeds: [userEmbed] });
	},
};
