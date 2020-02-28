const Discord = require('discord.js');
var XMLHttpRequest = require('xhr2');
const { prefix, token, iexcloudapi } = require("./config.json");
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
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

client.on('message', msg => {
    if (msg.content.startsWith(`${prefix}graph`)) {
        const args = msg.content.slice(prefix.length).split(' ');
        const command = args.shift().toLocaleLowerCase();
        const http = new XMLHttpRequest();
        const url = `https://cloud.iexapis.com/stable/stock/${args[0]}/batch?types=chart&range=1m&last=10&token=${iexcloudapi}`;
        http.open("GET", url);
        http.send();
        http.onreadystatechange=function() {
            if (this.readyState==4 && this.status==200) {
                const jsondata = JSON.parse(`${http.responseText}`);
                let parsed = jsondata.chart;
                const http2 = new XMLHttpRequest();
                const chartcreate = `https://chart.googleapis.com/chart?chs=250x100&chd=t:${parsed}&cht=lc&chl=Hello|World`;
                http2.open("GET", chartcreate);
                http2.send();
                http2.onreadystatechange=function() {
                    if (this.readyState==4 && this.status==200) {
                        console.log(http2.responseURL);
                        msg.channel.send(http2.responseURL);
                    }
                }
                //console.log(http2.responseText);
                //msg.channel.send(http2.responseText);
            }
        }
    }
})
client.login(token);