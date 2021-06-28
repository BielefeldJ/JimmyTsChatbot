//everything the bot can say
//copy this if you need space in your message ->⠀⠀⠀

//Messages for all handler from here on
//==================================================================
//for incomming raid
exports.raidMessage = (username,viewers) => `Thank you ${username} for the Raid with ${viewers} viewer!! Welcome everyone to Jimmys Channel! Enjoy your stay!`;
//someone cheers Bits 
exports.cheerMessage = (displayname) => `@${displayname} cheered with bits! Thank you so much <3`;
//incomming host
exports.hostedMessage = (username,viewers) => `${username} is hosting with ${viewers} viewers! Thank you!`;
//someone subs to the channel
exports.subMessage = (displayname) => `Thank you for your sub @${displayname}! Welcome to Jimmys channel!`;
//someone resubs to the channel
exports.resubMessage = (displayname,totalmonth) => `Woho @${displayname}.Thank you for your ${totalmonth} resub! <3`;
//someone gifts a sub to user of choise
exports.giftsubMessage = (gifter,recipient) => `@${gifter} just gifted a sub to @${recipient}! Thank you so so much. <3`;
//someone gitfs subs to random user
exports.communityGiftsubMessage = (displayname,numbOfSubs,totalgiftsubs) => `@${displayname} just gifted ${numbOfSubs} Giftsubs to Jimmys community! Thank you so so much!! Thats a total of ${totalgiftsubs} now. Wow <3`;
//==================================================================

//Messages for all commands from here on
//==================================================================
//User commands
//!counter
exports.counterMsg = (counter) => `Jimmy pressed the wrong button ${counter}x today!`;
//!counter++
exports.incCounterMsg = (counter) => `Wrong button counter is increased: ${counter}x today. Wow Jimmy.`;
//!beer
exports.beerToUserMsg = (fromuser,touser) => `${fromuser} gives a cold Beer to ${touser}! Cheers`;
exports.beerMsg = (displayname) => `Hey ${displayname}, here. Have a nice Kirinbeer!`;
//!tea
exports.teaToUserMsg = (fromuser, touser) => `@${fromuser} pours ${touser} a nice cup of jasmine tea.`;
exports.teaMsg = (displayname) => `@${displayname} here, have a nice cup of jasmine tea.`;
//!refill
exports.refillMsg = (fromuser, touser) => `${fromuser} has noticed the empty glass, and quickly sends over the barman with a refill to ${touser}. Nobody wants to see ${touser} with an empty glass`;
//!socials
exports.socialsMsg = () => `Please check out Jimmy on his social accounts: ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ Twitter: https://twitter.com/jimmytaenaka ⠀⠀⠀⠀ Instagram: https://www.instagram.com/jimmytaenaka ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ IMDb: https://www.imdb.com/name/nm0846359/`;
//!discord
exports.discordMsg = () => `Join Jimmy on Discord: https://discord.gg/DxmkSgPKCF`;
//!times
exports.timesMsg = () => `Jimmy usually streams on Sunday, Tuesday and Thursday at 21:00 SGT (GMT+8)`;
//!boogie
exports.boogieMsg = () => `♪┏(・o･)┛♪┗ ( ･o･) ┓♪♪┏(・o･)┛♪┗ ( ･o･) ┓♪♪┏(・o･)┛♪`;
//!netflix
exports.netflixMsg = () => `Check out Glória on Netflix! https://www.netflix.com/title/81073977 Comming September 2021`;
//!rap
exports.rapMsg = () => `Yoyoyoyoyo It's Raptime baby!!`;
//!lurk
exports.lurkMsg = (displayname) => `@${displayname} enters lurk mode. Thank you for being here!❤️💞`;
//!unlurk
exports.unlurkMsg = () => `@${displayname} is back from lurking! Happy chatting 💞`;
//!help
exports.helpMsg = () => `Available commands: !counter, !quote, !help, !beer, !tea, !refill, !lastsong, !favsong, !love, !heart, !rap, !dance, !netflix, !socials, !discord, !times, !boogie, !lurk, !unlurk`;
//==================================================================
//Mod and VIP commands
//!so
exports.shoutoutMsg = (soToUser) => `Big shoutout to '${soToUser}' please follow their channel! ✨✨ https://www.twitch.tv/${soToUser.substring(1)}`;
exports.wrongUsageMsg = () => `Did Jimmy use this command again? Jeez Jimmy. Its '!so @username' You can only specify one thing.`;
//!setcounter
exports.setCounterMsg = (counter) => `Counter set to ${counter}.`;
exports.counterNotFoundMsg = (countername) => `Counter with name ${countername} not found`;
//!welcome
exports.welcomeMsg = () => `Welcome to Jimmys stream!! Thanks for being with us. Enjoy your stay and remember to follow! ❤️💞`;
//!hi
exports.hiMsg = () => `Hey hey nice to see you! Welcome to the most chill stream around!`;
//!mods Love to mods message
exports.modsMsg = () => `Shout out to my mods!!! They are super cool!!`;
//!awesom Message
exports.awesomMsg = () => `All you awesome people,thank you so so much for hanging out with us!`;
//!share command Message 
exports.shareMsg = () => `All you awesome people please host,share,follow and subscribe!!`;
//!sub suport the channel! Message
exports.subMsg = () => `While subbing is always optional, it's a great way to support the stream ! https://www.twitch.tv/jimmytaenaka/subscribe`;
//!prime command Message
exports.primeMsg = () => `If you have Amazon Prime, you automatically have Twitch Prime and can subscribe for FREE! Sign in with your Amazon account here: https://twitch.amazon.com/tp 🙏`;
//==================================================================
//Botowner commands
//!heyhey 
exports.ping = () => `Yeeyyy Prof is here!! <3 I am still up and running :3`;
//!resetall
exports.resetAllMsg = () => `All counter are not 0`;
//!shutdown
exports.shutdownMsg = () => `Okay Boss! <3 Bye bye o/`;

//================================================================
//Greeting messages
const util = require('../utilities/userutil.js');
greetings = 
{
	// twitchusername : greeting message
	'iam_shamah' : 'Oh no, it\'s @iam_shamah again! Welcome back 💞',
	'kareen86' : 'Hey, it\'s our ninja in stealth mode! Welcome @Kareen86 💞',
	'mura_t_mulatino' : 'Mura, こんばんは. おかえりなさい!',
	'ladyemma69' : 'Hey Emma ^-^ Good to see you again ❤️',
	'tuinkabouter1965' : 'Welcome back @tuinkabouter1965! what\'s cooking?🍲🍲',
	'didi_75' : 'Wiki-didi 📖 ! Welcome back ^-^ ❤️',
	'dj_sweetz_beats' : 'Bananasan こんばんは. おかえりなさい! 🍌🍌🍌💞',
	'profdrbielefeld' : 'Welcome young professor o/ 🖥️',
	'salad_lee' : 'Welcome the sargeeee! @salad_lee Welcome back💞',
	'maruoji' : 'Konnichiwa @Maruoji sannnnn! 🍪✨',
	'lfabro13' : 'Oh shiii, it\'s Libby fabro! 🎸',
	'zikpsychosocial123' : 'Heyy zik, what\'s up bro?',
	'pondelinp' : 'Konnichiwa henati master!',
};

exports.getGreeting = (user) =>
{
    if(greetings.hasOwnProperty(user.username))
    {
        return greetings[user.username];
    }
    else
    {
        return `Hey @${util.getDisplayName(user)}!! ♥ Welcome ^-^`;
    }
}
