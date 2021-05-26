const schedule = require('node-schedule');
const tmi = require('tmi.js');
const fs = require('fs');
const proc = require('process');
const Counter = require('./counter.js');
const config = require('./config.js');
const answers = require('./arrays.js');
const textimages = require('./textimages.js');
const util = require('./userutil.js');

//init counter
const wrongbuttoncounter = new Counter();
const lastsongcounter = new Counter();

//use logfiles
var access = fs.createWriteStream('access.log')
      , error = fs.createWriteStream('error.log');

// redirect stdout / stderr
proc.stdout.write = access.write.bind(access);
proc.stderr.write = error.write.bind(error); 


// Valid commands start with !
let commandPrefix = '!';


// Create a client with our options
const client = new tmi.client(config.tmiconf);

// Register  event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);
client.on('raided', onRaidHandler);
client.on('hosted', onHostedHandler);
client.on('cheer', onCheerHandler);
client.on('subscription', onSubHandler);
client.on('resub', onResubHandler);
client.on('subgift', onSubgiftHandler);
client.on('submysterygift', onRandomSubgiftHandler);


// Connect to Twitch:
client.connect();

// Called every time a message comes in. Handler for all commands
function onMessageHandler (target, user, msg, self) {
	if (self) { return; } // Ignore messages from the bot

	// This isn't a command since it has no prefix:
	if (msg.substr(0, 1) !== commandPrefix) {
		console.log(`[${target} (${user['message-type']})] ${msg}`);
		return;
	}
	
	// Split the message into individual words:
	const parse = msg.slice(1).split(' ');
	// The command name is the first (0th) one:
	const commandName = parse[0].toLowerCase();


	//Used to check if a user is a mod or not
	let isMod = user.mod || user['user-type'] === 'mod';
	let isBroadcaster = target.slice(1) === user.username; //check if user broadcaster by comparing current channel with the username of the sender
	let isModUp = isMod || isBroadcaster;
	let isBotOwner = user.username === "profdrbielefeld";

	//used to check if the user send parameter
	let hasParameter = typeof parse[1] !== 'undefined';

	console.log(`[${target} | ${user.username} | (${user['message-type']})] ${commandName} receved as command!`);

	//commands only the Botowner can execute
	if(isBotOwner)
	{
		if(commandName === 'heyhey') //ping command to check if the bot is sill running 
		{
			client.say(target,`Yeeyyy Prof is here!! <3 I am still up and running :3`);	
			return;		
		}
		else if (commandName === 'resetall') //resetz all counter to 0
		{
			wrongbuttoncounter.resetCounter();
			lastsongcounter.resetCounter();
			client.say(target,`All counter to 0.`);
			return;
		}
		else if(commandName === 'shutdown') //shutdown the bot
		{
			client.say(target,`Okay Boss! <3 Bye bye o/`);			
			proc.exit();
		}
		
	}

	//Mod commands
	if(isModUp)
	{
		if(commandName === 'so' && hasParameter) //shoutout someone
		{
			client.say(target,`Big shoutout to ${parse[1]}!!! Much love <3`);
			return;
		}
		else if(commandName === 'setcounter' && hasParameter) //set the wrong button counter to a value given as parameter
		{
			wrongbuttoncounter.setCounter = parseInt(parse[1]);
			client.say(target,`Counter set to ${wrongbuttoncounter.getCounter}.`);
			return;
		}
	}

	// User commands
	if (commandName === 'counter') 
	{
		client.say(target, `Jimmy pressed the wrong button ${wrongbuttoncounter.getCounter} times today!`);
		return;
	} 
	else if (commandName === 'counter++') 
	{
		wrongbuttoncounter.incCounter();
		client.say(target, `Wrong button counter is now: ${wrongbuttoncounter.getCounter}`);
		return;
	}
	else if(commandName === 'quote')
	{
		client.say(target, answers.getRandomJimmyQuote());
	}
	else if(commandName === 'beer')
	{
		if(hasParameter)
		{
			client.say(target,`${util.getDisplayName(user)} gives a cold Beer to ${parse[1]}! Cheers`);
			return;
		}
		else
		{
			client.say(target,`Hey ${util.getDisplayName(user)}, here. Have a nice Kirinbeer!`);
			return;
		}
	}
	else if(commandName === 'lastsong')
	{
		lastsongcounter.incCounter();
		client.say(target,`${answers.getRandomLastSongCall()}, ${lastsongcounter.getCounter}x now. `);
		return;
	}
	else if(commandName === 'love')
	{
		client.say(target,textimages.love);
		return;
	}
	else if(commandName === 'help')
	{
		client.say(target, `Available commands: !counter, !quote, !help, !beer, !lastsong, !love`);
		return;
	}
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {	
	console.log(`* Connected to ${addr}:${port}`);
}

//Called every time someone raids the channel
function onRaidHandler(target, username, viewers)
{
	client.say(target,`Thank you ${username} for the Raid!! Welcome to all of the ${viewers} to Jimmys Channel! Enjoy your stay!`);
}

//Called every time someone cheers some Bits
function onCheerHandler(target, user, message)
{
	client.say(target,`@${util.getDisplayName(user)} cheert with bits! Thank you so much <3`);
}

//called every time someone hosts jimmys channel
function onHostedHandler(target, username, viewers, autohost)
{
	if(autohost === false){
		client.say(target,`${username} is hosting with ${viewers} viewers! Thank you!`);
	}
		
}

//Called every time someone subs to Jimmys channel
function onSubHandler(target, username, method, message, user)
{
	client.say(target,`Thank you for your sub @${username}! Welcome to Jimmys channel!`);
}

//called every time someone resubs to Jimmys channel
function onResubHandler(target, username, months, message, user, methods)
{
	client.say(target,`Woho @${util.getDisplayName(user)}.Thank you for your ${util.getCumulativeMonth(user)} resub! <3`);
}

//called every time someone gifts a sub to another user of his choise
function onSubgiftHandler(target, username, streakMonths, recipient, methods, user)
{
	client.say(target,`@${util.getDisplayName(user)} just gifted a sub to @${util.getRecipientDisplayName(user)}! Thank you so much. This was your ${util.getSenderGiftCount(user)}. giftsub here <3`);
}

//called every time someone gifts one or more subs to random viewer aka subbomb
function onRandomSubgiftHandler(target, username, numbOfSubs, methods, user)
{
	client.say(target,`@${util.getDisplayName(user)} just gifted ${numbOfSubs} Giftsubs to Jimmys community! Thank you so so much!! Thats a total of ${util.getSenderGiftCount(user)} now. Wow <3`);
}

//runns every day at 4:00 in the morning to reset all counter for the next stream
schedule.scheduleJob('0 4 * * *', () => { 
	lastsongcounter.resetCounter();
	wrongbuttoncounter.resetCounter();
	console.log('Triggered at 4 am. Reset all counter to 0');

});


//cach Exception and write them to the logfile
process.on('uncaughtException', function(err) {
	console.error((err && err.stack) ? err.stack : err);
  });