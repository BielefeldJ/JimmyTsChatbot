# JimmyTs Chatbot for Twitch
This is the Twitch Chatbot for [Jimmy Taenakas channel](https://www.twitch.tv/jimmytaenaka)

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/BielefeldJ/JimmyTsChatbot/blob/main/LICENSE)
[![Node Version](https://img.shields.io/node/v/tmi.js.svg?style=flat)](https://www.npmjs.org/package/tmi.js)


Commands List
-------------

### User ###

Command | Cescription | Usage
----------------|--------------|-------
`!help` | shows a list of all commands | `!help`
`!beer` | give yourself or someone a beer | `!beer`, `!beer @UserName`
`!tea` | give yourself or someone a tea | `!tea`, `!tea @UserName`
`!counter` | shows how many times Jimmy pressed the wrong button | `!counter`
`!counter++` | increse the counter. Use only when he pressed a wrong button | `!counter++`
`!quote` | shows one of many famous quotes from Jimmy | `!quote`
`!lastsong` | Yes this really is the last song! | `!lastsong`
`!favsong` | Did you know? this is Jimmys favorite song | `!favsong`
`!love` | shows a lot of love in chat | `!love`
`!heart` | shows a heart in chat | `!heart`
`!discord` | shows discord invite link | `!discord`
`!socials` | shows all social links | `!socials`
`!times` | shows Jimmys stream times | `!times`


### Mods ###
Command | Cescription | Usage
----------------|--------------|-------
`!so` | give a shoutout to someone in chat | `!so @UserName`
`!setcounter` | sets the counter for wrong buttons pressed to a value | `!setcounter value` `!setcounter countername value`
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
    
