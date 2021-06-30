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
const greetings = true;//true or false

module.exports = {tmiconf,botowner,greetings};
