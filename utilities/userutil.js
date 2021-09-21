//Used to extract informations from the userstate object given by the twitch IRC chat

//returns the Displayname of the Sender
function getDisplayName(user)
{
	return user['display-name'];
}

//returns amount of months the user subbed to this channel
function getCumulativeMonth(user)
{
	return ~~user['msg-param-cumulative-months'];
}

//returns the displayname of the user who is given a sub
function getRecipientDisplayName(user)
{
	return user['msg-param-recipient-display-name'];
}

//returns the amount the user already givted subs in total
function getSenderGiftCount(user)
{
	return ~~user["msg-param-sender-count"];
}

function getUserVIP(user)
{
	if(user["badges"] == null)
	{
		return false;
	}
	return ("vip" in user["badges"]);
}

function checkUserName(username, callback)
{
	username = username.toLowerCase(); //Twitch display names are always the username. Usernames on Twitch are always lowercase
	if (username.substr(0, 1) === '@') //the sender tagged the user, remove the "@" at the beginning of the username
		username = username.slice(1);
	
	const check = /^[a-z0-9_]*$/; //A twitch username can only be numbers and lowercase characters
	if(check.test(username))
		callback(username);
	else
		callback(false);
}

module.exports= {
	getDisplayName,
	getCumulativeMonth,
	getRecipientDisplayName,
	getSenderGiftCount,
	getUserVIP,
	checkUserName
};