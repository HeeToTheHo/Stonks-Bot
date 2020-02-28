# Stonks-Bot
A Discord bot for retrieving stock information from IEX Cloud

# Usage
To use this bot, you'll need to setup a Discord bot <a href="https://discordapp.com/developers/applications/">here</a> and create a IEX
Cloud account <a href="https://iexcloud.io/">here</a> to get your API token. Once this is done, input them in a config.json file structed like this:
```{
"token" : "Your Bot Token Here",
"prefix" : "!",
"iexcloudapi" : "Your IEX Cloud API Key Here"
}
```
Once done, ensure you have the node packages <a href="https://www.npmjs.com/package/discord.js">discord.js</a> and 
<a href="https://www.npmjs.com/package/xhr2">xhr2</a> installed, and run the bot with ```node stonksbot.js```. Have fun!
