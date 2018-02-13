const Discord = require('discord.js');
const commando = require('discord.js-commando');
const settings = require('../../settings/settings.json');

module.exports = class ShutdownCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'restart',
			group: 'admin',
			memberName: 'restart',
			description: 'Restart the bot',
			examples: ['restart'],
			aliases: ['die'],
			argsPromptLimit: 0,
			guildOnly: false,
			ownerOnly: true
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author);
	}

	async run(msg) {

  		console.log(`< CMD > ${message.author.tag} invoked a restart.`);
  		msg.client.destroy();
  		console.log(`< CLIENT > Restarting...`);
  		process.exit(); // NOTE: Bot must have been started from some type of auto-restart script or pm2, otherwise it will just shut down.
	}
}