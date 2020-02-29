var XMLHttpRequest = require('xhr2');
const { iexcloudapi } = require("../config.json");
module.exports = {
    name: "graph",
    description: "Create a graph off stock data",
    execute(msg, args) {
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
                var min;
                var max;
                dataPoints = parser;
                dataPoints.forEach(dataPoint => {
                    chl += dataPoint["label"].replace(" ", "%20") + "|";
                    chd += dataPoint["close"] + ",";
                });
                chl = chl.substring(0, chl.length - 2);
                chd = chd.substring(0, chd.length - 2);
                var chartUrl = `https://chart.googleapis.com/chart?chs=1000x300&chd=t:${chd}&cht=lc&chl=${chl}&chds=1300,1600`;
                
                console.log(chartUrl);
                msg.channel.send(chartUrl);
            }
        }
    }
}