const { SlashCommandBuilder } = require('@discordjs/builders');
const { Discord, MessageEmbed } = require('discord.js');
const { name, clientId, permissions} = require(`${process.cwd()}/config.json`)

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user-info')
		.setDescription('Display info about yourself.'),
	async execute(interaction) {
		// inside a command, event listener, etc.
		function TStoSec(seconds)
		{
			seconds = Math.floor((seconds/1000))
			return seconds;
		}
		const userEmbed = new MessageEmbed()
			.setTitle(`${interaction.member.displayName}`)
			.setAuthor(`${interaction.user.tag}`, `${interaction.user.avatarURL()}`)
			.setDescription(`${interaction.member.presence}`)
			.setThumbnail(`${interaction.user.avatarURL()}`)
			.setColor(interaction.member.displayHexColor)
			.addFields(
				{ name: 'User ID', value: `${interaction.user.id}`, inline: false },
				{ name: 'User Joined at', value: `<t:${TStoSec(interaction.member.joinedTimestamp)}:f>`, inline: true },
				{ name: 'Account created at', value: `<t:${TStoSec(interaction.user.createdTimestamp)}:f>`, inline: true },			
				)
			//.addField('Inline field title', 'Some value here', true)
			.setTimestamp()
			.setFooter("Nullanoid Development");

			interaction.reply({ embeds: [userEmbed] });
	},
};
