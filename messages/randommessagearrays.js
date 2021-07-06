//Arrays for randomised bot answers

//all the famos quotes of Jimmy 
const jimmyquotes = [
	'Supa dupa smoooove',
	'Nonono, I will not stream for 8 hours.',
	'@tuinkabouter1965 She is my captian ',
	'How does that work??',
	'@salad_lee. She is a chinese in germany or so i don\'t know. I don\'t even know if salad even is a she.',
	'Sorry wrong button...',
	'Damn I am smooth today',
	'Hey, Do you have your Beats on? ',
	'Pon is my hentai master. So much hentai.',
	'No way, why are you so mean to me?',
	'shaboodah',
	'dayummmmm',
	'Whaaaaaaaaaatt!!!!!!!!!?',
	'This reminds me of highschool!',
	'J to the I to the M M Y',
]
//returns one random item of Jimmys quotes
function getRandomJimmyQuote(){
    return jimmyquotes[Math.floor(Math.random() * jimmyquotes.length)];
}

//returns a quote based on given index
function getJimmyQuoteByIndex(index)
{
	if(index < jimmyquotes.length)
	{
		return jimmyquotes[index];
	}
	else
	{
		return getRandomJimmyQuote();
	}
}

//ofc is this the last song? jeez. 
const randomLastSongCall = [
	'This is the last song.',
	'okok, this is the last song.',
	'I swear! This is the last song.',
	'I will end the stream after this song!',
	'I swear! This is the last song.',
	'The last song! I am not touching any more buttons.',
	'Hahaha the last song xD That was a good one.',
]
//returns one random item of the randomLastSongCall array
function getRandomLastSongCall(){
    return randomLastSongCall[Math.floor(Math.random() * randomLastSongCall.length)];
}

//all the times he loves this song
const favSongCall = [
	'This song. Thats my favorite!',
	'This is one of my favorite songs.',
	'Uhh I love this song.',
]
//returns one random item of the favsong Array
function getFavSongCall()
{
	return favSongCall[Math.floor(Math.random() * favSongCall.length)];
}

//random stage messages
const onStageMessage = [
	'{user} get your ass on stage {index}',
	'Security, please clear the way to stage {index}. {user}, please hurry up.',
	'Stage {index} is waiting for {user}. Hurry!',
	'Stage {index} stage {index} please. Get ready for {user}',

]
const offStageMessage = [
	'{user} get your ass off stage {index}',
	'{user} Thank you for your performance. Please leave the stage now.',
	'Hey {user}! Our next act is waiting to get on stage {index}. Come down there now',
	'What? Stage {index} is still occupied? Oh come on {user}. Get down there already',
]

function getRandomOnStageMessage(user,stagenumber)
{
	return onStageMessage[Math.floor(Math.random() * onStageMessage.length)].replace('{user}',user).replace('{index}', stagenumber);
}

function getRandomOffStageMessage(user,stagenumber)
{
	return offStageMessage[Math.floor(Math.random() * offStageMessage.length)].replace('{user}',user).replace('{index}', stagenumber);
}


module.exports = {
    getRandomJimmyQuote,
    getRandomLastSongCall,
	getFavSongCall,
	getJimmyQuoteByIndex,
	getRandomOnStageMessage,
	getRandomOffStageMessage
};