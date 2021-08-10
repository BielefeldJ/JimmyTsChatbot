const https = require('https');
const URL = require('url');
const { client } = require('tmi.js');

var Weather = {};

//twitch chat client
Weather.client =  function(client)
{
	Weather.client = client;
}

//openweather API key
Weather.setAPIKEY = function(apikey)
{
	Weather.APIKEY = apikey;
} 

const OPENWEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/'; 

//This functions returns the Current weather data of a location
//location is location for the weather data request.
Weather.sendCurrentToChat = function (target, location) 
{
	//building url
	let url = OPENWEATHER_API_URL + `weather?q=${encodeURIComponent(location)}&appid=${Weather.APIKEY}&units=metric`;

	return this.getDataFromAPI(url, function(weatherdata){
		
		if(weatherdata.valid())
		{
			Weather.client.say(target, `That's the weather in ${weatherdata.city()},${weatherdata.country()} right now:`
							+ ` ${weatherdata.icon()} ${weatherdata.weather()} at ${weatherdata.temperature()}°C (${weatherdata.temperatureF()} °F) with ${weatherdata.humidity()}% humidity.` 
							+ ` Sunrise 🌅 at ${weatherdata.sunrise()}, sunset 🌇 at ${weatherdata.sunset()}.`);
		}
		else
		{
			Weather.client.say(target, `Sorry, I could not find ${location}🙇`);
		}
	});
};

Weather.getDataFromAPI = function (url, callback)
{	
	return https.get(URL.parse(url), res => {

		//data array for the weather data
		let resdata = [];

		//write the res to data
		res.on('data', chunk => {
			resdata.push(chunk);
		});

		//all data collected. Parsing to JSON
		res.on('end', () =>{
			let weather = JSON.parse(Buffer.concat(resdata).toString());
			callback(new Weather.CurrentWeatherData(weather))
		});
	});		
}

//Current weather data 
Weather.CurrentWeatherData = function(weatherdata)
{
	this.weatherdata = weatherdata;
}

//temp in °C
Weather.CurrentWeatherData.prototype.temperature = function()
{
	return this.weatherdata.main.temp;
}

//temp in °F
Weather.CurrentWeatherData.prototype.temperatureF = function()
{
	return (parseFloat(this.weatherdata.main.temp) * 1.8 + 32.0).toPrecision(3);
}

Weather.CurrentWeatherData.prototype.weather = function()
{
	return this.weatherdata.weather[0].description;
}

Weather.CurrentWeatherData.prototype.city = function()
{
	return this.weatherdata.name;
}

Weather.CurrentWeatherData.prototype.country = function()
{
	return this.weatherdata.sys.country;
}

Weather.CurrentWeatherData.prototype.humidity = function()
{
	return this.weatherdata.main.humidity;
}

Weather.CurrentWeatherData.prototype.sunrise = function()
{
	//Parse time to int, add timezone difference 	
	let now = new Date(); // used for get Timzoneoffset of the servers location
	let sunrise = parseInt(this.weatherdata.sys.sunrise) + (now.getTimezoneOffset() * 60 )+ parseInt(this.weatherdata.timezone);
	//cast timestamp to Date (*1000 cause Date wants ms)
	return new Date(sunrise*1000).toLocaleTimeString('de-DE',{
		hour: '2-digit',
		minute:'2-digit'
	  });
}

Weather.CurrentWeatherData.prototype.sunset = function()
{
	//Parse time to int, add timezone difference 	
	let now = new Date(); // used for get Timzoneoffset of the servers location
	let sunset = parseInt(this.weatherdata.sys.sunset) + (now.getTimezoneOffset() * 60 )+ parseInt(this.weatherdata.timezone);
	//cast timestamp to Date (*1000 cause Date wants ms)
	return new Date(sunset*1000).toLocaleTimeString('de-DE',{
		hour: '2-digit',
		minute:'2-digit'
	  });
}

//get icons based on weather (https://openweathermap.org/weather-conditions)
Weather.CurrentWeatherData.prototype.icon = function()
{
	switch(this.weatherdata.weather[0].icon)
	{
		case '01d':
			return '🌞';
		case '01n':
			return '🌙🌟';
		case '02d':
		case '02n':
			return '🌤️';
		case '03d':
		case '03n':
			return '⛅';
		case '04d':
		case '04n':
			return '☁️';
		case '09d':
		case '09n':
			return '🌦️☔';
		case '10d':
		case '10n':
			return '🌧️☔';
		case '11d':
		case '11n':
			return '⛈️';
		case '13d':
		case '13n':
			return '🌨️❄️';
		case '50d':
		case '50n':
			return '🌫️🌁';
	}
}

Weather.CurrentWeatherData.prototype.valid = function() 
{
	if(this.weatherdata.cod == 200)
		return true;

	return false;
}

module.exports = Weather;