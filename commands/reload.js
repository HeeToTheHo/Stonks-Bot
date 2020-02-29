module.exports = {
	name: 'reload',
	description: 'Reloads a command',
	args: true,
	execute(msg, args) {
		const commandName = args[0].toLowerCase();
		const command = msg.client.commands.get(commandName)
			|| msg.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
		if (msg.author.id == '193454575624126464') {
			if (!command) {
				return msg.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);
			}

			delete require.cache[require.resolve(`./${commandName}.js`)];

			try {
				const newCommand = require(`./${commandName}.js`);
				msg.client.commands.set(newCommand.name, newCommand);
			} catch (error) {
				console.log(error);
				return msg.channel.send(`There was an error while reloading a command \`${commandName}\`:\n\`${error.message}\``);
			}
			msg.channel.send(`Command \`${commandName}\` was reloaded!`);
		}
		else {
			msg.channel.send(`You are not authorized to run that command!`)
		}
	},
};