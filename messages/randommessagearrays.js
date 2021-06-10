//Arrays for randomised bot answers

//all the famos quotes of Jimmy 
const jimmyquotes = [
	'\"Kareen is in stelth mode again, she is our ninja!\" - Jimmy',
	'\"Nonono, I will not stream for 8 hours.\"',
	'\"@tuinkabouter1965 She is my captian\" ',
	'\"How does that work??\"',
	'\"@salad_lee. She is a chinese in germany or so i don\'t know. I don\'t even know if salad even is a she.\"',
	'\"Sorry wrong button...\"',
	'\"You are awesome!\"',
	'\"Damn I am smooth today\"',
	'\"Hey, Do you have your Beats on?\" ',
	'\"I\'m very secure with myself\"',
	'shaboodah',
	'dayummmmm',
	'Whaaaaaaaaaatt!!!!!!!!!?',
	'This reminds me of highschool!',
]
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