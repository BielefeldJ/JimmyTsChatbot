const fs = require('fs');
const util = require('../utilities/userutil.js');

//Module for greeting user in chat
var Greeting = {};

//==============================================================
//write greetings to file
Greeting.writeToFileSync = () =>
{
	let data = JSON.stringify(Greeting.messages, null, 2);
	try{
		fs.writeFileSync(Greeting.config.filename, data)
	}
	catch(err)
	{
		console.error('ERROR WRITING TO GREETINGSFILE SYNC' + err);
	}
}
Greeting.writeToFileAsync = () =>
{
	let data = JSON.stringify(Greeting.messages, null, 2);
	fs.writeFile(Greeting.config.filename, data, (err) => {
		if (err) console.error('ERROR WRITING TO GREETINGSFILE ASYNC' + err);;
	});	
}
//==============================================================

//init function
//read all greetings from file
Greeting.init = (greetingsconfig) => {
	Greeting.config = greetingsconfig;
	Greeting.greeted = [...Greeting.config.ignoreUser];
	try
	{
		let data = fs.readFileSync(Greeting.config.filename); //read  file
		Greeting.messages = JSON.parse(data);
		console.log('INFO GREETING INIT: Load complete.')
		return;
	}
	catch(err)
	{
		if(err.code === 'ENOENT')
		{
			console.log('INFO GREETING INIT: No greeting file found. Creating one.');
			Greeting.messages = {};
			Greeting.writeToFileSync();
			return;
		}
		else
			console.error('ERROR INIT GREETING MODULE: ' + err);
	}
}

//function will give a greeting message back.
Greeting.greetUser = (user, callback) => {
	if(!Greeting.greeted.includes(user.username))
	{
		if(Greeting.messages.hasOwnProperty(user.username))
			callback(Greeting.messages[user.username]);
		else
			callback(Greeting.config.defaultmsg.replace(/{user}/g,util.getDisplayName(user)));
		
		Greeting.greeted.push(user.username)
	}
}

//function to return a greeting from a user
Greeting.getGreeting = (user,callback) => {
	util.checkUserName(user, validuser => {
		if(validuser)
		{
			var greeting = Greeting.messages[validuser];
			if(greeting)
				callback(greeting);
			else
				callback(`${user} does not have a personal greeting`);
		}		
		else
			callback(`${user} is not a valid Twitch username.`);
	});
}

//function to add a greeting for a user
Greeting.addGreeting = (username, message, callback) => {
	util.checkUserName(username, validusername => {
		if(validusername)
		{
			if(message)
			{
				Greeting.messages[validusername] = message;
				Greeting.writeToFileAsync();
				console.log(`INFO GREETING: Edited greeting for user ${username}`);
				callback(`Successfully edited greeting for ${username}`);
				return;
			}//no else needed because of return in if				
			callback('Failed to edit greeting. Message cant be empty. Use add "!greeting @username greetingmessage"');
			return;
		}
		callback(`Failed to edit greeting. "${username}" is not a twitch username`);
		return;
	});	
}

//function to move a greeting to a new user
Greeting.rename = (olduser, newuser,callback) => {
	util.checkUserName(olduser, validolduser => 	{
		if(validolduser)
		{
			util.checkUserName(newuser, validnewuser => {
				if(validnewuser)
				{
					Greeting.messages[validnewuser] = Greeting.messages[validolduser]
					delete Greeting.messages[validolduser];
					console.log(`INFO GREETING: Moved greeting from ${olduser} to ${newuser}`)
					callback(`Moved greeting from ${olduser} to ${newuser}`);
					Greeting.writeToFileAsync();
					return;
				}
				else
					callback(`${newuser} is not a valid Twitch username.`);
			});			
		}
		else
			callback(`${olduser} is not a valid Twitch username.`);
	});
}

//function to remove a greeting from the list
Greeting.remove = (user, callback) => {
	util.checkUserName(user, validusername =>{
		if(validusername)
		{
			delete Greeting.messages[validusername];
			callback(`Removed personal greeting for user ${user}`);			
		}
		else
			callback(`${user} is not a valid username`);
	});
}

//function to reset the list of already greeted user
Greeting.resetGreeted = () => {
	console.log('INFO GREETING: Reset greeted user');
	Greeting.greeted.length = 0;
	Greeting.greeted = [...Greeting.config.ignoreUser];
}

module.exports = Greeting;