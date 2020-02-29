const Discord = require('discord.js');
var XMLHttpRequest = require('xhr2');
module.exports = {
    name: "apistatus",
    description: "Display the current API Status for IEX Cloud",
    execute(msg) {
        const http = new XMLHttpRequest();
        const url = `https://cloud.iexapis.com/stable/status`;
        http.open("GET", url);
        http.send();
        http.onreadystatechange=function() {
            if (this.readyState==4 && this.status==200) {
                const jsondata = JSON.parse(`${http.responseText}`);
                let status = jsondata.status;
                if (status == "up") {
                    msg.channel.send("IEX Cloud API is currently up!");
                } else {
                    msg.channel.send("IEX Cloud API is currently down!")
                }
            }
        }
    }
}