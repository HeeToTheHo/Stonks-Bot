const Discord = require('discord.js');
const embed = new Discord.RichEmbed()
    .setColor('#0099ff')
    .setTitle(`${args[0]}`)
    .setDescription(`Stock information of: ` + `${args[0]}`)
    .addField(`Stock Price: ` + `$` + `${price}`)
    .addBlankField()
    .addField(`Current time:` + `${time}`)
    .setTimestamp()
    .setFooter(`Data provided by https://iexcloud.io/`)