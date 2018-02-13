const Discord = require('discord.js');
const commando = require('discord.js-commando');
const settings = require('../../settings/settings.json');
const os = require('os');
const memory = require('memory');

module.exports = class InfoCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'info',
			group: 'general',
			memberName: 'info',
			description: 'Shows information about the bot'
		});
	}

	async run(msg) {

			var memUsage = memory();

		    var uptimeSeconds = Math.floor(msg.client.uptime / 1000);

			const embed = new Discord.RichEmbed()
  				.setColor("#7a7373")
  				.setTitle("> discordCONSOLE")
  				.setDescription("This is CONSOLE, a simple bot written in discord.js that allows communication via command line. \n// TODO: add more shit here")
  				.addField(`> UPTIME`, `${uptimeSeconds} seconds.`, true)
  				.addField(`> PING  `, `${Math.round(msg.client.ping)}ms`, true)
  				.addField(`> MEM   `, `${memUsage}mb`, true)
  				.addField(`> AUTHOR`, "steven#1337", true) //
  				.addField(`> LINKS `, `[GitHub](https://github.com/) | [Home Server]() | [discord.js](https://discord.js.org)`)
  			msg.say('',{embed});

	}
}
