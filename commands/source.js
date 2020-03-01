const Discord = require('discord.js');
module.exports = {
    name: "source",
    description: "Send a link to the source code for this bot.",
    execute(msg, args) {
        msg.channel.send(`You can view the source code for this bot at: ` + `https://github.com/HeeToTheHo/Stonks-Bot`);
    }
}