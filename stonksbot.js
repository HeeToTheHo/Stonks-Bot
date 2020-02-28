    const Discord = require('discord.js');
var XMLHttpRequest = require('xhr2');
const { prefix, token, iexcloudapi } = require("./config.json");
//const embed = require("./embed.js");
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content.startsWith(`${prefix}ping`)) {
        msg.reply('pong!');
    }
});

client.on('message', msg => {
    if (msg.content.startsWith(`${prefix}stock`)) {
        const args = msg.content.slice(prefix.length).split(' ');
        const command = args.shift().toLowerCase();
        const http = new XMLHttpRequest();
        const url = `https://cloud.iexapis.com/stable/stock/${args[0]}/batch?types=quote&token=${iexcloudapi}`;
        http.open("GET", url);
        http.send();
        http.onreadystatechange=function(){
            if(this.readyState==4 && this.status==200) {
                const jsondata = JSON.parse(`${http.responseText}`);
                let price = jsondata.quote.latestPrice;
                let time = jsondata.quote.latestTime;
                let change = jsondata.quote.change;
                let lastclose = jsondata.quote.previousClose;
                    const embed = new Discord.RichEmbed()
                        .setColor('#0099ff')
                        .setTitle(`${args[0]}`)
                        .setDescription(`Stock information of: ` + `${args[0]}`)
                        //.setThumbnail()
                        .addField(`Stock Price: `, `$` + `${price}`)
                        .addField(`Change: `, `${change}` + "%")
                        .addField(`Previous Close: `, `$` + `${lastclose}`)
                        .addField(`Current time:`, `${time}` + " EST")
                        .setTimestamp()
                        .setFooter(`Data provided by https://iexcloud.io/`)
                msg.channel.send(embed);
                }
            }
    }
});

client.login(token);