const { REST, SlashCommandBuilder, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
    new SlashCommandBuilder().setName('enablerpc').setDescription('Enable RPC !')
        .addStringOption(Software =>
        Software.setName('software')
        .setDescription('Logiciel representatif?')
        .setRequired(true)
		.addChoices(
			       {
			         name: 'Word',
			         value: 'word'
			       },
				   {
					name: 'Chrome',
					value: 'chrome'
				  },
				  {
					name: 'Film',
					value: 'film'
				  },
				  {
					name: 'Visual Studio Code',
					value: 'vscode'
				  },
				  {
					name: 'Adobe Photoshop 2020',
					value: 'ps2020'
				  },
				  {
					name: 'Adobe Photoshop 2021',
					value: 'ps2021'
				  },
				  {
					name: 'Adobe After Effect',
					value: 'ae'
				  },
				  {
					name: 'Autre',
					value: 'autre'
				  },
				  {
					name: 'Stop',
					value: 'stop'
				  }
			     ))
        .addStringOption(EditingWriting =>
            EditingWriting.setName('editingorwritting')
            .setDescription('Edition ou Ecriture?')
            .setRequired(true)
			.addChoices(
				{
					name: 'Editing',
					value: 'editing'
				},
				{
					name: 'Ecriture',
					value: 'ecriture'
				},
				{
					name: 'Coding',
					value: 'coding'
				},
				{
					name: 'Movie',
					value: 'movie'
				},
			))
        .addStringOption(PatchFile =>
            PatchFile.setName('patchfile')
            .setDescription('Emplacement du Fichier?')
            .setRequired(false)),
    new SlashCommandBuilder().setName('changerpc').setDescription('Change RPC !')
        .addStringOption(SoftwareChange =>
            SoftwareChange.setName('changementsoftware')
            .setDescription('Quel logiciel vient maintenant?')
            .setRequired(true)),
    new SlashCommandBuilder().setName('stoprpc').setDescription('Desactivate RPC !'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then((data) => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);