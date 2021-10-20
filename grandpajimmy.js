const schedule = require('node-schedule');
const tmi = require('tmi.js');
const fs = require('fs');
const proc = require('process');
const Counter = require('./utilities/counter.js');
const config = require('./config.js');
const randomanswers = require('./messages/randommessagearrays.js');
const messages = require('./messages/messages.js')
const textimages = require('./messages/textimages.js');
const util = require('./utilities/userutil.js');
const Weather = require('./utilities/weather.js');
const Greeting = require('./utilities/greeting.js');
const Shoutout = require('./utilities/shoutout.js');

//logging
if(config.LOGGING.enable)
{
	//use logfiles
	var access = fs.createWriteStream(config.LOGGING.logfile);
	var error = fs.createWriteStream(config.LOGGING.errlogfile);
	// redirect stdout / stderr
	proc.stdout.write = access.write.bind(access);
	proc.stderr.write = error.write.bind(error); 
}

// Valid commands start with !
const commandPrefix = '!';

//init chat client
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

//init counter
const wrongbuttoncounter = new Counter();
const lastsongcounter = new Counter();
const favsongcounter = new Counter();
const counters ={
	wbc : wrongbuttoncounter,
	lsc : lastsongcounter,
	fsc : favsongcounter
};

//init stage
var stages = ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'];

//Init Weather Module
Weather.setAPIKEY(config.OPENWEATHER_API_KEY);
Weather.client(client);

//Init Greeting Module
Greeting.init(config.GREETINGCONF);

//Init Shoutout Module
Shoutout.init(config.SHOUTOUTCONF);

//start handler
// Called every time a message comes in. Handler for all commands
function onMessageHandler (target, user, msg, self) {
	if (self) { return; } // Ignore messages from the bot

	if (config.GREETINGCONF.enable)
	{
		Greeting.greetUser(user, message => {
			client.say(target,message);
		})
	}
	//If someone hits reply in the chat, the chat will automaticly add the targeted user as first word, starting with an @
	//If this is the case, remove the first word to check if the user used a command while using the reply feature.
	if(msg.substr(0,1) === '@')
    {
        msg = msg.substr(msg.indexOf(" ") + 1);
    }
	// This isn't a command since it has no prefix:
	if (msg.substr(0, 1) !== commandPrefix) {
		return;
	}
	
	// Split the message into individual words:
	let parse = msg.slice(1).split(' ');
	// The command name is the first (0th) one:
	const commandName = parse[0].toLowerCase();

	//remove the command name from the array
	parse = parse.slice(1);

	//Used to check if a user is a mod or not
	let isMod = user.mod || user['user-type'] === 'mod';
	let isBroadcaster = target.slice(1) === user.username; //check if user broadcaster by comparing current channel with the username of the sender
	let isModUp = isMod || isBroadcaster;
	let isVIP = util.getUserVIP(user);
	let isBotOwner = user.username === config.botowner; //twitch username of the botowner

	//used to check if the user send parameter
	let hasParameter = typeof parse[0] !== 'undefined';
	let hasSecondParameter = typeof parse[1] !== 'undefined';

	console.log(`[${target} | ${user.username} | (${user['message-type']})] ${commandName} receved as command!`);

	//commands only the Botowner can execute
	if(isBotOwner)
	{
		if(commandName === 'heyhey') //ping command to check if the bot is sill running 
		{
			client.say(target,messages.ping());	
			return;		
		}
		else if (commandName === 'resetall') //resetz all counter to 0
		{
			for(c in counters)
			{
				counters[c].resetCounter();
			}	
			client.say(target,messages.resetAllMsg());
			return;
		}
		else if(commandName === 'shutdown') //shutdown the bot
		{
			client.say(target,messages.shutdownMsg());			
			proc.exit();			
		}		
	}

	//Mod and VIP commands
	if(isModUp || isVIP)
	{
		if(commandName === 'so' && hasParameter) //shoutout someone
		{
			//client.say(target,messages.shoutoutMsg(parse[0]));		
			//return;
			switch(parse[0])
			{
				case 'add':
					if(parse[1] && parse[2])
					{
						console.log(`User ${user.username} edited a shoutout msg.`);
						let username = parse[1];
						let somsg = parse.slice(2).join(' ');
						Shoutout.add(username,somsg,msg => {
							client.say(target,msg);
						})						
						return;
					}	
					else			
						client.say(target,'Use !so add @Username greeting-message');		
					break;		
				case 'remove':
					if(parse[1])
					{
						Shoutout.remove(parse[1], msg => {
							client.say(target,msg);
						})
					}
					else
						client.say(target,'Use !so remove @Username');
					break;
				default:
					Shoutout.shoutoutUser(parse[0], msg => {
						client.say(target,msg);
					});
			}
		}
		//DEFAULT set the wrong button counter to a value given as parameter
		//If a specific counter is fiven, sets it a value (first parameter is the counter name in countersarray seccond the new value)
		else if(commandName === 'setcounter' && hasParameter) 
		{
			if(hasSecondParameter)
			{
				if(parse[0] in counters)
				{
					counters[parse[0]].setCounter = parseInt(parse[1]);
					client.say(target,messages.setCounterMsg(counters[parse[0]].getCounter));
					return;
				}
				else
				{
					client.say(target,messages.counterNotFoundMsg(parse[0]));
					return;
				}
			}
			else 
			{			
				wrongbuttoncounter.setCounter = parseInt(parse[0]);
				client.say(target,messages.setCounterMsg(wrongbuttoncounter.getCounter));
				return;
			}
		}
		else if(commandName === 'welcome')
		{
			client.say(target, messages.welcomeMsg());
			return;
		}
		else if(commandName === 'hi')
		{
			client.say(target,messages.hiMsg());
			return;
		}
		else if(commandName === 'modlove')
		{
			client.say(target,messages.modsMsg());
			return;
		}
		else if(commandName === 'awesome')
		{
			client.say(target,messages.awesomMsg());
			return;
		}
		else if(commandName === 'share')
		{
			client.say(target,messages.shareMsg());
			return;
		}
		else if(commandName === 'sub')
		{
			client.say(target,messages.subMsg());
			return;
		}
		else if(commandName === 'prime')
		{
			client.say(target,messages.primeMsg());
			return;
		}
		else if(commandName === 'refresh')
		{
			client.say(target, messages.refreshMsg());
			return;
		}
		else if (commandName === 'stage')
		{			
			if (hasParameter && hasSecondParameter)
			{
				let stagenumber = parseInt(parse[0]);
				let stageuser = parse[1];

				if(Number.isInteger(stagenumber) && stagenumber-1 < stages.length)
				{
					if(stages[stagenumber-1] === 'empty')
					{					
						client.say(target,randomanswers.getRandomOnStageMessage(stageuser,stagenumber));
						stages[stagenumber-1] = stageuser;
						return;
					}
					else
					{
						client.say(target,randomanswers.getRandomOffStageMessage(stages[stagenumber-1],stagenumber) + " - " 
						+ randomanswers.getRandomOnStageMessage(stageuser,stagenumber));
						stages[stagenumber-1] = stageuser;
						return;
					}					
				}
			}
			client.say(target,messages.stagewrong());
			return;
		}
		else if (commandName === 'host')
		{
			client.say(target,messages.hostMsg());
			return;
		}
		else if(commandName === 'greeting' && hasParameter)
		{
			switch(parse[0])
			{
				case 'add':
				case 'edit':
					if(parse[1] && parse[2])
					{
						console.log(`User ${user.username} edited a greeting.`);
						let username = parse[1];
						let greeting = parse.slice(2).join(' ');
						Greeting.addGreeting(username,greeting,msg => {
							client.say(target,msg);
						})						
						return;
					}	
					else			
						client.say(target,'Use !greeting edit @Username greeting-message');		
					break;		
				case 'get':
					if(parse[1])
					{
						Greeting.getGreeting(parse[1], msg => {
							client.say(target,msg);
						});
						return;
					}	
					else
						client.say(target,'Use !greeting get @username');				
					break;
				case 'rename':
					if(parse[1] && parse[2])
					{
						console.log(`User ${user.username} moved a greeting from ${parse[1]} to ${parse[2]}.`);
						Greeting.rename(parse[1],parse[2], msg => {
							client.say(target,msg);
						});
						return;
					}
					else
						client.say(target,'Use !greeting rename @OldUsername @NewUsername');
					break;
				case 'remove':
					if(parse[1])
					{
						Greeting.remove(parse[1], msg => {
							client.say(target,msg);
						})
					}
					else
						client.say(target,'Use !greeting remove @Username');
					break;
				case 'reset':
					Greeting.resetGreeted();
					break;
				default:
					client.say(target,'Unknown option. Use !greeting get|edit|rename|remove');
					break;
			}
			return;
		}
	}

	// User commands
	if (commandName === 'counter') 
	{
		client.say(target, messages.counterMsg(wrongbuttoncounter.getCounter)); 
		return;
	} 
	else if (commandName === 'counter++') 
	{
		wrongbuttoncounter.incCounter();
		client.say(target, messages.incCounterMsg(wrongbuttoncounter.getCounter));
		return;
	}
	else if(commandName === 'quote')
	{
		if(hasParameter)
		{
			client.say(target, randomanswers.getJimmyQuoteByIndex(parse[0]));
		}
		else
		{
			client.say(target, randomanswers.getRandomJimmyQuote());
		}		
		return;
	}
	else if(commandName === 'beer')
	{
		if(hasParameter)
		{
			client.say(target,messages.beerToUserMsg(util.getDisplayName(user),parse[0]));
			return;
		}
		else
		{
			client.say(target,messages.beerMsg(util.getDisplayName(user)));
			return;
		}
	}
	else if(commandName === 'tea')
	{
		if(hasParameter)
		{
			client.say(target,messages.teaToUserMsg(util.getDisplayName(user),parse[0]));
			return;
		}
		else{
			client.say(target,messages.teaMsg(util.getDisplayName(user)));
			return;
		}
	}
	else if(commandName === 'tissue')
	{
		if(hasParameter)
		{
			client.say(target,messages.tissuesToUserMag(util.getDisplayName(user),parse[0]));
			return;
		}
		else
		{
			client.say(target,messages.tissuesMsg(util.getDisplayName(user)));
			return;
		}
	}
	else if(commandName === 'refill' && hasParameter)
	{
		client.say(target,messages.refillMsg(util.getDisplayName(user),parse[0]));
		return;
	}
	else if(commandName === 'lastsong')
	{
		lastsongcounter.incCounter();
		client.say(target,`${randomanswers.getRandomLastSongCall()}, ${lastsongcounter.getCounter}x now. `);
		return;
	}
	else if(commandName === 'love')
	{
		client.say(target,textimages.love);
		return;
	}
	else if(commandName === 'heart')
	{
		client.say(target, textimages.heart);
		return;
	}
	else if(commandName === 'hu')
	{
		client.say(target,textimages.hu);
		return;
	}
	else if(commandName === 'wow')
	{
		client.say(target,textimages.wow);
		return;
	}
	else if(commandName === 'dance')
	{
		client.say(target,textimages.dance);
		return;
	}
	else if (commandName === 'favsong')
	{
		favsongcounter.incCounter();
		client.say(target,`${randomanswers.getFavSongCall()}. (${favsongcounter.getCounter}x).`);
		return;
	}
	else if(commandName === 'socials')
	{
		client.say(target, messages.socialsMsg());
		return;
	}
	else if (commandName === 'discord')
	{
		client.say(target, messages.discordMsg());
		return;
	}
	else if (commandName === 'times')
	{
		client.say(target,messages.timesMsg());
		return;
	}
	else if(commandName === 'boogie')
	{
		client.say(target,messages.boogieMsg());
		return;
	}
	else if(commandName === 'netflix')
	{
		client.say(target,messages.netflixMsg());
		return;
	}
	else if (commandName === 'rap')
	{
		client.say(target,messages.rapMsg());
		return;
	}
	else if (commandName === 'lurk')
	{	
		client.say(target,messages.lurkMsg(util.getDisplayName(user)));
		return;
	}
	else if(commandName === 'unlurk')
	{
		client.say(target,messages.unlurkMsg(util.getDisplayName(user)));
		return;
	}
	else if(commandName === 'bonk' && hasParameter)
	{
		client.say(target,messages.bonkMsg(util.getDisplayName(user),parse[0]));
		return;
	}
	else if(commandName === 'weather' && hasParameter)
	{
		Weather.sendCurrentToChat(target,parse.join(' '));
		return;
	}
	else if(commandName === 'raidcall')
	{
		client.say(target,messages.raidcallMsg());
		return;
	}
	else if(commandName === 'ratchet' || commandName === 'guitar')
	{
		client.say(target,messages.ratchetMsg());
		return;
	}
	else if(commandName === 'help')
	{
		client.say(target, messages.helpMsg());
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
	client.say(target,messages.raidMessage(username,viewers));
}

//Called every time someone cheers some Bits
function onCheerHandler(target, user, message)
{
	client.say(target,messages.cheerMessage(util.getDisplayName(user)));
}

//called every time someone hosts the channel
function onHostedHandler(target, username, viewers, autohost)
{
	client.say(target,messages.hostedMessage(username,viewers));		
}

//Called every time someone subs to the channel
function onSubHandler(target, username, method, message, user)
{
	client.say(target,messages.subMessage(util.getDisplayName(user)));
}

//called every time someone resubs to the channel
function onResubHandler(target, username, months, message, user, methods)
{
	client.say(target,messages.resubMessage(util.getDisplayName(user),util.getCumulativeMonth(user)));
}

//called every time someone gifts a sub to another user of his choise
function onSubgiftHandler(target, username, streakMonths, recipient, methods, user)
{
	client.say(target,messages.giftsubMessage(util.getDisplayName(user),util.getRecipientDisplayName(user)));
}

//called every time someone gifts one or more subs to random viewer aka subbomb
function onRandomSubgiftHandler(target, username, numbOfSubs, methods, user)
{
	client.say(target,messages.communityGiftsubMessage(util.getDisplayName(user),numbOfSubs,util.getSenderGiftCount(user)));
}
//end handler


//runns every day at 4:00 in the morning to reset all counter for the next stream
schedule.scheduleJob('0 4 * * *', () => { 
	for(c in counters)
	{
		counters[c].resetCounter();
	}
	Greeting.resetGreeted(); //reset greetings
	stages = ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty']; //reset stages
	console.log('INFO: Daily reset triggered. Reset all counter and greetings');
});

//cach Exception and write them to the logfile
proc.on('uncaughtException', function(err) {
	console.error((err && err.stack) ? err.stack : err);
  });
