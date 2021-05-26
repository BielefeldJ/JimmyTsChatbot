//Arrays for randomised bot answers

//all the famos quotes of Jimmy 
const jimmyquotes = [
	'\"This is the last song.\" - Jimmy (This was not the last song)',
	'\"I love this song!\" - Jimmy',
	'\"This really is the last song! I swear\" - Jimmy',
	'\"This is my favourite Song!\" - Jimmy',
	'\"Nonono, I will not stream for 8 hours." - Jimmy, streams for 8 hours anyway.',
	'\"What! Wrong button again?\" - Jimmy',
	'\"Sorry wrong button...\" - Jimmy, while pressing wrong buttons',
	'\"Man, I love kirin beer\" - Jimmy, every time',
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

//returns one random item of Jimmys quotes
function getRandomJimmyQuote(){
    return jimmyquotes[Math.floor(Math.random() * jimmyquotes.length)];
}


//returns one random item of the randomLastSongCall array
function getRandomLastSongCall(){
    return randomLastSongCall[Math.floor(Math.random() * randomLastSongCall.length)];
}

module.exports = {
    getRandomJimmyQuote,
    getRandomLastSongCall
};