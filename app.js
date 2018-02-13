const Discord = require('discord.js');
const commando = require('discord.js-commando');
const settings = require('./settings/settings.json');
const token = require('./settings/token.json');


// Commando

const client = new commando.Client({
	owner: settings.owner,
	commandPrefix: settings.prefix,
	disableEveryone: true,
	unknownCommandResponse: false
});
client.login(token.token);

const path = require('path');
client.registry
    .registerGroups([
    	['admin', 'Admin'],
        ['general', 'General']
    ])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, 'commands'));

// START discordCONSOLE
// 		This is the core of discordCONSOLE, if you want to add this into your own bot simply copy/paste this into your index.js
//  	or include it in a seperate file.
//  	The rest of the bot is just generic.

const updateJsonFile = require('update-json-file');

console.log(`*** discord CONSOLE v${settings.version}`);
console.log(`*** Use '//channel <name or ID>' to set the speaking channel.`);
console.log(``);

client.on('message', (message) => {
	if (message.channel.type !== "text") {
		console.log(`< ${message.channel.id} : ${message.channel.recipient.tag} : DM > ${message.author.tag} :: ${message.content}`)
	} else {
		console.log(`< ${message.channel.id} : ${message.guild.name} : #${message.channel.name} > ${message.author.tag} :: ${message.content}`)
	}
	
});

const consoleSettings = require('./settings/console.json');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var channel = client.channels.find("id", consoleSettings.channel);

var recursiveAsyncReadLine = function () { // https://stackoverflow.com/a/24466103
  rl.question('', function (input) {

    if (input == 'exit') {
      return rl.close();
    } else if (input == '') {
  	  console.log(`Can't send a blank message`)
  	} else if (input.startsWith("//")) {

  		if (input.startsWith("//channel ")) {
  			var argument = input.substring(10);
  			consoleCommands("channel", argument);
  		} else
  		{
  			console.log("< CMD > Invalid command!")
  		}

  	} else if (!channel) {
  		console.log("< ERROR > Speaking channel not  has not been set,");
  		console.log("          use `//channel <name OR id>`");
  	} else {

    	channel.send(input);

    }
    recursiveAsyncReadLine();

  });

};
recursiveAsyncReadLine();

function consoleCommands(command, argument) { // I know this is terrible

	if (command == "channel") {
		var newChannelId = client.channels.find("id", argument);
		var newChannelName = client.channels.find("name", argument);
		var newChannel;

		if (newChannelId) {
			newChannel = newChannelId
			console.log(`< CMD > channel: Set speaking channel to ${newChannelId} : ${newChannelId.name}`);
		} else if(newChannelName) {
			newChannel = newChannelName.id
			console.log(`< CMD > channel: Set speaking channel to ${newChannelName.id} : ${newChannelName.guild.name} : ${newChannelName.name}`);
		} else {
			return console.log(`< CMD > channel: Could not find a channel with ID/name ${argument}`);
		}
		updateJsonFile('./settings/console.json', (data) => {
			data.newChannel = argument
			return data
		});
		channel = client.channels.find("id", newChannel);
		
	  }
	}

// END discordCONSOLE

// Generic Discord logging

client.on('ready', () => {
  	console.log("< CLIENT > Connected.");
	console.log("< CLIENT > Ready!");
});

client.on('reconnecting', () => {
  console.log("< CLIENT > Reconnecting...");
});

client.on('warn', (info) => {
  console.log(`< CLIENT : WARN > ${info}`);
});

client.on('error', (error) => {
  console.log("< CLIENT : ERROR > " + error);
});

client.on('disconnect', (event) => {
  console.log(`< CLIENT > Disconnected! ${event}`);
});