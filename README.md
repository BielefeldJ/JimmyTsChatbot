# JimmyTs Chatbot for Twitch
This is the Twitch Chatbot for [Jimmy Taenakas channel](https://www.twitch.tv/jimmytaenaka)

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/Der-Eddy/discord_bot/master/LICENSE)
[![Node Version](https://img.shields.io/node/v/tmi.js.svg?style=flat)](https://www.npmjs.org/package/tmi.js)


Commands List
-------------

### User ###

Command | Cescription | Usage
----------------|--------------|-------
`!help` | shows a list of all commands | `!help`
`!beer` | give yourself or someone a beer | `!beer`, `!beer @UserName`
`!counter` | shows how many times Jimmy pressed the wrong button | `!counter`
`!counter++` | increse the counter. Use only when he pressed a wrong button | `!counter++`
`!quote` | shows one of many famous quotes from Jimmy | `!quote`
`!lastsong` | Yes this really is the last song! | `!lastsong`
`!love` | shows a lot of love in chat | `!love`

### Mods ###
Command | Cescription | Usage
----------------|--------------|-------
`!so` | give a shoutout to someone in chat | `!so @UserName`
`!setcounter` | sets the counter for wrong buttons pressed to a value | `!setcounter 10`
`!welcome` | welcomes everyone to this channel | `!welcome`

How to run
-------------
* rename example_config.js -> config.js
* change the config file
* run the bot

```
node bot.js &
```

List of requirements
-------------
* [tmi.js](https://github.com/tmijs/tmi.js)
* [node-schedule](https://github.com/node-schedule/node-schedule)
* fs
* process
* nodejs
    
