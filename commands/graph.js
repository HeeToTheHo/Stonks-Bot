const Discord = require('discord.js');
var XMLHttpRequest = require('xhr2');
const { iexcloudapi } = require("../config.json");
module.exports = {
    name: "graph",
    description: "Create a graph off stock data",
    execute(msg, args) {
        let title = args;
        const http = new XMLHttpRequest();
        const url = `https://cloud.iexapis.com/stable/stock/${args[0]}/batch?types=chart&range=1m&last=10&filter=close,label&format=json&token=${iexcloudapi}`;
        http.open("GET", url);
        http.send();
        http.onreadystatechange=function() {
            if (this.readyState==4 && this.status==200) {
                const jsondata = JSON.parse(`${http.responseText}`);
                let parser = jsondata.chart;
                console.log(parser);
                var chl = "";
                var chd = "";
                dataPoints = parser;
                var min = dataPoints[0]["close"] - 50;
                var max = dataPoints[0]["close"] + 50;
                dataPoints.forEach(dataPoint => {
                    if (dataPoint["close"] < min) min = dataPoint["close"];
                    if (dataPoint["close"] > max) max = dataPoint["close"];
                    chl += dataPoint["label"].replace(" ", "%20") + "|";
                    chd += dataPoint["close"] + ",";
                });
                var min2 = min - 50;
                var max2 = max + 50;
                chl = chl.substring(0, chl.length - 2);
                chd = chd.substring(0, chd.length - 2);
                var chartUrl = `https://chart.googleapis.com/chart?chs=1000x300&chd=t:${chd}&cht=lc&chl=${chl}&chds=${min2},${max2}&chf=bg,s,36393E&chls=4&chg=5,5&chxt=y&chxr=0,${min},${max}&chxs=0N*cUSD*&chtt=${title}&chts=ffffff,16`;
                //console.log(chartUrl);
                //msg.channel.send(chartUrl);
                const embed = new Discord.RichEmbed()
                    .setColor('#0099ff')
                    .setTitle(`Historical price graph of: ` + `${args[0]}`)
                    .setImage(chartUrl)
                    .setTimestamp()
                    .setFooter(`Data provided by https://iexcloud.io/`)
                msg.channel.send(embed);
            }
        }
    }
}