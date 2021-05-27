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
	return ("vip" in user["badges"]);
}

module.exports= {
	getDisplayName,
	getCumulativeMonth,
	getRecipientDisplayName,
	getSenderGiftCount,
	getUserVIP
};