  
const api = {
	key: "af225bd883a222ff6e6b49659f9dd025",
	base: "https://api.openweathermap.org/data/2.5/"
 }
const nativeTown = "Pavlovo";

 window.onload = function()
 {
	 const date = document.querySelector(".date");
	 date.innerHTML = dateBuilder();
	 getResults(nativeTown);
 }
 
 const searchbox = document.querySelector('.search-box');
 searchbox.addEventListener('keypress', setQuery);
 
 function setQuery(evt) {
	if (evt.keyCode == 13) {
	  getResults(searchbox.value);
	}
 }
 
 function getResults (query) {
	fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
	  .then(weather => {
		 return weather.json();
	  })
	  .then(displayResults)
	  .catch(err => {
		  alert("Не удалось получить данные!")
	  })
 }

 function displayResults(weatherData)
 {
	const hilow = document.querySelector(".hi-low");
	const temp = document.querySelector(".temp-value");
	const weatherState = document.querySelector(".weather");
	const city = document.querySelector(".city");
	const date = document.querySelector(".date");
	 console.log(weatherData);
	hilow.innerHTML = `${weatherData.main.temp_min}°с , ${weatherData.main.temp_max}°с`
	temp.innerHTML = Math.round(weatherData.main.temp);
	weatherState.innerHTML = weatherData.weather[0].main;
	city.innerHTML = `${weatherData.name}, ${weatherData.sys.country || null}`;
	
	date.innerHTML = dateBuilder();
 }

 function dateBuilder()
 {
	const dateField = document.querySelector(".date");
	const today = new Date();
	const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

	return [days[today.getUTCDay()],
		today.getUTCDate(),
		months[today.getUTCMonth()],
		today.getUTCFullYear()
	].join(" ")
}

 