# discordCONSOLE
Simple discord.js commando bot that allows chatting with others via nodejs console
In the actual Discord client, there's not much to do. The bot only offers 2 commands: `restart` & `info`.
However, the main feature of this bot is not in the Discord client itself, it's in the node console!

**Most people probably won't find this practical or useful for anything, so this was really only made just for fun.**

# Commands
### In Discord itself
- `!help` - Shows all commands.
- `!restart` - Restarts the bot
- `!info` - Shows simple information about the bot
- plus some built in Commando commands.

### In console
- `//channel <exact name or ID>` - Sets the speaking channel. This must be ran *before* you are able to speak.

# Putting discordCONSOLE into your own discord.js bot.
You can pretty much copy + paste all of the code in `app.js` in between `// START discordCONSOLE` and `// END discordCONSOLE` into your own `index.js` file. Make sure you also install the dependencies below!

## Dependencies
`discord.js discord.js-commando update-json-file`



# Known Issues (that probably won't be fixed)
- You can't DM users.


