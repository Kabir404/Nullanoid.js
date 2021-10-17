const { SlashCommandBuilder } = require('@discordjs/builders');
const { Discord, MessageEmbed } = require('discord.js');
const { name, clientId, permissions} = require(`${process.cwd()}/config.json`)

module.exports = {
	data: new SlashCommandBuilder()
		.setName('invite-bot')
		.setDescription(`Invite ${name} to your server!`),
	async execute(interaction) {
		//return interaction.reply("");
		var serverUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&permissions=${permissions}&scope=bot%20applications.commands`;
        const userEmbed = new MessageEmbed()
			.setTitle(`Invite ${name} to your server!`)
			.setColor(interaction.member.displayHexColor)
            .setURL(serverUrl)
			.addField(`Requirements`, `This bot uses / commands \nThis bot will require some permissions(${permissions})`, true)
			.setFooter(`${name} Development | The requirements are a subject to change`);

		interaction.reply({ embeds: [userEmbed] });
	},
};
