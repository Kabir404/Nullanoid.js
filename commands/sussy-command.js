const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sussy-command')
		.setDescription('Triggers a Error for debugging purposes.'),
	async execute(interaction) {
		return interaction.reply(unknown);
	},
};
