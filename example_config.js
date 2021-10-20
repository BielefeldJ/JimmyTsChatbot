// Define configuration options
const tmiconf = {
	identity: {
		username: "USERNAME", //twitch username
		password: "OAUTHTOKEN" //oauthtoken 
	},
	channels: [
		CHANNEL_NAME //channel name, where the bot should join
	]
};

//set the owner/admin of the bot
const botowner = "Twitch username";

//enable greetings. If true, the bot will greet new user who joins the chat
const GREETINGCONF = {
	enable : true, //true or false
	ignoreUser : [], //list of user to ignore (like bots)
	filename : 'FILEMANE', //file name where the greetings will be saved
	defaultmsg : 'Hey @{user}!! ♥ Welcome ^-^' //default greeting message {user} will be replaces with the username
}

//config for personal SO messages
const SHOUTOUTCONF = {
	filename : 'FILEMANE', //file name where the so messages will be saved
	defaultmsg : 'Big shoutout to @{user} please follow their channel! ✨✨ https://www.twitch.tv/{user}' //default so message {user} will be replaces with the username
}


//logging config
const LOGGING = {};
LOGGING.enable = true; //true = logging to file; false = logging on console
LOGGING.logfile = ""; //log file
LOGGING.errlogfile = ""; //error log file

//API key for open weather map
const OPENWEATHER_API_KEY = '';

module.exports = {tmiconf,LOGGING,botowner,OPENWEATHER_API_KEY,GREETINGCONF,SHOUTOUTCONF};
