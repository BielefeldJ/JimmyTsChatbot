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

module.exports = {tmiconf};
