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
                console.log(parser[3]);
                const http2 = new XMLHttpRequest();
                const chartcreate = `https://chart.googleapis.com/chart?chs=250x100&chd=t:${parser}&cht=lc&chl=Hello|World|Youre|Sexy`;
                http2.open("POST", chartcreate);
                http2.send();
                http2.onreadystatechange=function() {
                    if (this.readyState==4 && this.status==200) {
                        console.log(http2.responseURL);
                        msg.channel.send(http2.responseURL);
                    }
                }
            }
        }
    }
}