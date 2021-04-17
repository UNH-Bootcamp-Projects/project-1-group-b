// variables
var submitBtn = $(".submitBtn");
var searchInputEl = $(".search-input");
var datePickerEl = $(".date-picker");
var dropDownEl = $(".dropdown-content");

// functions

function getData(event) {
  // fetch both API's
  fetch(
    `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=D9il0k2ZQ5sNHnlsKYHApQEcivKsruvn`
  ).then(function (responseTicket) {
    return responseTicket.json();
  }).then(ticketData) {
    
  }

  fetch(
    `http://api.weatherstack.com/43c0e4c4f816398c7b97a3b59817de2b`
  ).then(function (responseWeather) {
    return responseWeather.json();
  }).then(weatherData) {
    
  }
}

getData();
