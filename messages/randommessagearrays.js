//Arrays for randomised bot answers

//all the famos quotes of Jimmy 
const jimmyquotes = [
	'\"This is the last song.\" - Jimmy (This was not the last song)',
	'\"Uhhh I love this song!\" - Jimmy',
	'\"This really is the last song! I swear\" - Jimmy',
	'\"This is my favourite Song!\" - Jimmy',
	'\"This is one of my favourite Song!\" - Jimmy',
	'\"Nonono, I will not stream for 8 hours." - Jimmy, streams for 8 hours anyway.',
	'\"How does that work??\" - Jimmy',
	'\"Sorry wrong button...\" - Jimmy, while pressing wrong buttons',
	'\"Man, I love kirin beer\" - Jimmy, every time',
	'\"You are awesome!\" - Jimmy to you',
	'\"Damn I am smooth today\" - Jimmy, really smooth today',
	'\"Hey, Do you have your Beats on?\" - Jimmy',
]
//ofc is this the last song? jeez. 
const randomLastSongCall = [
	'This is the last song.',
	'ThIs Is ThE lAsT sOnG!1!.',
	'I swear! This is the last song.',
	'I will end the stream after this song!',
	'I swear! This is the last song.',
	'The last song! I am not touching any more buttons.',
	'Hahaha the last song xD That was a good one.',
]

//all the times he loves this song
const favSongCall = [
	'This song. Thats my favorite!',
	'This is one of my favorite songs.',
	'Uhh I love this song.',
]

//returns one random item of Jimmys quotes
function getRandomJimmyQuote(){
    return jimmyquotes[Math.floor(Math.random() * jimmyquotes.length)];
}


//returns one random item of the randomLastSongCall array
function getRandomLastSongCall(){
    return randomLastSongCall[Math.floor(Math.random() * randomLastSongCall.length)];
}

//returns one random item of the favsong Array
function getFavSongCall()
{
	return favSongCall[Math.floor(Math.random() * favSongCall.length)];
}

module.exports = {
    getRandomJimmyQuote,
    getRandomLastSongCall,
	getFavSongCall
};