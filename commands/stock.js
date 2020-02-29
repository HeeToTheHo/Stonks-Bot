const Discord = require('discord.js');
var XMLHttpRequest = require('xhr2');
const { iexcloudapi } = require("../config.json");
module.exports = {
    name: "stock",
    description: "List information for a stock ticker",
    execute(msg, args) {
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
}