const Discord = require('discord.js');
module.exports = {
    name: "help",
    description: "List all commands for Stonks Bot",
    execute(msg) {
        const embed = new Discord.RichEmbed()
            .setColor('#0099ff')
            .setTitle(`Stonks Bot Help`)
            .setThumbnail(`https://i.imgur.com/eeKiXdY.png`)
            .setDescription(`Command information for Stonks Bot`)
            .addField(`!stock [arg]`, `Returns the stock information for the provided ticker.`)
            .addField(`!graph [arg]`, `Returns a graph with the past 10 days closure information for the provided ticker.`)
            .addField(`!apistatus`, `View the current API status for the data provider.`)
            .addField(`!help`, `View this command.`)
            .setTimestamp()
            .setFooter(`Data provided by https://iexcloud.io/`)
        msg.channel.send(embed);
    }
}