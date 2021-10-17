const { SlashCommandBuilder } = require('@discordjs/builders');
const { Discord, MessageEmbed } = require('discord.js');
const { name, clientId, permissions} = require(`${process.cwd()}/config.json`)


module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Display info about this server.'),
	async execute(interaction) {
		//return interaction.reply(`Server name: **${interaction.guild.name}**\nTotal members: **${interaction.guild.memberCount}**\nCreated at:**${interaction.guild.createTime}**`);
		function TStoSec(seconds)
		{
			seconds = Math.floor((seconds/1000))
			return seconds;
		}

		if (interaction.guild.available == true) {			
			const userEmbed = new MessageEmbed()
				.setTitle(`${interaction.guild.name}`)
				.setAuthor(`ID : ${interaction.guild.id}`)
				//.setDescription(`${interaction.guild.description}`)
				.setThumbnail(interaction.guild.iconURL('png', 64))
				.setColor(interaction.member.displayHexColor)
				.addFields(
					{ name: 'Members Joined', value: `${interaction.guild.memberCount}`, inline: true },
					{ name: 'Channels', value: `${interaction.channel.channelCountWithoutThreads}`, inline: true },
					{ name: 'Server created at', value: `<t:${TStoSec(interaction.guild.createdTimestamp)}:f>`, inline: false },			
					)
				//.addField('Inline field title', 'Some value here', true)
				.setTimestamp()
				.setFooter("Nullanoid Development");

			interaction.reply({ embeds: [userEmbed] });
		}

	},
};
