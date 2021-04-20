// // variables
// var submitBtn = $(".submitBtn");
// var searchInputEl = $(".searchInput");

// // functions

// function getData(cityName) {
//   // fetch both API's
//   return new Promise(function (resolve, reject) {
//     fetch(
//       `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&city=${cityName}&apikey=D9il0k2ZQ5sNHnlsKYHApQEcivKsruvn`
//     )
//       .then(function (responseTicket) {
//         return responseTicket.json();
//       })
//       .then(function (ticketData) {
//         console.log(ticketData._embedded.events[0]);
//       });
//   });

// var datePickerEl = $(".datePicker");
// var dropDownEl = $(".dropdownContent");

//   fetch(
//     'http://api.weatherstack.com/forecast?access_key=43c0e4c4f816398c7b97a3b59817de2b&query='+encodeURIComponent('New York')+'&forecast_days=1'
//   )
//   .then(function (responseWeather) {
//     return responseWeather.json();
//   })
//   .then(function (weatherData){
//     console.log(weatherData);
//   })
// }

// // getData();

displayEvents(savedEvents);
document
	.querySelector('#searchInput')
	.addEventListener('keydown', function (event) {
		if (event.keyCode == 13) {
			getApi();
		}
	});

submitBtn.addEventListener('click', getApi);

function getApi() {
	let requestUrl =
		'https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&size=50&keyword=' +
		userSearch.value +
		'&sort=date,asc&apikey=D9il0k2ZQ5sNHnlsKYHApQEcivKsruvn';
	fetch(requestUrl)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			displayEvents(data._embedded.events.map(mapEvent));
		});
}

function displayEvents(events) {
	newTileDiv.innerHTML = '';
	events.forEach(Card);
}

function mapEvent(event) {
	return {
		localDate: event.dates && event.dates.start && event.dates.start.localDate,
		localTime: event.dates && event.dates.start && event.dates.start.localTime,
		name: event.name,
		location:
			event._embedded &&
			event._embedded.venues &&
			event._embedded.venues[0].name,
		img: event.images && event.images.length && event.images[0].url,
	};
}

function Card(event) {
	const newDiv = document.createElement('p');
	const newDivOne = document.createElement('div');
	const newDivTwo = document.createElement('div');
	const newDivThree = document.createElement('div');
	const newDate = document.createElement('p');
	const newImage = document.createElement('img');
	const newTitle = document.createElement('p');
	const newLocation = document.createElement('p');
	const newTime = document.createElement('p');

	newDiv.classList.add('tile', 'is-parent', 'box', 'm-4', 'newCard');
	newDivOne.setAttribute('class', 'newDivOne');
	newDivTwo.setAttribute('class', 'newDivTwo');
	newDivThree.setAttribute('class', 'newDivThree');
	newDate.setAttribute('class', 'newDate');
	newImage.setAttribute('src', event.img);
	newImage.setAttribute('class', 'newImage');
	newTitle.setAttribute('class', 'newTitle');
	newLocation.setAttribute('class', 'newLocation');
	newTime.setAttribute('class', 'newTime');

	newTileDiv.append(newDiv);
	newDiv.append(newDivOne, newDivTwo, newDivThree);
	newDivOne.append(newImage, newDate);
	newDivTwo.append(newTitle, newLocation, newTime);
	newDivThree.append(SaveEventButton(event));
	newDivThree.append(deleteEventButton(event));

	newDate.textContent = event.localDate;
	newTitle.textContent = event.name;
	newLocation.textContent = event.location;
	newTime.textContent = event.localTime;
}

function handleSaveEvent() {
	const event = JSON.parse(this.getAttribute('data-event'));
	savedEvents.push(event);
	localStorage.setItem('savedEvents', JSON.stringify(savedEvents));
}

function handleDeleteEvent() {
	let removeDiv = document.querySelector('.newCard');
	removeDiv.remove();
	localStorage.removeItem('savedEvents');
}

// const myArr = [1, 2, 3, 4];
// myArr.map(square).forEach(console.log);

// function square(number) {
// 	return number ** 2;
// }
