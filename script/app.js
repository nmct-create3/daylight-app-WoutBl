let sunriseElement;
let sunsetElement;
let minutesleftElement;
let sunElement;
let timeLeftElement;
let totaltime = 0;


const placeSun = (sunrise) => {
	const now = new Date()
	console.log(now.getHours() * 60 + now.getMinutes())
	
	const sunriseDate = new Date(sunrise * 1000)

	console.log(sunriseDate.getHours() * 60 + sunriseDate.getMinutes())

	const minutesleft = now.getHours() * 60 + now.getMinutes() - (sunriseDate.getHours() * 60 + sunriseDate.getMinutes())

	console.log(minutesleft)

	const percentage = ((totaltime.getHours() * 60 + totaltime.getMinutes()) / 100) * minutesleft
	

	const sunLeftPosition = percentage
	const sunBottomPosition = percentage > 50 ? 100 - percentage : percentage *2
	console.log(sunLeftPosition)
	console.log(sunBottomPosition)


	sunElement.style.left = `${sunLeftPosition}%`
	sunElement.style.bottom = `${sunBottomPosition}%`
}



const updateTimeLeft = (timelefttimestamp) => {
	sunElement.dataset.time = new Date().toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit'
	});
	timeLeftElement.innerText = timelefttimestamp;
};



// 5 TODO: maak updateSun functie
const setDOMElement = () => {
	sunriseElement = document.querySelector('.js-sunrise');
	sunsetElement = document.querySelector('.js-sunset');
	minutesleftElement = document.querySelector('.js-location');
	sunElement = document.querySelector('.js-sun');
	timeLeftElement = document.querySelector('.js-time-left');

	if (!sunriseElement || !sunsetElement || !minutesleftElement || !sunElement || !timeLeftElement) {
		throw new Error('DOM elements not found');
	}

};

const makeReadableTimeFormatFromTimeStamp = (timestamp) => {
	return new Date(timestamp * 1000).toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit'
	});
};


const setLocation = (city) => {
	sunriseElement.innerText = makeReadableTimeFormatFromTimeStamp(city.sunrise);
	sunsetElement.innerText = makeReadableTimeFormatFromTimeStamp(city.sunset);
	minutesleftElement.innerText = `${city.name}, ${city.country}`;
};



const getData = (endpoint) => {
	return fetch(endpoint)
		.then((r) => r.json())
		.catch((e) => console.error(e));
};

document.addEventListener('DOMContentLoaded', async function () {
	let lat = 54.6454718;
	let lon = -5.5681846;
	const endpoint = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=e630f95125798ad9b2311a9d82c74a1c&units=metric&lang=nl&cnt=1`;
	getData(endpoint);

	setDOMElement();

	const { city } = await getData(endpoint);
	console.log(city);
	setLocation(city);

	totaltime = new Date(city.sunset - city.sunrise)
	
	updateTimeLeft(makeReadableTimeFormatFromTimeStamp ());
	placeSun(city.sunrise)
});
