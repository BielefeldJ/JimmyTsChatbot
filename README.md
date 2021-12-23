# JimmyTs Chatbot for Twitch
This is the Twitch Chatbot for [Jimmy Taenakas channel](https://www.twitch.tv/jimmytaenaka)

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/BielefeldJ/JimmyTsChatbot/blob/main/LICENSE)
[![TMI.js Version](https://img.shields.io/badge/tmi.js-1.8.3-success)](https://www.npmjs.org/package/tmi.js)


Commands List
-------------

### User ###

Command | Cescription | Usage
----------------|--------------|-------
`!help` | shows a list of all commands | `!help`
`!beer` | give yourself or someone a beer | `!beer`, `!beer @UserName`
`!tea` | give yourself or someone a tea | `!tea`, `!tea @UserName`
`!tissue` | give yourself or someone tissues | `!tissue`, `!tissue @UserName`
`!refill` | refill someones glass | `!refill @UserName`
`!counter` | shows how many times Jimmy pressed the wrong button | `!counter`
`!counter++` | increase the counter. Use only when he pressed a wrong button | `!counter++`
`!quote` | shows one of many famous quotes from Jimmy | `!quote` , `!quote 1`
`!lastsong` | Yes this really is the last song! | `!lastsong`
`!favsong` | Did you know? this is Jimmys favorite song | `!favsong`
`!highschool` | This reminds Jimmy of highschool | `!highschool`
`!love` | shows a lot of love in chat | `!love`
`!heart` | shows a heart in chat | `!heart`
`!wow` | shows a wow face | `!wow`
`!hu` | Hands up! | `!hu`
`!cat` | cat | `!cat`
`!bongo` | bongo cat! | `!bongo`
`!whink` | whink face! | `!whink`
`!o.o` | cute face | `!o.o`, `!o.O`
`!stfu` | stfu sign | `!stfu`
`!dance` | dancing people in chat \o/ | `!dance`
`!discord` | shows discord invite link | `!discord`
`!socials` | shows all social links | `!socials`
`!times` | shows Jimmys stream times | `!times`
`!boogie` | dance smiley in chat | `!boogie`
`!netflix` | Shows Jimmys next Netflix show | `!netflix`
`!rap` | It's raptime!! | `!rap`
`!ra` | Rararaaa Ra Ra | `!ra`
`!flip` | flip the damn table | `!flip`
`!lurk` | entering lurk mode | `!lurk`
`!unlurk` | exiting lurk mode | `!unlurk`
`!bonk` | bonk someone for being mean | `!bonk`, `!bonk @UserName`
`!hug` | give someone a hug | `!hug @username`
`!weather` | shows the current weather at the given location | `!weather Berlin`
`!raidcall` | shows the raidcall in chat | `!raidcall`
`!ratchet` | shows ratchet music channel in chat | `!ratchet`


### Mods ###
Command | Description | Usage
----------------|--------------|-------
`!so` | give a shoutout to someone in chat | `!so @UserName`
`!setcounter` | sets the counter for wrong buttons pressed to a value | `!setcounter value` `!setcounter countername value`
`!welcome` | welcomes everyone to this channel | `!welcome`
`!hi` | Say hi in chat | `!hi`
`!modlove` | give a shoutout to the mods | `!modlove`
`!awesome` | You are awesome \o/ | `!awesome`
`!share` | writes a please share this channel Message | `!share`
`!sub` | writes a please sub Message | `!sub`
`!prime` | gives the twitch gaming hint | `!prime`
`!refresh` | welcome raiders. pls refresh | `!refresh`
`!stage` | send someone on stage | `!stage <1-9> <@user>`
`!host` | shows a how to host message in chat | `!host`

Greeting usage:
-------------
* !greeting get @username
* !greeting edit @username greetingmessage
* !greeting remove @username
* !greeting rename @olduser @newuser

Personalized so messages:
-------------
* !so add @username somessage
* !so remove @username


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
* https
    
