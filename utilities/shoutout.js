const fs = require('fs');
const util = require('../utilities/userutil.js');

//Module for personalised shoutouts
var Shoutout = {};

//==============================================================
//write greetings to file
Shoutout.writeToFileSync = () =>
{
	let data = JSON.stringify(Shoutout.messages, null, 2);
	try{
		fs.writeFileSync(Shoutout.config.filename, data)
	}
	catch(err)
	{
		console.error('ERROR WRITING TO SOSFILE SYNC' + err);
	}
}
Shoutout.writeToFileAsync = () =>
{
	let data = JSON.stringify(Shoutout.messages, null, 2);
	fs.writeFile(Shoutout.config.filename, data, (err) => {
		if (err) console.error('ERROR WRITING TO SOFILE ASYNC' + err);;
	});	
}
//==============================================================

//init function
//read all greetings from file
Shoutout.init = (soconfig) => {
	Shoutout.config = soconfig;
	try
	{
		let data = fs.readFileSync(Shoutout.config.filename); //read  file
		Shoutout.messages = JSON.parse(data);
		console.log('INFO SHOUTOUT INIT: Load complete.')
		return;
	}
	catch(err)
	{
		if(err.code === 'ENOENT')
		{
			console.log('INFO SHOUTOUT INIT: No shoutout file found. Creating one.');
			Shoutout.messages = {};
			Shoutout.writeToFileSync();
			return;
		}
		else
			console.error('ERROR INIT SHOUTOUT MODULE: ' + err);
	}
}

//gives back the default or personal so message
Shoutout.shoutoutUser = (username,callback) => {
	if(Shoutout.messages.hasOwnProperty(username))	
	{
		callback(Shoutout.messages[username]);
	}
	else
	{
		callback(Shoutout.config.defaultmsg.replace(/{user}/g,util.getDisplayName(user)));
	}
}

Shoutout.addshoutout = (username, shoutoutmsg, callback) => {
	util.checkUserName(username, validusername => {
		if(validusername)
		{
			if(shoutoutmsg)
			{
				Shoutout.shoutoutmsg[validusername] = shoutoutmsg;
				Shoutout.writeToFileAsync();
				console.log(`INFO SHOUTOUT: added persinal SO message fpr user ${username}`);
				callback(`Successfully edited !so for ${username}`);
				return;
			}
			callback('Failed to edit SO message. Message cant be empty. Use "!so add @username somsg"');
			return;
		}
		callback(`"${username}" is not a twitch username`);
		return;
	});
}

//function to remove a greeting from the list
Shoutout.remove = (user, callback) => {
	util.checkUserName(user, validusername =>{
		if(validusername)
		{
			delete Shoutout.shoutoutmsg[validusername];
			callback(`Removed personal so msg for user ${user}`);			
		}
		else
			callback(`${user} is not a valid username`);
	});
}

module.exports = Shoutout;